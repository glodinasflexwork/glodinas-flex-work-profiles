import Head from 'next/head';
import Link from 'next/link';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

export default function Home() {
  return (
    <>
      <Head>
        <title>Glodinas Flex Work B.V. - Staffing Solutions</title>
        <meta name="description" content="Connecting skilled workers with top employers across the Netherlands in logistics, hospitality, and more." />
      </Head>

      {/* Hero Section */}
      <section
        className="relative h-[500px] flex items-center justify-center text-white text-center px-4"
        style={{
          backgroundImage: "url('/images/hero.jpg')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="bg-black/40 absolute inset-0 z-0" />
        <div className="relative z-10 max-w-3xl">
          <h1 className="text-5xl font-bold mb-4">Your Trusted Employment Partner</h1>
          <p className="mb-6 text-lg">
            Connecting skilled workers with top employers in logistics, food production, hospitality, and more.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link href="/job-seekers">
              <a className="bg-orange-500 hover:bg-orange-600 text-white font-semibold px-6 py-3 rounded shadow">
                I'm Looking for Work
              </a>
            </Link>
            <Link href="/employers">
              <a className="bg-white text-orange-600 font-semibold px-6 py-3 rounded shadow border border-orange-500">
                I Need Workers
              </a>
            </Link>
          </div>
        </div>
      </section>

      {/* Social Proof Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Trusted by Companies Across the Netherlands</h2>
          <div className="flex justify-center flex-wrap gap-6 items-center">
            <img src="/images/client1.png" alt="Client 1" className="h-12" />
            <img src="/images/client2.png" alt="Client 2" className="h-12" />
            <img src="/images/client3.png" alt="Client 3" className="h-12" />
            <img src="/images/client4.png" alt="Client 4" className="h-12" />
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 px-4 bg-white text-center">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-6">What Our Clients Say</h2>
          <blockquote className="italic text-lg mb-4">"Glodinas helped us find the perfect team during peak season. Reliable, fast, and professional!"</blockquote>
          <p className="text-sm text-gray-500">— Logistics Manager, Rotterdam</p>
        </div>
      </section>

      {/* Industries Section */}
      <section className="py-20 px-4 max-w-6xl mx-auto text-center">
        <h2 className="text-3xl font-bold mb-4">Industries We Serve</h2>
        <p className="mb-10">From logistics to hospitality, we support businesses in diverse sectors.</p>
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
          {[
            { title: 'Logistics 🚚', img: '/images/industries/logistics.jpg' },
            { title: 'Hospitality 🍽️', img: '/images/industries/hospitality.jpg' },
            { title: 'Cleaning 🧽', img: '/images/industries/cleaning.jpg' },
            { title: 'Food Production 🥦', img: '/images/industries/food.jpg' },
            { title: 'Technical ⚙️', img: '/images/industries/technical.jpg' },
            { title: 'Agriculture 🌱', img: '/images/industries/agriculture.jpg' },
          ].map((item, idx) => (
            <div key={idx} className="bg-white p-4 border rounded shadow-sm">
              <div className="relative h-40 mb-3 overflow-hidden rounded">
                <img src={item.img} alt={item.title} className="w-full h-full object-cover" />
              </div>
              <h3 className="text-lg font-semibold">{item.title}</h3>
            </div>
          ))}
        </div>
      </section>
       
        {/* Trust Indicators Section */}
        <section className="py-16 bg-gray-100">
          <div className="max-w-6xl mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-6">We Are Applying For:</h2>
            <p className="mb-8 text-gray-700">Demonstrating our commitment to compliance, quality, and worker protection.</p>
            <div className="flex flex-wrap justify-center items-center gap-10">
              <img src="/images/logos/nbbu-logo.png" alt="NBBU Logo" className="h-16 w-auto object-contain" />
              <img src="/images/logos/sna-logo.png" alt="SNA Logo" className="h-16 w-auto object-contain" />
              <img src="/images/logos/snf-logo.png" alt="SNF Logo" className="h-16 w-auto object-contain" />
            </div>
          </div>
        </section>

      {/* Contact CTA */}
      <section className="bg-orange-500 text-white py-16 text-center">
        <h2 className="text-3xl font-bold mb-4">Start Working With Us Today</h2>
        <p className="mb-6">Looking for a job or staff? Contact our team and let's get started.</p>
        <Link href="/contact">
          <a className="bg-white text-orange-600 px-8 py-3 font-semibold rounded hover:bg-gray-100">
            Contact Us
          </a>
        </Link>
      </section>
    </>
  );
}

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common'])),
    },
  };
}
