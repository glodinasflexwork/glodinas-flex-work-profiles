import React, { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import EmployerLayout from '../../components/layouts/EmployerLayout';

export default function EmployerDashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [dashboardData, setDashboardData] = useState({
    profile: null,
    jobPostings: [],
    candidateMatches: [],
    recentActivity: []
  });

  // Fetch dashboard data
  useEffect(() => {
    if (status === 'authenticated' && session?.user?.role === 'EMPLOYER') {
      fetchDashboardData();
    } else if (status === 'unauthenticated') {
      router.push('/login');
    }
  }, [status, session]);

  const fetchDashboardData = async () => {
    try {
      // Fetch employer profile
      const profileResponse = await fetch('/api/employer/profile');
      const profileData = await profileResponse.json();
      
      // Fetch job postings
      const jobsResponse = await fetch('/api/employer/job-postings');
      const jobsData = await jobsResponse.json();
      
      // Fetch recent activity (last 5 events)
      const activityResponse = await fetch('/api/employer/activity');
      const activityData = await activityResponse.json();
      
      // Calculate total candidate matches
      const totalMatches = jobsData.reduce((total, job) => {
        return total + (job.candidateMatches?.length || 0);
      }, 0);
      
      setDashboardData({
        profile: profileData,
        jobPostings: jobsData,
        totalMatches,
        recentActivity: activityData || []
      });
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  // Count jobs by status
  const countJobsByStatus = (status) => {
    return dashboardData.jobPostings.filter(job => job.status === status).length;
  };

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
      {/* Welcome Section */}
      <div className="bg-white shadow-md rounded-lg p-6 mb-6">
        <h1 className="text-2xl font-bold mb-2">Welcome, {dashboardData.profile?.companyName || 'Employer'}</h1>
        <p className="text-gray-600">
          Manage your job postings, view candidate matches, and update your company profile from your dashboard.
        </p>
      </div>
      
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        {/* Active Jobs Card */}
        <div className="bg-white shadow-md rounded-lg p-6">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-blue-100 text-blue-800">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
            </div>
            <div className="ml-4">
              <h2 className="text-gray-600 text-sm">Active Jobs</h2>
              <p className="text-3xl font-bold text-gray-800">{countJobsByStatus('ACTIVE')}</p>
            </div>
          </div>
          <div className="mt-4">
            <Link href="/employer/job-postings" legacyBehavior>
              <a className="text-sm text-blue-600 hover:text-blue-800">View all job postings →</a>
            </Link>
          </div>
        </div>
        
        {/* Candidate Matches Card */}
        <div className="bg-white shadow-md rounded-lg p-6">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-green-100 text-green-800">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            <div className="ml-4">
              <h2 className="text-gray-600 text-sm">Candidate Matches</h2>
              <p className="text-3xl font-bold text-gray-800">{dashboardData.totalMatches || 0}</p>
            </div>
          </div>
          <div className="mt-4">
            <Link href="/employer/candidates" legacyBehavior>
              <a className="text-sm text-blue-600 hover:text-blue-800">View all candidates →</a>
            </Link>
          </div>
        </div>
        
        {/* Subscription Card */}
        <div className="bg-white shadow-md rounded-lg p-6">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-purple-100 text-purple-800">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
              </svg>
            </div>
            <div className="ml-4">
              <h2 className="text-gray-600 text-sm">Job Posting Limit</h2>
              <p className="text-3xl font-bold text-gray-800">
                {dashboardData.profile?.subscription?.activeJobsCount || 0} / {dashboardData.profile?.subscription?.jobPostingLimit || 0}
              </p>
            </div>
          </div>
          <div className="mt-4">
            <Link href="/employer/subscription" legacyBehavior>
              <a className="text-sm text-blue-600 hover:text-blue-800">Manage subscription →</a>
            </Link>
          </div>
        </div>
      </div>
      
      {/* Recent Activity */}
      <div className="bg-white shadow-md rounded-lg p-6 mb-6">
        <h2 className="text-xl font-bold mb-4">Recent Activity</h2>
        
        {dashboardData.recentActivity.length === 0 ? (
          <p className="text-gray-500 py-4">No recent activity to display.</p>
        ) : (
          <div className="space-y-4">
            {dashboardData.recentActivity.map((activity, index) => (
              <div key={index} className="flex items-start pb-4 border-b border-gray-200 last:border-0">
                <div className={`p-2 rounded-full mr-4 ${
                  activity.type === 'job_created' ? 'bg-blue-100 text-blue-800' :
                  activity.type === 'candidate_match' ? 'bg-green-100 text-green-800' :
                  activity.type === 'job_status_change' ? 'bg-yellow-100 text-yellow-800' :
                  'bg-gray-100 text-gray-800'
                }`}>
                  {activity.type === 'job_created' && (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  )}
                  {activity.type === 'candidate_match' && (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                    </svg>
                  )}
                  {activity.type === 'job_status_change' && (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                    </svg>
                  )}
                </div>
                <div className="flex-1">
                  <p className="text-sm text-gray-800">{activity.message}</p>
                  <p className="text-xs text-gray-500 mt-1">{new Date(activity.timestamp).toLocaleString()}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      
      {/* Quick Actions */}
      <div className="bg-white shadow-md rounded-lg p-6">
        <h2 className="text-xl font-bold mb-4">Quick Actions</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <Link href="/employer/job-postings/new" legacyBehavior>
            <a className={`flex items-center p-4 border rounded-lg hover:bg-gray-50 ${
              dashboardData.profile?.subscription?.activeJobsCount >= dashboardData.profile?.subscription?.jobPostingLimit
                ? 'opacity-50 cursor-not-allowed'
                : ''
            }`}>
              <div className="p-2 rounded-full bg-blue-100 text-blue-800 mr-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
              </div>
              <div>
                <h3 className="font-medium">Post New Job</h3>
                <p className="text-sm text-gray-500">Create a new job posting</p>
              </div>
            </a>
          </Link>
          
          <Link href="/employer/candidates" legacyBehavior>
            <a className="flex items-center p-4 border rounded-lg hover:bg-gray-50">
              <div className="p-2 rounded-full bg-green-100 text-green-800 mr-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <div>
                <h3 className="font-medium">View Candidates</h3>
                <p className="text-sm text-gray-500">Browse matched candidates</p>
              </div>
            </a>
          </Link>
          
          <Link href="/employer/profile" legacyBehavior>
            <a className="flex items-center p-4 border rounded-lg hover:bg-gray-50">
              <div className="p-2 rounded-full bg-purple-100 text-purple-800 mr-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
              </div>
              <div>
                <h3 className="font-medium">Edit Profile</h3>
                <p className="text-sm text-gray-500">Update company information</p>
              </div>
            </a>
          </Link>
        </div>
      </div>
    </EmployerLayout>
  );
}
