import { NextApiRequest, NextApiResponse, NextApiHandler } from 'next';
import { openDb } from '../../helpers/open-db.helper';
import { authenticated } from '../../middleware/authenticated.middleware';

const getPeople: NextApiHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'GET') {
    const db = await openDb();
    const people = await db.all(
      'SELECT Person.id, Person.email, Person.name FROM Person',
    );
    res.json(people);
  }

  else {
    res.status(500).json({ message: `Unhandled method: "${req.method}"` });
  }
}

export default authenticated(getPeople);