import Head from 'next/head';
import Link from 'next/link';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

export default function Home() {
  return (
    <>
      <Head>
        <title>Glodinas Flex Work B.V. - Staffing Solutions</title>
      </Head>
      <main className="text-gray-800 bg-white">

        {/* Hero Section */}
        <section className="relative bg-gray-100 text-center py-20 px-4">
          <div className="bg-gray-300 h-64 w-full rounded-md mb-8 flex items-center justify-center text-gray-600 text-sm">
            [ Hero background image placeholder ]
          </div>
          <h1 className="text-4xl font-bold mb-4">Connecting People with Opportunities</h1>
          <p className="text-lg mb-6 max-w-2xl mx-auto">
            Flexible staffing, multilingual support, and fast job placements across the Netherlands.
          </p>
          <div className="space-x-4">
            <Link href="/jobseekers">
              <a className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded font-semibold">I'm Looking for Work</a>
            </Link>
            <Link href="/employers">
              <a className="border border-orange-500 hover:bg-orange-100 text-orange-600 px-6 py-3 rounded font-semibold">I Need Workers</a>
            </Link>
          </div>
        </section>

        {/* About Section */}
        <section className="py-20 px-4 max-w-5xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Who We Are</h2>
          <p className="text-lg">
            Glodinas Flex Work B.V. is a dynamic employment agency based in the Netherlands.
            We specialize in connecting reliable, motivated workers with companies in need of temporary or permanent staffing.
            Our team speaks multiple languages and understands the importance of fast, honest, and clear communication.
          </p>
        </section>

       {/* Services Section */}
<section className="bg-gray-50 py-20 px-4">
  <div className="max-w-6xl mx-auto text-center">
    <h2 className="text-3xl font-bold mb-10">Our Services</h2>
    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
      {[
        {
          title: 'Temporary Staffing',
          desc: 'Fast placements for various industries.',
          img: '/images/temp-staffing.jpg',
        },
        {
          title: 'Recruitment',
          desc: 'We find the right person for the right role.',
          img: '/images/recruitment.jpg',
        },
        {
          title: 'Payroll Services',
          desc: 'We handle contracts, salaries, and compliance.',
          img: '/images/payroll.jpg',
        },
        {
          title: 'Housing Support',
          desc: 'Help with accommodation for international workers.',
          img: '/images/housing.jpg',
        },
      ].map((item, idx) => (
        <div key={idx} className="p-4 border bg-white rounded shadow-sm">
          <div className="relative h-40 mb-4 rounded overflow-hidden">
            <img src={item.img} alt={item.title} className="w-full h-full object-cover" />
          </div>
          <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
          <p>{item.desc}</p>
        </div>
      ))}
    </div>
  </div>
</section>


        {/* Industries Section */}
        <section className="py-20 px-4 max-w-5xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Industries We Serve</h2>
          <p className="mb-6">We support employers in diverse sectors across the Netherlands.</p>
          <div className="flex flex-wrap justify-center gap-4">
            {['Logistics', 'Hospitality', 'Cleaning', 'Food Production', 'Technical', 'Agriculture'].map((sector, idx) => (
              <span key={idx} className="bg-gray-200 px-4 py-2 rounded text-sm">{sector}</span>
            ))}
          </div>
        </section>

        {/* Why Choose Us */}
        <section className="bg-white py-20 px-4 max-w-6xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-10">Why Choose Glodinas?</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <div className="bg-gray-200 h-24 w-24 mx-auto rounded-full mb-4">[ icon ]</div>
              <h3 className="text-xl font-semibold mb-2">Multilingual Team</h3>
              <p>We speak Dutch, English, Polish, Romanian, Bulgarian and more.</p>
            </div>
            <div>
              <div className="bg-gray-200 h-24 w-24 mx-auto rounded-full mb-4">[ icon ]</div>
              <h3 className="text-xl font-semibold mb-2">Fast Placement</h3>
              <p>We connect people with jobs quickly and efficiently.</p>
            </div>
            <div>
              <div className="bg-gray-200 h-24 w-24 mx-auto rounded-full mb-4">[ icon ]</div>
              <h3 className="text-xl font-semibold mb-2">Reliable & Transparent</h3>
              <p>No surprises. Just honest communication and strong partnerships.</p>
            </div>
          </div>
        </section>

        {/* Contact CTA */}
        <section className="bg-orange-500 text-white py-16 text-center">
          <h2 className="text-3xl font-bold mb-4">Start Working With Us Today</h2>
          <p className="mb-6">Looking for a job or staff? Contact our team and let's get started.</p>
          <Link href="/contact">
            <a className="bg-white text-orange-600 px-8 py-3 font-semibold rounded hover:bg-gray-100">Contact Us</a>
          </Link>
        </section>

      </main>
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
