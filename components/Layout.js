import Link from 'next/link';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';

export default function Layout({ children }) {
  const { t } = useTranslation();
  const router = useRouter();
  const { locale } = router;

  const changeLanguage = (e) => {
    const newLocale = e.target.value;
    router.push(router.pathname, router.asPath, { locale: newLocale });
  };

  return (
    <div className="p-4">
      <header className="flex justify-between items-center mb-6">
        <h1 className="text-xl font-bold">{t('title')}</h1>
        <select onChange={changeLanguage} value={locale} className="border px-2 py-1 rounded">
          <option value="nl">🇳🇱 Nederlands</option>
          <option value="en">🇬🇧 English</option>
          <option value="pl">🇵🇱 Polski</option>
          <option value="ro">🇷🇴 Română</option>
          <option value="bg">🇧🇬 Български</option>
        </select>
      </header>
      <main>{children}</main>
    </div>
  );
}
