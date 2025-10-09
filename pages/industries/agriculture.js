// pages/industries/agriculture.js

import Head from 'next/head';
import Link from 'next/link';
import Breadcrumb from '../../components/Breadcrumb';

export default function Agriculture() {
  return (
    <>
      <Head>
        <title>Agriculture Jobs & Staffing - Glodinas Flex Work B.V.</title>
        <meta
          name="description"
          content="Reliable agricultural staffing and seasonal job opportunities across the Netherlands. Find jobs or hire workers in agriculture with Glodinas Flex Work B.V."
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
          <h1 className="text-4xl font-bold mb-3">Agriculture Staffing Solutions</h1>
          <p className="text-lg">Seasonal and long-term workforce for farms and greenhouses</p>
        </div>
      </section>

      {/* Breadcrumb */}
      <div className="max-w-6xl mx-auto px-4 pt-4">
        <Breadcrumb currentPage="Agriculture" />
      </div>

      {/* Info Section with Detail Image */}
      <section className="py-20 px-4 max-w-6xl mx-auto text-gray-800">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold mb-6">Agricultural Workforce Solutions</h2>
            <p className="text-lg mb-6">
              Glodinas Flex Work B.V. supports farms, greenhouses, and food production facilities by connecting them with hardworking and motivated agricultural workers across the Netherlands.
            </p>
            <ul className="list-disc pl-5 space-y-3">
              <li>Harvesting, planting, greenhouse, and logistics support</li>
              <li>Flexible seasonal or full-year staffing options</li>
              <li>Assistance with housing and Dutch registration</li>
              <li>Multilingual onboarding (English, Polish, Romanian, Bulgarian)</li>
            </ul>
          </div>
          <div>
            <img src="/images/industries/agriculture-detail.jpg" alt="Agricultural Work" className="rounded shadow-md w-full h-auto object-cover" />
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-16 text-center">
          <h2 className="text-2xl font-bold mb-4">Ready to Work or Hire in Agriculture?</h2>
          <p className="mb-6">Apply today or contact us to find your agricultural workforce solutions!</p>
          <div className="flex justify-center gap-4 flex-wrap">
            <Link href="/register" className="bg-orange-500 hover:bg-orange-600 text-white font-semibold px-6 py-3 rounded shadow">
                I'm Looking for Work
              </Link>
            <Link href="/contact" className="bg-white text-orange-600 border border-orange-500 font-semibold px-6 py-3 rounded shadow">
                I Need Workers
              </Link>
          </div>
        </div>
      </section>
    </>
  );
}
