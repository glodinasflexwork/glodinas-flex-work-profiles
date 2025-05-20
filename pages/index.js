import { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import { useNotification } from '../components/NotificationContext';

export default function Home() {
  const { addNotification } = useNotification();
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  
  const industries = [
    'logistics',
    'manufacturing',
    'healthcare',
    'hospitality',
    'retail',
    'construction'
  ];
  
  const testimonials = [
    {
      id: 1,
      name: 'Jan de Vries',
      position: 'HR Director, LogiTech Solutions',
      image: '/images/testimonials/testimonial-1.jpg',
      quote: 'Glodinas Flex Work has transformed our hiring process. Their team understood our specific needs and consistently delivered high-quality candidates who fit our company culture.'
    },
    {
      id: 2,
      name: 'Maria Kovacs',
      position: 'Operations Manager, EuroHealth',
      image: '/images/testimonials/testimonial-2.jpg',
      quote: 'Finding qualified healthcare staff was a constant challenge until we partnered with Glodinas. Their specialized recruitment approach and multilingual support have been invaluable.'
    },
    {
      id: 3,
      name: 'Thomas Bergmann',
      position: 'CEO, Alpine Hospitality Group',
      image: '/images/testimonials/testimonial-3.jpg',
      quote: 'The quality of candidates and the speed of placement have exceeded our expectations. Glodinas Flex Work understands the unique demands of the hospitality industry.'
    }
  ];
  
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    
    return () => clearInterval(interval);
  }, [testimonials.length]);
  
  const handleShowNotification = () => {
    addNotification('Welcome to Glodinas Flex Work! Explore our services to find your perfect match.', 'info');
  };
  
  return (
    <div>
      <Head>
        <title>Glodinas Flex Work | Connecting Top Talent with Leading Employers</title>
        <meta name="description" content="Specialized recruitment solutions tailored to your industry needs with multilingual support in Dutch, English, Polish, Romanian, and Bulgarian" />
      </Head>
      
      {/* Hero Section */}
      <section className="bg-orange-600 text-white py-16">
        <div className="container mx-auto px-4 flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 mb-8 md:mb-0">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Connecting Top Talent with Leading Employers Across Europe</h1>
            <p className="text-xl mb-8">Specialized recruitment solutions tailored to your industry needs with multilingual support in Dutch, English, Polish, Romanian, and Bulgarian</p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/job-seekers">
                <a className="bg-white text-orange-600 hover:bg-gray-100 py-3 px-6 rounded-md font-medium text-center">Find Your Next Career</a>
              </Link>
              <Link href="/employers">
                <a className="bg-transparent hover:bg-orange-700 border border-white py-3 px-6 rounded-md font-medium text-center">Hire Qualified Talent</a>
              </Link>
            </div>
          </div>
          <div className="md:w-1/2">
            <div className="relative">
              <Image
                src="/images/hero.jpg"
                alt="Glodinas Flex Work"
                width={600}
                height={400}
                className="rounded-lg shadow-xl"
              />
              <div className="absolute -bottom-4 -right-4 bg-white text-orange-600 py-2 px-4 rounded-lg shadow-lg font-bold">
                250+ Active Jobs
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Industries Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Industries We Serve</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">Specialized recruitment expertise across key European sectors</p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {industries.map((industry) => (
              <Link key={industry} href={`/industries/${industry}`}>
                <a className="bg-gray-100 hover:bg-gray-200 rounded-lg p-6 text-center transition duration-300">
                  <div className="mb-3">
                    <Image
                      src={`/images/industries/${industry}.jpg`}
                      alt={industry}
                      width={80}
                      height={80}
                      className="mx-auto"
                    />
                  </div>
                  <h3 className="font-medium capitalize">{industry}</h3>
                </a>
              </Link>
            ))}
          </div>
        </div>
      </section>
      
      {/* How It Works Section */}
      <section className="py-16 bg-gray-100">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">How It Works</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">Simple, transparent process for both employers and job seekers</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="w-12 h-12 bg-orange-600 text-white rounded-full flex items-center justify-center text-xl font-bold mb-4">1</div>
              <h3 className="text-xl font-bold mb-3">Register</h3>
              <p className="text-gray-600">Create your profile as an employer or job seeker with your specific requirements and qualifications.</p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="w-12 h-12 bg-orange-600 text-white rounded-full flex items-center justify-center text-xl font-bold mb-4">2</div>
              <h3 className="text-xl font-bold mb-3">Match</h3>
              <p className="text-gray-600">Our specialized team matches employers with qualified candidates based on skills, experience, and cultural fit.</p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="w-12 h-12 bg-orange-600 text-white rounded-full flex items-center justify-center text-xl font-bold mb-4">3</div>
              <h3 className="text-xl font-bold mb-3">Connect</h3>
              <p className="text-gray-600">Interview selected candidates, make hiring decisions, and receive ongoing support throughout the process.</p>
            </div>
          </div>
          
          <div className="text-center mt-10">
            <button 
              onClick={handleShowNotification}
              className="bg-orange-600 hover:bg-orange-700 text-white py-3 px-6 rounded-md font-medium"
            >
              Learn More
            </button>
          </div>
        </div>
      </section>
      
      {/* Services Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Services</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">Comprehensive recruitment solutions tailored to your needs</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="border border-gray-200 rounded-lg overflow-hidden">
              <div className="h-48 relative">
                <Image
                  src="/images/temp-staffing.jpg"
                  alt="Temporary Staffing"
                  layout="fill"
                  objectFit="cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-3">Temporary Staffing</h3>
                <p className="text-gray-600 mb-4">Flexible workforce solutions for seasonal peaks, special projects, or temporary replacements.</p>
                <Link href="/services#temporary-staffing">
                  <a className="text-orange-600 hover:text-orange-800 font-medium">Learn more →</a>
                </Link>
              </div>
            </div>
            
            <div className="border border-gray-200 rounded-lg overflow-hidden">
              <div className="h-48 relative">
                <Image
                  src="/images/recruitment.jpg"
                  alt="Permanent Recruitment"
                  layout="fill"
                  objectFit="cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-3">Permanent Recruitment</h3>
                <p className="text-gray-600 mb-4">End-to-end recruitment services to find the perfect long-term additions to your team.</p>
                <Link href="/services#permanent-recruitment">
                  <a className="text-orange-600 hover:text-orange-800 font-medium">Learn more →</a>
                </Link>
              </div>
            </div>
            
            <div className="border border-gray-200 rounded-lg overflow-hidden">
              <div className="h-48 relative">
                <Image
                  src="/images/housing.jpg"
                  alt="Housing Solutions"
                  layout="fill"
                  objectFit="cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-3">Housing Solutions</h3>
                <p className="text-gray-600 mb-4">Quality accommodation options for international workers relocating to the Netherlands.</p>
                <Link href="/services#housing-solutions">
                  <a className="text-orange-600 hover:text-orange-800 font-medium">Learn more →</a>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Testimonials Section */}
      <section className="py-16 bg-gray-100">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">What Our Clients Say</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">Trusted by leading companies across Europe</p>
          </div>
          
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-lg shadow-lg p-8">
              <div className="flex flex-col md:flex-row items-center">
                <div className="md:w-1/4 mb-6 md:mb-0">
                  <div className="w-24 h-24 rounded-full overflow-hidden mx-auto">
                    <Image
                      src={testimonials[activeTestimonial].image}
                      alt={testimonials[activeTestimonial].name}
                      width={96}
                      height={96}
                      className="object-cover"
                    />
                  </div>
                  <div className="text-center mt-4">
                    <h4 className="font-bold">{testimonials[activeTestimonial].name}</h4>
                    <p className="text-sm text-gray-600">{testimonials[activeTestimonial].position}</p>
                  </div>
                </div>
                <div className="md:w-3/4 md:pl-8">
                  <p className="text-gray-700 italic text-lg">"{testimonials[activeTestimonial].quote}"</p>
                </div>
              </div>
              
              <div className="flex justify-center mt-6">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveTestimonial(index)}
                    className={`w-3 h-3 rounded-full mx-1 ${
                      index === activeTestimonial ? 'bg-orange-600' : 'bg-gray-300'
                    }`}
                    aria-label={`View testimonial ${index + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-16 bg-orange-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Find Your Perfect Match?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">Whether you're looking for your next career opportunity or seeking qualified talent, we're here to help.</p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link href="/job-seekers">
              <a className="bg-white text-orange-600 hover:bg-gray-100 py-3 px-6 rounded-md font-medium">For Job Seekers</a>
            </Link>
            <Link href="/employers">
              <a className="bg-transparent hover:bg-orange-700 border border-white py-3 px-6 rounded-md font-medium">For Employers</a>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
