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
  
  // Show job alert notification after 5 seconds
  useEffect(() => {
    if (!jobAlertShown) {
      const timer = setTimeout(() => {
        addNotification('New jobs available in your area! Check them out now.', 'info');
        setJobAlertShown(true);
      }, 5000);
      
      return () => clearTimeout(timer);
    }
  }, [addNotification, jobAlertShown]);
  
  const testimonials = [
    {
      name: "Jan de Vries",
      position: "HR Director, LogiTech Solutions",
      quote: "Glodinas Flex Work has transformed our hiring process. Their team understood our specific needs and consistently delivered high-quality candidates who fit our company culture.",
      image: "/images/testimonial-1.jpg"
    },
    {
      name: "Maria Kowalski",
      position: "Operations Manager, MediCare Plus",
      quote: "The multilingual support from Glodinas has been invaluable for our diverse workforce. They've helped us find specialized healthcare staff when other agencies couldn't deliver.",
      image: "/images/testimonial-2.jpg"
    },
    {
      name: "Andrei Popescu",
      position: "Warehouse Supervisor, EuroFreight",
      quote: "I was impressed by how quickly Glodinas responded to our urgent staffing needs. Within 48 hours, we had qualified temporary workers who were ready to hit the ground running.",
      image: "/images/testimonial-3.jpg"
    }
  ];
  
  return (
    <div>
      <Head>
        <title>Glodinas Flex Work | Professional Staffing Solutions</title>
        <meta name="description" content="Specialized recruitment solutions across Europe with multilingual support in Dutch, English, Polish, Romanian, and Bulgarian." />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      
      {/* Hero Section */}
      <section className="bg-orange-600 text-white">
        <div className="container mx-auto px-4 py-16 md:py-24 flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 mb-10 md:mb-0">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              Connecting Top Talent with Leading Employers Across Europe
            </h1>
            <p className="text-xl mb-8">
              Specialized recruitment solutions tailored to your industry needs with multilingual support in Dutch, English, Polish, Romanian, and Bulgarian
            </p>
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
              <Link href="/job-seekers">
                <a className="bg-pink-100 text-pink-800 hover:bg-pink-200 px-6 py-3 rounded-md font-medium text-center transition duration-300">
                  Find Your Next Career
                </a>
              </Link>
              <Link href="/employers">
                <a className="bg-green-100 text-green-800 hover:bg-green-200 px-6 py-3 rounded-md font-medium text-center transition duration-300">
                  Hire Qualified Talent
                </a>
              </Link>
            </div>
          </div>
          <div className="md:w-1/2">
            <div className="relative">
              <Image
                src="/images/hero-image.jpg"
                alt="Glodinas Flex Work"
                width={600}
                height={400}
                className="rounded-lg shadow-xl"
              />
              <div className="absolute -bottom-4 -right-4 bg-white text-green-600 py-2 px-4 rounded-full font-bold shadow-lg">
                250+ Active Jobs
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-orange-500 mb-2">250+</div>
              <div className="text-gray-600">Active Jobs</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-orange-500 mb-2">95%</div>
              <div className="text-gray-600">Client Satisfaction</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-orange-500 mb-2">48h</div>
              <div className="text-gray-600">Urgent Placement</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-orange-500 mb-2">5</div>
              <div className="text-gray-600">Languages Supported</div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Services Section */}
      <section className="py-16 bg-gray-100">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Comprehensive Staffing Solutions</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">Tailored recruitment services to meet your specific needs</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Service 1 */}
            <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-xl transition duration-300">
              <div className="text-4xl mb-4">⏱️</div>
              <h3 className="text-xl font-bold mb-3">Flexible Workforce Solutions</h3>
              <p className="text-gray-600 mb-4">
                Scale your team up or down with qualified temporary staff across logistics, manufacturing, healthcare, and more. Our rapid deployment ensures you have the right people when you need them most.
              </p>
              <Link href="/services#temporary">
                <a className="text-orange-600 hover:text-orange-800 font-medium">
                  Explore Temporary Staffing
                </a>
              </Link>
            </div>
            
            {/* Service 2 */}
            <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-xl transition duration-300">
              <div className="text-4xl mb-4">🤝</div>
              <h3 className="text-xl font-bold mb-3">Strategic Talent Acquisition</h3>
              <p className="text-gray-600 mb-4">
                Find the perfect long-term additions to your team with our thorough recruitment process. We identify candidates who match both your skill requirements and company culture.
              </p>
              <Link href="/services#permanent">
                <a className="text-orange-600 hover:text-orange-800 font-medium">
                  Discover Permanent Recruitment
                </a>
              </Link>
            </div>
            
            {/* Service 3 */}
            <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-xl transition duration-300">
              <div className="text-4xl mb-4">🏭</div>
              <h3 className="text-xl font-bold mb-3">Industry-Specific Recruitment</h3>
              <p className="text-gray-600 mb-4">
                Benefit from our deep understanding of key European industries including logistics, manufacturing, healthcare, hospitality, retail, and construction.
              </p>
              <Link href="/industries">
                <a className="text-orange-600 hover:text-orange-800 font-medium">
                  View Industry Solutions
                </a>
              </Link>
            </div>
            
            {/* Service 4 */}
            <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-xl transition duration-300">
              <div className="text-4xl mb-4">🌍</div>
              <h3 className="text-xl font-bold mb-3">Cross-Border Recruitment</h3>
              <p className="text-gray-600 mb-4">
                Break language barriers with our multilingual team providing support in Dutch, English, Polish, Romanian, and Bulgarian, facilitating international placements.
              </p>
              <Link href="/services#international">
                <a className="text-orange-600 hover:text-orange-800 font-medium">
                  Learn About Our Approach
                </a>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
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
                    <p className="text-gray-600">Our specialized recruiters tap into our extensive talent pool and network</p>
                  </div>
                </div>
                
                <div className="flex">
                  <div className="flex-shrink-0 mr-4">
                    <div className="flex items-center justify-center w-10 h-10 rounded-full bg-orange-500 text-white font-bold">3</div>
                  </div>
                  <div>
                    <h4 className="text-xl font-semibold mb-2">Rigorous Screening</h4>
                    <p className="text-gray-600">We thoroughly vet candidates through interviews, skills assessments, and reference checks</p>
                  </div>
                </div>
                
                <div className="flex">
                  <div className="flex-shrink-0 mr-4">
                    <div className="flex items-center justify-center w-10 h-10 rounded-full bg-orange-500 text-white font-bold">4</div>
                  </div>
                  <div>
                    <h4 className="text-xl font-semibold mb-2">Perfect Match</h4>
                    <p className="text-gray-600">We present only the most qualified candidates who align with your needs</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="text-2xl font-bold mb-6 text-center md:text-left">For Job Seekers</h3>
              <div className="space-y-8">
                <div className="flex">
                  <div className="flex-shrink-0 mr-4">
                    <div className="flex items-center justify-center w-10 h-10 rounded-full bg-blue-500 text-white font-bold">1</div>
                  </div>
                  <div>
                    <h4 className="text-xl font-semibold mb-2">Profile Creation</h4>
                    <p className="text-gray-600">Register and create your professional profile highlighting your skills and experience</p>
                  </div>
                </div>
                
                <div className="flex">
                  <div className="flex-shrink-0 mr-4">
                    <div className="flex items-center justify-center w-10 h-10 rounded-full bg-blue-500 text-white font-bold">2</div>
                  </div>
                  <div>
                    <h4 className="text-xl font-semibold mb-2">Career Consultation</h4>
                    <p className="text-gray-600">Our recruiters learn about your career goals and preferences</p>
                  </div>
                </div>
                
                <div className="flex">
                  <div className="flex-shrink-0 mr-4">
                    <div className="flex items-center justify-center w-10 h-10 rounded-full bg-blue-500 text-white font-bold">3</div>
                  </div>
                  <div>
                    <h4 className="text-xl font-semibold mb-2">Job Matching</h4>
                    <p className="text-gray-600">We connect you with opportunities that align with your skills and career aspirations</p>
                  </div>
                </div>
                
                <div className="flex">
                  <div className="flex-shrink-0 mr-4">
                    <div className="flex items-center justify-center w-10 h-10 rounded-full bg-blue-500 text-white font-bold">4</div>
                  </div>
                  <div>
                    <h4 className="text-xl font-semibold mb-2">Ongoing Support</h4>
                    <p className="text-gray-600">We provide interview preparation, feedback, and continued career guidance</p>
                  </div>
                </div>
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
                      src={`/images/industries/${industry}.svg`}
                      alt={industry}
                      width={48}
                      height={48}
                    />
                  </div>
                  <div className="font-medium capitalize">{industry}</div>
                </a>
              </Link>
            ))}
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
            <div className="bg-white rounded-xl shadow-lg p-8">
              <div className="flex flex-col md:flex-row items-center">
                <div className="md:w-1/3 mb-6 md:mb-0">
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
                    <div className="font-bold">{testimonials[activeTestimonial].name}</div>
                    <div className="text-sm text-gray-600">{testimonials[activeTestimonial].position}</div>
                  </div>
                </div>
                <div className="md:w-2/3 md:pl-8">
                  <div className="text-gray-600 italic text-lg">"{testimonials[activeTestimonial].quote}"</div>
                </div>
              </div>
              
              <div className="flex justify-center mt-8 space-x-2">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveTestimonial(index)}
                    className={`w-3 h-3 rounded-full ${
                      activeTestimonial === index ? 'bg-orange-500' : 'bg-gray-300'
                    }`}
                    aria-label={`Testimonial ${index + 1}`}
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
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Transform Your Workforce?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Whether you're looking to hire top talent or find your next career opportunity, we're here to help you succeed.
          </p>
          <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
            <Link href="/contact">
              <a className="bg-white text-orange-600 hover:bg-gray-100 px-8 py-3 rounded-md font-medium text-lg">
                Contact Us Today
              </a>
            </Link>
            <Link href="/register">
              <a className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-orange-600 px-8 py-3 rounded-md font-medium text-lg transition duration-300">
                Create an Account
              </a>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
