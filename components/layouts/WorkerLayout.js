import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { useSession, signOut } from 'next-auth/react';
import Link from 'next/link';
import Head from 'next/head';

export default function WorkerLayout({ children }) {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Redirect to login if not authenticated
  if (status === 'unauthenticated') {
    router.push('/login');
    return null;
  }

  // Loading state
  if (status === 'loading') {
    return (
      <div className="min-h-screen flex justify-center items-center bg-gray-100">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange-500"></div>
      </div>
    );
  }

  // Check if user is a worker
  if (session?.user?.role !== 'WORKER') {
    router.push('/');
    return null;
  }

  const isActive = (path) => {
    return router.pathname === path || router.pathname.startsWith(`${path}/`);
  };

  return (
    <div className="min-h-screen flex">
      <Head>
        <title>Dashboard | Glodinas Flex Work</title>
      </Head>
      
      {/* Mobile sidebar backdrop */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 z-40 bg-gray-600 bg-opacity-75 md:hidden"
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}

      {/* Mobile sidebar */}
      <div className={`fixed inset-y-0 left-0 flex flex-col z-50 w-64 bg-orange-800 text-white transform ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 ease-in-out md:hidden`}>
        {/* User info */}
        <div className="flex flex-col items-center justify-center p-4 border-b border-orange-700">
          <div className="text-xl font-bold mb-2">Glodinas Flex Work</div>
          <div className="text-center">
            <div className="font-medium">{session?.user?.name || 'Job Seeker'}</div>
            <div className="text-xs text-orange-200">{session?.user?.email}</div>
          </div>
        </div>
        
        {/* Navigation links */}
        <div className="flex-1 overflow-y-auto">
          <nav className="px-2 py-4 space-y-1">
            <Link href="/worker/dashboard" legacyBehavior>
              <a className={`flex items-center px-4 py-2 text-sm rounded-md ${isActive('/worker/dashboard') ? 'bg-orange-900 text-white' : 'text-orange-100 hover:bg-orange-700'}`}>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
                Dashboard
              </a>
            </Link>
            <Link href="/worker/profile" legacyBehavior>
              <a className={`flex items-center px-4 py-2 text-sm rounded-md ${isActive('/worker/profile') ? 'bg-orange-900 text-white' : 'text-orange-100 hover:bg-orange-700'}`}>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                My Profile
              </a>
            </Link>
            <Link href="/worker/applications" legacyBehavior>
              <a className={`flex items-center px-4 py-2 text-sm rounded-md ${isActive('/worker/applications') ? 'bg-orange-900 text-white' : 'text-orange-100 hover:bg-orange-700'}`}>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
                My Applications
              </a>
            </Link>
            <Link href="/worker/saved-jobs" legacyBehavior>
              <a className={`flex items-center px-4 py-2 text-sm rounded-md ${isActive('/worker/saved-jobs') ? 'bg-orange-900 text-white' : 'text-orange-100 hover:bg-orange-700'}`}>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                </svg>
                Saved Jobs
              </a>
            </Link>
            <Link href="/worker/resume" legacyBehavior>
              <a className={`flex items-center px-4 py-2 text-sm rounded-md ${isActive('/worker/resume') ? 'bg-orange-900 text-white' : 'text-orange-100 hover:bg-orange-700'}`}>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                Resume & CV
              </a>
            </Link>
            <Link href="/jobs" legacyBehavior>
              <a className={`flex items-center px-4 py-2 text-sm rounded-md ${isActive('/jobs') ? 'bg-orange-900 text-white' : 'text-orange-100 hover:bg-orange-700'}`}>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                Find Jobs
              </a>
            </Link>
          </nav>
        </div>
        
        {/* Logout button */}
        <div className="p-4 border-t border-orange-700">
          <button
            onClick={() => signOut({ callbackUrl: '/' })}
            className="flex items-center w-full px-4 py-2 text-sm text-orange-100 rounded-md hover:bg-orange-700"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
            Sign Out
          </button>
        </div>
      </div>

      {/* Desktop sidebar */}
      <div className="hidden md:flex md:flex-col md:fixed md:inset-y-0 md:w-64 bg-orange-800 text-white">
        {/* User info */}
        <div className="flex flex-col items-center justify-center p-4 border-b border-orange-700">
          <div className="text-xl font-bold mb-2">Glodinas Flex Work</div>
          <div className="text-center">
            <div className="font-medium">{session?.user?.name || 'Job Seeker'}</div>
            <div className="text-xs text-orange-200">{session?.user?.email}</div>
          </div>
        </div>
        
        {/* Navigation links */}
        <div className="flex-1 overflow-y-auto">
          <nav className="px-2 py-4 space-y-1">
            <Link href="/worker/dashboard" legacyBehavior>
              <a className={`flex items-center px-4 py-2 text-sm rounded-md ${isActive('/worker/dashboard') ? 'bg-orange-900 text-white' : 'text-orange-100 hover:bg-orange-700'}`}>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
                Dashboard
              </a>
            </Link>
            <Link href="/worker/profile" legacyBehavior>
              <a className={`flex items-center px-4 py-2 text-sm rounded-md ${isActive('/worker/profile') ? 'bg-orange-900 text-white' : 'text-orange-100 hover:bg-orange-700'}`}>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                My Profile
              </a>
            </Link>
            <Link href="/worker/applications" legacyBehavior>
              <a className={`flex items-center px-4 py-2 text-sm rounded-md ${isActive('/worker/applications') ? 'bg-orange-900 text-white' : 'text-orange-100 hover:bg-orange-700'}`}>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
                My Applications
              </a>
            </Link>
            <Link href="/worker/saved-jobs" legacyBehavior>
              <a className={`flex items-center px-4 py-2 text-sm rounded-md ${isActive('/worker/saved-jobs') ? 'bg-orange-900 text-white' : 'text-orange-100 hover:bg-orange-700'}`}>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                </svg>
                Saved Jobs
              </a>
            </Link>
            <Link href="/worker/resume" legacyBehavior>
              <a className={`flex items-center px-4 py-2 text-sm rounded-md ${isActive('/worker/resume') ? 'bg-orange-900 text-white' : 'text-orange-100 hover:bg-orange-700'}`}>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                Resume & CV
              </a>
            </Link>
            <Link href="/jobs" legacyBehavior>
              <a className={`flex items-center px-4 py-2 text-sm rounded-md ${isActive('/jobs') ? 'bg-orange-900 text-white' : 'text-orange-100 hover:bg-orange-700'}`}>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                Find Jobs
              </a>
            </Link>
          </nav>
        </div>
        
        {/* Logout button */}
        <div className="p-4 border-t border-orange-700">
          <button
            onClick={() => signOut({ callbackUrl: '/' })}
            className="flex items-center w-full px-4 py-2 text-sm text-orange-100 rounded-md hover:bg-orange-700"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
            Sign Out
          </button>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 md:ml-64">
        {/* Mobile menu button */}
        <div className="md:hidden sticky top-0 z-10 flex items-center h-16 bg-white shadow-sm px-4">
          <button
            onClick={() => setSidebarOpen(true)}
            className="p-2 rounded-md text-gray-500 hover:text-gray-900 hover:bg-gray-100"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>

        {/* Page content */}
        <main className="p-4 md:p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
