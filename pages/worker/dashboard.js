import React, { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import WorkerLayout from '../../components/layouts/WorkerLayout';

export default function WorkerDashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [dashboardData, setDashboardData] = useState({
    profile: null,
    jobApplications: [],
    savedJobs: [],
    recentActivity: []
  });

  // Fetch dashboard data
  useEffect(() => {
    if (status === 'authenticated' && session?.user?.role === 'WORKER') {
      fetchDashboardData();
    } else if (status === 'unauthenticated') {
      router.push('/login');
    }
  }, [status, session]);

  const fetchDashboardData = async () => {
    try {
      // Fetch worker profile
      const profileResponse = await fetch('/api/worker/profile');
      const profileData = await profileResponse.json();
      
      // Fetch job applications
      const applicationsResponse = await fetch('/api/worker/applications');
      const applicationsData = await applicationsResponse.json();
      
      // Fetch saved jobs
      const savedJobsResponse = await fetch('/api/worker/saved-jobs');
      const savedJobsData = await savedJobsResponse.json();
      
      // Fetch recent activity (last 5 events)
      const activityResponse = await fetch('/api/worker/activity');
      const activityData = await activityResponse.json();
      
      setDashboardData({
        profile: profileData,
        jobApplications: applicationsData || [],
        savedJobs: savedJobsData || [],
        recentActivity: activityData || []
      });
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  // Count applications by status
  const countApplicationsByStatus = (status) => {
    return dashboardData.jobApplications.filter(app => app.status === status).length;
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange-500"></div>
      </div>
    );
  }

  return (
    <WorkerLayout>
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        {/* Applications Card */}
        <div className="bg-white shadow-md rounded-lg p-6">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-orange-100 text-orange-800">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
            </div>
            <div className="ml-4">
              <h2 className="text-gray-600 text-sm">Active Applications</h2>
              <p className="text-3xl font-bold text-gray-800">{countApplicationsByStatus('PENDING')}</p>
            </div>
          </div>
          <div className="mt-4">
            <Link href="/worker/applications" legacyBehavior>
              <a className="text-sm text-orange-600 hover:text-orange-800">View all applications →</a>
            </Link>
          </div>
        </div>
        
        {/* Interviews Card */}
        <div className="bg-white shadow-md rounded-lg p-6">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-green-100 text-green-800">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <div className="ml-4">
              <h2 className="text-gray-600 text-sm">Upcoming Interviews</h2>
              <p className="text-3xl font-bold text-gray-800">{countApplicationsByStatus('INTERVIEW')}</p>
            </div>
          </div>
          <div className="mt-4">
            <Link href="/worker/interviews" legacyBehavior>
              <a className="text-sm text-orange-600 hover:text-orange-800">View all interviews →</a>
            </Link>
          </div>
        </div>
        
        {/* Saved Jobs Card */}
        <div className="bg-white shadow-md rounded-lg p-6">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-purple-100 text-purple-800">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
              </svg>
            </div>
            <div className="ml-4">
              <h2 className="text-gray-600 text-sm">Saved Jobs</h2>
              <p className="text-3xl font-bold text-gray-800">{dashboardData.savedJobs.length}</p>
            </div>
          </div>
          <div className="mt-4">
            <Link href="/worker/saved-jobs" legacyBehavior>
              <a className="text-sm text-orange-600 hover:text-orange-800">View saved jobs →</a>
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
                  activity.type === 'application_submitted' ? 'bg-orange-100 text-orange-800' :
                  activity.type === 'interview_scheduled' ? 'bg-green-100 text-green-800' :
                  activity.type === 'job_saved' ? 'bg-purple-100 text-purple-800' :
                  'bg-gray-100 text-gray-800'
                }`}>
                  {activity.type === 'application_submitted' && (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  )}
                  {activity.type === 'interview_scheduled' && (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  )}
                  {activity.type === 'job_saved' && (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
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
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Link href="/jobs" legacyBehavior>
            <a className="flex items-center p-4 border rounded-lg hover:bg-gray-50">
              <div className="p-2 rounded-full bg-orange-100 text-orange-800 mr-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <div>
                <h3 className="font-medium">Find Jobs</h3>
                <p className="text-sm text-gray-500">Browse available positions</p>
              </div>
            </a>
          </Link>
          
          <Link href="/worker/profile" legacyBehavior>
            <a className="flex items-center p-4 border rounded-lg hover:bg-gray-50">
              <div className="p-2 rounded-full bg-green-100 text-green-800 mr-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <div>
                <h3 className="font-medium">Update Profile</h3>
                <p className="text-sm text-gray-500">Edit your information</p>
              </div>
            </a>
          </Link>
          
          <Link href="/worker/resume" legacyBehavior>
            <a className="flex items-center p-4 border rounded-lg hover:bg-gray-50">
              <div className="p-2 rounded-full bg-purple-100 text-purple-800 mr-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <div>
                <h3 className="font-medium">Manage Resume</h3>
                <p className="text-sm text-gray-500">Upload or update your CV</p>
              </div>
            </a>
          </Link>
        </div>
      </div>
      
      {/* Job Recommendations */}
      <div className="bg-white shadow-md rounded-lg p-6 mt-6">
        <h2 className="text-xl font-bold mb-4">Recommended Jobs</h2>
        
        <div className="space-y-4">
          {/* This would be populated with actual job recommendations */}
          <p className="text-gray-500 py-4">Job recommendations will appear here based on your profile and preferences.</p>
          
          <Link href="/jobs" legacyBehavior>
            <a className="inline-block text-orange-600 hover:text-orange-800 font-medium">
              Browse all jobs →
            </a>
          </Link>
        </div>
      </div>
    </WorkerLayout>
  );
}
