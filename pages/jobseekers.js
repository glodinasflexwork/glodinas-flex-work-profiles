import Head from 'next/head';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

export default function JobSeekers() {
  const { t } = useTranslation();

  return (
    <>
      <Head>
        <title>{t('jobseekers')} | {t('title')}</title>
      </Head>
      <main className="min-h-screen p-8 bg-white text-gray-800">
        <h1 className="text-4xl font-bold text-center mb-8">{t('jobseekers')}</h1>
        <p className="max-w-3xl mx-auto text-lg text-center mb-10">
          {t('jobseekers_description')}
        </p>
        <div className="text-center">
          <a href="/contact">
            <button className="bg-orange-500 text-white px-6 py-3 rounded hover:bg-orange-600">
              {t('contact')}
            </button>
          </a>
        </div>
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
