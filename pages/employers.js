import { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useNotification } from '../components/NotificationContext';

export default function Employers() {
  const router = useRouter();
  const { addNotification } = useNotification();
  const [showSignupForm, setShowSignupForm] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  
  // Industry options
  const industries = [
    'Logistics & Transportation',
    'Manufacturing',
    'Healthcare',
    'Hospitality & Tourism',
    'Retail & Customer Service',
    'Construction & Skilled Trades',
    'Information Technology',
    'Finance & Banking',
    'Education',
    'Other'
  ];
  const companySizes = [
    '1-10 employees',
    '11-50 employees',
    '51-200 employees',
    '201-500 employees',
    '501-1000 employees',
    '1000+ employees'
  ];
  const jobCategoriesList = [
    'Warehouse Staff',
    'Production Workers',
    'Drivers',
    'Administrative Staff',
    'Customer Service',
    'Healthcare Professionals',
    'Skilled Trades',
    'IT Specialists',
    'Sales Representatives',
    'Hospitality Staff',
    'Cleaning Staff',
    'Security Personnel'
  ];
  const experienceLevels = [
    'Entry Level (0-1 years)',
    'Junior (1-3 years)',
    'Mid-Level (3-5 years)',
    'Senior (5+ years)',
    'Mixed Levels'
  ];
  const durations = [
    'Less than 1 month',
    '1-3 months',
    '3-6 months',
    '6-12 months',
    'More than 12 months',
    'Permanent'
  ];
  const workingHours = [
    'Full-time',
    'Part-time',
    'Flexible hours',
    'Shifts',
    'Weekends only'
  ];
  const languages = [
    'Dutch',
    'English',
    'Polish',
    'Romanian',
    'Bulgarian',
    'German',
    'French',
    'Spanish'
  ];
  const renderSignupForm = () => {
    if (formSubmitted) {
      return (
        <div className="bg-white rounded-lg shadow-lg p-8 text-center">
          <div className="text-5xl text-green-500 mb-4">✓</div>
          <h3 className="text-2xl font-bold mb-4">Registration Submitted Successfully!</h3>
          <p className="text-gray-600 mb-6">
            Thank you for registering with Glodinas Flex Work. Our team will review your company information within 24 hours.
            You will receive an email confirmation once your account is approved.
          </p>
          <p className="text-gray-600 mb-6">
            Next steps:
          </p>
          <ol className="text-left max-w-md mx-auto mb-8 space-y-2">
            <li className="flex items-start">
              <span className="flex-shrink-0 flex items-center justify-center w-6 h-6 rounded-full bg-orange-100 text-orange-500 mr-2">1</span>
              <span>Our team reviews your company information (within 24 hours)</span>
            </li>
            <li className="flex items-start">
              <span className="flex-shrink-0 flex items-center justify-center w-6 h-6 rounded-full bg-orange-100 text-orange-500 mr-2">2</span>
              <span>Your account is activated, giving you access to worker profiles</span>
            </li>
            <li className="flex items-start">
              <span className="flex-shrink-0 flex items-center justify-center w-6 h-6 rounded-full bg-orange-100 text-orange-500 mr-2">3</span>
              <span>Select suitable candidates and generate agreements</span>
            </li>
            <li className="flex items-start">
              <span className="flex-shrink-0 flex items-center justify-center w-6 h-6 rounded-full bg-orange-100 text-orange-500 mr-2">4</span>
              <span>Finalize the hiring process and welcome your new workers</span>
            </li>
          </ol>
          <Link href="/">
            <a className="btn btn-primary">Return to Homepage</a>
          </Link>
        </div>
      );
    }
    // Form content would go here
    return (
      <div className="bg-white rounded-lg shadow-lg p-6">
        {/* Form content */}
      </div>
    );
  };

  // Define custom getLayout to prevent double-wrapping with Layout
  Employers.getLayout = (page) => page;
  
  return (
    <>
      <Head>
        <title>For Employers | Glodinas Flex Work</title>
        <meta name="description" content="Find qualified staff for your business with Glodinas Flex Work. Our flexible staffing solutions help you scale your workforce efficiently." />
      </Head>
      {/* Hero Section */}
      <section className="relative pt-24 pb-16 md:pt-32 md:pb-24 bg-gradient-to-r from-orange-500 to-orange-600 text-white">
        <div className="absolute inset-0 bg-black opacity-20"></div>
        <div className="container relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-shadow-lg">
              Find Qualified Staff for Your Business
            </h1>
            <p className="text-lg md:text-xl mb-8 text-shadow">
              Our flexible staffing solutions help you scale your workforce efficiently
            </p>
            <button 
              onClick={() => setShowSignupForm(true)} 
              className="btn bg-white text-orange-600 hover:bg-gray-100"
            >
              Register Your Company
            </button>
          </div>
        </div>
      </section>
      {/* Main content */}
      <div className="py-12">
        <div className="container">
          {showSignupForm ? (
            renderSignupForm()
          ) : (
            <>
              {/* Content when signup form is not shown */}
            </>
          )}
        </div>
      </div>
    </>
  );
}
