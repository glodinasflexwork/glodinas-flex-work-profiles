import '../styles/globals.css';
import { SessionProvider } from 'next-auth/react';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { NotificationProvider } from '../components/NotificationContext';
import Layout from '../components/Layout';

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  const router = useRouter();
  
  // Use getLayout if it's defined on the page, otherwise use default Layout
  const getLayout = Component.getLayout || ((page) => <Layout pageTitle={Component.pageTitle}>{page}</Layout>);
  
  return (
    <SessionProvider session={session}>
      <NotificationProvider>
        {getLayout(<Component {...pageProps} />)}
      </NotificationProvider>
    </SessionProvider>
  );
}

export default MyApp;
