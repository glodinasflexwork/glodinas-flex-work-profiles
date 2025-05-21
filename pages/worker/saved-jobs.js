import React, { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import WorkerLayout from '../../components/layouts/WorkerLayout';
import { toast } from 'react-toastify';

export default function SavedJobs() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [savedJobs, setSavedJobs] = useState([]);

  // Fetch saved jobs data
  useEffect(() => {
    if (status === 'authenticated' && session?.user?.role === 'WORKER') {
      fetchSavedJobsData();
    } else if (status === 'unauthenticated') {
      router.push('/login');
    }
  }, [status, session]);

  const fetchSavedJobsData = async () => {
    try {
      // For demo purposes, we'll use mock data since the API endpoint doesn't exist yet
      // In a real implementation, this would fetch from /api/worker/saved-jobs
      
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // Mock saved jobs data
      const mockSavedJobs = [
        {
          id: '1',
          jobTitle: 'Senior Frontend Developer',
          company: 'Tech Innovations BV',
          location: 'Amsterdam',
          salary: '€60,000 - €75,000',
          jobType: 'Full-time',
          savedDate: '2025-05-18T10:30:00Z',
          description: 'We are looking for an experienced Frontend Developer with React expertise to join our growing team.',
          requirements: 'Minimum 5 years of experience with modern JavaScript frameworks, preferably React.'
        },
        {
          id: '2',
          jobTitle: 'UX/UI Designer',
          company: 'Creative Solutions',
          location: 'Rotterdam',
          salary: '€45,000 - €55,000',
          jobType: 'Full-time',
          savedDate: '2025-05-17T14:45:00Z',
          description: 'Join our creative team to design beautiful and functional user interfaces for our clients.',
          requirements: 'Portfolio showcasing UI/UX projects, proficiency in Figma and Adobe Creative Suite.'
        },
        {
          id: '3',
          jobTitle: 'DevOps Engineer',
          company: 'Cloud Services NL',
          location: 'The Hague',
          salary: '€65,000 - €80,000',
          jobType: 'Full-time',
          savedDate: '2025-05-15T11:20:00Z',
          description: 'Help us build and maintain our cloud infrastructure and CI/CD pipelines.',
          requirements: 'Experience with AWS/Azure, Docker, Kubernetes, and CI/CD tools.'
        }
      ];
      
      setSavedJobs(mockSavedJobs);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching saved jobs data:', error);
      toast.error('Failed to load saved jobs');
      setLoading(false);
    }
  };

  const handleRemoveJob = (jobId) => {
    // In a real implementation, this would call the API to remove the job
    setSavedJobs(savedJobs.filter(job => job.id !== jobId));
    toast.success('Job removed from saved list');
  };

  const handleApplyJob = (jobId) => {
    // In a real implementation, this would navigate to the application form
    toast.info(`Applying for job ID: ${jobId}`);
  };

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
        <h1 className="text-2xl font-bold mb-6">Saved Jobs</h1>
        
        {savedJobs.length === 0 ? (
          <div className="text-center py-8">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
            </svg>
            <h3 className="mt-2 text-lg font-medium text-gray-900">No saved jobs</h3>
            <p className="mt-1 text-gray-500">You haven't saved any jobs yet.</p>
            <div className="mt-6">
              <Link href="/jobs" legacyBehavior>
                <a className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-orange-600 hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500">
                  Browse Jobs
                </a>
              </Link>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            {savedJobs.map((job) => (
              <div key={job.id} className="border rounded-lg overflow-hidden">
                <div className="p-6">
                  <div className="flex flex-col md:flex-row md:justify-between md:items-start">
                    <div>
                      <h2 className="text-xl font-semibold text-gray-900">{job.jobTitle}</h2>
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
                        Saved on {new Date(job.savedDate).toLocaleDateString()}
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
                      onClick={() => handleRemoveJob(job.id)}
                      className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
                    >
                      Remove
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
            ))}
          </div>
        )}
      </div>
    </WorkerLayout>
  );
}
