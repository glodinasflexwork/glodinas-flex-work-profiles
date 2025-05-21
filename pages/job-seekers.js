import { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import { useNotification } from '../components/NotificationContext';
import FileUpload from '../components/FileUpload';

export default function JobSeekers() {
  const { addNotification } = useNotification();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterLocation, setFilterLocation] = useState('');
  const [filterJobType, setFilterJobType] = useState('');
  const [filterIndustry, setFilterIndustry] = useState('');
  const [showJobForm, setShowJobForm] = useState(false);
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    location: '',
    preferredLanguage: 'English',
    jobTitle: '',
    experience: '',
    education: '',
    skills: [],
    availability: '',
    workPermit: false,
    relocate: false,
    salaryExpectation: '',
    resumeUrl: '',
    coverLetterUrl: '',
    referralSource: '',
    termsAccepted: false,
    jobAlerts: false
  });
  
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };
  
  const handleSkillChange = (skill) => {
    const updatedSkills = formData.skills.includes(skill)
      ? formData.skills.filter(s => s !== skill)
      : [...formData.skills, skill];
    
    setFormData({
      ...formData,
      skills: updatedSkills
    });
  };

  const handleFileUpload = (fieldName, url) => {
    setFormData({
      ...formData,
      [fieldName]: url
    });
  };
  
  const handleNext = () => {
    // Validate current step
    if (step === 1) {
      if (!formData.firstName || !formData.lastName || !formData.email || !formData.phone) {
        addNotification('Please fill in all required fields.', 'error');
        return;
      }
    } else if (step === 2) {
      if (!formData.jobTitle || !formData.experience) {
        addNotification('Please fill in all required fields.', 'error');
        return;
      }
    } else if (step === 3) {
      if (formData.skills.length === 0) {
        addNotification('Please select at least one skill.', 'error');
        return;
      }
      
      if (!formData.resumeUrl) {
        addNotification('Please upload your resume/CV.', 'error');
        return;
      }
    }
    
    setStep(step + 1);
    window.scrollTo(0, 0);
  };
  
  const handleBack = () => {
    setStep(step - 1);
    window.scrollTo(0, 0);
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.termsAccepted) {
      addNotification('Please accept the terms and conditions.', 'error');
      return;
    }
    
    try {
      // Demo submission - would be replaced with actual API call
      addNotification('Your application has been submitted successfully!', 'success');
      
      // Reset form after successful submission
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        location: '',
        preferredLanguage: 'English',
        jobTitle: '',
        experience: '',
        education: '',
        skills: [],
        availability: '',
        workPermit: false,
        relocate: false,
        salaryExpectation: '',
        resumeUrl: '',
        coverLetterUrl: '',
        referralSource: '',
        termsAccepted: false,
        jobAlerts: false
      });
      setStep(1);
      setShowJobForm(false);
    } catch (error) {
      addNotification('There was an error submitting your application. Please try again.', 'error');
    }
  };
  
  const skills = [
    'Customer Service',
    'Warehouse Operations',
    'Forklift Operation',
    'Inventory Management',
    'Quality Control',
    'Assembly Line',
    'CNC Operation',
    'Healthcare Support',
    'Food Preparation',
    'Cleaning Services',
    'Retail Sales',
    'Administrative Support',
    'Driving/Delivery',
    'Construction',
    'Multilingual'
  ];

  const featuredJobs = [
    {
      id: 1,
      title: 'Warehouse Operator',
      company: 'Global Logistics BV',
      location: 'Amsterdam, Netherlands',
      type: 'Full-time',
      salary: '€2,400 - €2,800 per month',
      description: 'Join our warehouse team to handle inventory management, order picking, and packaging in a fast-paced environment.',
      requirements: ['Previous warehouse experience', 'Forklift certification', 'Basic English'],
      urgent: true,
      industry: 'Logistics'
    },
    {
      id: 2,
      title: 'Production Line Worker',
      company: 'Tech Manufacturing',
      location: 'Rotterdam, Netherlands',
      type: 'Full-time',
      salary: '€2,300 - €2,600 per month',
      description: 'Work on our production line assembling electronic components with attention to quality and detail.',
      requirements: ['Manual dexterity', 'Ability to stand for long periods', 'Team player'],
      urgent: false,
      industry: 'Manufacturing'
    },
    {
      id: 3,
      title: 'Healthcare Assistant',
      company: 'Senior Care Center',
      location: 'Utrecht, Netherlands',
      type: 'Part-time',
      salary: '€14 - €16 per hour',
      description: 'Provide compassionate care to elderly residents in our modern care facility.',
      requirements: ['Healthcare certification preferred', 'Patient and caring attitude', 'Dutch or English fluency'],
      urgent: true,
      industry: 'Healthcare'
    },
    {
      id: 4,
      title: 'Retail Sales Associate',
      company: 'Fashion Retail Group',
      location: 'The Hague, Netherlands',
      type: 'Part-time',
      salary: '€12 - €14 per hour',
      description: 'Help customers find the perfect products while maintaining store presentation and inventory.',
      requirements: ['Customer service experience', 'Sales skills', 'Flexible schedule availability'],
      urgent: false,
      industry: 'Retail'
    },
    {
      id: 5,
      title: 'Construction Helper',
      company: 'Build Right Construction',
      location: 'Eindhoven, Netherlands',
      type: 'Full-time',
      salary: '€2,500 - €3,000 per month',
      description: 'Assist skilled tradespeople on construction sites with various tasks and material handling.',
      requirements: ['Physical stamina', 'Basic construction knowledge', 'Safety-conscious'],
      urgent: true,
      industry: 'Construction'
    },
    {
      id: 6,
      title: 'Hotel Housekeeper',
      company: 'Luxury Hotels Group',
      location: 'Amsterdam, Netherlands',
      type: 'Full-time',
      salary: '€2,200 - €2,400 per month',
      description: 'Maintain our high standards of cleanliness and presentation in guest rooms and public areas.',
      requirements: ['Attention to detail', 'Efficient work pace', 'Previous cleaning experience preferred'],
      urgent: false,
      industry: 'Hospitality'
    }
  ];

  const testimonials = [
    {
      id: 1,
      name: 'Marta K.',
      position: 'Warehouse Supervisor',
      image: '/images/testimonials/testimonial-1.jpg',
      quote: 'Glodinas helped me find not just a job, but a career path. I started as a warehouse associate and within a year, I was promoted to supervisor. Their team provided guidance every step of the way.'
    },
    {
      id: 2,
      name: 'Sophia L.',
      position: 'Healthcare Assistant',
      image: '/images/testimonials/testimonial-2.jpg',
      quote: "As a newcomer to the Netherlands, I was struggling to find work in healthcare. Glodinas not only found me a perfect position but also helped with the paperwork and transition. I'm so grateful!"
    },
    {
      id: 3,
      name: 'Thomas B.',
      position: 'Production Team Lead',
      image: '/images/testimonials/testimonial-3.jpg',
      quote: "What impressed me most was how Glodinas took the time to understand my skills and career goals. They matched me with a company where I could grow, and I've been thriving ever since."
    }
  ];

  const filteredJobs = featuredJobs.filter(job => {
    return (
      job.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (filterLocation === '' || job.location.includes(filterLocation)) &&
      (filterJobType === '' || job.type === filterJobType) &&
      (filterIndustry === '' || job.industry === filterIndustry)
    );
  });

  return (
    <div>
      <Head>
        <title>Job Seekers | Glodinas Flex Work</title>
        <meta name="description" content="Find your next career opportunity with Glodinas Flex Work. Access hundreds of job openings across Europe and get personalized job matching." />
      </Head>
      
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-orange-600 to-orange-500 text-white py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="flex flex-col md:flex-row items-center">
              <div className="md:w-1/2 mb-8 md:mb-0 md:pr-8">
                <h1 className="text-4xl md:text-5xl font-bold mb-6">Find Your Perfect Flex Work Opportunity</h1>
                <p className="text-xl mb-8">Access hundreds of exclusive job openings across Europe with personalized matching and support in multiple languages.</p>
                
                <div className="bg-white rounded-lg p-4 shadow-lg">
                  <div className="flex flex-col md:flex-row">
                    <input
                      type="text"
                      placeholder="Search jobs by title or keyword"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="flex-grow p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 mb-2 md:mb-0 md:mr-2 text-gray-800"
                    />
                    <button
                      onClick={() => window.scrollTo({top: document.getElementById('job-listings').offsetTop - 100, behavior: 'smooth'})}
                      className="bg-orange-600 text-white px-6 py-3 rounded-md hover:bg-orange-700 transition duration-300"
                    >
                      Search Jobs
                    </button>
                  </div>
                </div>
                
                <div className="mt-8 flex flex-wrap gap-4">
                  <button
                    onClick={() => setShowJobForm(true)}
                    className="bg-white text-orange-600 px-6 py-3 rounded-md hover:bg-orange-100 transition duration-300 font-semibold"
                  >
                    Upload Your Resume
                  </button>
                  <a
                    href="#job-listings"
                    className="bg-transparent border-2 border-white text-white px-6 py-3 rounded-md hover:bg-white hover:text-orange-600 transition duration-300 font-semibold"
                  >
                    Browse Open Positions
                  </a>
                </div>
              </div>
              <div className="md:w-1/2">
                <div className="relative h-80 md:h-96 w-full rounded-lg overflow-hidden shadow-xl">
                  <Image
                    src="/images/hero.jpg"
                    alt="Diverse professionals in a workplace setting"
                    layout="fill"
                    objectFit="cover"
                    priority
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Job Search & Filter Section */}
      <section id="job-listings" className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Featured Job Opportunities</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">Browse our latest openings or use filters to find your perfect match</p>
          </div>
          
          <div className="bg-white rounded-lg p-6 shadow-md mb-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div>
                <label className="block text-gray-700 mb-2">Location</label>
                <select
                  value={filterLocation}
                  onChange={(e) => setFilterLocation(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                >
                  <option value="">All Locations</option>
                  <option value="Amsterdam">Amsterdam</option>
                  <option value="Rotterdam">Rotterdam</option>
                  <option value="Utrecht">Utrecht</option>
                  <option value="The Hague">The Hague</option>
                  <option value="Eindhoven">Eindhoven</option>
                </select>
              </div>
              <div>
                <label className="block text-gray-700 mb-2">Job Type</label>
                <select
                  value={filterJobType}
                  onChange={(e) => setFilterJobType(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                >
                  <option value="">All Types</option>
                  <option value="Full-time">Full-time</option>
                  <option value="Part-time">Part-time</option>
                  <option value="Temporary">Temporary</option>
                  <option value="Contract">Contract</option>
                </select>
              </div>
              <div>
                <label className="block text-gray-700 mb-2">Industry</label>
                <select
                  value={filterIndustry}
                  onChange={(e) => setFilterIndustry(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                >
                  <option value="">All Industries</option>
                  <option value="Logistics">Logistics</option>
                  <option value="Manufacturing">Manufacturing</option>
                  <option value="Healthcare">Healthcare</option>
                  <option value="Retail">Retail</option>
                  <option value="Construction">Construction</option>
                  <option value="Hospitality">Hospitality</option>
                </select>
              </div>
              <div className="flex items-end">
                <button
                  onClick={() => {
                    setFilterLocation('');
                    setFilterJobType('');
                    setFilterIndustry('');
                    setSearchTerm('');
                  }}
                  className="w-full bg-gray-200 text-gray-700 px-6 py-3 rounded-md hover:bg-gray-300 transition duration-300"
                >
                  Reset Filters
                </button>
              </div>
            </div>
          </div>
          
          {filteredJobs.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredJobs.map((job) => (
                <div key={job.id} className="bg-white rounded-lg overflow-hidden shadow-md border border-gray-200 hover:shadow-lg transition duration-300">
                  {job.urgent && (
                    <div className="bg-red-600 text-white text-center py-1 text-sm font-semibold">
                      Urgent Hiring
                    </div>
                  )}
                  <div className="p-6">
                    <div className="flex justify-between items-start mb-4">
                      <h3 className="text-xl font-bold text-gray-800">{job.title}</h3>
                      <span className="bg-orange-100 text-orange-600 px-2 py-1 rounded text-sm font-medium">
                        {job.type}
                      </span>
                    </div>
                    <div className="mb-4">
                      <p className="text-gray-600 mb-1">{job.company}</p>
                      <p className="text-gray-600 flex items-center">
                        <svg className="h-4 w-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                        </svg>
                        {job.location}
                      </p>
                    </div>
                    <p className="text-gray-700 mb-4">{job.description}</p>
                    <div className="mb-4">
                      <p className="font-semibold text-gray-800 mb-2">Requirements:</p>
                      <ul className="list-disc pl-5 text-gray-600">
                        {job.requirements.map((req, index) => (
                          <li key={index}>{req}</li>
                        ))}
                      </ul>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-800 font-semibold">{job.salary}</span>
                      <button
                        onClick={() => setShowJobForm(true)}
                        className="bg-orange-600 text-white px-4 py-2 rounded hover:bg-orange-700 transition duration-300"
                      >
                        Apply Now
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 bg-white rounded-lg shadow-md">
              <svg className="mx-auto h-16 w-16 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
              <h3 className="mt-4 text-xl font-medium text-gray-900">No jobs found</h3>
              <p className="mt-2 text-gray-600">Try adjusting your search filters or check back later for new opportunities.</p>
              <button
                onClick={() => {
                  setFilterLocation('');
                  setFilterJobType('');
                  setFilterIndustry('');
                  setSearchTerm('');
                }}
                className="mt-4 bg-orange-600 text-white px-4 py-2 rounded hover:bg-orange-700 transition duration-300"
              >
                Reset Filters
              </button>
            </div>
          )}
        </div>
      </section>
      
      {/* Why Choose Us Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Choose Glodinas Flex Work</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">We're more than just a job board - we're your career partner</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-gray-50 rounded-lg p-6 shadow-md hover:shadow-lg transition duration-300">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mb-4">
                <svg className="h-8 w-8 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-3">Exclusive Job Opportunities</h3>
              <p className="text-gray-600">Access positions not advertised elsewhere, with many employers hiring exclusively through our network.</p>
            </div>
            
            <div className="bg-gray-50 rounded-lg p-6 shadow-md hover:shadow-lg transition duration-300">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mb-4">
                <svg className="h-8 w-8 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-3">Multilingual Support</h3>
              <p className="text-gray-600">Our team speaks multiple languages to ensure clear communication and support throughout your job search.</p>
            </div>
            
            <div className="bg-gray-50 rounded-lg p-6 shadow-md hover:shadow-lg transition duration-300">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mb-4">
                <svg className="h-8 w-8 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path>
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-3">Complete Support Package</h3>
              <p className="text-gray-600">From work permits to housing assistance, we provide comprehensive support for international workers.</p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Application Process Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">How It Works</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">Our simple process gets you from application to employment quickly</p>
          </div>
          
          <div className="relative">
            {/* Process Timeline Line */}
            <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-1 bg-orange-200 transform -translate-x-1/2"></div>
            
            <div className="space-y-12 md:space-y-0">
              {/* Step 1 */}
              <div className="md:grid md:grid-cols-2 md:gap-8 relative">
                <div className="md:text-right md:pr-12">
                  <div className="hidden md:block absolute right-0 top-6 w-6 h-6 rounded-full bg-orange-500 border-4 border-orange-200 transform translate-x-3"></div>
                  <h3 className="text-xl font-bold mb-3">1. Submit Your Profile</h3>
                  <p className="text-gray-600 mb-4 md:mb-0">Complete our online application with your experience, skills, and preferences. Upload your CV or use our guided form.</p>
                </div>
                <div className="md:pl-12">
                  <div className="bg-white rounded-lg overflow-hidden shadow-md md:mt-0 mt-4">
                    <div className="p-1">
                      <Image
                        src="/images/application-step1.jpg"
                        alt="Person filling out online application"
                        width={500}
                        height={300}
                        className="rounded-lg"
                      />
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Step 2 */}
              <div className="md:grid md:grid-cols-2 md:gap-8 relative">
                <div className="md:order-2 md:text-left md:pl-12">
                  <div className="hidden md:block absolute left-0 top-6 w-6 h-6 rounded-full bg-orange-500 border-4 border-orange-200 transform -translate-x-3"></div>
                  <h3 className="text-xl font-bold mb-3">2. Personal Consultation</h3>
                  <p className="text-gray-600 mb-4 md:mb-0">Our recruitment specialists will contact you to discuss your profile, career goals, and available opportunities.</p>
                </div>
                <div className="md:order-1 md:pr-12">
                  <div className="bg-white rounded-lg overflow-hidden shadow-md md:mt-0 mt-4">
                    <div className="p-1">
                      <Image
                        src="/images/application-step2.jpg"
                        alt="Recruiter consulting with job seeker"
                        width={500}
                        height={300}
                        className="rounded-lg"
                      />
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Step 3 */}
              <div className="md:grid md:grid-cols-2 md:gap-8 relative">
                <div className="md:text-right md:pr-12">
                  <div className="hidden md:block absolute right-0 top-6 w-6 h-6 rounded-full bg-orange-500 border-4 border-orange-200 transform translate-x-3"></div>
                  <h3 className="text-xl font-bold mb-3">3. Interview Preparation</h3>
                  <p className="text-gray-600 mb-4 md:mb-0">We'll prepare you for interviews with potential employers, providing guidance on what to expect and how to present yourself.</p>
                </div>
                <div className="md:pl-12">
                  <div className="bg-white rounded-lg overflow-hidden shadow-md md:mt-0 mt-4">
                    <div className="p-1">
                      <Image
                        src="/images/application-step3.jpg"
                        alt="Interview preparation session"
                        width={500}
                        height={300}
                        className="rounded-lg"
                      />
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Step 4 */}
              <div className="md:grid md:grid-cols-2 md:gap-8 relative">
                <div className="md:order-2 md:text-left md:pl-12">
                  <div className="hidden md:block absolute left-0 top-6 w-6 h-6 rounded-full bg-orange-500 border-4 border-orange-200 transform -translate-x-3"></div>
                  <h3 className="text-xl font-bold mb-3">4. Job Placement</h3>
                  <p className="text-gray-600 mb-4 md:mb-0">Once matched with the right position, we'll help finalize all details and ensure a smooth transition into your new role.</p>
                </div>
                <div className="md:order-1 md:pr-12">
                  <div className="bg-white rounded-lg overflow-hidden shadow-md md:mt-0 mt-4">
                    <div className="p-1">
                      <Image
                        src="/images/application-step4.jpg"
                        alt="New employee starting job"
                        width={500}
                        height={300}
                        className="rounded-lg"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="text-center mt-12">
            <button
              onClick={() => setShowJobForm(true)}
              className="bg-orange-600 text-white px-8 py-3 rounded-md hover:bg-orange-700 transition duration-300 text-lg font-semibold"
            >
              Start Your Application
            </button>
          </div>
        </div>
      </section>
      
      {/* Testimonials Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Success Stories</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">Hear from professionals who found their ideal positions through Glodinas Flex Work</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial) => (
              <div key={testimonial.id} className="bg-gray-50 rounded-lg p-6 shadow-md hover:shadow-lg transition duration-300">
                <div className="flex items-center mb-4">
                  <div className="w-16 h-16 rounded-full overflow-hidden mr-4">
                    <Image
                      src={testimonial.image}
                      alt={testimonial.name}
                      width={64}
                      height={64}
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg">{testimonial.name}</h3>
                    <p className="text-gray-600">{testimonial.position}</p>
                  </div>
                </div>
                <p className="text-gray-700 italic">"{testimonial.quote}"</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* FAQ Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Frequently Asked Questions</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">Find answers to common questions about working with Glodinas Flex Work</p>
          </div>
          
          <div className="max-w-3xl mx-auto">
            <div className="space-y-6">
              <div className="bg-white rounded-lg p-6 shadow-md">
                <h3 className="text-xl font-bold mb-3">What types of jobs do you offer?</h3>
                <p className="text-gray-600">We specialize in a wide range of sectors including logistics, manufacturing, healthcare, retail, construction, and hospitality. Our positions range from entry-level to specialized roles requiring specific qualifications.</p>
              </div>
              
              <div className="bg-white rounded-lg p-6 shadow-md">
                <h3 className="text-xl font-bold mb-3">Do I need to speak Dutch to work in the Netherlands?</h3>
                <p className="text-gray-600">Not necessarily. Many of our positions are available in English-speaking environments. We also offer positions where knowledge of other languages like Polish, Romanian, Spanish, or Portuguese is valuable.</p>
              </div>
              
              <div className="bg-white rounded-lg p-6 shadow-md">
                <h3 className="text-xl font-bold mb-3">Can you help with work permits and visas?</h3>
                <p className="text-gray-600">Yes, our team has extensive experience helping international workers with the necessary documentation for legal employment in the Netherlands and other European countries.</p>
              </div>
              
              <div className="bg-white rounded-lg p-6 shadow-md">
                <h3 className="text-xl font-bold mb-3">Do you provide housing assistance?</h3>
                <p className="text-gray-600">Yes, for many positions we can assist with finding suitable accommodation near your workplace. This is especially helpful for international workers relocating to a new country.</p>
              </div>
              
              <div className="bg-white rounded-lg p-6 shadow-md">
                <h3 className="text-xl font-bold mb-3">How long does the application process take?</h3>
                <p className="text-gray-600">The timeline varies depending on the position and your availability, but many candidates are placed within 1-3 weeks of their initial application.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-16 bg-orange-600 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Start Your New Career Journey?</h2>
            <p className="text-xl mb-8">Join thousands of professionals who have found their ideal positions through Glodinas Flex Work.</p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <button
                onClick={() => setShowJobForm(true)}
                className="bg-white text-orange-600 px-8 py-3 rounded-md hover:bg-orange-100 transition duration-300 text-lg font-semibold"
              >
                Apply Now
              </button>
              <a
                href="#job-listings"
                className="bg-transparent border-2 border-white text-white px-8 py-3 rounded-md hover:bg-white hover:text-orange-600 transition duration-300 text-lg font-semibold"
              >
                Browse Jobs
              </a>
            </div>
          </div>
        </div>
      </section>
      
      {/* Application Form Modal */}
      {showJobForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-90vh overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-800">Job Application</h2>
                <button
                  onClick={() => setShowJobForm(false)}
                  className="text-gray-500 hover:text-gray-700 focus:outline-none"
                >
                  <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                  </svg>
                </button>
              </div>
              
              {/* Progress Bar */}
              <div className="mb-8">
                <div className="flex justify-between mb-2">
                  {['Personal Info', 'Professional Details', 'Skills & Documents', 'Final Steps'].map((label, index) => (
                    <div
                      key={index}
                      className={`text-xs font-medium ${
                        step > index ? 'text-orange-600' : 'text-gray-500'
                      }`}
                    >
                      {label}
                    </div>
                  ))}
                </div>
                <div className="h-2 bg-gray-200 rounded-full">
                  <div
                    className="h-2 bg-orange-600 rounded-full transition-all duration-300"
                    style={{ width: `${(step / 4) * 100}%` }}
                  ></div>
                </div>
              </div>
              
              <form onSubmit={handleSubmit}>
                {/* Step 1: Personal Information */}
                {step === 1 && (
                  <div>
                    <h3 className="text-xl font-semibold mb-4">Personal Information</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      <div>
                        <label className="block text-gray-700 mb-2">First Name *</label>
                        <input
                          type="text"
                          name="firstName"
                          value={formData.firstName}
                          onChange={handleChange}
                          className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-gray-700 mb-2">Last Name *</label>
                        <input
                          type="text"
                          name="lastName"
                          value={formData.lastName}
                          onChange={handleChange}
                          className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                          required
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      <div>
                        <label className="block text-gray-700 mb-2">Email Address *</label>
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-gray-700 mb-2">Phone Number *</label>
                        <input
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                          required
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      <div>
                        <label className="block text-gray-700 mb-2">Current Location</label>
                        <input
                          type="text"
                          name="location"
                          value={formData.location}
                          onChange={handleChange}
                          className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                        />
                      </div>
                      <div>
                        <label className="block text-gray-700 mb-2">Preferred Language</label>
                        <select
                          name="preferredLanguage"
                          value={formData.preferredLanguage}
                          onChange={handleChange}
                          className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                        >
                          <option value="English">English</option>
                          <option value="Dutch">Dutch</option>
                          <option value="Polish">Polish</option>
                          <option value="Romanian">Romanian</option>
                          <option value="Spanish">Spanish</option>
                          <option value="Portuguese">Portuguese</option>
                          <option value="Other">Other</option>
                        </select>
                      </div>
                    </div>
                  </div>
                )}
                
                {/* Step 2: Professional Details */}
                {step === 2 && (
                  <div>
                    <h3 className="text-xl font-semibold mb-4">Professional Details</h3>
                    <div className="mb-4">
                      <label className="block text-gray-700 mb-2">Desired Job Title/Position *</label>
                      <input
                        type="text"
                        name="jobTitle"
                        value={formData.jobTitle}
                        onChange={handleChange}
                        className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                        required
                      />
                    </div>
                    <div className="mb-4">
                      <label className="block text-gray-700 mb-2">Years of Experience *</label>
                      <select
                        name="experience"
                        value={formData.experience}
                        onChange={handleChange}
                        className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                        required
                      >
                        <option value="">Select Experience</option>
                        <option value="0-1">Less than 1 year</option>
                        <option value="1-3">1-3 years</option>
                        <option value="3-5">3-5 years</option>
                        <option value="5-10">5-10 years</option>
                        <option value="10+">10+ years</option>
                      </select>
                    </div>
                    <div className="mb-4">
                      <label className="block text-gray-700 mb-2">Education Level</label>
                      <select
                        name="education"
                        value={formData.education}
                        onChange={handleChange}
                        className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                      >
                        <option value="">Select Education</option>
                        <option value="High School">High School</option>
                        <option value="Vocational">Vocational Training</option>
                        <option value="Associate">Associate Degree</option>
                        <option value="Bachelor">Bachelor's Degree</option>
                        <option value="Master">Master's Degree</option>
                        <option value="Doctorate">Doctorate</option>
                      </select>
                    </div>
                    <div className="mb-4">
                      <label className="block text-gray-700 mb-2">Availability</label>
                      <select
                        name="availability"
                        value={formData.availability}
                        onChange={handleChange}
                        className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                      >
                        <option value="">Select Availability</option>
                        <option value="Immediate">Immediate</option>
                        <option value="2 weeks">2 weeks</option>
                        <option value="1 month">1 month</option>
                        <option value="2+ months">2+ months</option>
                      </select>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      <div className="flex items-center">
                        <input
                          type="checkbox"
                          id="workPermit"
                          name="workPermit"
                          checked={formData.workPermit}
                          onChange={handleChange}
                          className="h-4 w-4 text-orange-600 focus:ring-orange-500 border-gray-300 rounded"
                        />
                        <label htmlFor="workPermit" className="ml-2 block text-gray-700">
                          I have a valid work permit for EU
                        </label>
                      </div>
                      <div className="flex items-center">
                        <input
                          type="checkbox"
                          id="relocate"
                          name="relocate"
                          checked={formData.relocate}
                          onChange={handleChange}
                          className="h-4 w-4 text-orange-600 focus:ring-orange-500 border-gray-300 rounded"
                        />
                        <label htmlFor="relocate" className="ml-2 block text-gray-700">
                          Willing to relocate
                        </label>
                      </div>
                    </div>
                    <div className="mb-4">
                      <label className="block text-gray-700 mb-2">Salary Expectation</label>
                      <input
                        type="text"
                        name="salaryExpectation"
                        value={formData.salaryExpectation}
                        onChange={handleChange}
                        placeholder="e.g., €2,500 per month"
                        className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                      />
                    </div>
                  </div>
                )}
                
                {/* Step 3: Skills & Documents */}
                {step === 3 && (
                  <div>
                    <h3 className="text-xl font-semibold mb-4">Skills & Documents</h3>
                    <div className="mb-6">
                      <label className="block text-gray-700 mb-2">Select Your Skills (select all that apply) *</label>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                        {skills.map((skill) => (
                          <div key={skill} className="flex items-center">
                            <input
                              type="checkbox"
                              id={skill}
                              checked={formData.skills.includes(skill)}
                              onChange={() => handleSkillChange(skill)}
                              className="h-4 w-4 text-orange-600 focus:ring-orange-500 border-gray-300 rounded"
                            />
                            <label htmlFor={skill} className="ml-2 block text-gray-700 text-sm">
                              {skill}
                            </label>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <div className="mb-6">
                      <label className="block text-gray-700 mb-2">Upload Resume/CV *</label>
                      <FileUpload 
                        onFileUpload={(url) => handleFileUpload('resumeUrl', url)}
                        acceptedFileTypes={['.pdf', '.doc', '.docx', '.jpg', '.jpeg']}
                        maxFileSizeMB={5}
                      />
                      {formData.resumeUrl && (
                        <p className="text-green-600 mt-2">✓ Resume uploaded successfully</p>
                      )}
                    </div>
                    
                    <div className="mb-6">
                      <label className="block text-gray-700 mb-2">Upload Cover Letter (optional)</label>
                      <FileUpload 
                        onFileUpload={(url) => handleFileUpload('coverLetterUrl', url)}
                        acceptedFileTypes={['.pdf', '.doc', '.docx']}
                        maxFileSizeMB={5}
                      />
                      {formData.coverLetterUrl && (
                        <p className="text-green-600 mt-2">✓ Cover letter uploaded successfully</p>
                      )}
                    </div>
                  </div>
                )}
                
                {/* Step 4: Final Steps */}
                {step === 4 && (
                  <div>
                    <h3 className="text-xl font-semibold mb-4">Final Steps</h3>
                    <div className="mb-4">
                      <label className="block text-gray-700 mb-2">How did you hear about us?</label>
                      <select
                        name="referralSource"
                        value={formData.referralSource}
                        onChange={handleChange}
                        className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                      >
                        <option value="">Select Source</option>
                        <option value="Search Engine">Search Engine</option>
                        <option value="Social Media">Social Media</option>
                        <option value="Friend/Referral">Friend/Referral</option>
                        <option value="Job Board">Job Board</option>
                        <option value="Advertisement">Advertisement</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>
                    
                    <div className="mb-6">
                      <div className="flex items-center">
                        <input
                          type="checkbox"
                          id="termsAccepted"
                          name="termsAccepted"
                          checked={formData.termsAccepted}
                          onChange={handleChange}
                          className="h-4 w-4 text-orange-600 focus:ring-orange-500 border-gray-300 rounded"
                          required
                        />
                        <label htmlFor="termsAccepted" className="ml-2 block text-gray-700">
                          I agree to the <a href="/terms" className="text-orange-600 hover:underline" target="_blank">Terms and Conditions</a> and <a href="/privacy-policy" className="text-orange-600 hover:underline" target="_blank">Privacy Policy</a> *
                        </label>
                      </div>
                    </div>
                    
                    <div className="mb-6">
                      <div className="flex items-center">
                        <input
                          type="checkbox"
                          id="jobAlerts"
                          name="jobAlerts"
                          checked={formData.jobAlerts}
                          onChange={handleChange}
                          className="h-4 w-4 text-orange-600 focus:ring-orange-500 border-gray-300 rounded"
                        />
                        <label htmlFor="jobAlerts" className="ml-2 block text-gray-700">
                          Send me job alerts for similar positions
                        </label>
                      </div>
                    </div>
                    
                    <div className="bg-gray-50 p-4 rounded-lg mb-6">
                      <h4 className="font-semibold text-gray-800 mb-2">What happens next?</h4>
                      <p className="text-gray-600">
                        After submitting your application, our team will review your profile and contact you within 1-2 business days to discuss potential opportunities that match your skills and preferences.
                      </p>
                    </div>
                  </div>
                )}
                
                <div className="flex justify-between mt-8">
                  {step > 1 && (
                    <button
                      type="button"
                      onClick={handleBack}
                      className="bg-gray-200 text-gray-700 px-6 py-2 rounded-md hover:bg-gray-300 transition duration-300"
                    >
                      Back
                    </button>
                  )}
                  
                  {step < 4 ? (
                    <button
                      type="button"
                      onClick={handleNext}
                      className="bg-orange-600 text-white px-6 py-2 rounded-md hover:bg-orange-700 transition duration-300 ml-auto"
                    >
                      Next
                    </button>
                  ) : (
                    <button
                      type="submit"
                      className="bg-orange-600 text-white px-6 py-2 rounded-md hover:bg-orange-700 transition duration-300 ml-auto"
                    >
                      Submit Application
                    </button>
                  )}
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
