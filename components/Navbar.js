import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';

export default function Navbar() {
  const { t, i18n } = useTranslation();
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);

  const changeLanguage = (e) => {
    const newLocale = e.target.value;
    i18n.changeLanguage(newLocale); // Update i18n
    router.push(router.pathname, router.asPath, { locale: newLocale }); // Update URL
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <nav className="flex items-center justify-between py-4 px-6 bg-white shadow-md sticky top-0 z-50">
      {/* Logo */}
      <Link href="/">
        <a className="flex items-center space-x-3">
          <Image src="/images/logo.png" alt="Glodinas Flex Work B.V." width={150} height={50} priority />
          <span className="text-xl font-bold hidden sm:inline">Glodinas Flex Work B.V.</span>
        </a>
      </Link>

      {/* Desktop Menu */}
      <div className="hidden md:flex items-center space-x-6">
        <Link href="/">
          <a className="text-gray-700 hover:text-orange-500">{t('Home')}</a>
        </Link>
        <Link href="/about">
          <a className="text-gray-700 hover:text-orange-500">{t('About Us')}</a>
        </Link>
        <Link href="/industries">
          <a className="text-gray-700 hover:text-orange-500">{t('Industries')}</a>
        </Link>
        <Link href="/job-seekers">
          <a className="text-gray-700 hover:text-orange-500">{t('Job Seekers')}</a>
        </Link>
        <Link href="/employers">
          <a className="text-gray-700 hover:text-orange-500">{t('Employers')}</a>
        </Link>
        <Link href="/contact">
          <a className="text-gray-700 hover:text-orange-500">{t('Contact')}</a>
        </Link>

        {/* Language Switcher */}
        <select
          value={router.locale}
          onChange={changeLanguage}
          className="ml-4 border border-gray-300 rounded px-2 py-1 text-gray-700"
        >
          <option value="nl">🇳🇱 NL</option>
          <option value="en">🇬🇧 EN</option>
          <option value="de">🇩🇪 DE</option>
          <option value="pl">🇵🇱 PL</option>
          <option value="ro">🇷🇴 RO</option>
          <option value="bg">🇧🇬 BG</option>
        </select>
      </div>

      {/* Mobile Menu Button */}
      <div className="md:hidden">
        <button
          onClick={toggleMenu}
          className="text-gray-700 hover:text-orange-500 focus:outline-none"
          aria-label="Toggle Menu"
        >
          {menuOpen ? (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="absolute top-16 right-6 bg-white shadow-lg rounded-lg p-6 w-64 z-50 flex flex-col space-y-4">
          <Link href="/">
            <a onClick={toggleMenu} className="text-gray-700 hover:text-orange-500">{t('Home')}</a>
          </Link>
          <Link href="/about">
            <a onClick={toggleMenu} className="text-gray-700 hover:text-orange-500">{t('About Us')}</a>
          </Link>
          <Link href="/industries">
            <a onClick={toggleMenu} className="text-gray-700 hover:text-orange-500">{t('Industries')}</a>
          </Link>
          <Link href="/job-seekers">
            <a onClick={toggleMenu} className="text-gray-700 hover:text-orange-500">{t('Job Seekers')}</a>
          </Link>
          <Link href="/employers">
            <a onClick={toggleMenu} className="text-gray-700 hover:text-orange-500">{t('Employers')}</a>
          </Link>
          <Link href="/contact">
            <a onClick={toggleMenu} className="text-gray-700 hover:text-orange-500">{t('Contact')}</a>
          </Link>
          {/* Language Switcher inside Mobile Menu */}
          <select
            value={router.locale}
            onChange={(e) => {
              changeLanguage(e);
              toggleMenu();
            }}
            className="border border-gray-300 rounded px-2 py-1 text-gray-700 mt-4"
          >
            <option value="nl">🇳🇱 NL</option>
            <option value="en">🇬🇧 EN</option>
            <option value="de">🇩🇪 DE</option>
            <option value="pl">🇵🇱 PL</option>
            <option value="ro">🇷🇴 RO</option>
            <option value="bg">🇧🇬 BG</option>
          </select>
        </div>
      )}
    </nav>
  );
}
