// get server-side prop
// components that are server side rendered
import getConfig from 'next/config';

const { serverRuntimeConfig, publicRuntimeConfig } = getConfig();

// only available server side
console.log('serverRuntimeConfig', serverRuntimeConfig)
// only available server side
console.log('publicRuntimeConfig', publicRuntimeConfig);

// can have run-time configuration
export default function Gssp(props) {
  console.log('rendering:', { ...serverRuntimeConfig }, { ...publicRuntimeConfig });
  return (
    <div>
      <div>
        {`API_ENDPOINT: ${publicRuntimeConfig.API_ENDPOINT}`}
      </div>
      <div>
        {`MY_SECRET: ${serverRuntimeConfig.MY_SECRET}`}
      </div>
      <div>
        {JSON.stringify(props, null, 4)}
      </div>
    </div>
  );
}

export const getServerSideProps = () => {
  return { 
    props: {
      // warning: don't send secrets to the front-end (duh)
      MY_SECRET: serverRuntimeConfig.MY_SECRET,
      API_ENDPOINT: publicRuntimeConfig.API_ENDPOINT,
    },
  }
};