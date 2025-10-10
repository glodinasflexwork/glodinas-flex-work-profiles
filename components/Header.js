import React from 'react';
import Link from 'next/link';
import { useUser, useAuth } from '@clerk/nextjs';
import Image from 'next/image'; // Import Image component

export default function Header() {
  const { user, isLoaded } = useUser();
  const isAuthenticated = status === 'authenticated';

  return (
    <header className="bg-white shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center">
            <Link href="/" className="flex items-center">
              <Image src="/images/logo.png" alt="Glodinas Flex Work" width={40} height={40} className="h-10 w-auto" />
              <span className="ml-2 text-xl font-bold text-gray-800">Glodinas Flex Work</span>
            </Link>
            <nav className="hidden md:flex ml-10 space-x-8">
              <Link href="/about" className="text-gray-600 hover:text-orange-500">About</Link>
              <Link href="/services" className="text-gray-600 hover:text-orange-500">Services</Link>
              <Link href="/industries" className="text-gray-600 hover:text-orange-500">Industries</Link>
              <Link href="/contact" className="text-gray-600 hover:text-orange-500">Contact</Link>
            </nav>
          </div>
          
          <div className="flex items-center">
            {isAuthenticated ? (
              <div className="flex items-center">
                <div className="mr-4">
                  <span className="text-sm text-gray-600">Hello, {user.name || user.email}</span>
                </div>
                <div className="relative group">
                  <button className="flex items-center text-gray-700 hover:text-orange-500 focus:outline-none">
                    <span className="mr-1">My Account</span>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                    </svg>
                  </button>
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10 hidden group-hover:block">
                    {user.role === 'ADMIN' && (
                      <Link href="/admin" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Admin Dashboard</Link>
                    )}
                    {user.role === 'EMPLOYER' && (
                      <Link href="/employer/dashboard" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Employer Dashboard</Link>
                    )}
                    {user.role === 'WORKER' && (
                      <Link href="/worker/dashboard" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Worker Dashboard</Link>
                    )}
                    <button
                      onClick={() => signOut({ callbackUrl: '/' })}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Sign Out
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <Link href="/login" className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-md">Login</Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}

