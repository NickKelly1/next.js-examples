import { AppPropsType } from "next/dist/next-server/lib/utils"
import Router from "next/router";
import nprogress from 'nprogress';
import  'nprogress/nprogress.css';

nprogress.configure({
  showSpinner: false,
  trickleSpeed: 250,
});

Router.events.on('routeChangeStart', () => {
  nprogress.start()
  console.log('on start');
});

Router.events.on('routeChangeError', () => {
  nprogress.done();
  console.log('on error');
});

Router.events.on('routeChangeComplete', () => {
  nprogress.done();
  console.log('on end');
});

function MyApp({ Component, pageProps }: AppPropsType) {
  return (
    <div>
      <Component {...pageProps} />
    </div>
  )
}

export default MyApp
