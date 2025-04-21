import Head from 'next/head';

export default function About() {
  return (
    <>
      <Head>
        <title>About Us - Glodinas Flex Work B.V.</title>
        <meta name="description" content="Learn more about Glodinas Flex Work B.V. and our mission to connect workers with employers across the Netherlands." />
      </Head>
      <section className="py-20 px-4 max-w-6xl mx-auto text-gray-800">
        <h1 className="text-4xl font-bold mb-6 text-center">About Glodinas Flex Work B.V.</h1>
        <p className="text-lg mb-6 text-center max-w-3xl mx-auto">
          Glodinas Flex Work B.V. is a dedicated Dutch employment agency that builds bridges between job seekers and employers in various industries such as logistics, agriculture, food production, cleaning, and hospitality.
        </p>

        <div className="grid md:grid-cols-2 gap-8 mt-10">
          <div>
            <h2 className="text-2xl font-semibold mb-3">Our Mission</h2>
            <p className="mb-4">
              To provide fast, reliable, and multilingual staffing services that support both individuals and businesses. We aim to simplify the hiring process and ensure long-term partnerships through transparency and professionalism.
            </p>
            <h2 className="text-2xl font-semibold mb-3">Our Vision</h2>
            <p className="mb-4">
              We envision a future where everyone, regardless of their background or language, can find meaningful work and feel respected and supported in their journey.
            </p>
          </div>
          <div>
            <h2 className="text-2xl font-semibold mb-3">What Makes Us Different?</h2>
            <ul className="list-disc pl-5 space-y-2">
              <li>Multilingual support in Dutch, English, Polish, Romanian, and Bulgarian</li>
              <li>Dedicated housing and payroll assistance for international workers</li>
              <li>Fast response time and clear communication</li>
              <li>Extensive network of employers in multiple sectors</li>
              <li>Commitment to fairness, compliance, and worker wellbeing</li>
            </ul>
          </div>
        </div>

        <div className="mt-16 text-center">
          <h2 className="text-2xl font-bold mb-4">Want to Work With Us?</h2>
          <p className="mb-6">
            Whether you're a company in need of flexible staffing or a motivated individual ready to work — we're here to help.
          </p>
          <a href="/contact" className="inline-block bg-orange-500 hover:bg-orange-600 text-white font-semibold px-6 py-3 rounded">
            Contact Us
          </a>
        </div>
      </section>
    </>
  );
}