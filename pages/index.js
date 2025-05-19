import { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import { useTranslation } from 'react-i18next';
import { serverSideTranslations } from '../lib/i18n';
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

      {/* Rest of the component remains unchanged */}
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
