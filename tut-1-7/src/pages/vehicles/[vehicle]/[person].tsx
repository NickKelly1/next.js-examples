import { useRouter } from 'next/router';

export default function Bruno() {
  const router = useRouter();

  return (
    <h2>
      {`${router.query.person}'s ${router.query.vehicle}`}
    </h2>
  );
}