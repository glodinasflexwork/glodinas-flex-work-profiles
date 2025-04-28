// pages/industries/cleaning.js

import Head from 'next/head';
import Link from 'next/link';
import Breadcrumb from '../../components/Breadcrumb';

export default function Cleaning() {
  return (
    <>
      <Head>
        <title>Cleaning Jobs & Staffing - Glodinas Flex Work B.V.</title>
        <meta
          name="description"
          content="Reliable cleaning staffing services for offices, schools, hospitality, and more. Find cleaning jobs or hire trained cleaning staff with Glodinas Flex Work B.V."
        />
      </Head>

      {/* Hero Section */}
      <section
        className="relative h-[400px] flex items-center justify-center text-white text-center px-4"
        style={{
          backgroundImage: "url('/images/industries/cleaning-hero.jpg')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="bg-black/40 absolute inset-0 z-0" />
        <div className="relative z-10 max-w-3xl">
          <h1 className="text-4xl font-bold mb-3">Cleaning Staffing Solutions</h1>
          <p className="text-lg">Professional cleaning teams for every sector and situation</p>
        </div>
      </section>

      {/* Breadcrumb */}
      <div className="max-w-6xl mx-auto px-4 pt-4">
        <Breadcrumb currentPage="Cleaning" />
      </div>

      {/* Info Section with Detail Image */}
      <section className="py-20 px-4 max-w-6xl mx-auto text-gray-800">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold mb-6">Cleaning Workforce Solutions</h2>
            <p className="text-lg mb-6">
              Glodinas Flex Work B.V. specializes in providing reliable, trained cleaning staff for offices, schools, event spaces, hotels, and healthcare facilities. We match organizations with professionals who take pride in their work.
            </p>
            <ul className="list-disc pl-5 space-y-3">
              <li>Office cleaning, school cleaning, hotel housekeeping</li>
              <li>Short-term, long-term, and seasonal staffing options</li>
              <li>Multilingual onboarding and team coordination</li>
              <li>Fast recruitment for urgent or peak needs</li>
            </ul>
          </div>
          <div>
            <img src="/images/industries/cleaning-detail.jpg" alt="Professional Cleaning Work" className="rounded shadow-md w-full h-auto object-cover" />
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-16 text-center">
          <h2 className="text-2xl font-bold mb-4">Ready to Work or Hire Cleaning Staff?</h2>
          <p className="mb-6">Get started with Glodinas Flex Work B.V. today — contact us or register now.</p>
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
