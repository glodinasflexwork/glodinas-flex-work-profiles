import React, { useState, useEffect } from 'react';
import { useSession, signOut } from 'next-auth/react';
import Link from 'next/link';
import { useRouter } from 'next/router';

export default function WorkerLayout({ children }) {
  const { data: session } = useSession();
  const router = useRouter();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  // Define navigation items
  const navigation = [
    { name: 'Dashboard', href: '/worker/dashboard', icon: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6' },
    { name: 'My Profile', href: '/worker/profile', icon: 'M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z' },
    { name: 'My Applications', href: '/worker/applications', icon: 'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01' },
    { name: 'Saved Jobs', href: '/worker/saved-jobs', icon: 'M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z' },
    { name: 'Resume & CV', href: '/worker/resume', icon: 'M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z' },
    { name: 'Interviews', href: '/worker/interviews', icon: 'M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z' },
    { name: 'Find Jobs', href: '/worker/find-jobs', icon: 'M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z' },
  ];

  // Handle sign out
  const handleSignOut = async () => {
    await signOut({ redirect: false });
    router.push('/login');
  };

  // Check if a navigation item is active
  const isActive = (href) => {
    return router.pathname === href;
  };

  return (
    <div className="h-screen flex overflow-hidden bg-gray-100">
      {/* Mobile menu */}
      <div className={`${isMobileMenuOpen ? 'block' : 'hidden'} fixed inset-0 flex z-40 md:hidden`}>
        <div className="fixed inset-0 bg-gray-600 bg-opacity-75" onClick={() => setIsMobileMenuOpen(false)}></div>
        
        <div className="relative flex-1 flex flex-col max-w-xs w-full bg-orange-800">
          <div className="absolute top-0 right-0 -mr-12 pt-2">
            <button
              type="button"
              className="ml-1 flex items-center justify-center h-10 w-10 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <span className="sr-only">Close sidebar</span>
              <svg className="h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          
          <div className="flex-1 h-0 pt-5 pb-4 overflow-y-auto">
            <div className="flex-shrink-0 flex items-center px-4">
              <span className="text-white font-bold text-xl">Glodinas Flex Work</span>
            </div>
            
            <div className="mt-5 px-4">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <div className="h-10 w-10 rounded-full bg-orange-600 flex items-center justify-center text-white font-bold">
                    {session?.user?.name?.charAt(0) || 'W'}
                  </div>
                </div>
                <div className="ml-3">
                  <p className="text-base font-medium text-white">{session?.user?.name || 'Demo Worker'}</p>
                  <p className="text-sm font-medium text-orange-200">{session?.user?.email || 'worker@glodinasflexwork.nl'}</p>
                </div>
              </div>
            </div>
            
            <nav className="mt-5 px-2 space-y-1">
              {navigation.map((item) => (
                <Link key={item.name} href={item.href} legacyBehavior>
                  <a
                    className={`${
                      isActive(item.href)
                        ? 'bg-orange-900 text-white'
                        : 'text-orange-100 hover:bg-orange-700'
                    } group flex items-center px-2 py-2 text-base font-medium rounded-md`}
                  >
                    <svg
                      className="mr-4 h-6 w-6 text-orange-300"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      aria-hidden="true"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={item.icon} />
                    </svg>
                    {item.name}
                  </a>
                </Link>
              ))}
            </nav>
          </div>
          
          <div className="flex-shrink-0 flex border-t border-orange-700 p-4">
            <button
              onClick={handleSignOut}
              className="flex items-center text-orange-100 hover:text-white"
            >
              <svg
                className="h-6 w-6 text-orange-300"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
              <span className="ml-3">Sign Out</span>
            </button>
          </div>
        </div>
      </div>

      {/* Desktop sidebar */}
      <div className="hidden md:flex md:flex-shrink-0">
        <div className="flex flex-col w-64">
          <div className="flex flex-col h-0 flex-1 bg-orange-800">
            <div className="flex-1 flex flex-col pt-5 pb-4 overflow-y-auto">
              <div className="flex items-center flex-shrink-0 px-4">
                <span className="text-white font-bold text-xl">Glodinas Flex Work</span>
              </div>
              
              <div className="mt-5 px-4">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <div className="h-10 w-10 rounded-full bg-orange-600 flex items-center justify-center text-white font-bold">
                      {session?.user?.name?.charAt(0) || 'W'}
                    </div>
                  </div>
                  <div className="ml-3">
                    <p className="text-base font-medium text-white">{session?.user?.name || 'Demo Worker'}</p>
                    <p className="text-sm font-medium text-orange-200">{session?.user?.email || 'worker@glodinasflexwork.nl'}</p>
                  </div>
                </div>
              </div>
              
              <nav className="mt-5 flex-1 px-2 space-y-1">
                {navigation.map((item) => (
                  <Link key={item.name} href={item.href} legacyBehavior>
                    <a
                      className={`${
                        isActive(item.href)
                          ? 'bg-orange-900 text-white'
                          : 'text-orange-100 hover:bg-orange-700'
                      } group flex items-center px-2 py-2 text-sm font-medium rounded-md`}
                    >
                      <svg
                        className="mr-3 h-6 w-6 text-orange-300"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        aria-hidden="true"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={item.icon} />
                      </svg>
                      {item.name}
                    </a>
                  </Link>
                ))}
              </nav>
            </div>
            
            <div className="flex-shrink-0 flex border-t border-orange-700 p-4">
              <button
                onClick={handleSignOut}
                className="flex items-center text-orange-100 hover:text-white"
              >
                <svg
                  className="h-6 w-6 text-orange-300"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
                <span className="ml-3">Sign Out</span>
              </button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Mobile header */}
      <div className="flex flex-col w-0 flex-1 overflow-hidden">
        <div className="md:hidden pl-1 pt-1 sm:pl-3 sm:pt-3">
          <button
            type="button"
            className="-ml-0.5 -mt-0.5 h-12 w-12 inline-flex items-center justify-center rounded-md text-gray-500 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-orange-500"
            onClick={() => setIsMobileMenuOpen(true)}
          >
            <span className="sr-only">Open sidebar</span>
            <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
        
        {/* Main content */}
        <main className="flex-1 relative overflow-y-auto focus:outline-none">
          <div className="py-6">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
              {children}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
