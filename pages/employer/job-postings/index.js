import React, { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import EmployerLayout from '../../components/layouts/EmployerLayout';
import Notification from '../../components/Notification';

export default function JobPostings() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [jobPostings, setJobPostings] = useState([]);
  const [subscription, setSubscription] = useState(null);
  const [notification, setNotification] = useState(null);
  const [filter, setFilter] = useState('ALL');

  // Fetch job postings and subscription data
  useEffect(() => {
    if (status === 'authenticated' && session?.user?.role === 'EMPLOYER') {
      fetchJobPostings();
      fetchEmployerProfile();
    } else if (status === 'unauthenticated') {
      router.push('/login');
    }
  }, [status, session]);

  const fetchJobPostings = async () => {
    try {
      const response = await fetch('/api/employer/job-postings');
      if (response.ok) {
        const data = await response.json();
        setJobPostings(data);
      } else {
        showNotification('Error loading job postings', 'error');
      }
    } catch (error) {
      console.error('Error fetching job postings:', error);
      showNotification('Error loading job postings', 'error');
    } finally {
      setLoading(false);
    }
  };

  const fetchEmployerProfile = async () => {
    try {
      const response = await fetch('/api/employer/profile');
      if (response.ok) {
        const data = await response.json();
        setSubscription(data.subscription);
      }
    } catch (error) {
      console.error('Error fetching profile:', error);
    }
  };

  const handleStatusChange = async (jobId, newStatus) => {
    try {
      const response = await fetch(`/api/employer/job-postings/${jobId}/status`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: newStatus }),
      });

      if (response.ok) {
        // Update local state
        setJobPostings(prevJobs => 
          prevJobs.map(job => 
            job.id === jobId ? { ...job, status: newStatus } : job
          )
        );
        
        // Refresh subscription info to update active job count
        fetchEmployerProfile();
        
        showNotification(`Job status updated to ${newStatus.toLowerCase()}`, 'success');
      } else {
        const error = await response.json();
        showNotification(`Error: ${error.message}`, 'error');
      }
    } catch (error) {
      console.error('Error updating job status:', error);
      showNotification('Error updating job status', 'error');
    }
  };

  const handleDeleteJob = async (jobId) => {
    if (!confirm('Are you sure you want to delete this job posting? This action cannot be undone.')) {
      return;
    }
    
    try {
      const response = await fetch(`/api/employer/job-postings/${jobId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        // Remove from local state
        setJobPostings(prevJobs => prevJobs.filter(job => job.id !== jobId));
        
        // Refresh subscription info to update active job count
        fetchEmployerProfile();
        
        showNotification('Job posting deleted successfully', 'success');
      } else {
        const error = await response.json();
        showNotification(`Error: ${error.message}`, 'error');
      }
    } catch (error) {
      console.error('Error deleting job posting:', error);
      showNotification('Error deleting job posting', 'error');
    }
  };

  const filteredJobs = filter === 'ALL' 
    ? jobPostings 
    : jobPostings.filter(job => job.status === filter);

  const showNotification = (message, type) => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 5000);
  };

  const getStatusBadgeClass = (status) => {
    switch(status) {
      case 'ACTIVE':
        return 'bg-green-100 text-green-800';
      case 'CLOSED':
        return 'bg-red-100 text-red-800';
      case 'DRAFT':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-blue-100 text-blue-800';
    }
  };

  const canCreateNewJob = subscription && 
    (subscription.activeJobsCount < subscription.jobPostingLimit);

  if (loading) {
    return (
      <EmployerLayout>
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      </EmployerLayout>
    );
  }

  return (
    <EmployerLayout>
      {notification && (
        <Notification 
          message={notification.message} 
          type={notification.type} 
          onClose={() => setNotification(null)} 
        />
      )}
      
      <div className="bg-white shadow-md rounded-lg p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Job Postings</h1>
          
          <button
            onClick={() => router.push('/employer/job-postings/new')}
            disabled={!canCreateNewJob}
            className={`px-4 py-2 rounded flex items-center ${
              canCreateNewJob 
                ? 'bg-blue-600 hover:bg-blue-700 text-white' 
                : 'bg-gray-300 cursor-not-allowed text-gray-500'
            }`}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
            </svg>
            New Job Posting
          </button>
        </div>
        
        {/* Subscription Status */}
        <div className="bg-blue-50 border border-blue-200 rounded-md p-4 mb-6">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="font-medium text-blue-800">Subscription Status</h3>
              <p className="text-sm text-blue-600">
                Plan: <span className="font-medium">{subscription?.tier || 'BASIC'}</span>
              </p>
            </div>
            <div className="text-right">
              <p className="text-sm text-blue-600">
                Active Jobs: <span className="font-medium">{subscription?.activeJobsCount || 0} / {subscription?.jobPostingLimit || 0}</span>
              </p>
              {!canCreateNewJob && (
                <p className="text-xs text-red-500 mt-1">
                  You've reached your job posting limit. Upgrade your plan to post more jobs.
                </p>
              )}
            </div>
          </div>
        </div>
        
        {/* Filters */}
        <div className="flex flex-wrap gap-4 mb-6">
          <button
            onClick={() => setFilter('ALL')}
            className={`px-4 py-2 rounded-full text-sm ${
              filter === 'ALL' 
                ? 'bg-blue-600 text-white' 
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            All
          </button>
          <button
            onClick={() => setFilter('ACTIVE')}
            className={`px-4 py-2 rounded-full text-sm ${
              filter === 'ACTIVE' 
                ? 'bg-green-600 text-white' 
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            Active
          </button>
          <button
            onClick={() => setFilter('DRAFT')}
            className={`px-4 py-2 rounded-full text-sm ${
              filter === 'DRAFT' 
                ? 'bg-gray-600 text-white' 
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            Draft
          </button>
          <button
            onClick={() => setFilter('CLOSED')}
            className={`px-4 py-2 rounded-full text-sm ${
              filter === 'CLOSED' 
                ? 'bg-red-600 text-white' 
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            Closed
          </button>
        </div>
        
        {/* Job Listings */}
        {filteredJobs.length === 0 ? (
          <div className="text-center py-12 border-2 border-dashed border-gray-300 rounded-lg">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <h3 className="mt-2 text-sm font-medium text-gray-900">No job postings found</h3>
            <p className="mt-1 text-sm text-gray-500">
              {filter === 'ALL' 
                ? "Get started by creating a new job posting." 
                : `No ${filter.toLowerCase()} job postings found.`}
            </p>
            {filter === 'ALL' && canCreateNewJob && (
              <div className="mt-6">
                <button
                  onClick={() => router.push('/employer/job-postings/new')}
                  className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="-ml-1 mr-2 h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
                  </svg>
                  New Job Posting
                </button>
              </div>
            )}
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Job Title
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Location
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Candidates
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Created
                  </th>
                  <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredJobs.map((job) => (
                  <tr key={job.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{job.title}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-500">{job.location}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusBadgeClass(job.status)}`}>
                        {job.status.charAt(0) + job.status.slice(1).toLowerCase()}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {job.candidateMatches?.length || 0} matches
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(job.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex justify-end space-x-2">
                        <button
                          onClick={() => router.push(`/employer/job-postings/${job.id}`)}
                          className="text-blue-600 hover:text-blue-900"
                        >
                          View
                        </button>
                        <button
                          onClick={() => router.push(`/employer/job-postings/${job.id}/edit`)}
                          className="text-indigo-600 hover:text-indigo-900"
                        >
                          Edit
                        </button>
                        
                        {job.status === 'DRAFT' && (
                          <button
                            onClick={() => handleStatusChange(job.id, 'ACTIVE')}
                            className="text-green-600 hover:text-green-900"
                          >
                            Publish
                          </button>
                        )}
                        
                        {job.status === 'ACTIVE' && (
                          <button
                            onClick={() => handleStatusChange(job.id, 'CLOSED')}
                            className="text-orange-600 hover:text-orange-900"
                          >
                            Close
                          </button>
                        )}
                        
                        {job.status === 'CLOSED' && (
                          <button
                            onClick={() => handleStatusChange(job.id, 'ACTIVE')}
                            className="text-green-600 hover:text-green-900"
                          >
                            Reopen
                          </button>
                        )}
                        
                        <button
                          onClick={() => handleDeleteJob(job.id)}
                          className="text-red-600 hover:text-red-900"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </EmployerLayout>
  );
}
