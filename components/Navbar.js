
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import { useState } from 'react';
import { Menu, X } from 'lucide-react';

export default function Navbar() {
  const { t } = useTranslation();
  const router = useRouter();
  const { locale } = router;
  const [mobileOpen, setMobileOpen] = useState(false);

  const changeLanguage = (e) => {
    const newLocale = e.target.value;
    router.push(router.pathname, router.asPath, { locale: newLocale });
  };

  const navItems = [
    { href: '/', label: t('Home') },
    { href: '/about', label: t('About Us') },
    { href: '/services', label: t('Services') },
    { href: '/register', label: t('Register') },
    { href: '/job-seekers', label: t('Job Seekers') },
    { href: '/employers', label: t('Employers') },
    { href: '/contact', label: t('Contact') },
  ];

  return (
    <header className="w-full bg-white border-b shadow-sm z-50">
      <div className="max-w-6xl mx-auto px-4 py-3 flex justify-between items-center">
        <Link href="/">
          <a className="flex items-center space-x-3">
            <img src="/images/logo.png" alt="Logo" className="h-10 w-auto" />
            <span className="text-xl font-bold hidden sm:inline">Glodinas Flex Work B.V.</span>
          </a>
        </Link>

        <nav className="hidden md:flex items-center gap-6">
          {navItems.map((item, idx) => (
            <Link key={idx} href={item.href}>
              <a className="text-sm text-gray-700 hover:text-orange-600 font-medium">{item.label}</a>
            </Link>
          ))}
          <select
            onChange={changeLanguage}
            value={locale}
            className="border rounded px-2 py-1 text-sm"
          >
            <option value="nl">🇳🇱 NL</option>
            <option value="en">🇬🇧 EN</option>
            <option value="pl">🇵🇱 PL</option>
            <option value="ro">🇷🇴 RO</option>
            <option value="bg">🇧🇬 BG</option>
          </select>
        </nav>

        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden p-2 rounded border"
          aria-label="Toggle Menu"
        >
          {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {mobileOpen && (
        <div className="md:hidden border-t bg-white px-4 pb-4">
          <div className="flex flex-col space-y-4 mt-4">
            {navItems.map((item, idx) => (
              <Link key={idx} href={item.href}>
                <a
                  onClick={() => setMobileOpen(false)}
                  className="text-gray-700 hover:text-orange-600 text-base font-medium"
                >
                  {item.label}
                </a>
              </Link>
            ))}
            <select
              onChange={changeLanguage}
              value={locale}
              className="border rounded px-2 py-1 text-sm w-full"
            >
              <option value="nl">🇳🇱 Nederlands</option>
              <option value="en">🇬🇧 English</option>
              <option value="pl">🇵🇱 Polski</option>
              <option value="ro">🇷🇴 Română</option>
              <option value="bg">🇧🇬 Български</option>
            </select>
          </div>
        </div>
      )}
    </header>
  );
}
