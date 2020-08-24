import { NextApiRequest, NextApiResponse } from 'next';
import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import { openDb } from '../../helpers/open-db.helper';
import { secret } from '../../../api/secret';
import cookie from 'cookie';

export default async function login(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const db = await openDb();
    const email = req.body.email;
    const checkPsw = req.body.password;
    const fullPerson = await db.get(`
      SELECT Person.*
      FROM Person
      WHERE Person.email = ?
    `, [email],);
    if (!fullPerson) return res.status(401).json({ message: `user "${email}" not found`});
    const samePsw = await compare(req.body.password, fullPerson.password).catch(() => false);
    if (!samePsw) return res.status(401).json({ message: `Incorrect password`});
    const jwt = await sign(
      { sub: fullPerson.id, email: fullPerson.email },
      secret,
      // 1h
      { expiresIn: 1000 * 60 * 60 },
    );
    res.setHeader('Set-Cookie', cookie.serialize('auth', jwt, {
      // not accessable from js
      httpOnly: true, 
      // only over https (in prod)
      secure: process.env.NODE_ENV !== 'development',   
      // only on same site
      sameSite: 'strict', 
      // 1h
      maxAge: 1000 * 60 * 60,
      // root of domain
      path: '/',
    }));
    // re-fetch the user
    const person = await db.get(`
      SELECT
        Person.id
        ,Person.name
        ,Person.email
      FROM Person
      WHERE Person.id = ?
    `, [fullPerson.id],);
    return res.json({ message: 'Welcome back to the app' });
  }

  else {
    res.status(405).json({ message: 'Method not supported' });
  }
}