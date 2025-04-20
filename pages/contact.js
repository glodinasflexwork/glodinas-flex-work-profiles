import Head from 'next/head';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useState } from 'react';

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);
  const { t } = useTranslation();

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(t('thank_you'));
    setSubmitted(true);
  };

  return (
    <>
      <Head>
        <title>{t('contact')} | {t('title')}</title>
      </Head>
      <main className="min-h-screen bg-white p-8 text-gray-800">
        <h1 className="text-4xl font-bold text-center mb-8">{t('contact')}</h1>

        <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-10">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block font-medium">{t('name')}</label>
              <input type="text" required className="w-full border border-gray-300 p-2 rounded" />
            </div>
            <div>
              <label className="block font-medium">{t('email')}</label>
              <input type="email" required className="w-full border border-gray-300 p-2 rounded" />
            </div>
            <div>
              <label className="block font-medium">{t('message')}</label>
              <textarea required className="w-full border border-gray-300 p-2 rounded" rows="5" />
            </div>
            <button type="submit" className="bg-orange-500 text-white px-6 py-2 rounded hover:bg-orange-600">
              {t('send')}
            </button>
            {submitted && <p className="text-green-600 pt-2">{t('confirmation')}</p>}
          </form>

          <div>
            <h2 className="text-xl font-semibold mb-4">{t('our_office')}</h2>
            <p>Fruitweg 25, Unit 3.07e<br />2525 KG Den Haag<br />Netherlands</p>
            <p className="mt-2">Email: <a href="mailto:cihatkaya@glodinas.nl" className="text-orange-600">cihatkaya@glodinas.nl</a></p>
            <p>Phone: <a href="tel:+31645833789" className="text-orange-600">06 45 83 37 89</a></p>

            <div className="mt-6">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2461.658594630931!2d4.29444951591947!3d52.05901637972762!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47c5b71fa8d4bb33%3A0x9f75b9eaa47f189f!2sFruitweg%2025%2C%202525%20KG%20Den%20Haag!5e0!3m2!1sen!2snl!4v1683725608399!5m2!1sen!2snl"
                width="100%" height="300" style={{ border: 0 }} allowFullScreen="" loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
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
