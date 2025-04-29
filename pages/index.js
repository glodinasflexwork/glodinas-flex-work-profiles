import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

const industries = [
  'logistics',
  'hospitality',
  'cleaning',
  'food_production',
  'technical',
  'agriculture',
];

export default function Home() {
  const { t } = useTranslation('common');

  return (
    <>
      <Head>
        <title>Glodinas Flex Work B.V. - Staffing Solutions</title>
        <meta
          name="description"
          content="Looking for reliable staffing services in logistics, hospitality, cleaning, and more? Glodinas Flex Work B.V. connects skilled workers with top employers across the Netherlands."
        />

        {/* Canonical */}
        <link rel="canonical" href="https://glodinasflexwork.nl/" />

        {/* Open Graph */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://glodinasflexwork.nl/" />
        <meta
          property="og:title"
          content="Glodinas Flex Work B.V. - Staffing Solutions"
        />
        <meta
          property="og:description"
          content="Reliable employment solutions for businesses and workers in the Netherlands."
        />
        <meta
          property="og:image"
          content="https://glodinasflexwork.nl/images/og-image.jpg"
        />

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:url" content="https://glodinasflexwork.nl/" />
        <meta
          name="twitter:title"
          content="Glodinas Flex Work B.V. - Staffing Solutions"
        />
        <meta
          name="twitter:description"
          content="Reliable employment solutions for businesses and workers in the Netherlands."
        />
        <meta
          name="twitter:image"
          content="https://glodinasflexwork.nl/images/og-image.jpg"
        />

        {/* Organization JSON-LD */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "Glodinas Flex Work B.V.",
              url: "https://glodinasflexwork.nl/",
              logo: "https://glodinasflexwork.nl/images/logo.png",
              contactPoint: {
                "@type": "ContactPoint",
                telephone: "+31 6 4583 3789",
                contactType: "customer service",
                areaServed: "NL",
                availableLanguage: [
                  "English",
                  "Dutch",
                  "Polish",
                  "Romanian",
                  "Bulgarian"
                ]
              }
            })
          }}
        />
      </Head>

      {/* Hero Section */}
      <section
        className="relative h-[500px] flex items-center justify-center text-white text-center px-4"
        style={{
          backgroundImage: "url('/images/hero.jpg')",
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      >
        <div className="bg-black/40 absolute inset-0 z-0" />
        <div className="relative z-10 max-w-3xl">
          <h1 className="text-5xl font-bold mb-4">{t('title_home')}</h1>
          <p className="mb-6 text-lg">{t('hero_subheading')}</p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link href="/job-seekers">
              <a className="bg-orange-500 hover:bg-orange-600 text-white font-semibold px-6 py-3 rounded shadow">
                {t('cta_work')}
              </a>
            </Link>
            <Link href="/employers">
              <a className="bg-white text-orange-600 font-semibold px-6 py-3 rounded shadow border border-orange-500">
                {t('cta_workers')}
              </a>
            </Link>
          </div>
        </div>
      </section>

      {/* Certifications */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h2 className="text-2xl font-semibold mb-10">
            {t('certified_title')}
          </h2>
          <div className="flex justify-center flex-wrap gap-10 items-center">
            {[
              { img: '/images/certified/nbbu-logo.png', alt: 'Certified by NBBU' },
              { img: '/images/certified/sna-logo.png', alt: 'Certified by SNA' },
              { img: '/images/certified/snf-logo.png', alt: 'Certified by SNF' }
            ].map((cert, i) => (
              <Image
                key={i}
                src={cert.img}
                alt={cert.alt}
                width={150}
                height={100}
                className="h-24 md:h-28 grayscale hover:grayscale-0 transition-all duration-300"
              />
            ))}
          </div>
        </div>
      </section>

      {/* Social Proof */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-10">
            {t('trusted_by_title')}
          </h2>
          <div className="flex justify-center flex-wrap gap-10 items-center">
            {[
              { img: '/images/client_logos/philips.png', alt: 'Philips Logo' },
              { img: '/images/client_logos/ing.png', alt: 'ING Logo' },
              { img: '/images/client_logos/shell.png', alt: 'Shell Logo' },
              { img: '/images/client_logos/unilever.png', alt: 'Unilever Logo' }
            ].map((logo, i) => (
              <div
                key={i}
                className="p-4 bg-white rounded shadow hover:shadow-lg transition duration-300"
              >
                <Image
                  src={logo.img}
                  alt={logo.alt}
                  width={120}
                  height={80}
                  className="h-16 md:h-20 grayscale hover:grayscale-0 transition duration-300"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonial */}
      <section className="py-20 px-4 bg-white text-center">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-6">
            What Our Clients Say
          </h2>
          <blockquote className="italic text-lg mb-4">
            {t('testimonial')}
          </blockquote>
          <p className="text-sm text-gray-500">— Logistics Manager, Rotterdam</p>
        </div>
      </section>

      {/* Industries Section */}
      <section className="py-20 px-4 max-w-6xl mx-auto text-center">
        <h2 className="text-3xl font-bold mb-4">
          {t('industries_we_serve')}
        </h2>
        <p className="mb-10 text-gray-700">
          {t('industries_intro')}
        </p>

        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-8">
          {industries.map((key) => {
            const slug = key.replace(/_/g, '-');
            return (
              <div
                key={key}
                className="bg-white p-6 rounded-lg shadow transition-transform transform hover:scale-105 hover:shadow-lg duration-300 text-center"
              >
                <div className="relative h-40 mb-4 overflow-hidden rounded">
                  <Image
                    src={`/images/industries/${slug}-hero.jpg`}
                    alt={t(`industry.${key}.title`)}
                    layout="fill"
                    objectFit="cover"
                    priority={industries.indexOf(key) < 3}
                  />
                </div>
                <h3 className="text-xl font-bold mb-2">
                  {t(`industry.${key}.title`)}
                </h3>
                <p className="text-gray-600 mb-4 text-sm">
                  {t(`industry.${key}.description`)}
                </p>
                <Link href={`/industries/${slug}`}>
                  <a className="text-orange-500 hover:underline font-semibold">
                    {t(`industry.${key}.link`)}
                  </a>
                </Link>
              </div>
            );
          })}
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-orange-500 text-white py-20 text-center">
        <h2 className="text-3xl font-bold mb-4">
          {t('start_working_with_us')}
        </h2>
        <p className="mb-6">{t('cta_subheading')}</p>
        <Link href="/contact">
          <a className="bg-white text-orange-600 px-8 py-3 font-semibold rounded hover:bg-gray-100">
            {t('contact_us')}
          </a>
        </Link>
      </section>
    </>
  );
}

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common']))
    }
  };
}
