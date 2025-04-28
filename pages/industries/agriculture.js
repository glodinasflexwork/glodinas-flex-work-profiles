import Head from 'next/head';
import Link from 'next/link';

export default function Agriculture() {
  return (
    <>
      <Head>
        <title>Agriculture Jobs & Staffing - Glodinas Flex Work B.V.</title>
        <meta
          name="description"
          content="Reliable agricultural staffing and seasonal job opportunities across the Netherlands. Hire workers or find jobs in agriculture with Glodinas Flex Work B.V."
        />
      </Head>

      {/* Hero Section */}
      <section
        className="relative h-[400px] flex items-center justify-center text-white text-center px-4"
        style={{
          backgroundImage: "url('/images/industries/agriculture-hero.jpg')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="bg-black/50 absolute inset-0 z-0" />
        <div className="relative z-10 max-w-3xl">
          <h1 className="text-4xl font-bold mb-3">Agriculture Staffing</h1>
          <p className="text-lg">Seasonal and long-term job solutions across the Netherlands</p>
        </div>
      </section>

      {/* Info Section */}
      <section className="py-20 px-4 max-w-6xl mx-auto text-gray-800">
        <h2 className="text-3xl font-bold mb-6 text-center">Agricultural Jobs & Staffing Solutions</h2>
        <p className="text-lg text-center max-w-3xl mx-auto mb-10">
          Glodinas Flex Work B.V. specializes in placing motivated workers in agriculture, from harvesting and planting to logistics and food processing. We understand seasonal demand and offer rapid staffing across rural and urban regions.
        </p>

        <div className="grid md:grid-cols-2 gap-10">
          <div>
            <h3 className="text-2xl font-semibold mb-4">For Employers</h3>
            <ul className="list-disc pl-6 space-y-2">
              <li>Fast recruitment of reliable seasonal workers</li>
              <li>Multilingual team handling communication & onboarding</li>
              <li>Compliance with NBBU, SNA, and SNF standards</li>
              <li>Housing and transportation options for international staff</li>
            </ul>
          </div>
          <div>
            <h3 className="text-2xl font-semibold mb-4">For Job Seekers</h3>
            <ul className="list-disc pl-6 space-y-2">
              <li>Jobs in farms, greenhouses, and food processing</li>
              <li>Weekly salary payments with official contracts</li>
              <li>Housing support and Dutch registration assistance</li>
              <li>Support in English, Polish, Romanian, Bulgarian</li>
            </ul>
          </div>
        </div>

        {/* CTA */}
        <div className="mt-16 text-center">
          <h2 className="text-2xl font-bold mb-4">Ready to Work in Agriculture?</h2>
          <p className="mb-6">Apply today or contact us to hire your next agricultural workforce.</p>
          <div className="flex justify-center gap-4 flex-wrap">
            <Link href="/register">
              <a className="bg-orange-500 hover:bg-orange-600 text-white font-semibold px-6 py-3 rounded">I'm Looking for Work</a>
            </Link>
            <Link href="/contact">
              <a className="bg-white text-orange-600 border border-orange-500 font-semibold px-6 py-3 rounded">I Need Workers</a>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
