import * as jsonwebtoken from 'jsonwebtoken';
import { NextApiRequest, NextApiResponse, NextApiHandler } from 'next';
import { secret } from '../../api/secret';

export const authenticated = (fn: NextApiHandler)  => async (req: NextApiRequest, res: NextApiResponse) => {
  console.log('Authenticating...:', req.cookies);
  jsonwebtoken.verify(
    // req.headers.authorization,
    req.cookies.auth,
    secret,
    async function (err, jwt) {
      if (!err && jwt) {
        return await fn(req, res);
      }
      console.warn(`Failed to authenticate`);
      console.error(err);
      res.status(401).json({ message: 'Sorry, you are not authenticated'});
    }
  );
};