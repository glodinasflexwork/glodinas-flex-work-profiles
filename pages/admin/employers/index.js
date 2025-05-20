import { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useSession } from "next-auth/react";

export default function EmployersList() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [employers, setEmployers] = useState([]);
  const [pagination, setPagination] = useState({
    total: 0,
    page: 1,
    limit: 10,
    totalPages: 0
  });
  const [filters, setFilters] = useState({
    status: router.query.status || '',
    search: router.query.search || ''
  });

  // Redirect to login if not authenticated
  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    if (status === "unauthenticated") {
      router.push('/admin/login');
      return;
    }
  }, [status, router]);

  // Fetch employers when page loads or filters change
  useEffect(() => {
    if (status === "authenticated") {
      fetchEmployers();
    }
  }, [status, router.query]);

  // Fetch employers from API
  async function fetchEmployers() {
    try {
      setLoading(true);
      
      // Build query string from router query params
      const { page = 1, limit = 10, status, search } = router.query;
      
      // Fetch employers from API
      const queryParams = new URLSearchParams();
      if (page) queryParams.append('page', page);
      if (limit) queryParams.append('limit', limit);
      if (status) queryParams.append('status', status);
      if (search) queryParams.append('search', search);
      
      const res = await fetch(`/api/admin/employers?${queryParams.toString()}`);
      
      if (!res.ok) {
        throw new Error('Failed to fetch employers');
      }
      
      const data = await res.json();
      setEmployers(data.data);
      setPagination(data.pagination);
      
      // Update filters from URL
      setFilters({
        status: status || '',
        search: search || ''
      });
    } catch (error) {
      console.error('Error fetching employers:', error);
    } finally {
      setLoading(false);
    }
  }

  // Handle filter changes
  function handleFilterChange(e) {
    const { name, value } = e.target;
    setFilters(prev => ({
      ...prev,
      [name]: value
    }));
  }

  // Apply filters
  function applyFilters(e) {
    e.preventDefault();
    
    // Update URL with filters
    const query = { ...router.query };
    
    // Add filters to query
    if (filters.status) {
      query.status = filters.status;
    } else {
      delete query.status;
    }
    
    if (filters.search) {
      query.search = filters.search;
    } else {
      delete query.search;
    }
    
    // Reset to page 1 when filters change
    query.page = 1;
    
    // Update URL
    router.push({
      pathname: router.pathname,
      query
    });
  }

  // Handle pagination
  function handlePageChange(newPage) {
    if (newPage < 1 || newPage > pagination.totalPages) return;
    
    router.push({
      pathname: router.pathname,
      query: {
        ...router.query,
        page: newPage
      }
    });
  }

  // Handle status update
  async function handleStatusUpdate(id, newStatus) {
    try {
      const res = await fetch(`/api/admin/employers?id=${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ status: newStatus })
      });
      
      if (!res.ok) {
        throw new Error('Failed to update employer status');
      }
      
      // Refresh employers list
      fetchEmployers();
    } catch (error) {
      console.error('Error updating employer status:', error);
    }
  }

  // Handle employer deletion
  async function handleDelete(id) {
    if (!confirm('Are you sure you want to delete this employer?')) return;
    
    try {
      const res = await fetch(`/api/admin/employers?id=${id}`, {
        method: 'DELETE'
      });
      
      if (!res.ok) {
        throw new Error('Failed to delete employer');
      }
      
      // Refresh employers list
      fetchEmployers();
    } catch (error) {
      console.error('Error deleting employer:', error);
    }
  }

  // Format date for display
  function formatDate(dateString) {
    return new Date(dateString).toLocaleDateString();
  }

  // Loading state
  if (status === "loading" || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading employers...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>Manage Employers - Glodinas Flex Work</title>
        <meta name="description" content="Admin dashboard for managing employers" />
      </Head>
      
      <div className="min-h-screen bg-gray-50">
        {/* Admin Header */}
        <header className="bg-white shadow">
          <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8 flex justify-between items-center">
            <h1 className="text-2xl font-bold text-gray-900">Manage Employers</h1>
            <Link href="/admin">
              <a className="text-sm text-orange-600 hover:text-orange-800">
                Back to Dashboard
              </a>
            </Link>
          </div>
        </header>
        
        {/* Main Content */}
        <main className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
          {/* Filters */}
          <div className="bg-white rounded-lg shadow mb-6">
            <div className="px-6 py-4">
              <form onSubmit={applyFilters} className="flex flex-wrap items-end gap-4">
                <div className="w-full md:w-auto">
                  <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-1">
                    Status
                  </label>
                  <select
                    id="status"
                    name="status"
                    value={filters.status}
                    onChange={handleFilterChange}
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500 sm:text-sm"
                  >
                    <option value="">All Statuses</option>
                    <option value="pending">Pending</option>
                    <option value="reviewed">Reviewed</option>
                    <option value="contacted">Contacted</option>
                  </select>
                </div>
                
                <div className="w-full md:w-auto flex-grow">
                  <label htmlFor="search" className="block text-sm font-medium text-gray-700 mb-1">
                    Search
                  </label>
                  <input
                    type="text"
                    id="search"
                    name="search"
                    value={filters.search}
                    onChange={handleFilterChange}
                    placeholder="Search by name, email, industry..."
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500 sm:text-sm"
                  />
                </div>
                
                <div>
                  <button
                    type="submit"
                    className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-orange-600 hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
                  >
                    Apply Filters
                  </button>
                </div>
              </form>
            </div>
          </div>
          
          {/* Employers List */}
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <div className="px-6 py-5 border-b border-gray-200">
              <h3 className="text-lg font-medium text-gray-900">
                Employers ({pagination.total})
                {filters.status && ` - ${filters.status.charAt(0).toUpperCase() + filters.status.slice(1)}`}
              </h3>
            </div>
            
            {employers.length === 0 ? (
              <div className="px-6 py-12 text-center">
                <svg
                  className="mx-auto h-12 w-12 text-gray-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                  />
                </svg>
                <h3 className="mt-2 text-sm font-medium text-gray-900">No employers found</h3>
                <p className="mt-1 text-sm text-gray-500">
                  {filters.status || filters.search
                    ? 'Try adjusting your filters'
                    : 'Employers will appear here once they submit their information'}
                </p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Company
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Contact
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Industry
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Location
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Date
                      </th>
                      <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {employers.map((employer) => (
                      <tr key={employer.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">{employer.companyName}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">{employer.contactPerson}</div>
                          <div className="text-sm text-gray-500">{employer.email}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">{employer.industry}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">{employer.location}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                            employer.status === 'pending'
                              ? 'bg-yellow-100 text-yellow-800'
                              : employer.status === 'reviewed'
                              ? 'bg-green-100 text-green-800'
                              : 'bg-blue-100 text-blue-800'
                          }`}>
                            {employer.status.charAt(0).toUpperCase() + employer.status.slice(1)}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {formatDate(employer.createdAt)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <div className="flex justify-end space-x-2">
                            {employer.status === 'pending' && (
                              <button
                                onClick={() => handleStatusUpdate(employer.id, 'reviewed')}
                                className="text-green-600 hover:text-green-900"
                              >
                                Approve
                              </button>
                            )}
                            {employer.status === 'reviewed' && (
                              <button
                                onClick={() => handleStatusUpdate(employer.id, 'contacted')}
                                className="text-blue-600 hover:text-blue-900"
                              >
                                Mark Contacted
                              </button>
                            )}
                            {employer.status === 'contacted' && (
                              <button
                                onClick={() => handleStatusUpdate(employer.id, 'reviewed')}
                                className="text-yellow-600 hover:text-yellow-900"
                              >
                                Revert to Reviewed
                              </button>
                            )}
                            <button
                              onClick={() => handleDelete(employer.id)}
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
            
            {/* Pagination */}
            {pagination.totalPages > 1 && (
              <div className="px-6 py-4 border-t border-gray-200 flex items-center justify-between">
                <div className="flex-1 flex justify-between sm:hidden">
                  <button
                    onClick={() => handlePageChange(pagination.page - 1)}
                    disabled={pagination.page === 1}
                    className={`relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md ${
                      pagination.page === 1
                        ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                        : 'bg-white text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    Previous
                  </button>
                  <button
                    onClick={() => handlePageChange(pagination.page + 1)}
                    disabled={pagination.page === pagination.totalPages}
                    className={`relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md ${
                      pagination.page === pagination.totalPages
                        ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                        : 'bg-white text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    Next
                  </button>
                </div>
                <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                  <div>
                    <p className="text-sm text-gray-700">
                      Showing <span className="font-medium">{employers.length > 0 ? (pagination.page - 1) * pagination.limit + 1 : 0}</span> to{' '}
                      <span className="font-medium">
                        {Math.min(pagination.page * pagination.limit, pagination.total)}
                      </span>{' '}
                      of <span className="font-medium">{pagination.total}</span> results
                    </p>
                  </div>
                  <div>
                    <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                      <button
                        onClick={() => handlePageChange(1)}
                        disabled={pagination.page === 1}
                        className={`relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium ${
                          pagination.page === 1
                            ? 'text-gray-300 cursor-not-allowed'
                            : 'text-gray-500 hover:bg-gray-50'
                        }`}
                      >
                        <span className="sr-only">First</span>
                        <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                          <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </button>
                      <button
                        onClick={() => handlePageChange(pagination.page - 1)}
                        disabled={pagination.page === 1}
                        className={`relative inline-flex items-center px-2 py-2 border border-gray-300 bg-white text-sm font-medium ${
                          pagination.page === 1
                            ? 'text-gray-300 cursor-not-allowed'
                            : 'text-gray-500 hover:bg-gray-50'
                        }`}
                      >
                        <span className="sr-only">Previous</span>
                        <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                          <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </button>
                      
                      {/* Page numbers */}
                      {Array.from({ length: Math.min(5, pagination.totalPages) }, (_, i) => {
                        // Calculate page numbers to show
                        let pageNum;
                        if (pagination.totalPages <= 5) {
                          // Show all pages if 5 or fewer
                          pageNum = i + 1;
                        } else if (pagination.page <= 3) {
                          // Show first 5 pages
                          pageNum = i + 1;
                        } else if (pagination.page >= pagination.totalPages - 2) {
                          // Show last 5 pages
                          pageNum = pagination.totalPages - 4 + i;
                        } else {
                          // Show 2 pages before and after current page
                          pageNum = pagination.page - 2 + i;
                        }
                        
                        return (
                          <button
                            key={pageNum}
                            onClick={() => handlePageChange(pageNum)}
                            className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium ${
                              pagination.page === pageNum
                                ? 'z-10 bg-orange-50 border-orange-500 text-orange-600'
                                : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50'
                            }`}
                          >
                            {pageNum}
                          </button>
                        );
                      })}
                      
                      <button
                        onClick={() => handlePageChange(pagination.page + 1)}
                        disabled={pagination.page === pagination.totalPages}
                        className={`relative inline-flex items-center px-2 py-2 border border-gray-300 bg-white text-sm font-medium ${
                          pagination.page === pagination.totalPages
                            ? 'text-gray-300 cursor-not-allowed'
                            : 'text-gray-500 hover:bg-gray-50'
                        }`}
                      >
                        <span className="sr-only">Next</span>
                        <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                          <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                        </svg>
                      </button>
                      <button
                        onClick={() => handlePageChange(pagination.totalPages)}
                        disabled={pagination.page === pagination.totalPages}
                        className={`relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium ${
                          pagination.page === pagination.totalPages
                            ? 'text-gray-300 cursor-not-allowed'
                            : 'text-gray-500 hover:bg-gray-50'
                        }`}
                      >
                        <span className="sr-only">Last</span>
                        <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                          <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                        </svg>
                      </button>
                    </nav>
                  </div>
                </div>
              </div>
            )}
          </div>
        </main>
      </div>
    </>
  );
}
