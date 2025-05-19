import { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import { useTranslation } from 'react-i18next';
import { serverSideTranslations } from '../lib/i18n';
import { useNotification } from '../components/Notification';

const industries = [
  'logistics',
  'manufacturing',
  'healthcare',
  'hospitality',
  'retail',
  'construction'
];

export default function Home() {
  const { t } = useTranslation('common');
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

      {/* How It Works Section */}
      <section className="py-16 bg-gray-50">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">A Streamlined Process for Success</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">We've simplified recruitment to deliver exceptional results</p>
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
                    <h4 className="text-xl font-semibold mb-2">Consultation</h4>
                    <p className="text-gray-600">We learn about your business, culture, and specific staffing requirements</p>
                  </div>
                </div>
                
                <div className="flex">
                  <div className="flex-shrink-0 mr-4">
                    <div className="flex items-center justify-center w-10 h-10 rounded-full bg-orange-500 text-white font-bold">2</div>
                  </div>
                  <div>
                    <h4 className="text-xl font-semibold mb-2">Candidate Sourcing</h4>
                    <p className="text-gray-600">Our specialists identify and screen qualified candidates from our extensive network</p>
                  </div>
                </div>
                
                <div className="flex">
                  <div className="flex-shrink-0 mr-4">
                    <div className="flex items-center justify-center w-10 h-10 rounded-full bg-orange-500 text-white font-bold">3</div>
                  </div>
                  <div>
                    <h4 className="text-xl font-semibold mb-2">Perfect Match</h4>
                    <p className="text-gray-600">We present only the most suitable candidates, saving you time and resources</p>
                  </div>
                </div>
                
                <div className="flex">
                  <div className="flex-shrink-0 mr-4">
                    <div className="flex items-center justify-center w-10 h-10 rounded-full bg-orange-500 text-white font-bold">4</div>
                  </div>
                  <div>
                    <h4 className="text-xl font-semibold mb-2">Onboarding Support</h4>
                    <p className="text-gray-600">We facilitate a smooth transition for new team members</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="text-2xl font-bold mb-6 text-center md:text-left">For Job Seekers</h3>
              <div className="space-y-8">
                <div className="flex">
                  <div className="flex-shrink-0 mr-4">
                    <div className="flex items-center justify-center w-10 h-10 rounded-full bg-orange-500 text-white font-bold">1</div>
                  </div>
                  <div>
                    <h4 className="text-xl font-semibold mb-2">Profile Creation</h4>
                    <p className="text-gray-600">Register and share your skills, experience, and career goals</p>
                  </div>
                </div>
                
                <div className="flex">
                  <div className="flex-shrink-0 mr-4">
                    <div className="flex items-center justify-center w-10 h-10 rounded-full bg-orange-500 text-white font-bold">2</div>
                  </div>
                  <div>
                    <h4 className="text-xl font-semibold mb-2">Personalized Matching</h4>
                    <p className="text-gray-600">We identify opportunities aligned with your qualifications and preferences</p>
                  </div>
                </div>
                
                <div className="flex">
                  <div className="flex-shrink-0 mr-4">
                    <div className="flex items-center justify-center w-10 h-10 rounded-full bg-orange-500 text-white font-bold">3</div>
                  </div>
                  <div>
                    <h4 className="text-xl font-semibold mb-2">Interview Preparation</h4>
                    <p className="text-gray-600">Receive guidance and support throughout the interview process</p>
                  </div>
                </div>
                
                <div className="flex">
                  <div className="flex-shrink-0 mr-4">
                    <div className="flex items-center justify-center w-10 h-10 rounded-full bg-orange-500 text-white font-bold">4</div>
                  </div>
                  <div>
                    <h4 className="text-xl font-semibold mb-2">Career Success</h4>
                    <p className="text-gray-600">Begin your new role with ongoing support from our team</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="mt-12 text-center">
            <Link href="/register">
              <a className="btn btn-primary">Get Started Today</a>
            </Link>
          </div>
        </div>
      </section>

      {/* Success Metrics Section */}
      <section className="py-16 bg-white">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Delivering Measurable Results</h2>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center p-6">
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-orange-100 text-orange-600 mb-4">
                <span className="text-2xl font-bold">72h</span>
              </div>
              <h3 className="text-lg font-semibold">Average Time-to-Fill</h3>
              <p className="text-gray-600 text-sm">For urgent positions</p>
            </div>
            
            <div className="text-center p-6">
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-orange-100 text-orange-600 mb-4">
                <span className="text-2xl font-bold">92%</span>
              </div>
              <h3 className="text-lg font-semibold">Retention Rate</h3>
              <p className="text-gray-600 text-sm">For permanent placements</p>
            </div>
            
            <div className="text-center p-6">
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-orange-100 text-orange-600 mb-4">
                <span className="text-2xl font-bold">30%</span>
              </div>
              <h3 className="text-lg font-semibold">Cost Savings</h3>
              <p className="text-gray-600 text-sm">Through flexible staffing</p>
            </div>
            
            <div className="text-center p-6">
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-orange-100 text-orange-600 mb-4">
                <span className="text-2xl font-bold">4.8</span>
              </div>
              <h3 className="text-lg font-semibold">Client Rating</h3>
              <p className="text-gray-600 text-sm">Out of 5 stars</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 bg-gray-50">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">What Our Partners Say</h2>
          </div>
          
          <div className="max-w-4xl mx-auto">
            <div className="relative bg-white rounded-lg shadow-lg p-8">
              <div className="text-5xl text-orange-300 absolute top-4 left-4 opacity-50">"</div>
              <div className="relative z-10">
                <p className="text-lg italic mb-6">{testimonials[activeTestimonial].quote}</p>
                <p className="font-semibold text-gray-700">{testimonials[activeTestimonial].author}</p>
              </div>
            </div>
            
            <div className="flex justify-center mt-6 space-x-2">
              {testimonials.map((_, index) => (
                <button 
                  key={index}
                  onClick={() => setActiveTestimonial(index)}
                  className={`w-3 h-3 rounded-full ${index === activeTestimonial ? 'bg-orange-500' : 'bg-gray-300'}`}
                  aria-label={`Testimonial ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Industries Section */}
      <section className="py-16 bg-white">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Specialized Recruitment Across Key Industries</h2>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6">
            {industryData.map((industry, index) => (
              <div 
                key={index} 
                className={`bg-white rounded-lg p-6 border transition-all duration-300 ${index === activeIndustry ? 'border-orange-500 shadow-lg' : 'border-gray-200'}`}
              >
                <div className="text-4xl mb-4">{industry.icon}</div>
                <h3 className="text-xl font-bold mb-2">{industry.name}</h3>
                <p className="text-gray-600">{industry.roles}</p>
              </div>
            ))}
          </div>
          
          <div className="mt-12 text-center">
            <Link href="/industries">
              <a className="btn btn-outline">Explore All Industries</a>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-orange-500 text-white">
        <div className="container">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Transform Your Workforce Strategy?</h2>
            <p className="text-lg mb-8">Partner with Glodinas Flex Work for flexible, efficient, and cost-effective staffing solutions</p>
            <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
              <Link href="/contact">
                <a className="btn bg-white text-orange-600 hover:bg-gray-100">Request a Consultation</a>
              </Link>
              <Link href="/job-seekers">
                <a className="btn btn-outline-white">View Available Positions</a>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Indicators Section */}
      <section className="py-16 bg-white">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Choose Glodinas Flex Work</h2>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-orange-100 text-orange-600 mb-4">
                <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd"></path>
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2">Industry Expertise</h3>
              <p className="text-gray-600">Specialized recruiters with deep industry knowledge</p>
            </div>
            
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-orange-100 text-orange-600 mb-4">
                <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" d="M4.083 9h1.946c.089-1.546.383-2.97.837-4.118A6.004 6.004 0 004.083 9zM10 2a8 8 0 100 16 8 8 0 000-16zm0 2c-.076 0-.232.032-.465.262-.238.234-.497.623-.737 1.182-.389.907-.673 2.142-.766 3.556h3.936c-.093-1.414-.377-2.649-.766-3.556-.24-.56-.5-.948-.737-1.182C10.232 4.032 10.076 4 10 4zm3.971 5c-.089-1.546-.383-2.97-.837-4.118A6.004 6.004 0 0115.917 9h-1.946zm-2.003 2H8.032c.093 1.414.377 2.649.766 3.556.24.56.5.948.737 1.182.233.23.389.262.465.262.076 0 .232-.032.465-.262.238-.234.498-.623.737-1.182.389-.907.673-2.142.766-3.556zm1.166 4.118c.454-1.147.748-2.572.837-4.118h1.946a6.004 6.004 0 01-2.783 4.118zm-6.268 0C6.412 13.97 6.118 12.546 6.03 11H4.083a6.004 6.004 0 002.783 4.118z" clipRule="evenodd"></path>
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2">Multilingual Support</h3>
              <p className="text-gray-600">Communication in 5 languages for international recruitment</p>
            </div>
            
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-orange-100 text-orange-600 mb-4">
                <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd"></path>
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2">Rapid Response</h3>
              <p className="text-gray-600">Quick turnaround for urgent staffing needs</p>
            </div>
            
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-orange-100 text-orange-600 mb-4">
                <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2">Quality Guarantee</h3>
              <p className="text-gray-600">Thorough vetting process for all candidates</p>
            </div>
            
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-orange-100 text-orange-600 mb-4">
                <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z"></path>
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2">Ongoing Support</h3>
              <p className="text-gray-600">Continued assistance throughout the employment relationship</p>
            </div>
            
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-orange-100 text-orange-600 mb-4">
                <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2">Compliance Assured</h3>
              <p className="text-gray-600">Full adherence to employment regulations across Europe</p>
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
