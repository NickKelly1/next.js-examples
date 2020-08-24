import { IMicrophone } from "../../../model/microphone.interface";
import { GetStaticProps, GetStaticPropsResult, GetStaticPaths } from "next";
import { useRouter } from 'next/router';
import { openDB } from "../../open-db.helper";
import { ParsedUrlQuery } from "querystring";

export interface IMicrophoneDetailProps {
  microphone?: IMicrophone;
}


function MicrophoneDetail(props: IMicrophoneDetailProps) {
  const { microphone } = props;
  const router = useRouter();

  if (!microphone || router.isFallback) {
    return (
      <div>
        Loading... Sorry for the inconvenience
      </div>
    );
  }

  return (
    <div>
      <div>{microphone.id}</div>
      <div>{microphone.brand}</div>
      <div>{microphone.model}</div>
      <div>{microphone.price}</div>
      <div>{microphone.imageUrl}</div>
    </div>
  );
}

export default MicrophoneDetail;

interface IHasMicrophoneId extends ParsedUrlQuery {
  microphone_id: string 
}

export const getStaticProps: GetStaticProps<IMicrophoneDetailProps, IHasMicrophoneId> = async (ctx) => {
  const db = await openDB();
  const microphone_id = ctx.params!.microphone_id;

  const microphone: IMicrophone | undefined = await db.get(`
    SELECT * FROM Microphone WHERE id = ?
  `, [microphone_id])

  return {
    props: {
      microphone: microphone!,
    }
  }
}

export const getStaticPaths: GetStaticPaths<IHasMicrophoneId> = async () => {
  const db = await openDB();
  const microphones: IMicrophone[] = await db.all(`
    SELECT Microphone.id FROM Microphone
  `);
  const paths = microphones.map(mic => ({ params: { microphone_id: mic.id.toString() }}));

  return {
    fallback: true,
    paths: paths,
  };
}