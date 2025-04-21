import Head from 'next/head';
import Breadcrumb from '../components/Breadcrumb';

export default function Services() {
  return (
    <>
      <Head>
        <title>Our Services - Glodinas Flex Work B.V.</title>
        <meta name="description" content="Discover the staffing, payroll, and housing services offered by Glodinas Flex Work B.V." />
        <meta name="keywords" content="temporary staffing Netherlands, recruitment agency, payroll services, housing support for workers, Glodinas Flex Work" />
        <meta name="author" content="Glodinas Flex Work B.V." />

        {/* Open Graph */}
        <meta property="og:title" content="Our Services - Glodinas Flex Work B.V." />
        <meta property="og:description" content="Discover the staffing, payroll, and housing services offered by Glodinas Flex Work B.V." />
        <meta property="og:image" content="https://glodinas-flex-site.vercel.app/images/services-hero.jpg" />
        <meta property="og:url" content="https://glodinas-flex-site.vercel.app/services" />
        <meta property="og:type" content="website" />

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Our Services - Glodinas Flex Work B.V." />
        <meta name="twitter:description" content="Discover the staffing, payroll, and housing services offered by Glodinas Flex Work B.V." />
        <meta name="twitter:image" content="https://glodinas-flex-site.vercel.app/images/services-hero.jpg" />
      </Head>

      {/* Hero Section */}
      <section
        className="relative h-[400px] flex items-center justify-center text-white text-center px-4"
        style={{
          backgroundImage: "url('/images/services-hero.jpg')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="bg-black/40 absolute inset-0 z-0" />
        <div className="relative z-10 max-w-3xl">
          <h1 className="text-4xl font-bold mb-2">Our Services</h1>
          <p className="text-lg">We connect talent with opportunity — reliably and efficiently.</p>
        </div>
      </section>

      {/* Breadcrumb */}
      <div className="max-w-6xl mx-auto px-4 pt-4">
        <Breadcrumb currentPage="Services" />
      </div>

      {/* Services Overview */}
      <section className="py-20 px-4 max-w-6xl mx-auto text-gray-800">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 text-center">
          {[
            {
              title: 'Temporary Staffing',
              desc: 'Fast placements for various industries across the Netherlands.',
              img: '/images/temp-staffing.jpg',
            },
            {
              title: 'Recruitment',
              desc: 'We match talent to permanent roles with precision and care.',
              img: '/images/recruitment.jpg',
            },
            {
              title: 'Payroll Services',
              desc: 'Let us handle contracts, salaries, taxes and compliance.',
              img: '/images/payroll.jpg',
            },
            {
              title: 'Housing Support',
              desc: 'We assist international workers with suitable accommodation.',
              img: '/images/housing.jpg',
            },
          ].map((item, idx) => (
            <div
              key={idx}
              className="p-4 border bg-white rounded shadow-sm hover:shadow-md transition-shadow duration-300"
            >
              <div className="relative h-56 mb-4 rounded overflow-hidden">
                <img src={item.img} alt={item.title} className="w-full h-full object-cover" />
              </div>
              <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
              <p>{item.desc}</p>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <a
            href="/register"
            className="bg-orange-500 text-white px-6 py-3 rounded font-semibold hover:bg-orange-600"
          >
            Register Now
          </a>
        </div>
      </section>
    </>
  );
}
