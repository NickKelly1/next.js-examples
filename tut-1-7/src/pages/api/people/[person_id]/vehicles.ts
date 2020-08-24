
import { NextApiRequest, NextApiResponse } from 'next';
import { RoleApiResource } from '../../../../../api/roles.types';
import { openDb } from '../../../../helpers/open-db.helper';

export default async function getPersonsVehicles(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    const db = await openDb();
    const vehicles = await db.all('SELECT Vehicle.* FROM Vehicle INNER JOIN Person ON Vehicle.ownerId = Person.id WHERE Person.id = ?', [req.query.person_id]);
    res.json(vehicles);
  }

  else {
    res.status(500).json({ message: `Unhandled method: "${req.method}"` });
  }
}