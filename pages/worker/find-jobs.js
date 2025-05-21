import React, { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import WorkerLayout from '../../components/layouts/WorkerLayout';

export default function FindJobs() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [jobs, setJobs] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [locationFilter, setLocationFilter] = useState('');
  const [jobTypeFilter, setJobTypeFilter] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const jobsPerPage = 5;

  // Fetch jobs data
  useEffect(() => {
    if (status === 'authenticated' && session?.user?.role === 'WORKER') {
      fetchJobsData();
    } else if (status === 'unauthenticated') {
      router.push('/login');
    }
  }, [status, session]);

  const fetchJobsData = async () => {
    try {
      // This would normally fetch from an API endpoint
      // For now, we'll use mock data
      const mockJobs = [
        {
          id: '1',
          title: 'Administrative Assistant',
          company: 'XYZ Corporation',
          location: 'Amsterdam, Netherlands',
          jobType: 'Full-time',
          salary: '€2,800 - €3,500 per month',
          description: 'We are looking for an Administrative Assistant to support our team with organizational and clerical tasks...',
          requirements: 'Previous administrative experience, proficiency in MS Office, excellent organizational skills...',
          postedDate: new Date('2025-05-15'),
          applicationDeadline: new Date('2025-06-15')
        },
        {
          id: '2',
          title: 'Customer Service Representative',
          company: 'Global Services Ltd',
          location: 'Rotterdam, Netherlands',
          jobType: 'Full-time',
          salary: '€2,500 - €3,200 per month',
          description: 'Join our customer service team to provide excellent support to our clients...',
          requirements: 'Customer service experience, excellent communication skills, problem-solving abilities...',
          postedDate: new Date('2025-05-16'),
          applicationDeadline: new Date('2025-06-10')
        },
        {
          id: '3',
          title: 'Office Manager',
          company: 'Tech Solutions',
          location: 'Utrecht, Netherlands',
          jobType: 'Full-time',
          salary: '€3,500 - €4,200 per month',
          description: 'We are seeking an experienced Office Manager to oversee daily operations and administrative functions...',
          requirements: 'Minimum 3 years of office management experience, strong leadership skills...',
          postedDate: new Date('2025-05-14'),
          applicationDeadline: new Date('2025-06-05')
        },
        {
          id: '4',
          title: 'Data Entry Specialist',
          company: 'Business Solutions',
          location: 'Amsterdam, Netherlands',
          jobType: 'Part-time',
          salary: '€15 - €18 per hour',
          description: 'Looking for a detail-oriented Data Entry Specialist to maintain our database...',
          requirements: 'Fast typing speed, attention to detail, experience with data entry software...',
          postedDate: new Date('2025-05-17'),
          applicationDeadline: new Date('2025-06-17')
        },
        {
          id: '5',
          title: 'Executive Assistant',
          company: 'Finance Group',
          location: 'The Hague, Netherlands',
          jobType: 'Full-time',
          salary: '€3,200 - €4,000 per month',
          description: 'Executive Assistant needed to support C-level executives with administrative tasks...',
          requirements: 'Minimum 5 years of experience as an executive assistant, discretion, excellent organizational skills...',
          postedDate: new Date('2025-05-13'),
          applicationDeadline: new Date('2025-06-13')
        },
        {
          id: '6',
          title: 'Receptionist',
          company: 'Legal Partners',
          location: 'Amsterdam, Netherlands',
          jobType: 'Full-time',
          salary: '€2,400 - €2,800 per month',
          description: 'We are looking for a professional Receptionist to be the first point of contact for our law firm...',
          requirements: 'Previous reception experience, professional appearance, excellent communication skills...',
          postedDate: new Date('2025-05-18'),
          applicationDeadline: new Date('2025-06-18')
        },
        {
          id: '7',
          title: 'Administrative Coordinator',
          company: 'Healthcare Services',
          location: 'Eindhoven, Netherlands',
          jobType: 'Full-time',
          salary: '€2,900 - €3,600 per month',
          description: 'Administrative Coordinator needed to manage office procedures and support medical staff...',
          requirements: 'Healthcare administration experience, knowledge of medical terminology, organizational skills...',
          postedDate: new Date('2025-05-12'),
          applicationDeadline: new Date('2025-06-12')
        },
        {
          id: '8',
          title: 'Virtual Assistant',
          company: 'Remote Solutions',
          location: 'Remote',
          jobType: 'Part-time',
          salary: '€16 - €20 per hour',
          description: 'Virtual Assistant needed to provide administrative support to executives remotely...',
          requirements: 'Previous virtual assistance experience, self-motivation, excellent time management...',
          postedDate: new Date('2025-05-19'),
          applicationDeadline: new Date('2025-06-19')
        }
      ];
      
      setJobs(mockJobs);
    } catch (error) {
      console.error('Error fetching jobs data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSaveJob = (jobId) => {
    alert(`Job ${jobId} saved to your favorites!`);
    // In a real application, this would make an API call to save the job
  };

  const handleApplyForJob = (jobId) => {
    router.push(`/worker/apply/${jobId}`);
    // In a real application, this would navigate to an application form
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-NL', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const getDaysRemaining = (deadline) => {
    const today = new Date();
    const deadlineDate = new Date(deadline);
    const diffTime = deadlineDate - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  // Filter jobs based on search term and filters
  const filteredJobs = jobs.filter(job => {
    const matchesSearch = searchTerm === '' || 
      job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesLocation = locationFilter === '' || job.location.includes(locationFilter);
    const matchesJobType = jobTypeFilter === '' || job.jobType === jobTypeFilter;
    
    return matchesSearch && matchesLocation && matchesJobType;
  });

  // Pagination
  const indexOfLastJob = currentPage * jobsPerPage;
  const indexOfFirstJob = indexOfLastJob - jobsPerPage;
  const currentJobs = filteredJobs.slice(indexOfFirstJob, indexOfLastJob);
  const totalPages = Math.ceil(filteredJobs.length / jobsPerPage);

  // Get unique locations and job types for filters
  const locations = [...new Set(jobs.map(job => job.location))];
  const jobTypes = [...new Set(jobs.map(job => job.jobType))];

  if (loading) {
    return (
      <WorkerLayout>
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange-500"></div>
        </div>
      </WorkerLayout>
    );
  }

  return (
    <WorkerLayout>
      <div className="bg-white shadow-md rounded-lg p-6 mb-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">Find Jobs</h1>
        
        {/* Search and Filters */}
        <div className="mb-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="md:col-span-2">
              <label htmlFor="search" className="block text-sm font-medium text-gray-700 mb-1">Search</label>
              <input
                type="text"
                id="search"
                className="shadow-sm focus:ring-orange-500 focus:border-orange-500 block w-full sm:text-sm border-gray-300 rounded-md"
                placeholder="Search jobs by title, company, or keywords"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">Location</label>
              <select
                id="location"
                className="shadow-sm focus:ring-orange-500 focus:border-orange-500 block w-full sm:text-sm border-gray-300 rounded-md"
                value={locationFilter}
                onChange={(e) => setLocationFilter(e.target.value)}
              >
                <option value="">All Locations</option>
                {locations.map((location, index) => (
                  <option key={index} value={location}>{location}</option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="jobType" className="block text-sm font-medium text-gray-700 mb-1">Job Type</label>
              <select
                id="jobType"
                className="shadow-sm focus:ring-orange-500 focus:border-orange-500 block w-full sm:text-sm border-gray-300 rounded-md"
                value={jobTypeFilter}
                onChange={(e) => setJobTypeFilter(e.target.value)}
              >
                <option value="">All Types</option>
                {jobTypes.map((type, index) => (
                  <option key={index} value={type}>{type}</option>
                ))}
              </select>
            </div>
          </div>
        </div>
        
        {/* Job Listings */}
        {currentJobs.length === 0 ? (
          <div className="text-center py-8">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <h3 className="mt-2 text-lg font-medium text-gray-900">No jobs found</h3>
            <p className="mt-1 text-gray-500">Try adjusting your search or filter criteria</p>
          </div>
        ) : (
          <div className="space-y-6">
            {currentJobs.map((job) => (
              <div key={job.id} className="border rounded-lg overflow-hidden">
                <div className="p-6">
                  <div className="flex justify-between">
                    <h2 className="text-xl font-semibold text-gray-800">{job.title}</h2>
                    <button
                      onClick={() => handleSaveJob(job.id)}
                      className="text-gray-400 hover:text-orange-500"
                      title="Save job"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                      </svg>
                    </button>
                  </div>
                  
                  <div className="mt-2 text-gray-600">{job.company}</div>
                  
                  <div className="mt-4 flex flex-wrap gap-2">
                    <div className="flex items-center text-sm text-gray-500">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      {job.location}
                    </div>
                    
                    <div className="flex items-center text-sm text-gray-500">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                      {job.jobType}
                    </div>
                    
                    <div className="flex items-center text-sm text-gray-500">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      {job.salary}
                    </div>
                  </div>
                  
                  <div className="mt-4">
                    <p className="text-sm text-gray-600 line-clamp-2">{job.description}</p>
                  </div>
                  
                  <div className="mt-6 flex flex-col sm:flex-row justify-between items-start sm:items-center">
                    <div className="text-sm text-gray-500 mb-4 sm:mb-0">
                      <span>Posted on {formatDate(job.postedDate)}</span>
                      <span className="mx-2">•</span>
                      <span className={`${getDaysRemaining(job.applicationDeadline) < 7 ? 'text-red-600 font-medium' : ''}`}>
                        {getDaysRemaining(job.applicationDeadline) > 0 
                          ? `Apply by ${formatDate(job.applicationDeadline)}` 
                          : 'Deadline passed'}
                      </span>
                    </div>
                    
                    <div className="flex space-x-3">
                      <button
                        onClick={() => router.push(`/worker/job/${job.id}`)}
                        className="px-3 py-1 border border-gray-300 rounded-md text-sm text-gray-700 hover:bg-gray-50"
                      >
                        View Details
                      </button>
                      
                      <button
                        onClick={() => handleApplyForJob(job.id)}
                        className="px-3 py-1 bg-orange-600 text-white rounded-md text-sm hover:bg-orange-700"
                        disabled={getDaysRemaining(job.applicationDeadline) <= 0}
                      >
                        Apply Now
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
        
        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center mt-8">
            <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
              <button
                onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
                className={`relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium ${
                  currentPage === 1 ? 'text-gray-300' : 'text-gray-500 hover:bg-gray-50'
                }`}
              >
                <span className="sr-only">Previous</span>
                <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                  <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </button>
              
              {[...Array(totalPages)].map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentPage(i + 1)}
                  className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium ${
                    currentPage === i + 1
                      ? 'z-10 bg-orange-50 border-orange-500 text-orange-600'
                      : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50'
                  }`}
                >
                  {i + 1}
                </button>
              ))}
              
              <button
                onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                disabled={currentPage === totalPages}
                className={`relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium ${
                  currentPage === totalPages ? 'text-gray-300' : 'text-gray-500 hover:bg-gray-50'
                }`}
              >
                <span className="sr-only">Next</span>
                <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                  <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                </svg>
              </button>
            </nav>
          </div>
        )}
      </div>
      
      <div className="bg-white shadow-md rounded-lg p-6">
        <h2 className="text-xl font-bold mb-4">Job Search Tips</h2>
        <div className="space-y-4">
          <div className="flex items-start">
            <div className="flex-shrink-0">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-orange-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm text-gray-700">Use specific keywords related to your skills and desired position.</p>
            </div>
          </div>
          <div className="flex items-start">
            <div className="flex-shrink-0">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-orange-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm text-gray-700">Save jobs you're interested in to apply later after preparing your application.</p>
            </div>
          </div>
          <div className="flex items-start">
            <div className="flex-shrink-0">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-orange-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm text-gray-700">Check application deadlines to ensure you don't miss opportunities.</p>
            </div>
          </div>
          <div className="flex items-start">
            <div className="flex-shrink-0">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-orange-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm text-gray-700">Tailor your resume and cover letter for each application.</p>
            </div>
          </div>
        </div>
      </div>
    </WorkerLayout>
  );
}
