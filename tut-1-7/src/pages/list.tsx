import React from 'react'
import { UserApiCollectionResponse } from '../../api/user.types';
import Link from 'next/link';
import { NextPageContext } from 'next';

interface IListProps {
  users?: UserApiCollectionResponse;
}

export default function List(props: IListProps) {
  const { users } = props;
  return (
    <div>
      {users.nodes.map(user => (
        <div key={user.data.id}>
          <Link as={`/users/${user.data.id}/${user.data.verified}`} href="/users/[user_id]/[verified]">
            <a>
              {`Is ${user.data.name} verified? Find out...`}
            </a>
          </Link>
        </div>
      ))}
    </div>
  )
}


List.getInitialProps = async (ctx: NextPageContext): Promise<IListProps> => {
  const response = await fetch('http://localhost:3001/users');
  const users: UserApiCollectionResponse = await response.json();
  return { users };
}