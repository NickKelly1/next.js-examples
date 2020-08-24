
import { NextApiRequest, NextApiResponse } from 'next';
import { RoleApiCollectionResponse } from '../../../../../api/roles.types';

export default async function getUserRoles(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    const response = await fetch(`http://localhost:3001/users/${req.query.user_id}/roles`);
    const user: RoleApiCollectionResponse = await response.json();
    res.json(user);
  }

  else {
    res.status(500).json({ message: `Unhandled method: "${req.method}"` });
  }
}