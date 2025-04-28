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
          content="Reliable cleaning staffing services for offices, schools, and public spaces. Find cleaning jobs or hire cleaning staff with Glodinas Flex Work B.V."
        />
        <meta name="keywords" content="cleaning staffing Netherlands, office cleaner jobs, school cleaner staffing, cleaning jobs Netherlands" />
        <meta name="author" content="Glodinas Flex Work B.V." />

        {/* Open Graph */}
        <meta property="og:title" content="Cleaning Jobs & Staffing - Glodinas Flex Work B.V." />
        <meta property="og:description" content="Connecting cleaning professionals with employers across the Netherlands." />
        <meta property="og:image" content="https://glodinas-flex-site.vercel.app/images/industries/cleaning-hero.jpg" />
        <meta property="og:url" content="https://glodinasflexwork.nl/industries/cleaning" />
        <meta property="og:type" content="website" />

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Cleaning Staffing - Glodinas Flex Work B.V." />
        <meta name="twitter:description" content="Find cleaning jobs or hire reliable cleaning staff across the Netherlands." />
        <meta name="twitter:image" content="https://glodinas-flex-site.vercel.app/images/industries/cleaning-hero.jpg" />
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
          <p className="text-lg">Reliable and efficient cleaning teams for every sector</p>
        </div>
      </section>

      {/* Breadcrumb */}
      <div className="max-w-6xl mx-auto px-4 pt-4">
        <Breadcrumb currentPage="Cleaning" />
      </div>

      {/* Info Section - New Layout */}
      <section className="py-20 px-4 max-w-6xl mx-auto text-gray-800">
        <h2 className="text-3xl font-bold mb-8 text-center">Flexible Cleaning Workforce Solutions</h2>

        <div className="grid md:grid-cols-2 gap-12 items-start">
          <div>
            <h3 className="text-2xl font-semibold mb-4">Why Choose Glodinas Flex Work B.V.?</h3>
            <ul className="list-disc pl-5 space-y-3">
              <li>Office, school, industrial, and hospitality cleaning roles</li>
              <li>Short-term, part-time, and long-term cleaning contracts</li>
              <li>Assistance with housing and Dutch registration for international workers</li>
              <li>Quick staffing for urgent and seasonal needs</li>
            </ul>
          </div>
          <div>
            <h3 className="text-2xl font-semibold mb-4">Supporting Workers and Employers</h3>
            <p className="text-lg mb-4">
              Whether you need staff for ongoing maintenance or large one-time projects, we have a pool of pre-screened candidates ready to help. We support workers in finding stable, well-organized cleaning positions across the Netherlands.
            </p>
            <img src="/images/industries/cleaning-hero.jpg" alt="Professional Cleaning Services" className="rounded shadow-md w-full h-auto object-cover" />
          </div>
        </div>

        {/* CTA */}
        <div className="mt-16 text-center">
          <h2 className="text-2xl font-bold mb-4">Need Cleaning Staff or Searching for a Job?</h2>
          <p className="mb-6">Get in touch today and join Glodinas Flex Work B.V.'s trusted cleaning workforce.</p>
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
