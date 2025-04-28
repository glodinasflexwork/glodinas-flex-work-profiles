// pages/industries/technical.js

import Head from 'next/head';
import Link from 'next/link';
import Breadcrumb from '../../components/Breadcrumb';

export default function Technical() {
  return (
    <>
      <Head>
        <title>Technical Jobs & Staffing - Glodinas Flex Work B.V.</title>
        <meta
          name="description"
          content="Technical staffing services across the Netherlands. Find technician, engineering, and industrial jobs or hire qualified technical workers with Glodinas Flex Work B.V."
        />
      </Head>

      {/* Hero Section */}
      <section
        className="relative h-[400px] flex items-center justify-center text-white text-center px-4"
        style={{
          backgroundImage: "url('/images/industries/technical-hero.jpg')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="bg-black/40 absolute inset-0 z-0" />
        <div className="relative z-10 max-w-3xl">
          <h1 className="text-4xl font-bold mb-3">Technical Staffing Experts</h1>
          <p className="text-lg">Industrial, mechanical, and engineering talent ready to work</p>
        </div>
      </section>

      {/* Breadcrumb */}
      <div className="max-w-6xl mx-auto px-4 pt-4">
        <Breadcrumb currentPage="Technical" />
      </div>

      {/* Info Section with Detail Image */}
      <section className="py-20 px-4 max-w-6xl mx-auto text-gray-800">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold mb-6">Technical Workforce Solutions</h2>
            <p className="text-lg mb-6">
              We provide technical staffing across various sectors: manufacturing, maintenance, construction, and engineering. Whether you need a maintenance technician or a mechanical engineer, we can help.
            </p>
            <ul className="list-disc pl-5 space-y-3">
              <li>Machine operators, maintenance technicians, engineers</li>
              <li>Short-term projects or permanent positions</li>
              <li>Qualified candidates with technical training</li>
              <li>Multilingual support for international staff</li>
            </ul>
          </div>
          <div>
            <img src="/images/industries/technical-detail.jpg" alt="Technical Work" className="rounded shadow-md w-full h-auto object-cover" />
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-16 text-center">
          <h2 className="text-2xl font-bold mb-4">Ready to Hire or Find a Technical Job?</h2>
          <p className="mb-6">Let's connect talent with opportunities today.</p>
          <div className="flex justify-center gap-4 flex-wrap">
            <Link href="/register">
              <a className="bg-orange-500 hover:bg-orange-600 text-white font-semibold px-6 py-3 rounded shadow">
                I'm Looking for Work
              </a>
            </Link>
            <Link href="/contact">
              <a className="bg-white text-orange-600 border border-orange-500 font-semibold px-6 py-3 rounded shadow">
                I Need Workers
              </a>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
