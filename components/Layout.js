import Head from 'next/head';
import Navbar from './Navbar';
import Footer from './Footer';

export default function Layout({ children, pageTitle, pageDescription }) {
  return (
    <div className="min-h-screen bg-white text-gray-800">
      <Head>
        {/* Favicon */}
        <link rel="icon" href="/favicon.ico" />

        {/* SEO Defaults */}
        <title>{pageTitle || 'Glodinas Flex Work B.V. - Staffing Solutions'}</title>
        <meta
          name="description"
          content={
            pageDescription ||
            'Reliable employment solutions for businesses and workers across the Netherlands.'
          }
        />
      </Head>

      {/* Site Layout */}
      <Navbar />
      <main>{children}</main>
      <Footer />
    </div>
  );
}
