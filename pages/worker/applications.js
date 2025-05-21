import React, { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import WorkerLayout from '../../components/layouts/WorkerLayout';
import { toast } from 'react-toastify';

export default function WorkerApplications() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [applications, setApplications] = useState([]);
  const [filter, setFilter] = useState('all');

  // Fetch applications data
  useEffect(() => {
    if (status === 'authenticated' && session?.user?.role === 'WORKER') {
      fetchApplicationsData();
    } else if (status === 'unauthenticated') {
      router.push('/login');
    }
  }, [status, session]);

  const fetchApplicationsData = async () => {
    try {
      // For demo purposes, we'll use mock data since the API endpoint doesn't exist yet
      // In a real implementation, this would fetch from /api/worker/applications
      
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // Mock applications data
      const mockApplications = [
        {
          id: '1',
          jobTitle: 'Senior Frontend Developer',
          company: 'Tech Innovations BV',
          location: 'Amsterdam',
          appliedDate: '2025-05-15T10:30:00Z',
          status: 'PENDING',
          notes: 'Applied for remote position with flexible hours'
        },
        {
          id: '2',
          jobTitle: 'UX/UI Designer',
          company: 'Creative Solutions',
          location: 'Rotterdam',
          appliedDate: '2025-05-10T14:45:00Z',
          status: 'INTERVIEW',
          interviewDate: '2025-05-25T13:00:00Z',
          notes: 'First interview scheduled via Zoom'
        },
        {
          id: '3',
          jobTitle: 'Full Stack Developer',
          company: 'Global Systems',
          location: 'Utrecht',
          appliedDate: '2025-05-05T09:15:00Z',
          status: 'REJECTED',
          notes: 'Position filled internally'
        },
        {
          id: '4',
          jobTitle: 'DevOps Engineer',
          company: 'Cloud Services NL',
          location: 'The Hague',
          appliedDate: '2025-05-12T11:20:00Z',
          status: 'ACCEPTED',
          notes: 'Offer received, starting June 1st'
        }
      ];
      
      setApplications(mockApplications);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching applications data:', error);
      toast.error('Failed to load applications');
      setLoading(false);
    }
  };

  const getStatusBadgeClass = (status) => {
    switch (status) {
      case 'PENDING':
        return 'bg-yellow-100 text-yellow-800';
      case 'INTERVIEW':
        return 'bg-blue-100 text-blue-800';
      case 'ACCEPTED':
        return 'bg-green-100 text-green-800';
      case 'REJECTED':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'PENDING':
        return 'Application Pending';
      case 'INTERVIEW':
        return 'Interview Scheduled';
      case 'ACCEPTED':
        return 'Offer Accepted';
      case 'REJECTED':
        return 'Application Rejected';
      default:
        return status;
    }
  };

  const filteredApplications = filter === 'all' 
    ? applications 
    : applications.filter(app => app.status === filter);

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
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
          <h1 className="text-2xl font-bold">My Applications</h1>
          
          <div className="mt-4 md:mt-0">
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
            >
              <option value="all">All Applications</option>
              <option value="PENDING">Pending</option>
              <option value="INTERVIEW">Interview</option>
              <option value="ACCEPTED">Accepted</option>
              <option value="REJECTED">Rejected</option>
            </select>
          </div>
        </div>
        
        {filteredApplications.length === 0 ? (
          <div className="text-center py-8">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <h3 className="mt-2 text-lg font-medium text-gray-900">No applications found</h3>
            <p className="mt-1 text-gray-500">
              {filter === 'all' 
                ? "You haven't applied to any jobs yet." 
                : `You don't have any ${filter.toLowerCase()} applications.`}
            </p>
            <div className="mt-6">
              <Link href="/jobs" legacyBehavior>
                <a className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-orange-600 hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500">
                  Browse Jobs
                </a>
              </Link>
            </div>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Job
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Company
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Applied Date
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredApplications.map((application) => (
                  <tr key={application.id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{application.jobTitle}</div>
                      <div className="text-sm text-gray-500">{application.location}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{application.company}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {new Date(application.appliedDate).toLocaleDateString()}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusBadgeClass(application.status)}`}>
                        {getStatusText(application.status)}
                      </span>
                      {application.status === 'INTERVIEW' && application.interviewDate && (
                        <div className="text-xs text-gray-500 mt-1">
                          Interview: {new Date(application.interviewDate).toLocaleString()}
                        </div>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <button 
                        onClick={() => toast.info(`Viewing details for ${application.jobTitle}`)}
                        className="text-orange-600 hover:text-orange-900 mr-4"
                      >
                        View Details
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </WorkerLayout>
  );
}
