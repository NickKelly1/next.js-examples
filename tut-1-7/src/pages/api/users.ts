import { NextApiRequest, NextApiResponse } from 'next';
import { UserApiCollectionResponse } from '../../../api/user.types';

export default async function getUsers(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    const response = await fetch('http://localhost:3001/users');
    const users: UserApiCollectionResponse = await response.json();
    res.json(users);
  }

  else {
    res.status(500).json({ message: `Unhandled method: "${req.method}"` });
  }
}