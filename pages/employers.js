import Head from 'next/head';

export default function Employers() {
  return (
    <>
      <Head>
        <title>Employers | Glodinas Flex Work B.V.</title>
      </Head>
      <main className="min-h-screen p-8 bg-white text-gray-800">
        <h1 className="text-4xl font-bold text-center mb-8">For Employers</h1>
        <p className="max-w-3xl mx-auto text-lg text-center mb-10">
          Need reliable staff fast? Glodinas Flex Work B.V. provides experienced, flexible workers for all sectors.
          Contact us to discuss how we can help support your workforce needs.
        </p>
        <div className="text-center">
          <a href="/contact">
            <button className="bg-orange-500 text-white px-6 py-3 rounded hover:bg-orange-600">
              Request Staff
            </button>
          </a>
        </div>
      </main>
    </>
  );
}
