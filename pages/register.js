import { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import Layout from '../components/Layout';

export default function Register() {
  return (
    <Layout>
      <Head>
        <title>Register - Glodinas Flex Work</title>
        <meta name="description" content="Join Glodinas Flex Work - Register as a job seeker or employer" />
      </Head>

      <div className="pt-24 pb-16 bg-gradient-to-b from-orange-50 to-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Join Glodinas Flex Work</h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">Select the option that best describes you</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {/* Job Seeker Column */}
            <div className="bg-white rounded-lg shadow-lg overflow-hidden transition-transform hover:transform hover:scale-105">
              <div className="p-8">
                <div className="mb-6 text-center">
                  <Image 
                    src="/images/job-seeker.jpg" 
                    alt="Job Seeker" 
                    width={200} 
                    height={200} 
                    className="rounded-full mx-auto"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = "https://via.placeholder.com/200?text=Job+Seeker";
                    }}
                  />
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4 text-center">Looking for work?</h2>
                <ul className="mb-8 space-y-3">
                  <li className="flex items-start">
                    <svg className="h-6 w-6 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Access to exclusive job opportunities</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="h-6 w-6 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Fast application process</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="h-6 w-6 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Career growth support</span>
                  </li>
                </ul>
                <div className="text-center">
                  <Link href="/register/job-seeker">
                    <a className="btn btn-primary btn-lg w-full">Register as Job Seeker</a>
                  </Link>
                </div>
              </div>
            </div>

            {/* Employer Column */}
            <div className="bg-white rounded-lg shadow-lg overflow-hidden transition-transform hover:transform hover:scale-105">
              <div className="p-8">
                <div className="mb-6 text-center">
                  <Image 
                    src="/images/employer.jpg" 
                    alt="Employer" 
                    width={200} 
                    height={200} 
                    className="rounded-full mx-auto"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = "https://via.placeholder.com/200?text=Employer";
                    }}
                  />
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4 text-center">Hiring talent?</h2>
                <ul className="mb-8 space-y-3">
                  <li className="flex items-start">
                    <svg className="h-6 w-6 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Find qualified candidates quickly</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="h-6 w-6 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Flexible staffing solutions</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="h-6 w-6 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Industry expertise and support</span>
                  </li>
                </ul>
                <div className="text-center">
                  <Link href="/register/employer">
                    <a className="btn btn-secondary btn-lg w-full">Register as Employer</a>
                  </Link>
                </div>
              </div>
            </div>
          </div>

          <div className="text-center mt-12">
            <p className="text-gray-600">
              Already have an account?{' '}
              <Link href="/login">
                <a className="text-orange-600 hover:text-orange-700 font-medium">Login here</a>
              </Link>
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
}
