import Head from 'next/head'
import Link from 'next/link';
import { IMicrophone } from '../../model/microphone.interface'
import { GetServerSideProps } from 'next';
import { openDB } from '../open-db.helper';

console.log('MY_STEP', process.env.MY_STEP);

export default function Index(props: any) {
  return (
    <div>
      <div>MY_STEP: {process.env.MY_STEP}</div>
    </div>
  )
}
