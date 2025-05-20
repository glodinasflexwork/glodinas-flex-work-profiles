import { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import { useNotification } from '../components/NotificationContext';

const industries = [
  'logistics',
  'manufacturing',
  'healthcare',
  'hospitality',
  'retail',
  'construction'
];

export default function Home() {
  const { addNotification } = useNotification();
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [jobAlertShown, setJobAlertShown] = useState(false);
  const [activeIndustry, setActiveIndustry] = useState(0);

  // Testimonials data
  const testimonials = [
    {
      quote: "Glodinas Flex Work transformed our approach to seasonal staffing. Their ability to quickly provide qualified workers during our peak periods has significantly improved our operational efficiency.",
      author: 'Operations Director, Logistics International B.V.'
    },
    {
      quote: "The quality of candidates and the speed of service exceeded our expectations. Within 48 hours, we had multiple qualified professionals to interview, and we filled our critical position within a week.",
      author: 'HR Manager, Healthcare Solutions'
    },
    {
      quote: "As someone who relocated to the Netherlands, Glodinas Flex Work made finding employment seamless. Their multilingual support and understanding of cross-border employment made all the difference.",
      author: 'Production Specialist, Manufacturing Sector'
    }
  ];

  // Industry data
  const industryData = [
    {
      name: 'Logistics & Supply Chain',
      icon: '🚚',
      roles: 'Warehouse staff, drivers, coordinators'
    },
    {
      name: 'Manufacturing & Production',
      icon: '⚙️',
      roles: 'Operators, technicians, quality control'
    },
    {
      name: 'Healthcare & Medical',
      icon: '🏥',
      roles: 'Care staff, administrative personnel, specialists'
    },
    {
      name: 'Hospitality & Tourism',
      icon: '🍽️',
      roles: 'Hotel staff, food service, event personnel'
    },
    {
      name: 'Retail & Customer Service',
      icon: '🛍️',
      roles: 'Sales associates, managers, support staff'
    },
    {
      name: 'Construction & Skilled Trades',
      icon: '🏗️',
      roles: 'Laborers, project managers, specialists'
    }
  ];

  // Auto-rotate testimonials
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 8000);
    return () => clearInterval(interval);
  }, [testimonials.length]);

  // Auto-rotate industries
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndustry((prev) => (prev + 1) % industryData.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [industryData.length]);

  // Simulate job alert notification
  useEffect(() => {
    const timer = setTimeout(() => {
      if (!jobAlertShown) {
        addNotification(
          'New job opportunities in your area match your profile!',
          'info',
          true,
          10000
        );
        setJobAlertShown(true);
      }
    }, 15000);
    
    return () => clearTimeout(timer);
  }, [addNotification, jobAlertShown]);

  return (
    <>
      <Head>
        <title>Glodinas Flex Work | Professional Staffing Solutions</title>
        <meta name="description" content="Connecting top talent with leading employers across Europe. Specialized recruitment solutions with multilingual support in Dutch, English, Polish, Romanian, and Bulgarian." />
      </Head>

      {/* Hero Section - Mobile First Design */}
      <section className="relative pt-24 pb-20 md:pt-32 md:pb-24 bg-gradient-to-r from-orange-500 to-orange-600 text-white overflow-hidden">
        <div className="absolute inset-0 bg-black opacity-20"></div>
        <div className="container relative z-10">
          <div className="flex flex-col md:flex-row items-center">
            <div className="w-full md:w-1/2 text-center md:text-left mb-10 md:mb-0">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 text-shadow-lg">
                Connecting Top Talent with Leading Employers Across Europe
              </h1>
              <p className="text-lg md:text-xl mb-8 max-w-lg mx-auto md:mx-0 text-shadow">
                Specialized recruitment solutions tailored to your industry needs with multilingual support in Dutch, English, Polish, Romanian, and Bulgarian
              </p>
              <div className="flex flex-col sm:flex-row justify-center md:justify-start space-y-4 sm:space-y-0 sm:space-x-4">
                <Link href="/job-seekers">
                  <a className="btn btn-secondary">
                    Find Your Next Career
                  </a>
                </Link>
                <Link href="/employers">
                  <a className="btn bg-white text-orange-600 hover:bg-gray-100">
                    Hire Qualified Talent
                  </a>
                </Link>
              </div>
            </div>
            <div className="w-full md:w-1/2 relative">
              <div className="relative h-64 sm:h-80 md:h-96 rounded-lg overflow-hidden shadow-xl transform md:translate-x-8">
                <Image
                  src="/images/hero-image.jpg"
                  alt="Glodinas Flex Work"
                  layout="fill"
                  objectFit="cover"
                  priority
                />
              </div>
              <div className="absolute -bottom-4 -left-4 bg-white p-4 rounded-lg shadow-lg hidden md:block">
                <div className="flex items-center">
                  <div className="bg-green-500 h-3 w-3 rounded-full mr-2"></div>
                  <p className="text-gray-800 font-medium text-sm">
                    250+ Active Jobs
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Mobile job count indicator */}
        <div className="bg-white p-3 rounded-lg shadow-lg absolute bottom-4 left-1/2 transform -translate-x-1/2 md:hidden">
          <div className="flex items-center">
            <div className="bg-green-500 h-3 w-3 rounded-full mr-2"></div>
            <p className="text-gray-800 font-medium text-sm">
              250+ Active Jobs
            </p>
          </div>
        </div>
      </section>

      {/* Quick Stats Section */}
      <section className="py-10 bg-gray-50">
        <div className="container">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div className="p-4">
              <div className="text-3xl font-bold text-orange-600 mb-2">250+</div>
              <div className="text-gray-600 text-sm">Active Jobs</div>
            </div>
            <div className="p-4">
              <div className="text-3xl font-bold text-orange-600 mb-2">95%</div>
              <div className="text-gray-600 text-sm">Client Satisfaction</div>
            </div>
            <div className="p-4">
              <div className="text-3xl font-bold text-orange-600 mb-2">48h</div>
              <div className="text-gray-600 text-sm">Urgent Placement</div>
            </div>
            <div className="p-4">
              <div className="text-3xl font-bold text-orange-600 mb-2">5</div>
              <div className="text-gray-600 text-sm">Languages Supported</div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-16 bg-white">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Comprehensive Staffing Solutions</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">Tailored recruitment services to meet your specific needs</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white rounded-lg p-6 shadow-lg hover:shadow-xl transition-shadow">
              <div className="text-4xl text-orange-500 mb-4">⏱️</div>
              <h3 className="text-xl font-bold mb-3">Flexible Workforce Solutions</h3>
              <p className="text-gray-600 mb-4">Scale your team up or down with qualified temporary staff across logistics, manufacturing, healthcare, and more. Our rapid deployment ensures you have the right people when you need them most.</p>
              <Link href="/services#temporary">
                <a className="text-orange-600 font-medium hover:text-orange-700 flex items-center">
                  Explore Temporary Staffing
                  <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                  </svg>
                </a>
              </Link>
            </div>
            
            <div className="bg-white rounded-lg p-6 shadow-lg hover:shadow-xl transition-shadow">
              <div className="text-4xl text-orange-500 mb-4">🤝</div>
              <h3 className="text-xl font-bold mb-3">Strategic Talent Acquisition</h3>
              <p className="text-gray-600 mb-4">Find the perfect long-term additions to your team with our thorough recruitment process. We identify candidates who match both your skill requirements and company culture.</p>
              <Link href="/services#permanent">
                <a className="text-orange-600 font-medium hover:text-orange-700 flex items-center">
                  Discover Permanent Recruitment
                  <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                  </svg>
                </a>
              </Link>
            </div>
            
            <div className="bg-white rounded-lg p-6 shadow-lg hover:shadow-xl transition-shadow">
              <div className="text-4xl text-orange-500 mb-4">🏭</div>
              <h3 className="text-xl font-bold mb-3">Industry-Specific Recruitment</h3>
              <p className="text-gray-600 mb-4">Benefit from our deep understanding of key European industries including logistics, manufacturing, healthcare, hospitality, retail, and construction.</p>
              <Link href="/industries">
                <a className="text-orange-600 font-medium hover:text-orange-700 flex items-center">
                  View Industry Solutions
                  <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                  </svg>
                </a>
              </Link>
            </div>
            
            <div className="bg-white rounded-lg p-6 shadow-lg hover:shadow-xl transition-shadow">
              <div className="text-4xl text-orange-500 mb-4">🌍</div>
              <h3 className="text-xl font-bold mb-3">Cross-Border Recruitment</h3>
              <p className="text-gray-600 mb-4">Break language barriers with our multilingual team providing support in Dutch, English, Polish, Romanian, and Bulgarian, facilitating international placements.</p>
              <Link href="/about">
                <a className="text-orange-600 font-medium hover:text-orange-700 flex items-center">
                  Learn About Our Approach
                  <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                  </svg>
                </a>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Rest of the page content... */}
    </>
  );
}
