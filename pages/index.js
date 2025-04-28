import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

export default function Home() {
  return (
    <>
      <Head>
        <title>Glodinas Flex Work B.V. - Staffing Solutions</title>
        <meta name="description" content="Looking for reliable staffing services in logistics, hospitality, cleaning, and more? Glodinas Flex Work B.V. connects skilled workers with top employers across the Netherlands." />

        {/* Canonical */}
        <link rel="canonical" href="https://glodinasflexwork.nl/" />

        {/* Open Graph */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://glodinasflexwork.nl/" />
        <meta property="og:title" content="Glodinas Flex Work B.V. - Staffing Solutions" />
        <meta property="og:description" content="Reliable employment solutions for businesses and workers in the Netherlands." />
        <meta property="og:image" content="https://glodinasflexwork.nl/images/og-image.jpg" />

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:url" content="https://glodinasflexwork.nl/" />
        <meta name="twitter:title" content="Glodinas Flex Work B.V. - Staffing Solutions" />
        <meta name="twitter:description" content="Reliable employment solutions for businesses and workers in the Netherlands." />
        <meta name="twitter:image" content="https://glodinasflexwork.nl/images/og-image.jpg" />

        {/* Organization JSON-LD Structured Data */}
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: `
        {
          "@context": "https://schema.org",
          "@type": "Organization",
          "name": "Glodinas Flex Work B.V.",
          "url": "https://glodinasflexwork.nl/",
          "logo": "https://glodinasflexwork.nl/images/logo.png",
          "contactPoint": {
            "@type": "ContactPoint",
            "telephone": "+31 6 4583 3789",
            "contactType": "customer service",
            "areaServed": "NL",
            "availableLanguage": ["English", "Dutch", "Polish", "Romanian", "Bulgarian"]
          }
        }
        `}} />
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
              <Image
                key={idx}
                src={cert.img}
                alt={cert.alt}
                width={150}
                height={100}
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
                <Image
                  src={logo.img}
                  alt={logo.alt}
                  width={120}
                  height={80}
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
        <p className="mb-10 text-gray-700">
          From logistics and hospitality to agriculture and technical services, Glodinas Flex Work B.V. connects skilled professionals with employers across diverse sectors in the Netherlands.
        </p>

        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-8">
          {[
            {
              title: 'Logistics',
              emoji: '🚚',
              img: '/images/industries/logistics-hero.jpg',
              description: 'Efficient staffing solutions for warehouses, transport, and distribution centers.',
              href: '/industries/logistics',
            },
            {
              title: 'Hospitality',
              emoji: '🍽️',
              img: '/images/industries/hospitality-hero.jpg',
              description: 'Professional staff for hotels, restaurants, and event venues to deliver excellent service.',
              href: '/industries/hospitality',
            },
            {
              title: 'Cleaning',
              emoji: '🧹',
              img: '/images/industries/cleaning-hero.jpg',
              description: 'Reliable cleaning teams for offices, hotels, healthcare, and educational facilities.',
              href: '/industries/cleaning',
            },
            {
              title: 'Food Production',
              emoji: '🥦',
              img: '/images/industries/food-production-hero.jpg',
              description: 'Workers specialized in food processing, packaging, and quality control environments.',
              href: '/industries/food-production',
            },
            {
              title: 'Technical',
              emoji: '⚙️',
              img: '/images/industries/technical-hero.jpg',
              description: 'Experienced technicians and engineers supporting manufacturing and construction industries.',
              href: '/industries/technical',
            },
            {
              title: 'Agriculture',
              emoji: '🌱',
              img: '/images/industries/agriculture-hero.jpg',
              description: 'Seasonal and year-round agricultural labor for farms, greenhouses, and horticulture.',
              href: '/industries/agriculture',
            },
          ].map((item, idx) => (
            <div
              key={idx}
              className="bg-white p-6 rounded-lg shadow transition-transform transform hover:scale-105 hover:shadow-lg duration-300 text-center"
            >
              <div className="relative h-40 mb-4 overflow-hidden rounded">
                <Image
                  src={item.img}
                  alt={item.title}
                  layout="fill"
                  objectFit="cover"
                  priority={idx < 3}
                />
              </div>
              <h3 className="text-xl font-bold mb-2">{item.emoji} {item.title}</h3>
              <p className="text-gray-600 mb-4 text-sm">{item.description}</p>
              <Link href={item.href}>
                <a className="text-orange-500 hover:underline font-semibold">
                  Learn More
                </a>
              </Link>
            </div>
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
