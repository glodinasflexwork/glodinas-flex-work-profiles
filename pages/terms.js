import Head from 'next/head';

export default function TermsConditions() {
  return (
    <>
      <Head>
        <title>Terms & Conditions - Glodinas Flex Work B.V.</title>
      </Head>
      <section className="py-20 px-4 max-w-4xl mx-auto text-gray-800">
        <h1 className="text-4xl font-bold mb-6">Terms & Conditions</h1>
        <p className="mb-4">
          These Terms & Conditions govern your use of the Glodinas Flex Work B.V. website and services.
          By accessing our website, you agree to be bound by these terms.
        </p>
        <h2 className="text-2xl font-semibold mt-6 mb-2">Use of the Website</h2>
        <p className="mb-4">
          You agree to use this website lawfully and refrain from any activity that may harm or disrupt the
          website or its services.
        </p>
        <h2 className="text-2xl font-semibold mt-6 mb-2">Service Availability</h2>
        <p className="mb-4">
          While we aim to keep the site up-to-date and operational, we do not guarantee uninterrupted access.
          We may update or remove content without prior notice.
        </p>
        <h2 className="text-2xl font-semibold mt-6 mb-2">Liability</h2>
        <p className="mb-4">
          Glodinas Flex Work B.V. is not liable for any indirect or consequential losses arising from the use
          of our services or website.
        </p>
        <p className="mt-8">Last updated: April 21, 2025</p>
      </section>
    </>
  );
}