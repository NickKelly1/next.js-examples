import { NextApiRequest, NextApiResponse } from 'next';
import { RoleApiResource } from '../../../../../api/roles.types';
import { openDb } from '../../../../helpers/open-db.helper';

export default async function getPerson(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    const db = await openDb();
    const person = await db.get(
      `SELECT
        Person.id,
        ,Person.name
        ,Person.email
      FROM Person WHERE Person.id = ?`,
      [req.query.person_id],
    );
    res.json(person);
  }

  else if (req.method === 'PUT') {
    const db = await openDb();
    const statement = await db.prepare(`UPDATE Person SET name = ?, email = ? WHERE id = ?`);
    const result = await statement.run(req.body.name, req.body.email, req.query.person_id);
    const people = await db.get(
      `SELECT
        Person.id
        ,Person.name
        ,Person.email
      FROM Person WHERE Person.id = ?`,
      [req.query.person_id],
    );
    return res.json(people);
  }

  else {
    res.status(500).json({ message: `Unhandled method: "${req.method}"` });
  }
}