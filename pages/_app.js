import '../styles/globals.css';
import { SessionProvider } from 'next-auth/react';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { NotificationProvider } from '../components/NotificationContext';
import Layout from '../components/Layout';

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  const router = useRouter();
  
  // Special pages that need custom layouts or no layout
  const specialPages = [
    '/employer/dashboard',
    '/employer/job-postings',
    '/employer/profile',
    '/admin',
    '/admin/login',
    '/admin/employers',
    '/admin/job-seekers',
    '/admin/export',
    '/admin/employers/pending',
    '/admin/job-seekers/pending'
  ];
  
  // Check if current page needs special layout handling
  const needsSpecialLayout = specialPages.some(path => 
    router.pathname === path || router.pathname.startsWith(`${path}/`)
  );
  
  return (
    <SessionProvider session={session}>
      <NotificationProvider>
        {needsSpecialLayout ? (
          // For pages with their own layout or no layout
          <Component {...pageProps} />
        ) : (
          // Default layout for most pages
          <Layout pageTitle={Component.pageTitle}>
            <Component {...pageProps} />
          </Layout>
        )}
      </NotificationProvider>
    </SessionProvider>
  );
}

export default MyApp;
