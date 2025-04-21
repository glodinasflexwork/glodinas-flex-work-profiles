import Head from 'next/head';

export default function FAQ() {
  return (
    <>
      <Head>
        <title>FAQ - Glodinas Flex Work B.V.</title>
        <meta name="description" content="Frequently asked questions about working with Glodinas Flex Work B.V. for both job seekers and employers." />
      </Head>

      <section className="py-20 px-4 max-w-4xl mx-auto text-gray-800">
        <h1 className="text-4xl font-bold text-center mb-12">Frequently Asked Questions</h1>

        <div className="space-y-10">
          <div>
            <h2 className="text-xl font-semibold mb-2">How do I apply for a job?</h2>
            <p>Simply go to the <a href="/register" className="text-orange-600 font-semibold hover:underline">Register</a> page, fill out the form, and our team will get in touch with you to discuss available opportunities.</p>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-2">Do you provide housing for workers?</h2>
            <p>Yes, we offer optional housing solutions for international workers to make your transition smooth and comfortable.</p>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-2">What industries do you hire for?</h2>
            <p>We work with companies in logistics, cleaning, food production, agriculture, hospitality, and technical/engineering sectors.</p>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-2">How often do I get paid?</h2>
            <p>We pay weekly, and you'll always be paid on time for the work you complete.</p>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-2">Can I speak to someone in my language?</h2>
            <p>Absolutely. Our team speaks Dutch, English, Polish, Romanian, and Bulgarian to assist you better.</p>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-2">How can employers request staff?</h2>
            <p>Employers can visit the <a href="/employers" className="text-orange-600 font-semibold hover:underline">Employers</a> page or <a href="/contact" className="text-orange-600 font-semibold hover:underline">Contact</a> us directly to request staffing services.</p>
          </div>
        </div>
      </section>
    </>
  );
}