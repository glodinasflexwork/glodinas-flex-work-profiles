import Head from 'next/head';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

export default function Home() {
  const { t } = useTranslation();

  return (
    <>
      <Head>
        <title>Glodinas Flex Work B.V. | {t('title')}</title>
      </Head>
      <main className="min-h-screen bg-gray-50 text-gray-800">
        {/* Hero Section */}
        <section className="bg-orange-500 text-white py-20 px-6 text-center">
          <h1 className="text-5xl font-bold mb-4">Glodinas Flex Work B.V.</h1>
          <p className="text-xl max-w-2xl mx-auto">Connecting people with opportunities — Fast, Reliable & Multilingual Staffing Solutions</p>
          <div className="mt-6">
            <a href="/jobseekers" className="bg-white text-orange-600 font-semibold px-6 py-3 rounded shadow hover:bg-gray-100">
              I'm Looking for Work
            </a>
            <a href="/employers" className="ml-4 border border-white px-6 py-3 rounded hover:bg-white hover:text-orange-600">
              I Need Workers
            </a>
          </div>
        </section>

        {/* About Section */}
        <section className="py-16 px-6 max-w-5xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Who We Are</h2>
          <p className="text-lg mb-6">
            Glodinas Flex Work is your trusted partner for temporary employment across the Netherlands.
            We provide flexible, multilingual, and motivated workers to support your business or help you find your next job fast.
          </p>
        </section>

        {/* Services Section */}
        <section className="bg-white py-16 px-6">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-10">Our Services</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 text-center">
              <div className="p-6 border rounded shadow-sm">
                <h3 className="text-xl font-semibold mb-2">Temporary Staffing</h3>
                <p>Fast placements of reliable staff for various sectors.</p>
              </div>
              <div className="p-6 border rounded shadow-sm">
                <h3 className="text-xl font-semibold mb-2">Recruitment</h3>
                <p>We find the right people to match your long-term goals.</p>
              </div>
              <div className="p-6 border rounded shadow-sm">
                <h3 className="text-xl font-semibold mb-2">Payroll Services</h3>
                <p>Let us handle contracts, payments, and compliance for you.</p>
              </div>
              <div className="p-6 border rounded shadow-sm">
                <h3 className="text-xl font-semibold mb-2">Housing Support</h3>
                <p>We help provide housing options for workers where needed.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Sectors */}
        <section className="py-16 px-6 max-w-5xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Industries We Serve</h2>
          <p className="mb-10">From logistics to hospitality — we supply staff to key sectors across the Netherlands.</p>
          <div className="flex flex-wrap justify-center gap-6">
            <span className="bg-gray-200 px-4 py-2 rounded">Logistics</span>
            <span className="bg-gray-200 px-4 py-2 rounded">Hospitality</span>
            <span className="bg-gray-200 px-4 py-2 rounded">Cleaning</span>
            <span className="bg-gray-200 px-4 py-2 rounded">Food Production</span>
            <span className="bg-gray-200 px-4 py-2 rounded">Technical</span>
          </div>
        </section>

        {/* Call to Action */}
        <section className="bg-orange-500 text-white py-16 px-6 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to get started?</h2>
          <p className="mb-6">Whether you're looking for work or searching for staff — Glodinas Flex Work is here to help.</p>
          <a href="/contact" className="bg-white text-orange-600 font-semibold px-8 py-3 rounded shadow hover:bg-gray-100">
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
