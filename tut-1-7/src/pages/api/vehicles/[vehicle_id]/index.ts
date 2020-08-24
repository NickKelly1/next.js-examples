

import { NextApiRequest, NextApiResponse } from 'next';
import { RoleApiResource } from '../../../../../api/roles.types';
import { openDb } from '../../../../helpers/open-db.helper';

export default async function getVehicle(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    const db = await openDb();
    const vehicles = await db.all('SELECT * FROM Vehicle WHERE Vehicle.id = ?', [req.query.vehicle_id]);
    res.json(vehicles);
  }

  else {
    res.status(500).json({ message: `Unhandled method: "${req.method}"` });
  }
}