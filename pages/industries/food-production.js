// pages/industries/food-production.js

import Head from 'next/head';
import Link from 'next/link';
import Breadcrumb from '../../components/Breadcrumb';

export default function FoodProduction() {
  return (
    <>
      <Head>
        <title>Food Production Jobs & Staffing - Glodinas Flex Work B.V.</title>
        <meta
          name="description"
          content="Staffing solutions for food production companies across the Netherlands. Find food packaging, processing, and quality control jobs with Glodinas Flex Work B.V."
        />
      </Head>

      {/* Hero Section */}
      <section
        className="relative h-[400px] flex items-center justify-center text-white text-center px-4"
        style={{
          backgroundImage: "url('/images/industries/food-production-hero.jpg')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="bg-black/40 absolute inset-0 z-0" />
        <div className="relative z-10 max-w-3xl">
          <h1 className="text-4xl font-bold mb-3">Food Production Staffing</h1>
          <p className="text-lg">Supplying food factories and packaging centers with motivated workers</p>
        </div>
      </section>

      {/* Breadcrumb */}
      <div className="max-w-6xl mx-auto px-4 pt-4">
        <Breadcrumb currentPage="Food Production" />
      </div>

      {/* Info Section with Detail Image */}
      <section className="py-20 px-4 max-w-6xl mx-auto text-gray-800">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold mb-6">Food Production Workforce Solutions</h2>
            <p className="text-lg mb-6">
              Glodinas Flex Work B.V. specializes in providing trained workers for food production plants, packaging centers, and quality inspection lines, ensuring food safety and efficiency.
            </p>
            <ul className="list-disc pl-5 space-y-3">
              <li>Production line operators, packers, and quality control staff</li>
              <li>Knowledge of HACCP and food safety standards</li>
              <li>Short-term projects or long-term employment options</li>
              <li>Multilingual onboarding and ongoing support</li>
            </ul>
          </div>
          <div>
            <img src="/images/industries/food-production-detail.jpg" alt="Food Production Work" className="rounded shadow-md w-full h-auto object-cover" />
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-16 text-center">
          <h2 className="text-2xl font-bold mb-4">Find Jobs or Staff in Food Production</h2>
          <p className="mb-6">Join our network or find qualified food industry professionals today.</p>
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
