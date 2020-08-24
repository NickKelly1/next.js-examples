import { NextApiRequest, NextApiResponse } from 'next';
import { RoleApiResource } from '../../../../../api/roles.types';

export default async function getRole(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    const response = await fetch(`http://localhost:3001/roles/${req.query.role_id}`);
    const user: RoleApiResource = await response.json();
    res.json(user);
  }

  else {
    res.status(500).json({ message: `Unhandled method: "${req.method}"` });
  }
}