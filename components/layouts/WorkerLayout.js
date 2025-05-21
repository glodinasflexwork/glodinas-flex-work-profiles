import React from 'react';
import { useRouter } from 'next/router';
import { useSession, signOut } from 'next-auth/react';

export default function WorkerLayout({ children }) {
  const router = useRouter();
  const { data: session, status } = useSession();

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

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Top navigation - only contains logout button */}
      <div className="sticky top-0 z-10 flex items-center justify-between h-16 bg-white shadow-sm px-4 md:px-6">
        <div className="flex-1"></div>
        
        <div className="flex items-center">
          <div className="flex items-center space-x-3">
            <div className="flex flex-col mr-4">
              <span className="text-sm font-medium text-gray-900">{session?.user?.name || 'Job Seeker'}</span>
              <span className="text-xs text-gray-500">{session?.user?.email}</span>
            </div>
            
            <button
              onClick={() => signOut({ callbackUrl: '/' })}
              className="flex items-center px-4 py-2 text-sm bg-orange-600 text-white rounded-md hover:bg-orange-700 transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
              Sign Out
            </button>
          </div>
        </div>
      </div>

      {/* Page content */}
      <main className="p-4 md:p-6">
        {children}
      </main>
    </div>
  );
}
