import Head from 'next/head';

export default function JobSeekers() {
  return (
    <>
      <Head>
        <title>Job Seekers | Glodinas Flex Work B.V.</title>
      </Head>
      <main className="min-h-screen p-8 bg-white text-gray-800">
        <h1 className="text-4xl font-bold text-center mb-8">For Job Seekers</h1>
        <p className="max-w-3xl mx-auto text-lg text-center mb-10">
          Looking for work? Join Glodinas Flex Work B.V. and gain access to a wide network of temporary job opportunities.
          Whether you're experienced or just starting out, we’ll help match you with the right employer.
        </p>
        <div className="text-center">
          <a href="/contact">
            <button className="bg-orange-500 text-white px-6 py-3 rounded hover:bg-orange-600">
              Apply Now
            </button>
          </a>
        </div>
      </main>
    </>
  );
}
