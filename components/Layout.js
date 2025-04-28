import Head from 'next/head';
import Navbar from './Navbar';
import Footer from './Footer';

export default function Layout({ children }) {
  return (
    <div className="min-h-screen bg-white text-gray-800">
      {/* Global Favicon */}
      <Head>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Navbar />
      <main>{children}</main>
      <Footer />
    </div>
  );
}
