import Head from 'next/head';

export default function Home() {
  return (
    <>
      <Head>
        <title>Glodinas Flex Work B.V.</title>
        <meta name="description" content="Connecting Talent with Opportunity" />
      </Head>

      <main className="min-h-screen bg-white text-gray-800">
        <section className="flex flex-col items-center justify-center text-center py-24 px-4">
          <img src="/logo.png" alt="Glodinas Flex Work B.V. Logo" className="w-32 h-32 mb-6" />
          <h1 className="text-5xl font-extrabold mb-4">Glodinas Flex Work B.V.</h1>
          <p className="text-xl max-w-xl mb-8">
            Your trusted partner in temporary employment solutions. We connect skilled workers with the right opportunities across industries.
          </p>
          <div className="flex gap-4">
            <button className="bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600">Find a Job</button>
            <button className="border border-orange-500 text-orange-500 px-4 py-2 rounded hover:bg-orange-50">Hire Talent</button>
          </div>
        </section>

        <section className="py-16 px-4 max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-10">Our Services</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-xl font-semibold mb-2">Temporary Staffing</h3>
              <p>Flexible and qualified workforce solutions tailored to your business needs.</p>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-2">Recruitment & Selection</h3>
              <p>We help you find the right people for the right positions with precision and care.</p>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-2">Payroll Services</h3>
              <p>Reliable and compliant payroll management for your temporary workforce.</p>
            </div>
          </div>
        </section>

        <section className="bg-gray-100 py-16 px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Get in Touch</h2>
          <p className="mb-6">Interested in working with us or need more information? We're here to help!</p>
          <button className="bg-orange-500 text-white px-6 py-2 rounded hover:bg-orange-600">Contact Us</button>
        </section>
      </main>
    </>
  );
}
