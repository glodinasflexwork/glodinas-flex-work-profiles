import Head from 'next/head';

export default function About() {
  return (
    <>
      <Head>
        <title>About Us - Glodinas Flex Work B.V.</title>
      </Head>
      <section className="py-20 px-4 max-w-5xl mx-auto text-gray-800">
        <h1 className="text-4xl font-bold mb-6">About Glodinas Flex Work B.V.</h1>
        <p className="text-lg mb-4">
          Glodinas Flex Work B.V. is a trusted staffing agency operating throughout the Netherlands. Our goal is
          to connect motivated individuals with the right opportunities in various industries. With a multilingual
          team and a flexible approach, we support both workers and companies to succeed.
        </p>
        <p className="text-lg">
          We stand for clarity, speed, and honesty. Our network spans logistics, agriculture, food production,
          cleaning, hospitality, and technical sectors.
        </p>
      </section>
    </>
  );
}