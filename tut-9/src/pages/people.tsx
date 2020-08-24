import React from 'react'
import Link from 'next/link';
import { GetServerSideProps } from 'next'
import { toNamespacedPath } from 'path';

interface IPeopleProps {
  people: any;
}

export default function People(props: IPeopleProps) {
  const { people } = props;
  return (
    <div>
      <Link href="/">
        <a>Index</a>
      </Link>
      {people.map((person: any) => {
        return (
          <h2 key={person.name}>
            {person.name}
          </h2>
        );
      })}
    </div>
  )
}

export const getServerSideProps: GetServerSideProps<IPeopleProps> = async ctx => {
  return { props: { people: [
    { name: 'John', },
    { name: 'Michael', },
    { name: 'Nick', },
    { name: 'Bruno', },
  ] } };
}
