import { NextApiRequest, NextApiResponse } from 'next';
import { hash } from 'bcryptjs';
import { openDb } from '../../helpers/open-db.helper';
import { sign } from 'jsonwebtoken';
import { secret } from '../../../api/secret';
import cookie from 'cookie';

export default async function signup(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const db = await openDb();
    const statement = await db.prepare(
      `INSERT INTO
        Person(
          name
          ,email
          ,password
        )
        VALUES (
          ?,
          ?,
          ?
        )
      `
    );
    const password = await hash(req.body.password, 12);
    const result = await statement.run(
      req.body.name,
      req.body.email,
      password,
    );
    const person = await db.get(`
      SELECT
        Person.id
        ,Person.name
        ,Person.email
      FROM Person
      WHERE Person.id = ?
      `, [result.lastID],
    );
    if (!person) res.status(500).json({ message: 'Internal server error' });
    const jwt = await sign(
      { sub: person.id, email: person.email },
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
    return res.json(person);
  }

  else {
    res.status(405).json({ message: 'Method not supported' });
  }
}