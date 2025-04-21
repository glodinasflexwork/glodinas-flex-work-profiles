import Head from 'next/head';

export default function Services() {
  return (
    <>
      <Head>
        <title>Our Services - Glodinas Flex Work B.V.</title>
      </Head>
      <section className="py-20 px-4 max-w-6xl mx-auto text-gray-800">
        <h1 className="text-4xl font-bold mb-6 text-center">Our Services</h1>
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h2 className="text-2xl font-semibold mb-2">Temporary Staffing</h2>
            <p className="mb-4">Fast placements in logistics, cleaning, production, and more.</p>
            <h2 className="text-2xl font-semibold mb-2">Recruitment</h2>
            <p className="mb-4">We find long-term matches between employees and employers.</p>
          </div>
          <div>
            <h2 className="text-2xl font-semibold mb-2">Payroll Services</h2>
            <p className="mb-4">We handle salary administration, contracts, and taxes.</p>
            <h2 className="text-2xl font-semibold mb-2">Housing Support</h2>
            <p className="mb-4">Support with accommodation for international employees.</p>
          </div>
        </div>
      </section>
    </>
  );
}