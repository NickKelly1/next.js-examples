import { useRouter } from 'next/router';
import { NextPageContext } from 'next';
import { UserApiResource } from '../../../../api/user.types';

function unwrap<T>(arg: T | T[]): T {
  if (Array.isArray(arg)) return arg[0];
  return arg;
}


interface IVerifiedProps {
  user: UserApiResource;
  wasVerified: string;
}


export default function Verified(props: IVerifiedProps) {
  const { user, wasVerified } = props;
  // const router = useRouter();

  return (
    <>
      <h2>
        {`User: "${user.data.name}" was verified: "${wasVerified}"`}
      </h2>
      <div>
        <pre>
          {JSON.stringify(user, null, 2)}
        </pre>
      </div>
    </>
  );
}

interface VerifiedNextPageContext extends NextPageContext {
  //
}

Verified.getInitialProps = async (ctx: VerifiedNextPageContext): Promise<IVerifiedProps> => {
  const user_id = unwrap(ctx.query.user_id);
  const verified = unwrap(ctx.query.verified);
  console.log(`user_id: ${user_id}, verified: ${verified}`);
  const response = await fetch(`http://localhost:3001/users/${user_id}`);
  const user: UserApiResource = await response.json();
  return { user: user, wasVerified: verified }
}