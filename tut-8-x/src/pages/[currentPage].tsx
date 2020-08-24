import React from 'react'
import Index, { getStaticProps as indexGetStaticProps  } from './index';
import { GetStaticPaths } from 'next';
import { openDB } from '../open-db.helper';

export default Index;

export const getStaticProps = indexGetStaticProps;

export const getStaticPaths: GetStaticPaths = async () => {
  const db = await openDB();
  const result  = await db.get('SELECT COUNT(*) as total FROM Microphone');
  const total = result.total as number;

  const pages = Math.ceil(total / 5.0);
  const paths = Array(pages - 1).fill(0).map((_, i) => ({ params: { currentPage: String(i + 1)}}));

  return {
    fallback: false,
    paths: paths,
  };
}

