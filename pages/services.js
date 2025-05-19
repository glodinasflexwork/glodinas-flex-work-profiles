import { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import { useTranslation } from 'react-i18next';
import { serverSideTranslations } from '../lib/i18n';

export default function Services() {
  const { t } = useTranslation('common');
  const [activeTab, setActiveTab] = useState('employer-portal');
  const [activeFaq, setActiveFaq] = useState(null);

  const toggleFaq = (index) => {
    if (activeFaq === index) {
      setActiveFaq(null);
    } else {
      setActiveFaq(index);
    }
  };

  const faqs = [
    {
      question: "How secure is the platform?",
      answer: "Our platform employs bank-level security with end-to-end encryption, multi-factor authentication, and regular security audits. All data is stored in compliance with GDPR regulations."
    },
    {
      question: "Are the digital agreements legally binding?",
      answer: "Yes, all agreements generated through our platform comply with eIDAS regulations for electronic signatures and are legally binding in all EU countries."
    },
    {
      question: "How quickly can we start hiring workers?",
      answer: "After account verification (typically 24 hours), you can immediately access worker profiles and begin the selection process. Most clients place their first worker within 72 hours of approval."
    },
    {
      question: "Can we customize the agreements to our specific needs?",
      answer: "Yes, our Professional and Enterprise plans allow for custom agreement templates with your specific terms, conditions, and branding while maintaining legal compliance."
    },
    {
      question: "How do you ensure worker quality?",
      answer: "All workers undergo a rigorous verification process including identity checks, skills assessment, reference verification, and right-to-work validation before appearing in our database."
    },
    {
      question: "Is there a minimum commitment period?",
      answer: "No, our platform operates on a monthly subscription basis with no long-term commitments required. You can scale up or down as your hiring needs change."
    },
    {
      question: "Can we integrate the platform with our existing HR systems?",
      answer: "Yes, our Professional and Enterprise plans include API access for integration with your existing ATS, HRIS, payroll, and time tracking systems."
    }
  ];

  return (
    <>
      <Head>
        <title>Our Services | Glodinas Flex Work</title>
        <meta name="description" content="Explore our digital staffing platform with employer portal, worker database, and digital agreements. Transform your hiring process with our comprehensive workforce management solution." />
      </Head>

      {/* Hero Section */}
      <section className="relative pt-24 pb-16 md:pt-32 md:pb-24 bg-gradient-to-r from-orange-500 to-orange-600 text-white">
        <div className="absolute inset-0 bg-black opacity-20"></div>
        <div className="container relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-shadow-lg">
              Our Digital Staffing Platform
            </h1>
            <p className="text-lg md:text-xl mb-8 text-shadow">
              A comprehensive solution for workforce management, candidate selection, and digital agreements
            </p>
            <Link href="/employers">
              <a className="btn bg-white text-orange-600 hover:bg-gray-100">
                Get Started Today
              </a>
            </Link>
          </div>
        </div>
      </section>

      {/* Platform Overview Section */}
      <section className="py-16 bg-white">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Platform Overview</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">Our all-in-one digital staffing platform streamlines the entire hiring process from candidate selection to onboarding</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-gray-50 rounded-lg p-6 text-center hover:shadow-lg transition-shadow">
              <div className="text-4xl text-orange-500 mb-4">🔐</div>
              <h3 className="text-xl font-bold mb-3">Employer Portal</h3>
              <p className="text-gray-600">Secure login system with role-based access control for HR teams and hiring managers</p>
            </div>
            
            <div className="bg-gray-50 rounded-lg p-6 text-center hover:shadow-lg transition-shadow">
              <div className="text-4xl text-orange-500 mb-4">👥</div>
              <h3 className="text-xl font-bold mb-3">Worker Database</h3>
              <p className="text-gray-600">Searchable repository of pre-screened, qualified candidates across multiple industries</p>
            </div>
            
            <div className="bg-gray-50 rounded-lg p-6 text-center hover:shadow-lg transition-shadow">
              <div className="text-4xl text-orange-500 mb-4">📝</div>
              <h3 className="text-xl font-bold mb-3">Digital Agreements</h3>
              <p className="text-gray-600">Legally-binding electronic contracts with secure signature capabilities</p>
            </div>
            
            <div className="bg-gray-50 rounded-lg p-6 text-center hover:shadow-lg transition-shadow">
              <div className="text-4xl text-orange-500 mb-4">📊</div>
              <h3 className="text-xl font-bold mb-3">Analytics Dashboard</h3>
              <p className="text-gray-600">Real-time reporting on hiring metrics, workforce performance, and cost savings</p>
            </div>
          </div>
          
          <div className="mt-16 grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="flex items-center">
              <div className="flex-shrink-0 mr-4">
                <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
                  <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                  </svg>
                </div>
              </div>
              <div>
                <p className="font-semibold">Reduce time-to-hire by up to 72%</p>
              </div>
            </div>
            
            <div className="flex items-center">
              <div className="flex-shrink-0 mr-4">
                <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
                  <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                  </svg>
                </div>
              </div>
              <div>
                <p className="font-semibold">Lower administrative costs by 35%</p>
              </div>
            </div>
            
            <div className="flex items-center">
              <div className="flex-shrink-0 mr-4">
                <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
                  <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                  </svg>
                </div>
              </div>
              <div>
                <p className="font-semibold">Increase workforce flexibility</p>
              </div>
            </div>
            
            <div className="flex items-center">
              <div className="flex-shrink-0 mr-4">
                <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
                  <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                  </svg>
                </div>
              </div>
              <div>
                <p className="font-semibold">Ensure regulatory compliance</p>
              </div>
            </div>
            
            <div className="flex items-center">
              <div className="flex-shrink-0 mr-4">
                <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
                  <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                  </svg>
                </div>
              </div>
              <div>
                <p className="font-semibold">Streamline onboarding processes</p>
              </div>
            </div>
            
            <div className="flex items-center">
              <div className="flex-shrink-0 mr-4">
                <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
                  <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                  </svg>
                </div>
              </div>
              <div>
                <p className="font-semibold">Access pre-screened talent</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Platform Features Section */}
      <section className="py-16 bg-gray-50" id="features">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Platform Features</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">Explore the powerful tools and capabilities of our digital staffing platform</p>
          </div>
          
          <div className="mb-8">
            <div className="flex flex-wrap border-b border-gray-200">
              <button
                onClick={() => setActiveTab('employer-portal')}
                className={`px-4 py-2 font-medium text-sm sm:text-base ${activeTab === 'employer-portal' ? 'border-b-2 border-orange-500 text-orange-600' : 'text-gray-500 hover:text-gray-700'}`}
              >
                Employer Portal
              </button>
              <button
                onClick={() => setActiveTab('worker-search')}
                className={`px-4 py-2 font-medium text-sm sm:text-base ${activeTab === 'worker-search' ? 'border-b-2 border-orange-500 text-orange-600' : 'text-gray-500 hover:text-gray-700'}`}
              >
                Worker Search
              </button>
              <button
                onClick={() => setActiveTab('digital-agreements')}
                className={`px-4 py-2 font-medium text-sm sm:text-base ${activeTab === 'digital-agreements' ? 'border-b-2 border-orange-500 text-orange-600' : 'text-gray-500 hover:text-gray-700'}`}
              >
                Digital Agreements
              </button>
              <button
                onClick={() => setActiveTab('workforce-management')}
                className={`px-4 py-2 font-medium text-sm sm:text-base ${activeTab === 'workforce-management' ? 'border-b-2 border-orange-500 text-orange-600' : 'text-gray-500 hover:text-gray-700'}`}
              >
                Workforce Management
              </button>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            {activeTab === 'employer-portal' && (
              <div className="p-6 md:p-8">
                <div className="grid md:grid-cols-2 gap-8 items-center">
                  <div>
                    <h3 className="text-2xl font-bold mb-4">Secure Login & Account Management</h3>
                    <p className="text-gray-600 mb-6">
                      Our employer portal provides a secure, centralized hub for all your staffing needs with role-based access control for your entire team.
                    </p>
                    <ul className="space-y-3">
                      <li className="flex items-start">
                        <svg className="w-5 h-5 text-orange-500 mt-1 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                        </svg>
                        <span>Multi-factor authentication for enhanced security</span>
                      </li>
                      <li className="flex items-start">
                        <svg className="w-5 h-5 text-orange-500 mt-1 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                        </svg>
                        <span>Role-based access control for team members</span>
                      </li>
                      <li className="flex items-start">
                        <svg className="w-5 h-5 text-orange-500 mt-1 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                        </svg>
                        <span>Customizable company profile and hiring preferences</span>
                      </li>
                      <li className="flex items-start">
                        <svg className="w-5 h-5 text-orange-500 mt-1 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                        </svg>
                        <span>Saved searches and candidate shortlists</span>
                      </li>
                      <li className="flex items-start">
                        <svg className="w-5 h-5 text-orange-500 mt-1 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                        </svg>
                        <span>Notification settings for new candidate matches</span>
                      </li>
                    </ul>
                  </div>
                  <div className="relative h-64 md:h-80 bg-gray-100 rounded-lg overflow-hidden">
                    <div className="absolute inset-0 flex items-center justify-center text-gray-400">
                      <div className="text-center">
                        <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path>
                        </svg>
                        <p className="mt-2">Employer Portal Dashboard</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            {activeTab === 'worker-search' && (
              <div className="p-6 md:p-8">
                <div className="grid md:grid-cols-2 gap-8 items-center">
                  <div>
                    <h3 className="text-2xl font-bold mb-4">Worker Search & Filtering</h3>
                    <p className="text-gray-600 mb-6">
                      Find the perfect candidates quickly with our powerful search and filtering tools, designed to match your specific requirements.
                    </p>
                    <ul className="space-y-3">
                      <li className="flex items-start">
                        <svg className="w-5 h-5 text-orange-500 mt-1 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                        </svg>
                        <span>Advanced search with multiple parameters (skills, experience, location)</span>
                      </li>
                      <li className="flex items-start">
                        <svg className="w-5 h-5 text-orange-500 mt-1 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                        </svg>
                        <span>AI-powered candidate matching based on your requirements</span>
                      </li>
                      <li className="flex items-start">
                        <svg className="w-5 h-5 text-orange-500 mt-1 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                        </svg>
                        <span>Anonymized profiles with skill-first presentation</span>
                      </li>
                      <li className="flex items-start">
                        <svg className="w-5 h-5 text-orange-500 mt-1 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                        </svg>
                        <span>Side-by-side candidate comparison</span>
                      </li>
                      <li className="flex items-start">
                        <svg className="w-5 h-5 text-orange-500 mt-1 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                        </svg>
                        <span>Saved talent pools for recurring needs</span>
                      </li>
                    </ul>
                  </div>
                  <div className="relative h-64 md:h-80 bg-gray-100 rounded-lg overflow-hidden">
                    <div className="absolute inset-0 flex items-center justify-center text-gray-400">
                      <div className="text-center">
                        <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                        </svg>
                        <p className="mt-2">Worker Search Interface</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            {activeTab === 'digital-agreements' && (
              <div className="p-6 md:p-8">
                <div className="grid md:grid-cols-2 gap-8 items-center">
                  <div>
                    <h3 className="text-2xl font-bold mb-4">Digital Agreement Generation</h3>
                    <p className="text-gray-600 mb-6">
                      Create, customize, and execute legally binding employment agreements with our secure digital contract system.
                    </p>
                    <ul className="space-y-3">
                      <li className="flex items-start">
                        <svg className="w-5 h-5 text-orange-500 mt-1 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                        </svg>
                        <span>Template-based contract creation</span>
                      </li>
                      <li className="flex items-start">
                        <svg className="w-5 h-5 text-orange-500 mt-1 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                        </svg>
                        <span>Customizable terms and conditions</span>
                      </li>
                      <li className="flex items-start">
                        <svg className="w-5 h-5 text-orange-500 mt-1 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                        </svg>
                        <span>Automatic compliance checks with Dutch labor laws</span>
                      </li>
                      <li className="flex items-start">
                        <svg className="w-5 h-5 text-orange-500 mt-1 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                        </svg>
                        <span>Electronic signature process compliant with eIDAS regulations</span>
                      </li>
                      <li className="flex items-start">
                        <svg className="w-5 h-5 text-orange-500 mt-1 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                        </svg>
                        <span>Document storage and audit trail for all agreement activities</span>
                      </li>
                    </ul>
                  </div>
                  <div className="relative h-64 md:h-80 bg-gray-100 rounded-lg overflow-hidden">
                    <div className="absolute inset-0 flex items-center justify-center text-gray-400">
                      <div className="text-center">
                        <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                        </svg>
                        <p className="mt-2">Digital Agreement Interface</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            {activeTab === 'workforce-management' && (
              <div className="p-6 md:p-8">
                <div className="grid md:grid-cols-2 gap-8 items-center">
                  <div>
                    <h3 className="text-2xl font-bold mb-4">Workforce Management Tools</h3>
                    <p className="text-gray-600 mb-6">
                      Efficiently manage your flexible workforce with our comprehensive suite of management tools.
                    </p>
                    <ul className="space-y-3">
                      <li className="flex items-start">
                        <svg className="w-5 h-5 text-orange-500 mt-1 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                        </svg>
                        <span>Real-time worker status tracking</span>
                      </li>
                      <li className="flex items-start">
                        <svg className="w-5 h-5 text-orange-500 mt-1 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                        </svg>
                        <span>Timesheet approval and management</span>
                      </li>
                      <li className="flex items-start">
                        <svg className="w-5 h-5 text-orange-500 mt-1 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                        </svg>
                        <span>Performance evaluation tools</span>
                      </li>
                      <li className="flex items-start">
                        <svg className="w-5 h-5 text-orange-500 mt-1 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                        </svg>
                        <span>Extension and conversion workflows</span>
                      </li>
                      <li className="flex items-start">
                        <svg className="w-5 h-5 text-orange-500 mt-1 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                        </svg>
                        <span>Absence and leave management</span>
                      </li>
                    </ul>
                  </div>
                  <div className="relative h-64 md:h-80 bg-gray-100 rounded-lg overflow-hidden">
                    <div className="absolute inset-0 flex items-center justify-center text-gray-400">
                      <div className="text-center">
                        <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"></path>
                        </svg>
                        <p className="mt-2">Workforce Management Dashboard</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16 bg-white" id="how-it-works">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">How It Works</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">Our streamlined process makes hiring and managing workers simple and efficient</p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <h3 className="text-2xl font-bold mb-6 text-center md:text-left">For Employers</h3>
              <div className="space-y-8">
                <div className="flex">
                  <div className="flex-shrink-0 mr-4">
                    <div className="flex items-center justify-center w-10 h-10 rounded-full bg-orange-500 text-white font-bold">1</div>
                  </div>
                  <div>
                    <h4 className="text-xl font-semibold mb-2">Register and Create Your Profile</h4>
                    <p className="text-gray-600">Complete company verification, set up hiring team members and permissions, and define your hiring preferences.</p>
                  </div>
                </div>
                
                <div className="flex">
                  <div className="flex-shrink-0 mr-4">
                    <div className="flex items-center justify-center w-10 h-10 rounded-full bg-orange-500 text-white font-bold">2</div>
                  </div>
                  <div>
                    <h4 className="text-xl font-semibold mb-2">Search and Select Workers</h4>
                    <p className="text-gray-600">Browse pre-screened candidate profiles, filter by skills and experience, and create shortlists of potential matches.</p>
                  </div>
                </div>
                
                <div className="flex">
                  <div className="flex-shrink-0 mr-4">
                    <div className="flex items-center justify-center w-10 h-10 rounded-full bg-orange-500 text-white font-bold">3</div>
                  </div>
                  <div>
                    <h4 className="text-xl font-semibold mb-2">Generate Digital Agreements</h4>
                    <p className="text-gray-600">Select appropriate contract templates, customize terms, and set start dates, duration, and compensation.</p>
                  </div>
                </div>
                
                <div className="flex">
                  <div className="flex-shrink-0 mr-4">
                    <div className="flex items-center justify-center w-10 h-10 rounded-full bg-orange-500 text-white font-bold">4</div>
                  </div>
                  <div>
                    <h4 className="text-xl font-semibold mb-2">Finalize Hiring Process</h4>
                    <p className="text-gray-600">Send agreements for electronic signature, receive notifications when signed, and schedule start dates.</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="text-2xl font-bold mb-6 text-center md:text-left">For Workers</h3>
              <div className="space-y-8">
                <div className="flex">
                  <div className="flex-shrink-0 mr-4">
                    <div className="flex items-center justify-center w-10 h-10 rounded-full bg-orange-500 text-white font-bold">1</div>
                  </div>
                  <div>
                    <h4 className="text-xl font-semibold mb-2">Profile Creation and Verification</h4>
                    <p className="text-gray-600">Skills assessment, work history verification, right-to-work checks, and language proficiency evaluation.</p>
                  </div>
                </div>
                
                <div className="flex">
                  <div className="flex-shrink-0 mr-4">
                    <div className="flex items-center justify-center w-10 h-10 rounded-full bg-orange-500 text-white font-bold">2</div>
                  </div>
                  <div>
                    <h4 className="text-xl font-semibold mb-2">Matching and Selection</h4>
                    <p className="text-gray-600">AI-powered matching with suitable positions, anonymous profile presentation, and notification of employer interest.</p>
                  </div>
                </div>
                
                <div className="flex">
                  <div className="flex-shrink-0 mr-4">
                    <div className="flex items-center justify-center w-10 h-10 rounded-full bg-orange-500 text-white font-bold">3</div>
                  </div>
                  <div>
                    <h4 className="text-xl font-semibold mb-2">Agreement Review and Acceptance</h4>
                    <p className="text-gray-600">Receive digital agreements, review terms and conditions, and electronically sign documents.</p>
                  </div>
                </div>
                
                <div className="flex">
                  <div className="flex-shrink-0 mr-4">
                    <div className="flex items-center justify-center w-10 h-10 rounded-full bg-orange-500 text-white font-bold">4</div>
                  </div>
                  <div>
                    <h4 className="text-xl font-semibold mb-2">Onboarding and Support</h4>
                    <p className="text-gray-600">Complete pre-employment documentation, receive work location details, and get ongoing support throughout assignment.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Security & Compliance Section */}
      <section className="py-16 bg-gray-50" id="security">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Platform Security & Compliance</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">Your data security and regulatory compliance are our top priorities</p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <div className="text-4xl text-orange-500 mb-4">🔒</div>
              <h3 className="text-xl font-bold mb-3">Data Protection</h3>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-orange-500 mt-1 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  <span>GDPR-compliant data handling and storage</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-orange-500 mt-1 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  <span>End-to-end encryption for sensitive information</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-orange-500 mt-1 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  <span>Regular security audits and penetration testing</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-orange-500 mt-1 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  <span>Data minimization and purpose limitation</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-orange-500 mt-1 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  <span>Transparent privacy policies and data processing agreements</span>
                </li>
              </ul>
            </div>
            
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <div className="text-4xl text-orange-500 mb-4">⚖️</div>
              <h3 className="text-xl font-bold mb-3">Legal Compliance</h3>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-orange-500 mt-1 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  <span>Contracts compliant with Dutch labor laws</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-orange-500 mt-1 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  <span>Electronic signatures valid under eIDAS regulations</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-orange-500 mt-1 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  <span>Automatic updates to templates when regulations change</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-orange-500 mt-1 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  <span>Documentation retention according to legal requirements</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-orange-500 mt-1 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  <span>Audit trails for all platform activities</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-16 bg-white" id="pricing">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Pricing & Plans</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">Choose the plan that best fits your hiring needs</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
              <div className="p-6 border-b border-gray-100">
                <h3 className="text-xl font-bold mb-2">Starter Plan</h3>
                <p className="text-gray-600 mb-4">For small businesses with occasional hiring needs</p>
                <div className="text-3xl font-bold text-orange-600">€199<span className="text-lg text-gray-500">/month</span></div>
              </div>
              <div className="p-6">
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <svg className="w-5 h-5 text-green-500 mt-1 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    <span>Access to worker database</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="w-5 h-5 text-green-500 mt-1 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    <span>Basic search and filtering</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="w-5 h-5 text-green-500 mt-1 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    <span>Standard agreement templates</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="w-5 h-5 text-green-500 mt-1 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    <span>Email support</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="w-5 h-5 text-green-500 mt-1 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    <span>Up to 5 user accounts</span>
                  </li>
                </ul>
                <div className="mt-6">
                  <Link href="/contact">
                    <a className="btn btn-outline w-full">Get Started</a>
                  </Link>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-lg border-2 border-orange-500 shadow-lg overflow-hidden relative">
              <div className="absolute top-0 right-0 bg-orange-500 text-white px-3 py-1 text-sm font-semibold">
                Popular
              </div>
              <div className="p-6 border-b border-gray-100">
                <h3 className="text-xl font-bold mb-2">Professional Plan</h3>
                <p className="text-gray-600 mb-4">For growing businesses with regular hiring needs</p>
                <div className="text-3xl font-bold text-orange-600">€499<span className="text-lg text-gray-500">/month</span></div>
              </div>
              <div className="p-6">
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <svg className="w-5 h-5 text-green-500 mt-1 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    <span>All Starter features</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="w-5 h-5 text-green-500 mt-1 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    <span>Advanced search and AI matching</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="w-5 h-5 text-green-500 mt-1 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    <span>Custom agreement templates</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="w-5 h-5 text-green-500 mt-1 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    <span>Priority support</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="w-5 h-5 text-green-500 mt-1 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    <span>Up to 15 user accounts</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="w-5 h-5 text-green-500 mt-1 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    <span>Analytics dashboard</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="w-5 h-5 text-green-500 mt-1 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    <span>API access</span>
                  </li>
                </ul>
                <div className="mt-6">
                  <Link href="/contact">
                    <a className="btn btn-primary w-full">Get Started</a>
                  </Link>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
              <div className="p-6 border-b border-gray-100">
                <h3 className="text-xl font-bold mb-2">Enterprise Plan</h3>
                <p className="text-gray-600 mb-4">For large organizations with complex hiring needs</p>
                <div className="text-3xl font-bold text-orange-600">Custom<span className="text-lg text-gray-500"> pricing</span></div>
              </div>
              <div className="p-6">
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <svg className="w-5 h-5 text-green-500 mt-1 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    <span>All Professional features</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="w-5 h-5 text-green-500 mt-1 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    <span>Unlimited user accounts</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="w-5 h-5 text-green-500 mt-1 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    <span>Dedicated account manager</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="w-5 h-5 text-green-500 mt-1 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    <span>Custom integrations</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="w-5 h-5 text-green-500 mt-1 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    <span>White-labeling options</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="w-5 h-5 text-green-500 mt-1 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    <span>Advanced analytics and reporting</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="w-5 h-5 text-green-500 mt-1 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    <span>SLA guarantees</span>
                  </li>
                </ul>
                <div className="mt-6">
                  <Link href="/contact">
                    <a className="btn btn-outline w-full">Contact Sales</a>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 bg-gray-50">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">What Our Clients Say</h2>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <div className="text-5xl text-orange-300 opacity-50 mb-2">"</div>
              <p className="text-gray-600 italic mb-4">The digital agreement feature alone has saved us countless hours of paperwork and back-and-forth. We can now hire qualified workers and have them start within days instead of weeks.</p>
              <p className="font-semibold">Operations Director, Logistics International B.V.</p>
            </div>
            
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <div className="text-5xl text-orange-300 opacity-50 mb-2">"</div>
              <p className="text-gray-600 italic mb-4">Being able to search for specific skills and qualifications in the worker database has transformed our hiring process. We find exactly who we need, when we need them.</p>
              <p className="font-semibold">HR Manager, Manufacturing Solutions</p>
            </div>
            
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <div className="text-5xl text-orange-300 opacity-50 mb-2">"</div>
              <p className="text-gray-600 italic mb-4">The compliance features give us peace of mind. Knowing that all contracts are automatically updated to reflect the latest regulations is invaluable.</p>
              <p className="font-semibold">Legal Counsel, Healthcare Provider</p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-white" id="faq">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Frequently Asked Questions</h2>
          </div>
          
          <div className="max-w-3xl mx-auto">
            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <div key={index} className="border border-gray-200 rounded-lg overflow-hidden">
                  <button
                    className="w-full flex justify-between items-center p-4 text-left font-semibold focus:outline-none"
                    onClick={() => toggleFaq(index)}
                  >
                    {faq.question}
                    <svg
                      className={`w-5 h-5 transition-transform ${activeFaq === index ? 'transform rotate-180' : ''}`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                    </svg>
                  </button>
                  <div
                    className={`px-4 pb-4 ${activeFaq === index ? 'block' : 'hidden'}`}
                  >
                    <p className="text-gray-600">{faq.answer}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-orange-500 text-white">
        <div className="container">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Transform Your Hiring Process?</h2>
            <p className="text-lg mb-8">Join hundreds of companies already benefiting from our digital staffing platform</p>
            <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
              <Link href="/contact">
                <a className="btn bg-white text-orange-600 hover:bg-gray-100">
                  Request a Demo
                </a>
              </Link>
              <Link href="/employers">
                <a className="btn bg-orange-600 text-white border border-white hover:bg-orange-700">
                  View Pricing Plans
                </a>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common'])),
    },
  };
}
