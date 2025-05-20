import { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useSession, signIn, signOut } from "next-auth/react";

export default function AdminDashboard() {
  const { data: session, status } = useSession();
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalEmployers: 0,
    pendingEmployers: 0,
    totalJobSeekers: 0,
    pendingJobSeekers: 0
  });
  
  const router = useRouter();
  
  // Only run useEffect on the client side
  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    if (status === "unauthenticated") {
      router.push('/admin/login');
      return;
    }
    
    if (status === "authenticated") {
      fetchDashboardStats();
      
      // Set up auto-refresh interval for dashboard stats
      const refreshInterval = setInterval(() => {
        fetchDashboardStats();
      }, 30000); // Refresh every 30 seconds
      
      return () => clearInterval(refreshInterval);
    }
  }, [status, router]);
  
  async function fetchDashboardStats() {
    try {
      setLoading(true);
      
      // Add cache-busting parameter to prevent caching
      const timestamp = new Date().getTime();
      
      // Fetch employer stats
      const employersRes = await fetch(`/api/admin/employers?limit=1&t=${timestamp}`);
      const employersData = await employersRes.json();
      
      // Fetch pending employer stats
      const pendingEmployersRes = await fetch(`/api/admin/employers?status=pending&limit=1&t=${timestamp}`);
      const pendingEmployersData = await pendingEmployersRes.json();
      
      // Fetch job seeker stats
      const jobSeekersRes = await fetch(`/api/admin/job-seekers?limit=1&t=${timestamp}`);
      const jobSeekersData = await jobSeekersRes.json();
      
      // Fetch pending job seeker stats
      const pendingJobSeekersRes = await fetch(`/api/admin/job-seekers?status=pending&limit=1&t=${timestamp}`);
      const pendingJobSeekersData = await pendingJobSeekersRes.json();
      
      console.log('Dashboard stats fetched:', {
        totalEmployers: employersData.pagination.total,
        pendingEmployers: pendingEmployersData.pagination.total,
        totalJobSeekers: jobSeekersData.pagination.total,
        pendingJobSeekers: pendingJobSeekersData.pagination.total
      });
      
      setStats({
        totalEmployers: employersData.pagination.total,
        pendingEmployers: pendingEmployersData.pagination.total,
        totalJobSeekers: jobSeekersData.pagination.total,
        pendingJobSeekers: pendingJobSeekersData.pagination.total
      });
    } catch (error) {
      console.error('Error fetching dashboard stats:', error);
    } finally {
      setLoading(false);
    }
  }
  
  // Function to manually refresh stats
  const refreshStats = () => {
    fetchDashboardStats();
  };
  
  if (status === "loading" || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    );
  }
  
  return (
    <>
      <Head>
        <title>Admin Dashboard - Glodinas Flex Work</title>
        <meta name="description" content="Admin dashboard for Glodinas Flex Work" />
      </Head>
      
      <div className="min-h-screen bg-gray-50">
        {/* Admin Header */}
        <header className="bg-white shadow">
          <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8 flex justify-between items-center">
            <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
            <div className="flex items-center space-x-4">
              <button 
                onClick={refreshStats}
                className="text-sm bg-orange-100 text-orange-600 px-3 py-1 rounded hover:bg-orange-200"
              >
                Refresh Data
              </button>
              <span className="text-gray-600">Welcome, {session?.user?.name || 'Admin User'}</span>
              <button 
                onClick={() => signOut()}
                className="text-sm text-orange-600 hover:text-orange-800"
              >
                Sign Out
              </button>
            </div>
          </div>
        </header>
        
        {/* Main Content */}
        <main className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-gray-500 text-sm font-medium uppercase tracking-wide">Total Employers</h2>
              <p className="mt-2 text-4xl font-semibold text-gray-900">{stats.totalEmployers}</p>
              <Link href="/admin/employers">
                <a className="mt-3 text-sm font-medium text-orange-600 hover:text-orange-500">View all</a>
              </Link>
            </div>
            
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-gray-500 text-sm font-medium uppercase tracking-wide">Pending Employers</h2>
              <p className="mt-2 text-4xl font-semibold text-orange-600">{stats.pendingEmployers}</p>
              <Link href="/admin/employers?status=pending">
                <a className="mt-3 text-sm font-medium text-orange-600 hover:text-orange-500">View pending</a>
              </Link>
            </div>
            
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-gray-500 text-sm font-medium uppercase tracking-wide">Total Job Seekers</h2>
              <p className="mt-2 text-4xl font-semibold text-gray-900">{stats.totalJobSeekers}</p>
              <Link href="/admin/job-seekers">
                <a className="mt-3 text-sm font-medium text-orange-600 hover:text-orange-500">View all</a>
              </Link>
            </div>
            
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-gray-500 text-sm font-medium uppercase tracking-wide">Pending Job Seekers</h2>
              <p className="mt-2 text-4xl font-semibold text-orange-600">{stats.pendingJobSeekers}</p>
              <Link href="/admin/job-seekers?status=pending">
                <a className="mt-3 text-sm font-medium text-orange-600 hover:text-orange-500">View pending</a>
              </Link>
            </div>
          </div>
          
          {/* Quick Actions */}
          <div className="bg-white rounded-lg shadow mb-8">
            <div className="px-6 py-5 border-b border-gray-200">
              <h3 className="text-lg font-medium text-gray-900">Quick Actions</h3>
            </div>
            <div className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Link href="/admin/employers">
                <a className="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50">
                  <div className="flex-shrink-0 bg-orange-100 rounded-md p-3">
                    <svg className="h-6 w-6 text-orange-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                    </svg>
                  </div>
                  <div className="ml-4">
                    <p className="text-base font-medium text-gray-900">Manage Employers</p>
                    <p className="text-sm text-gray-500">Review and process employer submissions</p>
                  </div>
                </a>
              </Link>
              
              <Link href="/admin/job-seekers">
                <a className="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50">
                  <div className="flex-shrink-0 bg-orange-100 rounded-md p-3">
                    <svg className="h-6 w-6 text-orange-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </div>
                  <div className="ml-4">
                    <p className="text-base font-medium text-gray-900">Manage Job Seekers</p>
                    <p className="text-sm text-gray-500">Review and process job seeker applications</p>
                  </div>
                </a>
              </Link>
              
              <div className="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer">
                <div className="flex-shrink-0 bg-orange-100 rounded-md p-3">
                  <svg className="h-6 w-6 text-orange-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <div className="ml-4">
                  <p className="text-base font-medium text-gray-900">Export Data</p>
                  <div className="mt-2 space-y-2">
                    <Link href="/admin/export">
                      <a className="block text-sm text-orange-600 hover:text-orange-500">
                        Export Employers CSV
                      </a>
                    </Link>
                    <Link href="/admin/export">
                      <a className="block text-sm text-orange-600 hover:text-orange-500">
                        Export Job Seekers CSV
                      </a>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}
