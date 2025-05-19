import { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useNotification } from '../components/Notification';

const industries = [
  'logistics',
  'manufacturing',
  'healthcare',
  'hospitality',
  'retail',
  'construction'
];

export default function Home() {
  const { t } = useTranslation('common');
  const { addNotification } = useNotification();
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [jobAlertShown, setJobAlertShown] = useState(false);

  // Testimonials data
  const testimonials = [
    {
      quote: t('testimonial'),
      author: 'Logistics Manager, Rotterdam'
    },
    {
      quote: 'Glodinas Flex Work found us qualified staff within 48 hours when we urgently needed to scale our operations. Their service was exceptional.',
      author: 'Operations Director, Amsterdam'
    },
    {
      quote: 'As a job seeker, I was impressed by how quickly they matched me with opportunities that fit my skills and preferences. I found a great position within a week.',
      author: 'Warehouse Specialist, Utrecht'
    }
  ];

  // Auto-rotate testimonials
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 8000);
    return () => clearInterval(interval);
  }, [testimonials.length]);

  // Simulate job alert notification
  useEffect(() => {
    const timer = setTimeout(() => {
      if (!jobAlertShown) {
        addNotification(
          'New job opportunities in your area match your profile!',
          'info',
          true,
          10000
        );
        setJobAlertShown(true);
      }
    }, 15000);
    
    return () => clearTimeout(timer);
  }, [addNotification, jobAlertShown]);

  return (
    <>
      <Head>
        <title>{t('site_title')}</title>
        <meta name="description" content={t('site_description')} />
      </Head>

      {/* Hero Section - Mobile First Design */}
      <section className="relative pt-24 pb-20 md:pt-32 md:pb-24 bg-gradient-to-r from-orange-500 to-orange-600 text-white overflow-hidden">
        <div className="absolute inset-0 bg-black opacity-20"></div>
        <div className="container relative z-10">
          <div className="flex flex-col md:flex-row items-center">
            <div className="w-full md:w-1/2 text-center md:text-left mb-10 md:mb-0">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 text-shadow-lg">
                {t('hero_title')}
              </h1>
              <p className="text-lg md:text-xl mb-8 max-w-lg mx-auto md:mx-0 text-shadow">
                {t('hero_subtitle')}
              </p>
              <div className="flex flex-col sm:flex-row justify-center md:justify-start space-y-4 sm:space-y-0 sm:space-x-4">
                <Link href="/job-seekers">
                  <a className="btn btn-secondary">
                    {t('find_job')}
                  </a>
                </Link>
                <Link href="/employers">
                  <a className="btn bg-white text-orange-600 hover:bg-gray-100">
                    {t('hire_talent')}
                  </a>
                </Link>
              </div>
            </div>
            <div className="w-full md:w-1/2 relative">
              <div className="relative h-64 sm:h-80 md:h-96 rounded-lg overflow-hidden shadow-xl transform md:translate-x-8">
                <Image
                  src="/images/hero-image.jpg"
                  alt="Glodinas Flex Work"
                  layout="fill"
                  objectFit="cover"
                  priority
                />
              </div>
              <div className="absolute -bottom-4 -left-4 bg-white p-4 rounded-lg shadow-lg hidden md:block">
                <div className="flex items-center">
                  <div className="bg-green-500 h-3 w-3 rounded-full mr-2"></div>
                  <p className="text-gray-800 font-medium text-sm">
                    {t('active_jobs', { count: '250+' })}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Mobile job count indicator */}
        <div className="bg-white p-3 rounded-lg shadow-lg absolute bottom-4 left-1/2 transform -translate-x-1/2 md:hidden">
          <div className="flex items-center">
            <div className="bg-green-500 h-3 w-3 rounded-full mr-2"></div>
            <p className="text-gray-800 font-medium text-sm">
              {t('active_jobs', { count: '250+' })}
            </p>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              {t('our_services')}
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              {t('services_subtitle')}
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Service 1 */}
            <div className="card card-hover p-6">
              <div className="text-orange-500 mb-4">
                <svg className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2">
                {t('service_temp_title')}
              </h3>
              <p className="text-gray-600 mb-4">
                {t('service_temp_desc')}
              </p>
              <Link href="/services#temporary">
                <a className="text-orange-500 font-medium hover:text-orange-600 inline-flex items-center">
                  {t('learn_more')}
                  <svg className="ml-1 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </a>
              </Link>
            </div>
            
            {/* Service 2 */}
            <div className="card card-hover p-6">
              <div className="text-orange-500 mb-4">
                <svg className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2">
                {t('service_perm_title')}
              </h3>
              <p className="text-gray-600 mb-4">
                {t('service_perm_desc')}
              </p>
              <Link href="/services#permanent">
                <a className="text-orange-500 font-medium hover:text-orange-600 inline-flex items-center">
                  {t('learn_more')}
                  <svg className="ml-1 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </a>
              </Link>
            </div>
            
            {/* Service 3 */}
            <div className="card card-hover p-6">
              <div className="text-orange-500 mb-4">
                <svg className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2">
                {t('service_payroll_title')}
              </h3>
              <p className="text-gray-600 mb-4">
                {t('service_payroll_desc')}
              </p>
              <Link href="/services#payroll">
                <a className="text-orange-500 font-medium hover:text-orange-600 inline-flex items-center">
                  {t('learn_more')}
                  <svg className="ml-1 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </a>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              {t('how_it_works')}
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              {t('how_it_works_subtitle')}
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Step 1 */}
            <div className="text-center">
              <div className="relative inline-flex items-center justify-center w-16 h-16 rounded-full bg-orange-100 text-orange-500 mb-4 mx-auto">
                <span className="text-2xl font-bold">1</span>
                <div className="absolute -right-8 top-1/2 transform -translate-y-1/2 h-0.5 w-8 bg-orange-200 hidden md:block"></div>
              </div>
              <h3 className="text-xl font-bold mb-2">
                {t('step_1_title')}
              </h3>
              <p className="text-gray-600">
                {t('step_1_desc')}
              </p>
            </div>
            
            {/* Step 2 */}
            <div className="text-center">
              <div className="relative inline-flex items-center justify-center w-16 h-16 rounded-full bg-orange-100 text-orange-500 mb-4 mx-auto">
                <span className="text-2xl font-bold">2</span>
                <div className="absolute -right-8 top-1/2 transform -translate-y-1/2 h-0.5 w-8 bg-orange-200 hidden md:block"></div>
              </div>
              <h3 className="text-xl font-bold mb-2">
                {t('step_2_title')}
              </h3>
              <p className="text-gray-600">
                {t('step_2_desc')}
              </p>
            </div>
            
            {/* Step 3 */}
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-orange-100 text-orange-500 mb-4 mx-auto">
                <span className="text-2xl font-bold">3</span>
              </div>
              <h3 className="text-xl font-bold mb-2">
                {t('step_3_title')}
              </h3>
              <p className="text-gray-600">
                {t('step_3_desc')}
              </p>
            </div>
          </div>
          
          <div className="text-center mt-12">
            <Link href="/register">
              <a className="btn btn-primary">
                {t('get_started')}
              </a>
            </Link>
          </div>
        </div>
      </section>

      {/* For Job Seekers & Employers */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* For Job Seekers */}
            <div className="bg-orange-50 rounded-lg p-8 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-24 h-24 bg-orange-100 rounded-bl-full"></div>
              <h3 className="text-2xl font-bold mb-4 relative z-10">
                {t('for_job_seekers')}
              </h3>
              <ul className="space-y-3 mb-6 relative z-10">
                <li className="flex items-start">
                  <svg className="h-5 w-5 text-orange-500 mt-0.5 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>{t('job_seeker_benefit_1')}</span>
                </li>
                <li className="flex items-start">
                  <svg className="h-5 w-5 text-orange-500 mt-0.5 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>{t('job_seeker_benefit_2')}</span>
                </li>
                <li className="flex items-start">
                  <svg className="h-5 w-5 text-orange-500 mt-0.5 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>{t('job_seeker_benefit_3')}</span>
                </li>
              </ul>
              <Link href="/job-seekers">
                <a className="btn btn-primary">
                  {t('cta_workers')}
                </a>
              </Link>
            </div>
            
            {/* For Employers */}
            <div className="bg-blue-50 rounded-lg p-8 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-24 h-24 bg-blue-100 rounded-bl-full"></div>
              <h3 className="text-2xl font-bold mb-4 relative z-10">
                {t('for_employers')}
              </h3>
              <ul className="space-y-3 mb-6 relative z-10">
                <li className="flex items-start">
                  <svg className="h-5 w-5 text-blue-500 mt-0.5 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>{t('employer_benefit_1')}</span>
                </li>
                <li className="flex items-start">
                  <svg className="h-5 w-5 text-blue-500 mt-0.5 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>{t('employer_benefit_2')}</span>
                </li>
                <li className="flex items-start">
                  <svg className="h-5 w-5 text-blue-500 mt-0.5 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>{t('employer_benefit_3')}</span>
                </li>
              </ul>
              <Link href="/employers">
                <a className="btn bg-blue-500 text-white hover:bg-blue-600 focus:ring-blue-500">
                  {t('cta_employers')}
                </a>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Certifications */}
      <section className="py-12 md:py-16 bg-white border-t border-gray-100">
        <div className="container text-center">
          <h2 className="text-2xl font-semibold mb-10">
            {t('certified_title')}
          </h2>
          <div className="flex flex-wrap justify-center gap-8 md:gap-12 items-center">
            {[
              { img: '/images/certified/nbbu-logo.png', alt: 'Certified by NBBU' },
              { img: '/images/certified/sna-logo.png', alt: 'Certified by SNA' },
              { img: '/images/certified/snf-logo.png', alt: 'Certified by SNF' }
            ].map((cert, i) => (
              <div key={i} className="transform transition-transform hover:scale-105">
                <Image
                  src={cert.img}
                  alt={cert.alt}
                  width={150}
                  height={100}
                  className="h-20 md:h-24 grayscale hover:grayscale-0 transition-all duration-300"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Social Proof */}
      <section className="py-16 md:py-20 bg-gray-50">
        <div className="container text-center">
          <h2 className="text-3xl font-bold mb-10">
            {t('trusted_by_title')}
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 items-center">
            {[
              { img: '/images/client_logos/philips.png', alt: 'Philips Logo' },
              { img: '/images/client_logos/ing.png', alt: 'ING Logo' },
              { img: '/images/client_logos/shell.png', alt: 'Shell Logo' },
              { img: '/images/client_logos/unilever.png', alt: 'Unilever Logo' }
            ].map((logo, i) => (
              <div
                key={i}
                className="p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition duration-300 flex items-center justify-center h-24"
              >
                <Image
                  src={logo.img}
                  alt={logo.alt}
                  width={120}
                  height={80}
                  className="h-12 md:h-16 grayscale hover:grayscale-0 transition duration-300"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonial */}
      <section className="py-16 md:py-24 px-4 bg-white text-center">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-10">
            What Our Clients Say
          </h2>
          <div className="relative">
            {testimonials.map((testimonial, index) => (
              <div 
                key={index}
                className={`transition-opacity duration-500 ${
                  activeTestimonial === index ? 'opacity-100' : 'opacity-0 absolute inset-0'
                }`}
              >
                <blockquote className="italic text-xl mb-6 text-gray-700">
                  "{testimonial.quote}"
                </blockquote>
                <p className="text-sm text-gray-500">— {testimonial.author}</p>
              </div>
            ))}
            
            <div className="flex justify-center mt-8 space-x-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActiveTestimonial(index)}
                  className={`h-2 w-2 rounded-full transition-all duration-300 ${
                    activeTestimonial === index ? 'bg-orange-500 w-6' : 'bg-gray-300'
                  }`}
                  aria-label={`View testimonial ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Industries Section */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="container text-center">
          <h2 className="text-3xl font-bold mb-4">
            {t('industries_we_serve')}
          </h2>
          <p className="mb-10 text-gray-700 max-w-3xl mx-auto">
            {t('industries_intro')}
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {industries.map((key) => {
              const slug = key.replace(/_/g, '-');
              return (
                <div
                  key={key}
                  className="card card-hover overflow-hidden"
                >
                  <div className="relative h-48 overflow-hidden">
                    <Image
                      src={`/images/industries/${slug}-hero.jpg`}
                      alt={t(`industry.${key}.title`)}
                      layout="fill"
                      objectFit="cover"
                      priority={industries.indexOf(key) < 3}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-70"></div>
                    <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                      <h3 className="text-xl font-bold mb-1">
                        {t(`industry.${key}.title`)}
                      </h3>
                    </div>
                  </div>
                  <div className="p-4">
                    <p className="text-gray-600 mb-4 text-sm">
                      {t(`industry.${key}.description`)}
                    </p>
                    <Link href={`/industries/${slug}`}>
                      <a className="text-orange-500 hover:text-orange-600 font-medium inline-flex items-center text-sm">
                        {t(`industry.${key}.link`)}
                        <svg className="ml-1 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </a>
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-orange-500 to-orange-600 text-white py-16 md:py-20 text-center">
        <div className="container">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            {t('start_working_with_us')}
          </h2>
          <p className="mb-8 max-w-2xl mx-auto text-white text-opacity-90">
            {t('cta_subheading')}
          </p>
          <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
            <Link href="/contact">
              <a className="btn bg-white text-orange-600 hover:bg-gray-100">
                {t('contact_us')}
              </a>
            </Link>
            <Link href="/register">
              <a className="btn bg-orange-600 text-white border border-white hover:bg-orange-700">
                {t('register_now')}
              </a>
            </Link>
          </div>
        </div>
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
