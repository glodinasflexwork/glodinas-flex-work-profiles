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
          content="Reliable staffing for food production companies across the Netherlands. Find food packaging jobs or hire skilled production staff with Glodinas Flex Work B.V."
        />
        <meta name="keywords" content="food production staffing Netherlands, food packaging jobs, factory jobs Netherlands, food industry staffing" />
        <meta name="author" content="Glodinas Flex Work B.V." />

        {/* Open Graph */}
        <meta property="og:title" content="Food Production Jobs & Staffing - Glodinas Flex Work B.V." />
        <meta property="og:description" content="Connecting skilled workers with food production and packaging companies across the Netherlands." />
        <meta property="og:image" content="https://glodinas-flex-site.vercel.app/images/industries/food-production-hero.jpg" />
        <meta property="og:url" content="https://glodinasflexwork.nl/industries/food-production" />
        <meta property="og:type" content="website" />

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Food Production Staffing - Glodinas Flex Work B.V." />
        <meta name="twitter:description" content="Find food production jobs or hire reliable staff for your food company." />
        <meta name="twitter:image" content="https://glodinas-flex-site.vercel.app/images/industries/food-production-hero.jpg" />
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
          <p className="text-lg">Reliable staffing for food factories, packaging lines, and production facilities</p>
        </div>
      </section>

      {/* Breadcrumb */}
      <div className="max-w-6xl mx-auto px-4 pt-4">
        <Breadcrumb currentPage="Food Production" />
      </div>

      {/* Info Section - Layout Variation */}
      <section className="py-20 px-4 max-w-6xl mx-auto text-gray-800">
        <h2 className="text-3xl font-bold mb-8 text-center">Specialized Workforce for the Food Industry</h2>

        <div className="flex flex-col md:flex-row-reverse gap-12 items-center">
          <div className="flex-1">
            <img src="/images/industries/food-production-hero.jpg" alt="Food Production Jobs" className="rounded shadow-md w-full h-auto object-cover" />
          </div>

          <div className="flex-1">
            <p className="text-lg mb-6">
              At Glodinas Flex Work B.V., we help food processing companies find reliable, motivated workers for production, packaging, and quality control tasks. We respond quickly to your seasonal or urgent staffing needs.
            </p>
            <ul className="list-disc pl-5 space-y-3">
              <li>Food packaging, processing, and quality inspection roles</li>
              <li>Workers familiar with hygiene and food safety standards</li>
              <li>Flexible contracts: seasonal, full-time, or part-time</li>
              <li>Multilingual communication and support for workers</li>
            </ul>
          </div>
        </div>

        {/* CTA */}
        <div className="mt-16 text-center">
          <h2 className="text-2xl font-bold mb-4">Ready to Hire or Work in Food Production?</h2>
          <p className="mb-6">Get in touch today and let's connect talent with opportunity in the food sector.</p>
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
