import Head from 'next/head'
import Link from 'next/link';
import { IMicrophone } from '../../model/microphone.interface'
import { GetServerSideProps } from 'next';
import { openDB } from '../open-db.helper';

interface IIndexProps {
  microphones: IMicrophone[];
}

export default function Index(props: IIndexProps) {
  const { microphones } = props;
  return (
    <div>
      <Link href="/people">
        <a>People</a>
      </Link>
      <pre>{JSON.stringify(microphones, null, 4)}</pre>
    </div>
  )
}

export const getServerSideProps: GetServerSideProps<IIndexProps> = async ctx => {
  const db = await openDB();

  await new Promise(res => setTimeout(res, 3000));

  const microphones = await db.all<IMicrophone[]>('select * from Microphone');
  return { props: { microphones } };
}
