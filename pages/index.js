import Head from 'next/head';
import Link from 'next/link';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

export default function Home() {
  return (
    <>
      <Head>
        <title>Glodinas Flex Work B.V. - Staffing Solutions</title>
        <meta
          name="description"
          content="Looking for reliable staffing services in logistics, hospitality, cleaning, and more? Glodinas Flex Work B.V. connects skilled workers with top employers across the Netherlands."
        />
        <link rel="canonical" href="https://glodinasflexwork.nl/" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="keywords" content="staffing Netherlands, temporary work, job agency, Glodinas Flex Work, employment agency Netherlands, logistics jobs, hospitality staffing" />
        <meta name="author" content="Glodinas Flex Work B.V." />
        <meta property="og:title" content="Glodinas Flex Work B.V." />
        <meta property="og:description" content="Reliable employment solutions for businesses and workers in the Netherlands." />
        <meta property="og:image" content="https://glodinas-flex-site.vercel.app/images/hero.jpg" />
        <meta property="og:url" content="https://glodinas-flex-site.vercel.app/" />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Glodinas Flex Work B.V." />
        <meta name="twitter:description" content="Employment services for job seekers and companies across the Netherlands." />
        <meta name="twitter:image" content="https://glodinas-flex-site.vercel.app/images/hero.jpg" />
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

      {/* Trust Indicators */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h2 className="text-2xl font-semibold mb-10">We Are Certified & Compliant</h2>
          <div className="flex justify-center flex-wrap gap-10 items-center">
            {[
              { img: '/images/certified/nbbu-logo.png', alt: 'Certified by NBBU' },
              { img: '/images/certified/sna-logo.png', alt: 'Certified by SNA' },
              { img: '/images/certified/snf-logo.png', alt: 'Certified by SNF' },
            ].map((cert, idx) => (
              <img
                key={idx}
                src={cert.img}
                alt={cert.alt}
                className="h-24 md:h-28 grayscale hover:grayscale-0 transition-all duration-300 ease-in-out"
              />
            ))}
          </div>
        </div>
      </section>

      {/* Social Proof */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-10">Trusted by Companies Across the Netherlands</h2>
          <div className="flex justify-center flex-wrap gap-10 items-center">
            {[
              { img: '/images/client_logos/philips.png', alt: 'Philips Logo' },
              { img: '/images/client_logos/ing.png', alt: 'ING Logo' },
              { img: '/images/client_logos/shell.png', alt: 'Shell Logo' },
              { img: '/images/client_logos/unilever.png', alt: 'Unilever Logo' },
            ].map((logo, idx) => (
              <div key={idx} className="p-4 bg-white rounded shadow hover:shadow-lg transition duration-300">
                <img
                  src={logo.img}
                  alt={logo.alt}
                  className="h-16 md:h-20 grayscale hover:grayscale-0 transition duration-300 ease-in-out"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 px-4 bg-white text-center">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-6">What Our Clients Say</h2>
          <blockquote className="italic text-lg mb-4">
            "Glodinas helped us find the perfect team during peak season. Reliable, fast, and professional!"
          </blockquote>
          <p className="text-sm text-gray-500">— Logistics Manager, Rotterdam</p>
        </div>
      </section>

      {/* Industries Section */}
      <section className="py-20 px-4 max-w-6xl mx-auto text-center">
        <h2 className="text-3xl font-bold mb-4">Industries We Serve</h2>
        <p className="mb-10">From logistics to hospitality, we support businesses in diverse sectors.</p>

        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
          {[
            { title: 'Logistics 🚚', img: '/images/industries/logistics.jpg', href: '#' },
            { title: 'Hospitality 🍽️', img: '/images/industries/hospitality.jpg', href: '#' },
            { title: 'Cleaning 🩽', img: '/images/industries/cleaning.jpg', href: '#' },
            { title: 'Food Production 🥦', img: '/images/industries/food.jpg', href: '#' },
            { title: 'Technical ⚙️', img: '/images/industries/technical.jpg', href: '#' },
            { title: 'Agriculture 🌱', img: '/images/industries/agriculture.jpg', href: '/industries/agriculture' },
          ].map((item, idx) => (
            <Link key={idx} href={item.href}>
              <a className="block bg-white p-4 border rounded shadow-sm hover:shadow-md transition duration-300">
                <div className="relative h-40 mb-3 overflow-hidden rounded">
                  <img src={item.img} alt={item.title} className="w-full h-full object-cover" />
                </div>
                <h3 className="text-lg font-semibold">{item.title}</h3>
              </a>
            </Link>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-orange-500 text-white py-20 text-center">
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
