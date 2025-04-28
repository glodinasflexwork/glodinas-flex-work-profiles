// pages/industries/hospitality.js

import Head from 'next/head';
import Link from 'next/link';
import Breadcrumb from '../../components/Breadcrumb';

export default function Hospitality() {
  return (
    <>
      <Head>
        <title>Hospitality Jobs & Staffing - Glodinas Flex Work B.V.</title>
        <meta
          name="description"
          content="Professional staffing solutions for the hospitality sector across the Netherlands. Find hotel, catering, and restaurant jobs with Glodinas Flex Work B.V."
        />
      </Head>

      {/* Hero Section */}
      <section
        className="relative h-[400px] flex items-center justify-center text-white text-center px-4"
        style={{
          backgroundImage: "url('/images/industries/hospitality-hero.jpg')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="bg-black/40 absolute inset-0 z-0" />
        <div className="relative z-10 max-w-3xl">
          <h1 className="text-4xl font-bold mb-3">Hospitality Staffing Experts</h1>
          <p className="text-lg">Connecting hotels, restaurants, and catering services with talented staff</p>
        </div>
      </section>

      {/* Breadcrumb */}
      <div className="max-w-6xl mx-auto px-4 pt-4">
        <Breadcrumb currentPage="Hospitality" />
      </div>

      {/* Info Section with Detail Image */}
      <section className="py-20 px-4 max-w-6xl mx-auto text-gray-800">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold mb-6">Specialized Hospitality Staffing Services</h2>
            <p className="text-lg mb-6">
              At Glodinas Flex Work B.V., we support hotels, restaurants, event venues, and catering businesses by providing them with skilled hospitality professionals ready to deliver excellent service.
            </p>
            <ul className="list-disc pl-5 space-y-3">
              <li>Receptionists, servers, chefs, housekeepers, and more</li>
              <li>Flexible short-term and long-term staffing options</li>
              <li>Quick placements to handle seasonal demand</li>
              <li>Multilingual communication and onboarding assistance</li>
            </ul>
          </div>
          <div>
            <img src="/images/industries/hospitality-detail.jpg" alt="Hospitality Work" className="rounded shadow-md w-full h-auto object-cover" />
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-16 text-center">
          <h2 className="text-2xl font-bold mb-4">Find Work or Staff in Hospitality?</h2>
          <p className="mb-6">Join our network or hire your next hospitality team member today.</p>
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
