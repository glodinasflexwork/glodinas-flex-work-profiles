import React, { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import WorkerLayout from '../../components/layouts/WorkerLayout';
import { toast } from 'react-toastify';

export default function FindJobs() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [jobs, setJobs] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [location, setLocation] = useState('');
  const [jobType, setJobType] = useState('');

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
      // For demo purposes, we'll use mock data since the API endpoint doesn't exist yet
      // In a real implementation, this would fetch from /api/jobs
      
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // Mock jobs data
      const mockJobs = [
        {
          id: '1',
          title: 'Senior Frontend Developer',
          company: 'Tech Innovations BV',
          location: 'Amsterdam',
          salary: '€60,000 - €75,000',
          jobType: 'Full-time',
          postedDate: '2025-05-10T10:30:00Z',
          description: 'We are looking for an experienced Frontend Developer with React expertise to join our growing team.',
          requirements: 'Minimum 5 years of experience with modern JavaScript frameworks, preferably React.'
        },
        {
          id: '2',
          title: 'UX/UI Designer',
          company: 'Creative Solutions',
          location: 'Rotterdam',
          salary: '€45,000 - €55,000',
          jobType: 'Full-time',
          postedDate: '2025-05-12T14:45:00Z',
          description: 'Join our creative team to design beautiful and functional user interfaces for our clients.',
          requirements: 'Portfolio showcasing UI/UX projects, proficiency in Figma and Adobe Creative Suite.'
        },
        {
          id: '3',
          title: 'DevOps Engineer',
          company: 'Cloud Services NL',
          location: 'The Hague',
          salary: '€65,000 - €80,000',
          jobType: 'Full-time',
          postedDate: '2025-05-15T11:20:00Z',
          description: 'Help us build and maintain our cloud infrastructure and CI/CD pipelines.',
          requirements: 'Experience with AWS/Azure, Docker, Kubernetes, and CI/CD tools.'
        },
        {
          id: '4',
          title: 'Part-time Marketing Assistant',
          company: 'Global Brands',
          location: 'Utrecht',
          salary: '€25 - €30 per hour',
          jobType: 'Part-time',
          postedDate: '2025-05-16T09:15:00Z',
          description: 'Support our marketing team with campaigns, social media, and content creation.',
          requirements: 'Marketing background, excellent communication skills, and social media expertise.'
        },
        {
          id: '5',
          title: 'Data Analyst',
          company: 'Analytics Pro',
          location: 'Amsterdam',
          salary: '€50,000 - €60,000',
          jobType: 'Full-time',
          postedDate: '2025-05-17T13:40:00Z',
          description: 'Turn data into actionable insights to drive business decisions.',
          requirements: 'Experience with SQL, Python, and data visualization tools like Tableau or Power BI.'
        }
      ];
      
      setJobs(mockJobs);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching jobs data:', error);
      toast.error('Failed to load jobs');
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    toast.info(`Searching for "${searchTerm}" jobs in ${location || 'all locations'}`);
    // In a real implementation, this would filter jobs based on search criteria
  };

  const handleSaveJob = (jobId) => {
    toast.success('Job saved to your list');
    // In a real implementation, this would call the API to save the job
  };

  const handleApplyJob = (jobId) => {
    toast.info('Redirecting to application form...');
    // In a real implementation, this would navigate to the application form
    router.push(`/worker/apply?jobId=${jobId}`);
  };

  // Filter jobs based on search criteria
  const filteredJobs = jobs.filter(job => {
    const matchesSearch = searchTerm === '' || 
      job.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
      job.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesLocation = location === '' || 
      job.location.toLowerCase().includes(location.toLowerCase());
    
    const matchesJobType = jobType === '' || 
      job.jobType === jobType;
    
    return matchesSearch && matchesLocation && matchesJobType;
  });

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
      <div className="bg-white shadow-md rounded-lg p-6">
        <h1 className="text-2xl font-bold mb-6">Find Jobs</h1>
        
        {/* Search Form */}
        <div className="bg-gray-50 p-6 rounded-lg mb-8">
          <form onSubmit={handleSearch}>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label htmlFor="search" className="block text-sm font-medium text-gray-700 mb-1">
                  Job Title, Keywords, or Company
                </label>
                <input
                  type="text"
                  id="search"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                  placeholder="e.g., Developer, Marketing, Sales"
                />
              </div>
              
              <div>
                <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">
                  Location
                </label>
                <input
                  type="text"
                  id="location"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                  placeholder="e.g., Amsterdam, Rotterdam"
                />
              </div>
              
              <div>
                <label htmlFor="jobType" className="block text-sm font-medium text-gray-700 mb-1">
                  Job Type
                </label>
                <select
                  id="jobType"
                  value={jobType}
                  onChange={(e) => setJobType(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                >
                  <option value="">All Job Types</option>
                  <option value="Full-time">Full-time</option>
                  <option value="Part-time">Part-time</option>
                  <option value="Contract">Contract</option>
                  <option value="Temporary">Temporary</option>
                  <option value="Internship">Internship</option>
                </select>
              </div>
            </div>
            
            <div className="mt-4 flex justify-end">
              <button
                type="submit"
                className="px-6 py-2 bg-orange-600 text-white rounded-md hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2"
              >
                Search Jobs
              </button>
            </div>
          </form>
        </div>
        
        {/* Job Listings */}
        <div className="space-y-6">
          {filteredJobs.length === 0 ? (
            <div className="text-center py-8">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <h3 className="mt-2 text-lg font-medium text-gray-900">No jobs found</h3>
              <p className="mt-1 text-gray-500">Try adjusting your search criteria.</p>
            </div>
          ) : (
            filteredJobs.map((job) => (
              <div key={job.id} className="border rounded-lg overflow-hidden">
                <div className="p-6">
                  <div className="flex flex-col md:flex-row md:justify-between md:items-start">
                    <div>
                      <h2 className="text-xl font-semibold text-gray-900">{job.title}</h2>
                      <p className="text-gray-600 mt-1">{job.company}</p>
                      <div className="mt-2 flex flex-wrap gap-2">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                          {job.location}
                        </span>
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                          {job.jobType}
                        </span>
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                          {job.salary}
                        </span>
                      </div>
                    </div>
                    <div className="mt-4 md:mt-0 flex flex-col md:items-end">
                      <p className="text-sm text-gray-500">
                        Posted {new Date(job.postedDate).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  
                  <div className="mt-4">
                    <h3 className="text-sm font-medium text-gray-900">Description</h3>
                    <p className="mt-1 text-sm text-gray-600">{job.description}</p>
                  </div>
                  
                  <div className="mt-4">
                    <h3 className="text-sm font-medium text-gray-900">Requirements</h3>
                    <p className="mt-1 text-sm text-gray-600">{job.requirements}</p>
                  </div>
                  
                  <div className="mt-6 flex flex-col sm:flex-row sm:justify-end space-y-2 sm:space-y-0 sm:space-x-3">
                    <button
                      onClick={() => handleSaveJob(job.id)}
                      className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
                    >
                      Save Job
                    </button>
                    <button
                      onClick={() => handleApplyJob(job.id)}
                      className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-orange-600 hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
                    >
                      Apply Now
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </WorkerLayout>
  );
}
