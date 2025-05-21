import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useDropzone } from 'react-dropzone';
import { useNotification } from '../components/NotificationContext';

export default function JobSeekers() {
  const { addNotification } = useNotification();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterLocation, setFilterLocation] = useState('');
  const [filterJobType, setFilterJobType] = useState('');
  const [filterIndustry, setFilterIndustry] = useState('');
  const [activeTab, setActiveTab] = useState('search');
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    location: '',
    jobType: '',
    industry: '',
    experience: '',
    resumeFile: null,
    coverLetterFile: null,
    message: ''
  });
  const [resumeUploading, setResumeUploading] = useState(false);
  const [coverLetterUploading, setCoverLetterUploading] = useState(false);
  const [resumeUrl, setResumeUrl] = useState('');
  const [coverLetterUrl, setCoverLetterUrl] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  const router = useRouter();

  // Resume dropzone
  const resumeDropzone = useDropzone({
    accept: {
      'application/pdf': ['.pdf'],
      'application/msword': ['.doc'],
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx'],
      'image/jpeg': ['.jpg', '.jpeg']
    },
    maxFiles: 1,
    onDrop: async (acceptedFiles) => {
      if (acceptedFiles.length > 0) {
        const file = acceptedFiles[0];
        setFormData(prev => ({ ...prev, resumeFile: file }));
        
        // Upload to Cloudinary
        setResumeUploading(true);
        try {
          const uploadData = new FormData();
          uploadData.append('file', file);
          uploadData.append('upload_preset', 'job_applications');
          
          const response = await fetch('/api/upload', {
            method: 'POST',
            body: uploadData,
          });
          
          const data = await response.json();
          if (data.url) {
            setResumeUrl(data.url);
            addNotification('Resume uploaded successfully', 'success');
          } else {
            throw new Error('Upload failed');
          }
        } catch (error) {
          console.error('Error uploading resume:', error);
          addNotification('Failed to upload resume. Please try again.', 'error');
        } finally {
          setResumeUploading(false);
        }
      }
    }
  });

  // Cover letter dropzone
  const coverLetterDropzone = useDropzone({
    accept: {
      'application/pdf': ['.pdf'],
      'application/msword': ['.doc'],
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx'],
      'image/jpeg': ['.jpg', '.jpeg']
    },
    maxFiles: 1,
    onDrop: async (acceptedFiles) => {
      if (acceptedFiles.length > 0) {
        const file = acceptedFiles[0];
        setFormData(prev => ({ ...prev, coverLetterFile: file }));
        
        // Upload to Cloudinary
        setCoverLetterUploading(true);
        try {
          const uploadData = new FormData();
          uploadData.append('file', file);
          uploadData.append('upload_preset', 'job_applications');
          
          const response = await fetch('/api/upload', {
            method: 'POST',
            body: uploadData,
          });
          
          const data = await response.json();
          if (data.url) {
            setCoverLetterUrl(data.url);
            addNotification('Cover letter uploaded successfully', 'success');
          } else {
            throw new Error('Upload failed');
          }
        } catch (error) {
          console.error('Error uploading cover letter:', error);
          addNotification('Failed to upload cover letter. Please try again.', 'error');
        } finally {
          setCoverLetterUploading(false);
        }
      }
    }
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Validate form
      if (!formData.fullName || !formData.email || !formData.phone) {
        addNotification('Please fill in all required fields', 'error');
        setIsSubmitting(false);
        return;
      }

      // Prepare submission data
      const submissionData = {
        ...formData,
        resumeUrl,
        coverLetterUrl,
        submittedAt: new Date().toISOString()
      };

      // Submit to API
      const response = await fetch('/api/submit-application', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(submissionData),
      });

      if (response.ok) {
        setShowSuccessMessage(true);
        setFormData({
          fullName: '',
          email: '',
          phone: '',
          location: '',
          jobType: '',
          industry: '',
          experience: '',
          resumeFile: null,
          coverLetterFile: null,
          message: ''
        });
        setResumeUrl('');
        setCoverLetterUrl('');
        addNotification('Your application has been submitted successfully!', 'success');
        
        // Reset form after 5 seconds
        setTimeout(() => {
          setShowSuccessMessage(false);
        }, 5000);
      } else {
        throw new Error('Submission failed');
      }
    } catch (error) {
      console.error('Error submitting application:', error);
      addNotification('Failed to submit your application. Please try again.', 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Sample featured jobs data
  const featuredJobs = [
    {
      id: 1,
      title: 'Warehouse Associate',
      company: 'LogiTech Distribution',
      location: 'Amsterdam, Netherlands',
      salary: '€12 - €15 per hour',
      type: 'Full-time',
      industry: 'Logistics',
      description: 'Join our warehouse team to help with receiving, storing, and shipping products. Experience with inventory management systems is a plus.',
      requirements: ['Physical stamina', 'Basic computer skills', 'Attention to detail', 'Team player'],
      postedDate: '2023-05-15'
    },
    {
      id: 2,
      title: 'Production Line Worker',
      company: 'EuroManufacturing',
      location: 'Rotterdam, Netherlands',
      salary: '€13 - €16 per hour',
      type: 'Full-time',
      industry: 'Manufacturing',
      description: 'Work on our production line assembling components for automotive parts. Training provided for the right candidates.',
      requirements: ['Manual dexterity', 'Ability to follow instructions', 'Safety-conscious', 'Reliable'],
      postedDate: '2023-05-12'
    },
    {
      id: 3,
      title: 'Healthcare Assistant',
      company: 'CareFirst Medical Center',
      location: 'Utrecht, Netherlands',
      salary: '€14 - €18 per hour',
      type: 'Part-time',
      industry: 'Healthcare',
      description: 'Assist nurses and doctors in providing care to patients. Responsibilities include monitoring vital signs and helping with daily activities.',
      requirements: ['Compassionate attitude', 'Basic medical knowledge', 'Good communication skills', 'Certification preferred'],
      postedDate: '2023-05-10'
    },
    {
      id: 4,
      title: 'Hotel Housekeeper',
      company: 'Grand Plaza Hotel',
      location: 'Amsterdam, Netherlands',
      salary: '€12 - €14 per hour',
      type: 'Part-time',
      industry: 'Hospitality',
      description: 'Maintain cleanliness and appearance of hotel rooms and common areas. Weekend availability required.',
      requirements: ['Attention to detail', 'Physical stamina', 'Time management', 'Customer service oriented'],
      postedDate: '2023-05-08'
    },
    {
      id: 5,
      title: 'Retail Sales Associate',
      company: 'Fashion Forward',
      location: 'The Hague, Netherlands',
      salary: '€11 - €13 per hour',
      type: 'Full-time',
      industry: 'Retail',
      description: 'Assist customers, process sales, and maintain store appearance. Previous retail experience preferred but not required.',
      requirements: ['Customer service skills', 'Sales ability', 'Flexible schedule', 'Fashion knowledge a plus'],
      postedDate: '2023-05-05'
    },
    {
      id: 6,
      title: 'Construction Helper',
      company: 'BuildRight Construction',
      location: 'Rotterdam, Netherlands',
      salary: '€15 - €18 per hour',
      type: 'Full-time',
      industry: 'Construction',
      description: 'Assist skilled tradespeople on construction sites. Tasks include material handling, site cleanup, and basic construction tasks.',
      requirements: ['Physical strength', 'Safety-conscious', 'Reliable', 'Willingness to learn'],
      postedDate: '2023-05-03'
    }
  ];

  // Testimonials data
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

  // Unique locations, job types, and industries for filters
  const locations = [...new Set(featuredJobs.map(job => job.location))];
  const jobTypes = [...new Set(featuredJobs.map(job => job.type))];
  const industries = [...new Set(featuredJobs.map(job => job.industry))];

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white">
        <div className="container mx-auto px-4 py-16 md:py-24">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Find Your Perfect Job Opportunity</h1>
            <p className="text-xl md:text-2xl mb-8">Join thousands of professionals who have found their ideal positions through Glodinas Flex Work</p>
            
            <div className="bg-white rounded-lg shadow-lg p-4 md:p-6">
              <div className="flex flex-col md:flex-row gap-4">
                <input
                  type="text"
                  placeholder="Search jobs by title or keyword"
                  className="flex-grow px-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <button 
                  className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-md font-medium transition duration-300"
                  onClick={() => setActiveTab('search')}
                >
                  Search Jobs
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Main Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left Column - Job Search */}
          <div className="lg:w-2/3">
            <div className="bg-white rounded-lg shadow-md overflow-hidden mb-8">
              <div className="border-b border-gray-200">
                <div className="flex">
                  <button
                    className={`px-6 py-4 font-medium ${activeTab === 'search' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-600 hover:text-blue-500'}`}
                    onClick={() => setActiveTab('search')}
                  >
                    Job Search
                  </button>
                  <button
                    className={`px-6 py-4 font-medium ${activeTab === 'apply' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-600 hover:text-blue-500'}`}
                    onClick={() => setActiveTab('apply')}
                  >
                    Apply Now
                  </button>
                </div>
              </div>
              
              {activeTab === 'search' ? (
                <div className="p-6">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                      <select
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        value={filterLocation}
                        onChange={(e) => setFilterLocation(e.target.value)}
                      >
                        <option value="">All Locations</option>
                        {locations.map((location, index) => (
                          <option key={index} value={location}>{location}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Job Type</label>
                      <select
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        value={filterJobType}
                        onChange={(e) => setFilterJobType(e.target.value)}
                      >
                        <option value="">All Types</option>
                        {jobTypes.map((type, index) => (
                          <option key={index} value={type}>{type}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Industry</label>
                      <select
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        value={filterIndustry}
                        onChange={(e) => setFilterIndustry(e.target.value)}
                      >
                        <option value="">All Industries</option>
                        {industries.map((industry, index) => (
                          <option key={index} value={industry}>{industry}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                  
                  <div className="mb-4">
                    <h2 className="text-xl font-semibold text-gray-800 mb-2">Featured Jobs</h2>
                    <p className="text-gray-600">Showing {filteredJobs.length} jobs</p>
                  </div>
                  
                  {filteredJobs.length > 0 ? (
                    <div className="space-y-6">
                      {filteredJobs.map(job => (
                        <div key={job.id} className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition duration-300">
                          <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-4">
                            <div>
                              <h3 className="text-xl font-semibold text-gray-800">{job.title}</h3>
                              <p className="text-gray-600">{job.company} • {job.location}</p>
                            </div>
                            <div className="mt-2 md:mt-0">
                              <span className="inline-block bg-blue-100 text-blue-800 text-sm font-medium px-3 py-1 rounded-full">
                                {job.type}
                              </span>
                            </div>
                          </div>
                          
                          <div className="mb-4">
                            <p className="text-gray-700">{job.description}</p>
                          </div>
                          
                          <div className="mb-4">
                            <h4 className="text-sm font-semibold text-gray-700 mb-2">Requirements:</h4>
                            <ul className="list-disc list-inside text-gray-600 space-y-1">
                              {job.requirements.map((req, index) => (
                                <li key={index}>{req}</li>
                              ))}
                            </ul>
                          </div>
                          
                          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center">
                            <div className="mb-2 sm:mb-0">
                              <span className="text-gray-700 font-medium">{job.salary}</span>
                              <span className="text-gray-500 text-sm ml-4">Posted {new Date(job.postedDate).toLocaleDateString()}</span>
                            </div>
                            <button 
                              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md font-medium transition duration-300"
                              onClick={() => {
                                setActiveTab('apply');
                                setFormData(prev => ({
                                  ...prev,
                                  jobType: job.type,
                                  industry: job.industry
                                }));
                              }}
                            >
                              Apply Now
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <p className="text-gray-600 mb-4">No jobs found matching your criteria.</p>
                      <button 
                        className="text-blue-600 hover:text-blue-800 font-medium"
                        onClick={() => {
                          setSearchTerm('');
                          setFilterLocation('');
                          setFilterJobType('');
                          setFilterIndustry('');
                        }}
                      >
                        Clear all filters
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <div className="p-6">
                  {showSuccessMessage ? (
                    <div className="text-center py-8">
                      <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                        </svg>
                      </div>
                      <h3 className="text-2xl font-semibold text-gray-800 mb-2">Application Submitted!</h3>
                      <p className="text-gray-600 mb-6">Thank you for your application. Our team will review it and contact you soon.</p>
                      <button 
                        className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-md font-medium transition duration-300"
                        onClick={() => setActiveTab('search')}
                      >
                        Back to Job Search
                      </button>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit}>
                      <h2 className="text-xl font-semibold text-gray-800 mb-6">Submit Your Application</h2>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Full Name *</label>
                          <input
                            type="text"
                            name="fullName"
                            value={formData.fullName}
                            onChange={handleInputChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Email Address *</label>
                          <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number *</label>
                          <input
                            type="tel"
                            name="phone"
                            value={formData.phone}
                            onChange={handleInputChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Preferred Location</label>
                          <select
                            name="location"
                            value={formData.location}
                            onChange={handleInputChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                          >
                            <option value="">Select Location</option>
                            {locations.map((location, index) => (
                              <option key={index} value={location}>{location}</option>
                            ))}
                          </select>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Job Type</label>
                          <select
                            name="jobType"
                            value={formData.jobType}
                            onChange={handleInputChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                          >
                            <option value="">Select Job Type</option>
                            {jobTypes.map((type, index) => (
                              <option key={index} value={type}>{type}</option>
                            ))}
                          </select>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Industry</label>
                          <select
                            name="industry"
                            value={formData.industry}
                            onChange={handleInputChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                          >
                            <option value="">Select Industry</option>
                            {industries.map((industry, index) => (
                              <option key={index} value={industry}>{industry}</option>
                            ))}
                          </select>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Years of Experience</label>
                          <select
                            name="experience"
                            value={formData.experience}
                            onChange={handleInputChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                          >
                            <option value="">Select Experience</option>
                            <option value="0-1">Less than 1 year</option>
                            <option value="1-3">1-3 years</option>
                            <option value="3-5">3-5 years</option>
                            <option value="5+">5+ years</option>
                          </select>
                        </div>
                      </div>
                      
                      <div className="mb-6">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Resume/CV</label>
                        <div 
                          {...resumeDropzone.getRootProps()} 
                          className="border-2 border-dashed border-gray-300 rounded-md p-6 text-center cursor-pointer hover:border-blue-500 transition duration-300"
                        >
                          <input {...resumeDropzone.getInputProps()} />
                          {resumeUploading ? (
                            <div className="text-center">
                              <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-blue-500 border-t-transparent"></div>
                              <p className="mt-2 text-sm text-gray-600">Uploading...</p>
                            </div>
                          ) : formData.resumeFile ? (
                            <div>
                              <svg className="w-8 h-8 text-green-500 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                              </svg>
                              <p className="mt-2 text-sm text-gray-600">{formData.resumeFile.name}</p>
                              <p className="text-xs text-gray-500">Click or drag to replace</p>
                            </div>
                          ) : (
                            <div>
                              <svg className="w-8 h-8 text-gray-400 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path>
                              </svg>
                              <p className="mt-2 text-sm text-gray-600">Drag and drop your resume here, or click to select</p>
                              <p className="text-xs text-gray-500">Supported formats: PDF, DOC, DOCX, JPG (Max 5MB)</p>
                            </div>
                          )}
                        </div>
                      </div>
                      
                      <div className="mb-6">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Cover Letter (Optional)</label>
                        <div 
                          {...coverLetterDropzone.getRootProps()} 
                          className="border-2 border-dashed border-gray-300 rounded-md p-6 text-center cursor-pointer hover:border-blue-500 transition duration-300"
                        >
                          <input {...coverLetterDropzone.getInputProps()} />
                          {coverLetterUploading ? (
                            <div className="text-center">
                              <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-blue-500 border-t-transparent"></div>
                              <p className="mt-2 text-sm text-gray-600">Uploading...</p>
                            </div>
                          ) : formData.coverLetterFile ? (
                            <div>
                              <svg className="w-8 h-8 text-green-500 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                              </svg>
                              <p className="mt-2 text-sm text-gray-600">{formData.coverLetterFile.name}</p>
                              <p className="text-xs text-gray-500">Click or drag to replace</p>
                            </div>
                          ) : (
                            <div>
                              <svg className="w-8 h-8 text-gray-400 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path>
                              </svg>
                              <p className="mt-2 text-sm text-gray-600">Drag and drop your cover letter here, or click to select</p>
                              <p className="text-xs text-gray-500">Supported formats: PDF, DOC, DOCX, JPG (Max 5MB)</p>
                            </div>
                          )}
                        </div>
                      </div>
                      
                      <div className="mb-6">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Additional Information (Optional)</label>
                        <textarea
                          name="message"
                          value={formData.message}
                          onChange={handleInputChange}
                          rows="4"
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                          placeholder="Tell us about your skills, experience, or anything else you'd like us to know..."
                        ></textarea>
                      </div>
                      
                      <div className="flex justify-end">
                        <button
                          type="submit"
                          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-md font-medium transition duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                          disabled={isSubmitting || resumeUploading || coverLetterUploading}
                        >
                          {isSubmitting ? 'Submitting...' : 'Submit Application'}
                        </button>
                      </div>
                    </form>
                  )}
                </div>
              )}
            </div>
          </div>
          
          {/* Right Column - Info and Testimonials */}
          <div className="lg:w-1/3">
            {/* Why Choose Us */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden mb-8">
              <div className="p-6">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">Why Choose Glodinas Flex Work</h2>
                <ul className="space-y-4">
                  <li className="flex">
                    <div className="flex-shrink-0">
                      <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                        <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                        </svg>
                      </div>
                    </div>
                    <div className="ml-4">
                      <h3 className="text-lg font-medium text-gray-800">Diverse Opportunities</h3>
                      <p className="text-gray-600">Access to a wide range of positions across multiple industries and locations.</p>
                    </div>
                  </li>
                  <li className="flex">
                    <div className="flex-shrink-0">
                      <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                        <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path>
                        </svg>
                      </div>
                    </div>
                    <div className="ml-4">
                      <h3 className="text-lg font-medium text-gray-800">Personalized Matching</h3>
                      <p className="text-gray-600">Our team takes time to understand your skills and goals for better job matches.</p>
                    </div>
                  </li>
                  <li className="flex">
                    <div className="flex-shrink-0">
                      <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                        <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"></path>
                        </svg>
                      </div>
                    </div>
                    <div className="ml-4">
                      <h3 className="text-lg font-medium text-gray-800">Career Growth</h3>
                      <p className="text-gray-600">Support for professional development and advancement opportunities.</p>
                    </div>
                  </li>
                  <li className="flex">
                    <div className="flex-shrink-0">
                      <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                        <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                        </svg>
                      </div>
                    </div>
                    <div className="ml-4">
                      <h3 className="text-lg font-medium text-gray-800">Quick Placement</h3>
                      <p className="text-gray-600">Efficient process to help you start your new job as soon as possible.</p>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
            
            {/* Application Process */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden mb-8">
              <div className="p-6">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">Application Process</h2>
                <div className="space-y-8">
                  <div className="relative pl-8">
                    <div className="absolute left-0 top-0 w-6 h-6 rounded-full bg-blue-600 text-white flex items-center justify-center font-medium">1</div>
                    <div className="ml-4">
                      <h3 className="text-lg font-medium text-gray-800">Submit Application</h3>
                      <p className="text-gray-600">Fill out our application form with your details and upload your resume.</p>
                    </div>
                  </div>
                  <div className="relative pl-8">
                    <div className="absolute left-0 top-0 w-6 h-6 rounded-full bg-blue-600 text-white flex items-center justify-center font-medium">2</div>
                    <div className="ml-4">
                      <h3 className="text-lg font-medium text-gray-800">Initial Screening</h3>
                      <p className="text-gray-600">Our recruiters will review your application and contact you for an initial call.</p>
                    </div>
                  </div>
                  <div className="relative pl-8">
                    <div className="absolute left-0 top-0 w-6 h-6 rounded-full bg-blue-600 text-white flex items-center justify-center font-medium">3</div>
                    <div className="ml-4">
                      <h3 className="text-lg font-medium text-gray-800">Job Matching</h3>
                      <p className="text-gray-600">We'll match you with suitable positions based on your skills and preferences.</p>
                    </div>
                  </div>
                  <div className="relative pl-8">
                    <div className="absolute left-0 top-0 w-6 h-6 rounded-full bg-blue-600 text-white flex items-center justify-center font-medium">4</div>
                    <div className="ml-4">
                      <h3 className="text-lg font-medium text-gray-800">Interview & Placement</h3>
                      <p className="text-gray-600">We'll arrange interviews with potential employers and help secure your placement.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Testimonials */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="p-6">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">Success Stories</h2>
                <div className="space-y-6">
                  {testimonials.map(testimonial => (
                    <div key={testimonial.id} className="border-b border-gray-200 pb-6 last:border-b-0 last:pb-0">
                      <div className="flex items-center mb-4">
                        <img 
                          src={testimonial.image} 
                          alt={testimonial.name} 
                          className="w-12 h-12 rounded-full object-cover"
                        />
                        <div className="ml-4">
                          <h3 className="text-lg font-medium text-gray-800">{testimonial.name}</h3>
                          <p className="text-gray-600">{testimonial.position}</p>
                        </div>
                      </div>
                      <p className="text-gray-700 italic">"{testimonial.quote}"</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
