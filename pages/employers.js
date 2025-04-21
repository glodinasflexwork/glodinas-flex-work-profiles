import Head from 'next/head';

export default function Employers() {
  return (
    <>
      <Head>
        <title>Employers - Glodinas Flex Work B.V.</title>
        <meta name="description" content="Partner with Glodinas Flex Work B.V. for reliable and efficient staffing solutions across various industries in the Netherlands." />
      </Head>
      <section
        className="relative h-[400px] flex items-center justify-center text-white text-center px-4"
        style={{
          backgroundImage: "url('/images/hero-employers.jpg')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="bg-black/50 absolute inset-0 z-0" />
        <div className="relative z-10">
          <h1 className="text-4xl font-bold mb-2">For Employers</h1>
          <p className="text-lg">We connect talent with opportunity — reliably and efficiently.</p>
        </div>
      </section>

      <section className="py-20 px-4 max-w-6xl mx-auto text-gray-800">
        <h2 className="text-3xl font-bold mb-6 text-center">Why Partner with Glodinas Flex Work?</h2>
        <div className="grid md:grid-cols-2 gap-10">
          <ul className="space-y-4 list-disc pl-6">
            <li>Access to a diverse pool of qualified and motivated workers</li>
            <li>Multilingual support for smooth communication</li>
            <li>Fast placements for temporary and long-term positions</li>
            <li>Full support with contracts, payroll, and compliance</li>
            <li>Tailored staffing based on your sector’s needs</li>
          </ul>
          <div>
            <p className="mb-4">
              Our team specializes in helping businesses in logistics, agriculture, hospitality, cleaning, and other sectors find the right people at the right time.
            </p>
            <p>
              We take care of the paperwork and coordination, allowing you to focus on running your business.
            </p>
          </div>
        </div>
      </section>

      <section className="text-center py-16 bg-orange-50">
        <h2 className="text-2xl font-bold mb-4">Ready to Hire?</h2>
        <p className="mb-6">Contact us today and we’ll help you build the perfect team.</p>
        <a href="/contact" className="inline-block bg-orange-500 hover:bg-orange-600 text-white font-semibold px-6 py-3 rounded">
          Contact Us
        </a>
      </section>
    </>
  );
}
