import { NextApiRequest, NextApiResponse } from 'next';
import { RoleApiResource } from '../../../../../api/roles.types';
import { openDb } from '../../../../helpers/open-db.helper';

export default async function getVehicleOwner(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    const db = await openDb();
    const vehicles = await db.get(
      `SELECT
        Person.id
        ,Person.name
        ,Person.email
      FROM Person
      INNER JOIN Vehicle
      ON Person.id = Vehicle.ownerId
      WHERE Vehicle.id = ?`,
      [req.query.vehicle_id],
    );
    res.json(vehicles);
  }

  else {
    res.status(500).json({ message: `Unhandled method: "${req.method}"` });
  }
}