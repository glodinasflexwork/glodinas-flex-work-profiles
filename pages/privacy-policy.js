import Head from 'next/head';

export default function PrivacyPolicy() {
  return (
    <>
      <Head>
        <title>Privacy Policy - Glodinas Flex Work B.V.</title>
      </Head>
      <section className="py-20 px-4 max-w-4xl mx-auto text-gray-800">
        <h1 className="text-4xl font-bold mb-6">Privacy Policy</h1>
        <p className="mb-4">
          At Glodinas Flex Work B.V., we value your privacy and are committed to protecting your personal data.
          This Privacy Policy outlines how we collect, use, and safeguard your information.
        </p>
        <h2 className="text-2xl font-semibold mt-6 mb-2">Information We Collect</h2>
        <p className="mb-4">
          We may collect personal information such as your name, email address, phone number, and job preferences
          when you contact us or fill out forms on our website.
        </p>
        <h2 className="text-2xl font-semibold mt-6 mb-2">How We Use Your Data</h2>
        <p className="mb-4">
          Your data is used only for communication, matching job seekers with employers, and improving our services.
          We never sell or share your information with third parties without your consent.
        </p>
        <h2 className="text-2xl font-semibold mt-6 mb-2">Your Rights</h2>
        <p className="mb-4">
          You have the right to access, update, or request the deletion of your personal data at any time.
          Please contact us via email to exercise your rights.
        </p>
        <p className="mt-8">Last updated: April 21, 2025</p>
      </section>
    </>
  );
}