import Head from 'next/head';
import Link from 'next/link';
import Breadcrumb from '../components/Breadcrumb';
import { useTranslation } from 'react-i18next';
import { serverSideTranslations } from '../lib/i18n';

export default function About() {
  const { t } = useTranslation('common');

  // Safely get differentiators with fallback to empty array
  const getDifferentiators = () => {
    try {
      const differentiators = t('about_differentiators', { returnObjects: true });
      return Array.isArray(differentiators) ? differentiators : [];
    } catch (error) {
      return [];
    }
  };

  return (
    <>
      <Head>
        <title>{t('nav.About Us', 'About Us')} - Glodinas Flex Work B.V.</title>
        <meta name="description" content={t('about_meta_description', 'Certified employment agency providing professional staffing solutions and quality worker housing across the Netherlands.')} />
        <meta name="keywords" content={t('about_meta_keywords', 'employment agency, staffing, certified agency, worker housing, SNA certification')} />
        <meta name="author" content="Glodinas Flex Work B.V." />

        {/* Open Graph */}
        <meta property="og:title" content={`${t('nav.About Us', 'About Us')} - Glodinas Flex Work B.V.`} />
        <meta property="og:description" content={t('about_meta_description', 'Certified employment agency providing professional staffing solutions and quality worker housing across the Netherlands.')} />
        <meta property="og:image" content="https://glodinasflexwork.nl/images/about-hero.jpg" />
        <meta property="og:url" content="https://glodinasflexwork.nl/about" />
        <meta property="og:type" content="website" />

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={`${t('nav.About Us', 'About Us')} - Glodinas Flex Work B.V.`} />
        <meta name="twitter:description" content={t('about_meta_description', 'Certified employment agency providing professional staffing solutions and quality worker housing across the Netherlands.')} />
        <meta name="twitter:image" content="https://glodinasflexwork.nl/images/about-hero.jpg" />
      </Head>

      {/* Hero Section */}
      <section
        className="relative h-[400px] flex items-center justify-center text-white text-center px-4"
        style={{
          backgroundImage: "url('/images/about-hero.jpg')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="bg-black/40 absolute inset-0 z-0" />
        <div className="relative z-10 max-w-3xl">
          <h1 className="text-4xl font-bold mb-2">{t('nav.About Us', 'About Us')}</h1>
          <p className="text-lg">{t('about_hero_subheading', 'Your Trusted Partner in Professional Staffing Solutions')}</p>
        </div>
      </section>

      {/* Breadcrumb */}
      <div className="max-w-6xl mx-auto px-4 pt-4">
        <Breadcrumb currentPage={t('nav.About Us', 'About Us')} />
      </div>

      {/* Company Overview Section */}
      <section className="py-12 px-4 max-w-6xl mx-auto text-gray-800">
        <h2 className="text-3xl font-bold mb-6 text-center">{t('about_our_story_title', 'Our Story')}</h2>
        <p className="text-lg mb-8 text-center max-w-3xl mx-auto">
          {t('about_our_story_text', 'Glodinas Flex Work B.V. is a leading employment agency based in the Netherlands, specializing in connecting qualified workers with employers across multiple industries. Founded with a vision to transform the staffing industry through transparency, compliance, and worker welfare, we\'ve grown to become a trusted partner for businesses and job seekers throughout the country.')}
        </p>

        <div className="grid md:grid-cols-2 gap-12 mt-12">
          <div>
            <h3 className="text-2xl font-semibold mb-4">{t('about_our_mission_title', 'Our Mission')}</h3>
            <p className="mb-6">{t('about_our_mission_text', 'At Glodinas Flex Work, our mission is to create meaningful connections between employers and workers while maintaining the highest standards of legal compliance and worker support. We strive to provide employers with qualified staff, connect workers with matching opportunities, ensure regulatory compliance, support workers with housing and integration, and maintain ethical business practices.')}</p>

            <h3 className="text-2xl font-semibold mb-4">{t('about_our_values_title', 'Our Values')}</h3>
            <ul className="list-disc pl-5 space-y-2">
              <li>{t('about_value_excellence', 'Excellence: We are committed to delivering exceptional service')}</li>
              <li>{t('about_value_integrity', 'Integrity: We operate with transparency and honesty')}</li>
              <li>{t('about_value_compliance', 'Compliance: We adhere strictly to all legal requirements')}</li>
              <li>{t('about_value_respect', 'Respect: We value diversity and treat all with dignity')}</li>
              <li>{t('about_value_support', 'Support: We provide comprehensive assistance beyond job placement')}</li>
            </ul>
          </div>
          <div className="bg-gray-50 p-8 rounded-lg shadow-sm">
            <img src="/images/about-team.jpg" alt="Glodinas Flex Work Team" className="rounded-lg mb-6 w-full h-auto" />
            <p className="italic text-gray-600">
              {t('about_team_caption', 'Our multilingual team provides comprehensive staffing solutions in logistics, manufacturing, healthcare, hospitality, and retail sectors, with a focus on both temporary and permanent placements.')}
            </p>
          </div>
        </div>
      </section>

      {/* Certifications & Compliance Section */}
      <section className="py-12 bg-gray-50 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-center">{t('about_certifications_title', 'Fully Certified & Compliant')}</h2>
          
          <p className="text-lg mb-8 text-center max-w-3xl mx-auto">
            {t('about_certifications_intro', 'Glodinas Flex Work B.V. holds all required certifications to operate as an employment agency in the Netherlands, ensuring our operations meet the highest standards of legal compliance and ethical practice.')}
          </p>
          
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            <div className="bg-white p-6 rounded-lg shadow-sm text-center">
              <div className="text-5xl text-orange-500 mb-4">🏆</div>
              <h3 className="text-xl font-bold mb-3">{t('about_cert_sna', 'SNA Certification')}</h3>
              <p className="text-gray-600">{t('about_cert_sna_desc', 'Demonstrating our compliance with Dutch tax and labor laws')}</p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm text-center">
              <div className="text-5xl text-orange-500 mb-4">📜</div>
              <h3 className="text-xl font-bold mb-3">{t('about_cert_abu', 'ABU Membership')}</h3>
              <p className="text-gray-600">{t('about_cert_abu_desc', 'Adhering to the collective labor agreement for temporary workers')}</p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm text-center">
              <div className="text-5xl text-orange-500 mb-4">✅</div>
              <h3 className="text-xl font-bold mb-3">{t('about_cert_agency', 'Agency Certification')}</h3>
              <p className="text-gray-600">{t('about_cert_agency_desc', 'In compliance with Dutch legislation requiring employment agencies to be certified')}</p>
            </div>
          </div>
          
          <div className="bg-white p-8 rounded-lg shadow-sm">
            <h3 className="text-2xl font-semibold mb-4">{t('about_legal_compliance_title', 'Legal Compliance')}</h3>
            <p className="mb-4">{t('about_legal_compliance_text', 'We strictly adhere to all relevant legislation, including the Dutch Working Conditions Act (Arbowet), Dutch Foreign Nationals Employment Act (Wav), Collective Labor Agreement for Temporary Agency Workers, GDPR and privacy regulations, anti-discrimination laws, and EU Posted Workers Directive.')}</p>
            <p>{t('about_legal_compliance_monitoring', 'Our legal compliance team continuously monitors regulatory changes to ensure our practices remain current and compliant with all applicable laws.')}</p>
          </div>
        </div>
      </section>

      {/* Worker Housing Section */}
      <section className="py-12 px-4 max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold mb-8 text-center">{t('about_housing_title', 'Quality Housing Solutions')}</h2>
        
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <p className="mb-6">
              {t('about_housing_intro', 'As part of our commitment to worker welfare, Glodinas Flex Work provides high-quality housing options for our workers, particularly those relocating from other countries.')}
            </p>
            
            <div className="bg-orange-50 border-l-4 border-orange-500 p-4 mb-6">
              <h3 className="font-bold text-xl mb-2">{t('about_housing_features_title', 'Our Housing Features')}</h3>
              <ul className="list-disc pl-5 space-y-2">
                <li>{t('about_housing_certified', 'Certified Accommodations: Meeting or exceeding SNF standards')}</li>
                <li>{t('about_housing_affordable', 'Affordable Options: Fair pricing with transparent agreements')}</li>
                <li>{t('about_housing_convenient', 'Convenient Locations: Near work sites or with good transportation')}</li>
                <li>{t('about_housing_furnished', 'Fully Furnished: Equipped with essential furniture and appliances')}</li>
                <li>{t('about_housing_utilities', 'Utilities Included: Water, electricity, heating, and internet')}</li>
                <li>{t('about_housing_maintenance', 'Regular Maintenance: Ongoing upkeep and prompt repairs')}</li>
              </ul>
            </div>
            
            <p>
              {t('about_housing_compliance', 'All housing arrangements comply with the ABU Fair Employment Code for Labor Migrants and relevant Dutch housing regulations. While workers are never obligated to use our housing services, many choose this option for its convenience, quality, and affordability.')}
            </p>
          </div>
          <div>
            <img src="/images/worker-housing.jpg" alt="Worker Housing" className="rounded-lg shadow-md w-full h-auto" />
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-12 bg-gray-50 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-center">{t('about_testimonials_title', 'What Our Clients & Workers Say')}</h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="text-4xl text-orange-300 mb-4">"</div>
              <p className="text-lg italic mb-6">
                {t('about_testimonial_client', 'Glodinas Flex Work has consistently provided us with qualified staff who arrive prepared and certified. Their commitment to compliance gives us peace of mind, knowing all legal requirements are met.')}
              </p>
              <p className="font-semibold">{t('about_testimonial_client_name', '— Operations Director, Logistics Company')}</p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="text-4xl text-orange-300 mb-4">"</div>
              <p className="text-lg italic mb-6">
                {t('about_testimonial_worker', 'When I relocated to the Netherlands, Glodinas Flex Work not only found me a great job but also provided comfortable, affordable housing near my workplace. Their support made my transition much easier.')}
              </p>
              <p className="font-semibold">{t('about_testimonial_worker_name', '— Marta K., Manufacturing Worker')}</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 px-4 max-w-6xl mx-auto text-center">
        <h2 className="text-3xl font-bold mb-6">{t('about_cta_heading', 'Ready to Work With Us?')}</h2>
        <p className="text-lg mb-8 max-w-3xl mx-auto">
          {t('about_cta_subheading', 'Whether you\'re an employer seeking qualified staff or a job seeker looking for your next opportunity, Glodinas Flex Work is here to help.')}
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Link href="/employers">
            <a className="bg-orange-600 hover:bg-orange-700 text-white font-semibold px-6 py-3 rounded-lg shadow">
              {t('about_cta_employers', 'Find Qualified Staff Today')}
            </a>
          </Link>
          <Link href="/job-seekers">
            <a className="bg-white text-orange-600 border border-orange-500 hover:bg-orange-50 font-semibold px-6 py-3 rounded-lg shadow">
              {t('about_cta_jobseekers', 'Discover Your Next Opportunity')}
            </a>
          </Link>
        </div>
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
