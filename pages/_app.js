import { useEffect } from 'react';
import { SessionProvider } from "next-auth/react";
import '../styles/globals.css';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Notification from '../components/Notification';
import { useRouter } from 'next/router';
import { i18n } from '../lib/i18n';

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  const router = useRouter();
  const { locale } = router;

  useEffect(() => {
    if (locale) {
      i18n.changeLanguage(locale);
    }
  }, [locale]);

  // Check if the current page is an admin page
  const isAdminPage = router.pathname.startsWith('/admin');

  return (
    <SessionProvider session={session}>
      {!isAdminPage && <Navbar />}
      <Notification />
      <Component {...pageProps} />
      {!isAdminPage && <Footer />}
    </SessionProvider>
  );
}

export default MyApp;
