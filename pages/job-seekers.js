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
      quote: 'As a newcomer to the Netherlands, I was struggling to find work in healthcare. Glodinas not only found me a perfect position but also helped with the paperwork and transition. I'm so grateful!'
    },
    {
      id: 3,
      name: 'Thomas B.',
      position: 'Production Team Lead',
      image: '/images/testimonials/testimonial-3.jpg',
      quote: 'What impressed me most was how Glodinas took the time to understand my skills and career goals. They matched me with a company where I could grow, and I've been thriving ever since.'
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
                      <span className="bg-orange-100 text-orange-800 text-xs font-semibold px-2.5 py-0.5 rounded">
                        {job.industry}
                      </span>
                    </div>
                    <p className="text-gray-600 mb-2">{job.company}</p>
                    <div className="flex items-center text-gray-500 mb-2">
                      <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd"></path>
                      </svg>
                      {job.location}
                    </div>
                    <div className="flex items-center text-gray-500 mb-4">
                      <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd"></path>
                      </svg>
                      {job.type}
                    </div>
                    <p className="text-gray-700 mb-4">{job.description}</p>
                    <div className="mb-4">
                      <p className="font-semibold text-gray-700 mb-2">Requirements:</p>
                      <ul className="list-disc pl-5 text-gray-600">
                        {job.requirements.map((req, index) => (
                          <li key={index}>{req}</li>
                        ))}
                      </ul>
                    </div>
                    <div className="text-orange-600 font-semibold mb-4">{job.salary}</div>
                    <div className="flex justify-between">
                      <button
                        onClick={() => {
                          setShowJobForm(true);
                          setFormData({
                            ...formData,
                            jobTitle: job.title
                          });
                        }}
                        className="bg-orange-600 text-white px-4 py-2 rounded hover:bg-orange-700 transition duration-300"
                      >
                        Apply Now
                      </button>
                      <button className="text-orange-600 border border-orange-600 px-4 py-2 rounded hover:bg-orange-50 transition duration-300">
                        Save Job
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 bg-white rounded-lg shadow">
              <svg className="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
              <h3 className="text-xl font-bold text-gray-700 mb-2">No jobs match your criteria</h3>
              <p className="text-gray-500 mb-4">Try adjusting your search filters or browse all available positions</p>
              <button
                onClick={() => {
                  setFilterLocation('');
                  setFilterJobType('');
                  setFilterIndustry('');
                  setSearchTerm('');
                }}
                className="bg-orange-600 text-white px-6 py-3 rounded-md hover:bg-orange-700 transition duration-300"
              >
                View All Jobs
              </button>
            </div>
          )}
        </div>
      </section>
      
      {/* Application Form Modal */}
      {showJobForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-90vh overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-800">Apply for a Position</h2>
                <button
                  onClick={() => setShowJobForm(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                  </svg>
                </button>
              </div>
              
              <div className="flex justify-between items-center mb-8">
                <div className="flex items-center">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${step === 1 ? 'bg-orange-500' : 'bg-gray-300'} text-white font-bold`}>1</div>
                  <div className="ml-2 text-sm">Personal Info</div>
                </div>
                <div className="flex-grow mx-4 h-1 bg-gray-200">
                  <div className={`h-full ${step >= 2 ? 'bg-orange-500' : 'bg-gray-200'}`} style={{ width: '100%' }}></div>
                </div>
                <div className="flex items-center">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${step === 2 ? 'bg-orange-500' : 'bg-gray-300'} text-white font-bold`}>2</div>
                  <div className="ml-2 text-sm">Professional</div>
                </div>
                <div className="flex-grow mx-4 h-1 bg-gray-200">
                  <div className={`h-full ${step >= 3 ? 'bg-orange-500' : 'bg-gray-200'}`} style={{ width: '100%' }}></div>
                </div>
                <div className="flex items-center">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${step === 3 ? 'bg-orange-500' : 'bg-gray-300'} text-white font-bold`}>3</div>
                  <div className="ml-2 text-sm">Skills & Resume</div>
                </div>
                <div className="flex-grow mx-4 h-1 bg-gray-200">
                  <div className={`h-full ${step >= 4 ? 'bg-orange-500' : 'bg-gray-200'}`} style={{ width: '100%' }}></div>
                </div>
                <div className="flex items-center">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${step === 4 ? 'bg-orange-500' : 'bg-gray-300'} text-white font-bold`}>4</div>
                  <div className="ml-2 text-sm">Finish</div>
                </div>
              </div>
              
              {step === 1 && (
                <div>
                  <h3 className="text-xl font-bold mb-6 text-gray-800">Personal Information</h3>
                  <div className="grid md:grid-cols-2 gap-6">
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
                    <div>
                      <label className="block text-gray-700 mb-2">Email *</label>
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
                    <div>
                      <label className="block text-gray-700 mb-2">Location</label>
                      <input
                        type="text"
                        name="location"
                        placeholder="City, Country"
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
                        <option>English</option>
                        <option>Dutch</option>
                        <option>Polish</option>
                        <option>Romanian</option>
                        <option>Bulgarian</option>
                      </select>
                    </div>
                  </div>
                </div>
              )}
              
              {step === 2 && (
                <div>
                  <h3 className="text-xl font-bold mb-6 text-gray-800">Professional Details</h3>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-gray-700 mb-2">Desired Job Title *</label>
                      <input
                        type="text"
                        name="jobTitle"
                        value={formData.jobTitle}
                        onChange={handleChange}
                        className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-gray-700 mb-2">Years of Experience *</label>
                      <select
                        name="experience"
                        value={formData.experience}
                        onChange={handleChange}
                        className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                        required
                      >
                        <option value="">Select Experience</option>
                        <option value="0-1">0-1 years</option>
                        <option value="1-3">1-3 years</option>
                        <option value="3-5">3-5 years</option>
                        <option value="5-10">5-10 years</option>
                        <option value="10+">10+ years</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-gray-700 mb-2">Highest Education Level</label>
                      <select
                        name="education"
                        value={formData.education}
                        onChange={handleChange}
                        className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                      >
                        <option value="">Select Education</option>
                        <option value="High School">High School</option>
                        <option value="Vocational Training">Vocational Training</option>
                        <option value="Bachelor's Degree">Bachelor's Degree</option>
                        <option value="Master's Degree">Master's Degree</option>
                        <option value="PhD">PhD</option>
                      </select>
                    </div>
                    <div>
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
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        name="workPermit"
                        checked={formData.workPermit}
                        onChange={handleChange}
                        className="mr-2 h-5 w-5 text-orange-500"
                      />
                      <label className="text-gray-700">I have the legal right to work in the EU</label>
                    </div>
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        name="relocate"
                        checked={formData.relocate}
                        onChange={handleChange}
                        className="mr-2 h-5 w-5 text-orange-500"
                      />
                      <label className="text-gray-700">I am willing to relocate</label>
                    </div>
                  </div>
                </div>
              )}
              
              {step === 3 && (
                <div>
                  <h3 className="text-xl font-bold mb-6 text-gray-800">Skills & Qualifications</h3>
                  <div>
                    <label className="block text-gray-700 mb-4">Select your skills (select all that apply) *</label>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                      {skills.map((skill) => (
                        <div key={skill} className="flex items-center">
                          <input
                            type="checkbox"
                            id={skill}
                            checked={formData.skills.includes(skill)}
                            onChange={() => handleSkillChange(skill)}
                            className="mr-2 h-5 w-5 text-orange-500"
                          />
                          <label htmlFor={skill} className="text-gray-700">{skill}</label>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="mt-6">
                    <label className="block text-gray-700 mb-2">Salary Expectation (€ per year)</label>
                    <input
                      type="text"
                      name="salaryExpectation"
                      value={formData.salaryExpectation}
                      onChange={handleChange}
                      className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                      placeholder="e.g. 30,000 - 40,000"
                    />
                  </div>
                  <div className="mt-6">
                    <FileUpload 
                      label="Resume/CV Upload (PDF, DOCX, JPG) *" 
                      onUploadComplete={(url) => handleFileUpload('resumeUrl', url)}
                      acceptedFileTypes=".pdf,.docx,.jpg,.jpeg"
                    />
                  </div>
                  <div className="mt-6">
                    <FileUpload 
                      label="Cover Letter Upload (Optional)" 
                      onUploadComplete={(url) => handleFileUpload('coverLetterUrl', url)}
                      acceptedFileTypes=".pdf,.docx,.jpg,.jpeg"
                    />
                  </div>
                </div>
              )}
              
              {step === 4 && (
                <div>
                  <h3 className="text-xl font-bold mb-6 text-gray-800">Final Steps</h3>
                  <div className="mb-6">
                    <label className="block text-gray-700 mb-2">How did you hear about us?</label>
                    <select
                      name="referralSource"
                      value={formData.referralSource}
                      onChange={handleChange}
                      className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                    >
                      <option value="">Select an option</option>
                      <option value="Search Engine">Search Engine</option>
                      <option value="Social Media">Social Media</option>
                      <option value="Friend/Colleague">Friend/Colleague</option>
                      <option value="Job Board">Job Board</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                  <div className="mb-6">
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        name="jobAlerts"
                        checked={formData.jobAlerts}
                        onChange={handleChange}
                        className="mr-2 h-5 w-5 text-orange-500"
                      />
                      <label className="text-gray-700">
                        Send me job alerts for similar positions
                      </label>
                    </div>
                  </div>
                  <div className="mb-6">
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        name="termsAccepted"
                        checked={formData.termsAccepted}
                        onChange={handleChange}
                        className="mr-2 h-5 w-5 text-orange-500"
                        required
                      />
                      <label className="text-gray-700">
                        I agree to the{' '}
                        <Link href="/terms">
                          <a className="text-orange-500 hover:underline">Terms of Service</a>
                        </Link>
                        {' '}and{' '}
                        <Link href="/privacy-policy">
                          <a className="text-orange-500 hover:underline">Privacy Policy</a>
                        </Link>
                      </label>
                    </div>
                  </div>
                </div>
              )}
              
              <div className="mt-8 flex justify-between">
                {step > 1 ? (
                  <button
                    type="button"
                    onClick={handleBack}
                    className="bg-gray-300 text-gray-700 px-6 py-3 rounded-md hover:bg-gray-400 transition duration-300"
                  >
                    Back
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={() => setShowJobForm(false)}
                    className="bg-gray-300 text-gray-700 px-6 py-3 rounded-md hover:bg-gray-400 transition duration-300"
                  >
                    Cancel
                  </button>
                )}
                
                {step < 4 ? (
                  <button
                    type="button"
                    onClick={handleNext}
                    className="bg-orange-500 text-white px-6 py-3 rounded-md hover:bg-orange-600 transition duration-300"
                  >
                    Next
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={handleSubmit}
                    className="bg-orange-500 text-white px-6 py-3 rounded-md hover:bg-orange-600 transition duration-300"
                  >
                    Submit Application
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* Why Choose Us Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Choose Glodinas Flex Work?</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">We're committed to helping you find the perfect job match</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-gray-50 rounded-lg p-8 text-center hover:shadow-lg transition duration-300">
              <div className="text-5xl mb-4 text-orange-500">🔍</div>
              <h3 className="text-xl font-bold mb-3">Access to Exclusive Opportunities</h3>
              <p className="text-gray-600">
                Many of our job openings are not advertised elsewhere. Register with us to access our exclusive network of top employers across Europe.
              </p>
            </div>
            
            <div className="bg-gray-50 rounded-lg p-8 text-center hover:shadow-lg transition duration-300">
              <div className="text-5xl mb-4 text-orange-500">🌍</div>
              <h3 className="text-xl font-bold mb-3">Multilingual Support</h3>
              <p className="text-gray-600">
                Our team provides support in Dutch, English, Polish, Romanian, and Bulgarian, making your job search experience smooth regardless of your native language.
              </p>
            </div>
            
            <div className="bg-gray-50 rounded-lg p-8 text-center hover:shadow-lg transition duration-300">
              <div className="text-5xl mb-4 text-orange-500">🚀</div>
              <h3 className="text-xl font-bold mb-3">Career Growth</h3>
              <p className="text-gray-600">
                We don't just find you a job; we help build your career. Our consultants provide guidance on skill development and career progression.
              </p>
            </div>
          </div>
          
          <div className="mt-12 grid md:grid-cols-2 gap-8">
            <div className="bg-gray-50 rounded-lg p-8 hover:shadow-lg transition duration-300">
              <div className="flex items-center mb-4">
                <div className="text-4xl text-orange-500 mr-4">⏱️</div>
                <h3 className="text-xl font-bold">Fast Placement Process</h3>
              </div>
              <p className="text-gray-600">
                Our streamlined process means you can go from application to job offer in as little as 48 hours for urgent positions. We value your time and work efficiently to match you with the right opportunity.
              </p>
              <div className="mt-4 flex items-center text-orange-600">
                <div className="font-bold mr-2">Average time to placement:</div>
                <div>7 days</div>
              </div>
            </div>
            
            <div className="bg-gray-50 rounded-lg p-8 hover:shadow-lg transition duration-300">
              <div className="flex items-center mb-4">
                <div className="text-4xl text-orange-500 mr-4">🛠️</div>
                <h3 className="text-xl font-bold">Training & Development</h3>
              </div>
              <p className="text-gray-600">
                Enhance your skills with our free training programs. We offer language courses, safety certifications, and technical skills development to help you qualify for better positions and advance your career.
              </p>
              <div className="mt-4">
                <a href="#" className="text-orange-600 font-semibold hover:underline">View available training programs</a>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Application Process Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Application Process</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">Simple, transparent, and designed with you in mind</p>
          </div>
          
          <div className="max-w-5xl mx-auto">
            <div className="relative">
              {/* Process Timeline */}
              <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-orange-200"></div>
              
              {/* Step 1 */}
              <div className="relative z-10 mb-12 md:mb-0">
                <div className="flex flex-col md:flex-row items-center">
                  <div className="flex-1 md:text-right md:pr-12 mb-4 md:mb-0">
                    <h3 className="text-xl font-bold mb-2">Submit Your Application</h3>
                    <p className="text-gray-600">Complete our online application form and upload your resume. This takes about 5-10 minutes.</p>
                  </div>
                  <div className="md:absolute md:left-1/2 md:transform md:-translate-x-1/2 bg-orange-500 text-white rounded-full w-12 h-12 flex items-center justify-center font-bold text-xl">1</div>
                  <div className="flex-1 md:pl-12 mt-4 md:mt-0"></div>
                </div>
              </div>
              
              {/* Step 2 */}
              <div className="relative z-10 mb-12 md:mb-0 md:mt-24">
                <div className="flex flex-col md:flex-row items-center">
                  <div className="flex-1 md:text-right md:pr-12 mb-4 md:mb-0 md:order-1 md:pl-12">
                    <h3 className="text-xl font-bold mb-2">Initial Assessment</h3>
                    <p className="text-gray-600">Our recruitment team reviews your application and contacts you within 1-2 business days.</p>
                  </div>
                  <div className="md:absolute md:left-1/2 md:transform md:-translate-x-1/2 bg-orange-500 text-white rounded-full w-12 h-12 flex items-center justify-center font-bold text-xl">2</div>
                  <div className="flex-1 md:pr-12 mt-4 md:mt-0 md:order-0 md:text-right"></div>
                </div>
              </div>
              
              {/* Step 3 */}
              <div className="relative z-10 mb-12 md:mb-0 md:mt-24">
                <div className="flex flex-col md:flex-row items-center">
                  <div className="flex-1 md:text-right md:pr-12 mb-4 md:mb-0">
                    <h3 className="text-xl font-bold mb-2">Interview & Matching</h3>
                    <p className="text-gray-600">We conduct a phone or video interview to better understand your skills and preferences, then match you with suitable positions.</p>
                  </div>
                  <div className="md:absolute md:left-1/2 md:transform md:-translate-x-1/2 bg-orange-500 text-white rounded-full w-12 h-12 flex items-center justify-center font-bold text-xl">3</div>
                  <div className="flex-1 md:pl-12 mt-4 md:mt-0"></div>
                </div>
              </div>
              
              {/* Step 4 */}
              <div className="relative z-10 mb-12 md:mb-0 md:mt-24">
                <div className="flex flex-col md:flex-row items-center">
                  <div className="flex-1 md:text-right md:pr-12 mb-4 md:mb-0 md:order-1 md:pl-12">
                    <h3 className="text-xl font-bold mb-2">Employer Introduction</h3>
                    <p className="text-gray-600">We introduce you to potential employers and arrange interviews. We'll help you prepare for these meetings.</p>
                  </div>
                  <div className="md:absolute md:left-1/2 md:transform md:-translate-x-1/2 bg-orange-500 text-white rounded-full w-12 h-12 flex items-center justify-center font-bold text-xl">4</div>
                  <div className="flex-1 md:pr-12 mt-4 md:mt-0 md:order-0 md:text-right"></div>
                </div>
              </div>
              
              {/* Step 5 */}
              <div className="relative z-10 md:mt-24">
                <div className="flex flex-col md:flex-row items-center">
                  <div className="flex-1 md:text-right md:pr-12 mb-4 md:mb-0">
                    <h3 className="text-xl font-bold mb-2">Job Offer & Onboarding</h3>
                    <p className="text-gray-600">Once you receive and accept an offer, we'll help with all paperwork and ensure a smooth transition to your new role.</p>
                  </div>
                  <div className="md:absolute md:left-1/2 md:transform md:-translate-x-1/2 bg-orange-500 text-white rounded-full w-12 h-12 flex items-center justify-center font-bold text-xl">5</div>
                  <div className="flex-1 md:pl-12 mt-4 md:mt-0"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Testimonials Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Success Stories</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">Hear from job seekers who found their perfect match with us</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial) => (
              <div key={testimonial.id} className="bg-gray-50 rounded-lg p-6 shadow-md hover:shadow-lg transition duration-300">
                <div className="flex flex-col items-center mb-4">
                  <div className="w-20 h-20 rounded-full overflow-hidden mb-4">
                    <Image
                      src={testimonial.image}
                      alt={testimonial.name}
                      width={80}
                      height={80}
                      objectFit="cover"
                    />
                  </div>
                  <h3 className="text-xl font-bold">{testimonial.name}</h3>
                  <p className="text-orange-600">{testimonial.position}</p>
                </div>
                <p className="text-gray-600 italic">"{testimonial.quote}"</p>
              </div>
            ))}
          </div>
          
          <div className="mt-12 text-center">
            <a href="#" className="inline-block bg-orange-600 text-white px-6 py-3 rounded-md hover:bg-orange-700 transition duration-300">
              Read More Success Stories
            </a>
          </div>
        </div>
      </section>
      
      {/* FAQ Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Frequently Asked Questions</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">Find answers to common questions about our job seeker services</p>
          </div>
          
          <div className="max-w-3xl mx-auto">
            <div className="mb-6 bg-white rounded-lg p-6 shadow-md">
              <h3 className="text-xl font-bold mb-2">Is registration free?</h3>
              <p className="text-gray-600">
                Yes, registration is completely free for all job seekers. We never charge candidates for our placement services. Our fees are paid by the employers who hire through us.
              </p>
            </div>
            
            <div className="mb-6 bg-white rounded-lg p-6 shadow-md">
              <h3 className="text-xl font-bold mb-2">How quickly can I expect to find a job?</h3>
              <p className="text-gray-600">
                Placement times vary depending on your skills, experience, and the current job market. However, for in-demand positions, we often place candidates within 48 hours to 2 weeks. Our average placement time is 7 days from initial application to job offer.
              </p>
            </div>
            
            <div className="mb-6 bg-white rounded-lg p-6 shadow-md">
              <h3 className="text-xl font-bold mb-2">What types of jobs do you offer?</h3>
              <p className="text-gray-600">
                We specialize in a wide range of sectors including logistics, manufacturing, healthcare, hospitality, retail, and construction. We offer both temporary and permanent positions, as well as part-time and full-time roles to suit your needs and preferences.
              </p>
            </div>
            
            <div className="mb-6 bg-white rounded-lg p-6 shadow-md">
              <h3 className="text-xl font-bold mb-2">Do I need to speak Dutch to find work?</h3>
              <p className="text-gray-600">
                Not necessarily. While Dutch is helpful for some positions, we have many opportunities that require English or other European languages. We'll match you with positions suitable for your language skills. We also offer free basic Dutch language courses to help you integrate better.
              </p>
            </div>
            
            <div className="bg-white rounded-lg p-6 shadow-md">
              <h3 className="text-xl font-bold mb-2">What happens after I submit my application?</h3>
              <p className="text-gray-600">
                Our recruitment team will review your application and contact you within 1-2 business days to discuss potential opportunities and next steps in the process. We'll schedule an initial interview to better understand your skills and preferences before matching you with suitable positions.
              </p>
            </div>
          </div>
          
          <div className="mt-8 text-center">
            <a href="#" className="text-orange-600 font-semibold hover:underline">
              View all FAQs
            </a>
          </div>
        </div>
      </section>
      
      {/* Call to Action Section */}
      <section className="py-16 bg-orange-600 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Find Your Next Opportunity?</h2>
            <p className="text-xl mb-8">Join thousands of successful job seekers who found their perfect match with Glodinas Flex Work</p>
            
            <div className="flex flex-col md:flex-row justify-center gap-4">
              <button
                onClick={() => setShowJobForm(true)}
                className="bg-white text-orange-600 px-8 py-4 rounded-md hover:bg-orange-100 transition duration-300 font-semibold text-lg"
              >
                Upload Your Resume
              </button>
              <a
                href="#job-listings"
                className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-md hover:bg-white hover:text-orange-600 transition duration-300 font-semibold text-lg"
              >
                Browse Open Positions
              </a>
            </div>
            
            <div className="mt-8 text-lg">
              <p>Or call us directly at <a href="tel:+31201234567" className="font-bold hover:underline">+31 20 123 4567</a></p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Trust Signals Section */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="mb-6 md:mb-0">
              <div className="flex items-center">
                <div className="text-4xl text-orange-500 mr-4">🔒</div>
                <div>
                  <h3 className="text-lg font-bold">Your Data is Secure</h3>
                  <p className="text-gray-600">GDPR compliant & ISO 27001 certified</p>
                </div>
              </div>
            </div>
            
            <div className="mb-6 md:mb-0">
              <div className="flex items-center">
                <div className="text-4xl text-orange-500 mr-4">⭐</div>
                <div>
                  <h3 className="text-lg font-bold">Trusted by Thousands</h3>
                  <p className="text-gray-600">4.8/5 average rating from job seekers</p>
                </div>
              </div>
            </div>
            
            <div>
              <div className="flex items-center">
                <div className="text-4xl text-orange-500 mr-4">🏆</div>
                <div>
                  <h3 className="text-lg font-bold">Award-Winning Agency</h3>
                  <p className="text-gray-600">Best Staffing Agency 2024</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
