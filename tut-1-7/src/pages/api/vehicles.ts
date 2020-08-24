

import { NextApiRequest, NextApiResponse, NextApiHandler } from 'next';
import { openDb } from '../../helpers/open-db.helper';
import { authenticated } from '../../middleware/authenticated.middleware';

const getVehicles: NextApiHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'GET') {
    const db = await openDb();
    const vehicles = await db.all('SELECT * FROM Vehicle');
    res.json(vehicles);
  }

  else {
    res.status(500).json({ message: `Unhandled method: "${req.method}"` });
  }
}

export default authenticated(getVehicles);