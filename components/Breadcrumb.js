import Link from 'next/link';
import { useRouter } from 'next/router';

export default function Breadcrumb({ currentPage }) {
  const router = useRouter();

  // Get the current path parts and remove empty entries
  const pathParts = router.asPath.split('/').filter(Boolean);

  return (
    <nav className="text-sm text-gray-500 mb-6">
      <ol className="flex space-x-2">
        <li>
          <Link href="/">
            <a className="hover:underline text-orange-600">Home</a>
          </Link>
        </li>
        {pathParts.map((part, index) => {
          const href = '/' + pathParts.slice(0, index + 1).join('/');
          const label = part.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());

          return (
            <li key={href} className="flex items-center space-x-2">
              <span>/</span>
              <Link href={href}>
                <a className="hover:underline">{label}</a>
              </Link>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
