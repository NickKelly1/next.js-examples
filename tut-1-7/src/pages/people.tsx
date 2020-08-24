import React from 'react'
import { NextPageContext } from 'next'
import Router from 'next/router';
import { myGet } from '../../api/my-get.helper';

interface IPeopleProps {
  people: any;
}

export default function People(props: IPeopleProps) {
  const { people } = props;
  return (
    <div>
      <pre>{JSON.stringify(people, null, 2)}</pre>
    </div>
  )
}


People.getInitialProps = async (ctx: NextPageContext) => {
  const json = await myGet('http://localhost:3000/api/people', ctx);
  return { people: json };
}
