
import { NextApiRequest, NextApiResponse } from 'next';
import { UserApiResource } from '../../../../../api/user.types';

export default async function getUser(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    const response = await fetch(`http://localhost:3001/users/${req.query.user_id}`);
    const user: UserApiResource = await response.json();
    res.json(user);
  }

  else {
    res.status(500).json({ message: `Unhandled method: "${req.method}"` });
  }
}