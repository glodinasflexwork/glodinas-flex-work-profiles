import { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import { useTranslation } from 'react-i18next';
import { serverSideTranslations } from '../lib/i18n';
import { useNotification } from '../components/Notification';

export default function JobSeekers() {
  const { t } = useTranslation('common');
  const { addNotification } = useNotification();
  const [showJobAlert, setShowJobAlert] = useState(false);

  // Simulate job alert notification
  useEffect(() => {
    const timer = setTimeout(() => {
      addNotification(
        'New jobs matching your profile have been added!',
        'info',
        true,
        8000
      );
    }, 10000);
    
    return () => clearTimeout(timer);
  }, [addNotification]);

  return (
    <>
      <Head>
        <title>{t('job_seekers')} | {t('site_title')}</title>
        <meta name="description" content={t('job_seekers_meta_desc')} />
      </Head>

      {/* Hero Section */}
      <section className="relative pt-24 pb-16 md:pt-32 md:pb-24 bg-gradient-to-r from-orange-500 to-orange-600 text-white">
        <div className="absolute inset-0 bg-black opacity-20"></div>
        <div className="container relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-shadow-lg">
              {t('find_your_next_job')}
            </h1>
            <p className="text-lg md:text-xl mb-8 text-shadow">
              {t('job_seekers_hero_subtitle')}
            </p>
            <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
              <Link href="/register">
                <a className="btn bg-white text-orange-600 hover:bg-gray-100">
                  {t('register_now')}
                </a>
              </Link>
              <Link href="/contact">
                <a className="btn bg-orange-600 text-white border border-white hover:bg-orange-700">
                  {t('contact_us')}
                </a>
              </Link>
            </div>
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
