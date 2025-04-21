import Link from 'next/link';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import Footer from './Footer';

export default function Layout({ children }) {
  const { t } = useTranslation();
  const router = useRouter();
  const { locale } = router;

  const changeLanguage = (e) => {
    const newLocale = e.target.value;
    router.push(router.pathname, router.asPath, { locale: newLocale });
  };

  return (
    <div className="min-h-screen bg-white text-gray-800">
      {/* Header */}
      <header className="w-full px-6 py-3 border-b bg-white shadow-sm">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <Link href="/">
            <a className="flex items-center space-x-3 sm:space-x-4">
              <img
                src="/images/logo.png"
                alt="Logo"
                className="h-12 w-auto max-w-[48px] sm:max-w-[56px]"
              />
              <span className="text-xl font-bold hidden sm:inline">Glodinas Flex Work B.V.</span>
            </a>
          </Link>
          <select
            onChange={changeLanguage}
            value={locale}
            className="border px-3 py-1 rounded text-sm"
          >
            <option value="nl">🇳🇱 Nederlands</option>
            <option value="en">🇬🇧 English</option>
            <option value="pl">🇵🇱 Polski</option>
            <option value="ro">🇷🇴 Română</option>
            <option value="bg">🇧🇬 Български</option>
          </select>
        </div>
      </header>

      {/* Main content */}
      <main>{children}</main>

      {/* Footer */}
      <Footer />
    </div>
  );
}