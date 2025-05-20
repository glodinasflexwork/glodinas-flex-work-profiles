import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';

export default function Services() {
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
          
          {/* Tab content would go here */}
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-white">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Frequently Asked Questions</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">Find answers to common questions about our digital staffing platform</p>
          </div>
          
          <div className="max-w-3xl mx-auto">
            {faqs.map((faq, index) => (
              <div key={index} className="mb-4 border-b border-gray-200 pb-4">
                <button
                  onClick={() => toggleFaq(index)}
                  className="flex justify-between items-center w-full text-left font-semibold text-lg"
                >
                  <span>{faq.question}</span>
                  <svg
                    className={`w-5 h-5 transform transition-transform ${activeFaq === index ? 'rotate-180' : ''}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                  </svg>
                </button>
                <div className={`mt-2 text-gray-600 ${activeFaq === index ? 'block' : 'hidden'}`}>
                  {faq.answer}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-orange-50">
        <div className="container">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Transform Your Hiring Process?</h2>
            <p className="text-lg text-gray-600 mb-8">
              Join hundreds of companies already using our digital staffing platform to streamline their workforce management
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link href="/employers">
                <a className="btn btn-primary">
                  Register Your Company
                </a>
              </Link>
              <Link href="/contact">
                <a className="btn btn-secondary">
                  Request a Demo
                </a>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
