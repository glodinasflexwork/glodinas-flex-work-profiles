import Link from 'next/link';
import { useRouter } from 'next/router';

const pages = [
  { name: 'Home', href: '/' },
  { name: 'Job Seekers', href: '/job-seekers' },
  { name: 'Employers', href: '/employers' },
  { name: 'Contact', href: '/contact' }
];

export default function Navbar() {
  const router = useRouter();
  const { locale } = router;

  const changeLanguage = (e) => {
    const newLocale = e.target.value;
    router.push(router.pathname, router.asPath, { locale: newLocale });
  };

  return (
    <nav className="w-full bg-white border-b shadow-sm px-6 py-3">
      <div className="max-w-6xl mx-auto flex justify-between items-center">
        <Link href="/">
          <a className="flex items-center space-x-2">
            <img src="/images/logo.png" alt="Logo" className="h-10 w-auto" />
            <span className="text-lg font-bold text-gray-800 hidden sm:inline">Glodinas Flex Work B.V.</span>
          </a>
        </Link>
        <div className="flex items-center space-x-6">
          {pages.map((page) => (
            <Link key={page.href} href={page.href}>
              <a className="text-gray-700 hover:text-orange-500 font-medium">{page.name}</a>
            </Link>
          ))}
          <select
            onChange={changeLanguage}
            value={locale}
            className="border px-2 py-1 rounded text-sm"
          >
            <option value="nl">🇳🇱 NL</option>
            <option value="en">🇬🇧 EN</option>
            <option value="pl">🇵🇱 PL</option>
            <option value="ro">🇷🇴 RO</option>
            <option value="bg">🇧🇬 BG</option>
          </select>
        </div>
      </div>
    </nav>
  );
}