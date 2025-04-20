import Head from 'next/head';
import Image from 'next/image';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

export default function Home() {
  const { t } = useTranslation();

  return (
    <>
      <Head>
        <title>Glodinas Flex Work B.V.</title>
      </Head>
      <main className="min-h-screen bg-white text-gray-800">
        {/* Hero Section */}
        <section className="relative bg-cover bg-center h-[80vh] flex items-center justify-center text-white" style={{ backgroundImage: "url('/images/hero-bg.jpg')" }}>
          <div className="absolute inset-0 bg-black bg-opacity-50"></div>
          <div className="relative z-10 text-center px-4">
            <div className="mx-auto mb-4">
              <Image src="/images/logo.svg" alt="Glodinas Logo" width={120} height={120} />
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-4">Connecting People with Opportunities</h1>
            <p className="text-lg md:text-xl mb-6 max-w-xl mx-auto">Flexible staffing solutions, multilingual support, and reliable service across the Netherlands.</p>
            <div className="space-x-4">
              <a href="/jobseekers" className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-lg font-semibold">I'm Looking for Work</a>
              <a href="/employers" className="bg-white text-orange-600 hover:bg-gray-100 border px-6 py-3 rounded-lg font-semibold">I Need Workers</a>
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section className="py-20 px-4 max-w-6xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-12">Our Services</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 text-left">
            <div className="p-6 bg-gray-50 shadow rounded-lg">
              <h3 className="text-xl font-semibold mb-2">Temporary Staffing</h3>
              <p>Fast placement of workers for logistics, cleaning, food production, and more.</p>
            </div>
            <div className="p-6 bg-gray-50 shadow rounded-lg">
              <h3 className="text-xl font-semibold mb-2">Recruitment</h3>
              <p>We recruit dedicated personnel tailored to your company’s culture and needs.</p>
            </div>
            <div className="p-6 bg-gray-50 shadow rounded-lg">
              <h3 className="text-xl font-semibold mb-2">Payroll Services</h3>
              <p>Outsource contracts, taxes, and salary handling — stress-free and compliant.</p>
            </div>
            <div className="p-6 bg-gray-50 shadow rounded-lg">
              <h3 className="text-xl font-semibold mb-2">Housing Support</h3>
              <p>Need accommodation for your team? We assist with affordable housing options.</p>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="bg-orange-500 text-white py-16 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Work With Us?</h2>
          <p className="mb-6 text-lg">Whether you’re looking for your next job or need staff — Glodinas Flex Work is here to help.</p>
          <a href="/contact" className="bg-white text-orange-600 font-semibold px-8 py-3 rounded hover:bg-gray-100">
            Contact Us
          </a>
        </section>
      </main>
    </>
  );
}

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common'])),
    },
  };
}
