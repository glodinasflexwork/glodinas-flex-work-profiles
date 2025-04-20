import Head from 'next/head';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

export default function Home() {
  const { t } = useTranslation();

  return (
    <>
      <Head>
        <title>{t('title')}</title>
      </Head>
      <main className="min-h-screen p-8 text-gray-800 bg-white">
        <h1 className="text-4xl font-bold text-center mb-6">{t('welcome')}</h1>
        <p className="text-center max-w-2xl mx-auto text-lg mb-8">{t('intro')}</p>

        <div className="flex justify-center gap-4">
          <a href="/jobseekers" className="bg-orange-500 text-white px-6 py-3 rounded hover:bg-orange-600">
            {t('jobseekers')}
          </a>
          <a href="/employers" className="bg-orange-500 text-white px-6 py-3 rounded hover:bg-orange-600">
            {t('employers')}
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
