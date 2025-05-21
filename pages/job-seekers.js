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
      ...prev,
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
                  <Link href="/register/job-seeker">
                    <a className="bg-white text-orange-600 px-6 py-3 rounded-md hover:bg-orange-100 transition duration-300 font-semibold">
                      Register as Job Seeker
                    </a>
                  </Link>
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
                      <Link href="/register/job-seeker">
                        <a className="bg-orange-600 text-white px-4 py-2 rounded hover:bg-orange-700 transition duration-300">
                          Apply Now
                        </a>
                      </Link>
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
              <h3 className="mt-4 text-lg font-medium text-gray-900">No jobs found</h3>
              <p className="mt-2 text-gray-600">Try adjusting your search filters or check back later for new opportunities.</p>
              <div className="mt-6">
                <Link href="/register/job-seeker">
                  <a className="btn btn-primary">
                    Register for Job Alerts
                  </a>
                </Link>
              </div>
            </div>
          )}
          
          <div className="text-center mt-12">
            <p className="text-gray-600 mb-6">Don't see what you're looking for? Register to get notified about new opportunities that match your profile.</p>
            <Link href="/register/job-seeker">
              <a className="btn btn-primary btn-lg">
                Register as Job Seeker
              </a>
            </Link>
          </div>
        </div>
      </section>
      
      {/* How It Works Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">How It Works</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">Our simple process helps you find the right job quickly and efficiently</p>
          </div>
          
          <div className="max-w-5xl mx-auto">
            <div className="relative">
              {/* Progress Line */}
              <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-1 bg-orange-200 transform -translate-x-1/2"></div>
              
              {/* Steps */}
              <div className="space-y-12 md:space-y-0 md:grid md:grid-cols-2 md:gap-16">
                {/* Step 1 */}
                <div className="md:text-right">
                  <div className="relative flex md:justify-end">
                    <div className="hidden md:flex absolute top-0 -right-8 md:right-0 items-center justify-center w-16 h-16 rounded-full bg-orange-100 border-4 border-orange-200 z-10 transform md:translate-x-1/2">
                      <span className="text-orange-600 font-bold text-xl">1</span>
                    </div>
                    <div className="md:mr-8">
                      <h3 className="text-xl font-bold text-gray-800 mb-2">Register Your Profile</h3>
                      <p className="text-gray-600">Create your profile with your skills, experience, and job preferences to get personalized matches.</p>
                    </div>
                  </div>
                </div>
                
                <div className="md:h-32"></div>
                
                {/* Step 2 */}
                <div className="md:h-32"></div>
                
                <div>
                  <div className="relative flex">
                    <div className="hidden md:flex absolute top-0 -left-8 md:left-0 items-center justify-center w-16 h-16 rounded-full bg-orange-100 border-4 border-orange-200 z-10 transform md:-translate-x-1/2">
                      <span className="text-orange-600 font-bold text-xl">2</span>
                    </div>
                    <div className="md:ml-8">
                      <h3 className="text-xl font-bold text-gray-800 mb-2">Get Matched with Jobs</h3>
                      <p className="text-gray-600">Our system matches your profile with suitable job openings from our extensive network of employers.</p>
                    </div>
                  </div>
                </div>
                
                {/* Step 3 */}
                <div>
                  <div className="relative flex md:justify-end">
                    <div className="hidden md:flex absolute top-0 -right-8 md:right-0 items-center justify-center w-16 h-16 rounded-full bg-orange-100 border-4 border-orange-200 z-10 transform md:translate-x-1/2">
                      <span className="text-orange-600 font-bold text-xl">3</span>
                    </div>
                    <div className="md:mr-8">
                      <h3 className="text-xl font-bold text-gray-800 mb-2">Apply with One Click</h3>
                      <p className="text-gray-600">Apply to jobs with a single click using your saved profile information and documents.</p>
                    </div>
                  </div>
                </div>
                
                <div className="md:h-32"></div>
                
                {/* Step 4 */}
                <div className="md:h-32"></div>
                
                <div>
                  <div className="relative flex">
                    <div className="hidden md:flex absolute top-0 -left-8 md:left-0 items-center justify-center w-16 h-16 rounded-full bg-orange-100 border-4 border-orange-200 z-10 transform md:-translate-x-1/2">
                      <span className="text-orange-600 font-bold text-xl">4</span>
                    </div>
                    <div className="md:ml-8">
                      <h3 className="text-xl font-bold text-gray-800 mb-2">Get Hired & Supported</h3>
                      <p className="text-gray-600">Receive interview invitations, get hired, and enjoy ongoing support from our dedicated team.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="text-center mt-16">
              <Link href="/register/job-seeker">
                <a className="btn btn-primary btn-lg">
                  Start Your Journey Today
                </a>
              </Link>
            </div>
          </div>
        </div>
      </section>
      
      {/* Testimonials Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Success Stories</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">Hear from job seekers who found their perfect position through Glodinas Flex Work</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {testimonials.map((testimonial) => (
              <div key={testimonial.id} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition duration-300">
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
                    <h3 className="font-bold text-gray-800">{testimonial.name}</h3>
                    <p className="text-gray-600">{testimonial.position}</p>
                  </div>
                </div>
                <p className="text-gray-700 italic">"{testimonial.quote}"</p>
              </div>
            ))}
          </div>
          
          <div className="text-center mt-12">
            <p className="text-gray-600 mb-6">Join thousands of satisfied job seekers who have found their ideal positions through Glodinas Flex Work.</p>
            <Link href="/register/job-seeker">
              <a className="btn btn-primary">
                Register Now
              </a>
            </Link>
          </div>
        </div>
      </section>
      
      {/* FAQ Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Frequently Asked Questions</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">Find answers to common questions about our job seeker services</p>
          </div>
          
          <div className="max-w-3xl mx-auto space-y-6">
            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="text-xl font-bold text-gray-800 mb-2">Is it free to register as a job seeker?</h3>
              <p className="text-gray-600">Yes, registration is completely free for job seekers. We don't charge any fees for our matching and application services.</p>
            </div>
            
            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="text-xl font-bold text-gray-800 mb-2">What types of jobs do you offer?</h3>
              <p className="text-gray-600">We offer a wide range of positions across multiple industries, including manufacturing, logistics, healthcare, hospitality, retail, and construction. Both temporary and permanent positions are available.</p>
            </div>
            
            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="text-xl font-bold text-gray-800 mb-2">Do I need to speak Dutch to apply?</h3>
              <p className="text-gray-600">Not necessarily. Many of our positions only require English, and we have opportunities for speakers of various languages. Each job listing will specify the language requirements.</p>
            </div>
            
            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="text-xl font-bold text-gray-800 mb-2">How quickly can I start working?</h3>
              <p className="text-gray-600">Many of our clients need staff immediately. Depending on the position and your availability, you could start working within days of your application being approved.</p>
            </div>
            
            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="text-xl font-bold text-gray-800 mb-2">What support do you provide to job seekers?</h3>
              <p className="text-gray-600">We offer comprehensive support including assistance with work permits, housing advice, language courses, career development, and ongoing workplace support to ensure your success.</p>
            </div>
          </div>
          
          <div className="text-center mt-12">
            <p className="text-gray-600 mb-6">Have more questions? Contact our support team or register to speak with a personal advisor.</p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link href="/contact">
                <a className="btn btn-outline">
                  Contact Us
                </a>
              </Link>
              <Link href="/register/job-seeker">
                <a className="btn btn-primary">
                  Register as Job Seeker
                </a>
              </Link>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-orange-600 to-orange-500 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Find Your Next Opportunity?</h2>
            <p className="text-xl mb-8">Join thousands of satisfied job seekers who have found their ideal positions through Glodinas Flex Work.</p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link href="/register/job-seeker">
                <a className="btn btn-white btn-lg">
                  Register Now
                </a>
              </Link>
              <Link href="/contact">
                <a className="btn btn-outline-white btn-lg">
                  Contact Us
                </a>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
