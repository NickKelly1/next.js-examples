import { NextApiRequest, NextApiResponse } from 'next';
import { RoleApiCollectionResponse } from '../../../api/roles.types';

export default async function getRoles(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    const response = await fetch('http://localhost:3001/roles');
    const roles: RoleApiCollectionResponse = await response.json();
    res.json(roles);
  }

  else {
    res.status(500).json({ message: `Unhandled method: "${req.method}"` });
  }
}