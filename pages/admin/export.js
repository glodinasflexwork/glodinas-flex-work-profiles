import { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useSession } from "next-auth/react";

export default function ExportData() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [exportStatus, setExportStatus] = useState({
    employers: { status: 'idle', message: '' },
    jobSeekers: { status: 'idle', message: '' }
  });

  // Redirect to login if not authenticated
  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    if (status === "unauthenticated") {
      router.push('/admin/login');
      return;
    }
  }, [status, router]);

  // Handle export
  async function handleExport(type) {
    try {
      setExportStatus(prev => ({
        ...prev,
        [type]: { status: 'loading', message: `Preparing ${type} export...` }
      }));
      
      // Create a hidden iframe to handle the file download
      const iframe = document.createElement('iframe');
      iframe.style.display = 'none';
      document.body.appendChild(iframe);
      
      // Set the iframe source to the export API endpoint
      iframe.src = `/api/admin/export?type=${type}`;
      
      // Set a timeout to check if the download started
      setTimeout(() => {
        setExportStatus(prev => ({
          ...prev,
          [type]: { 
            status: 'success', 
            message: `${type === 'employers' ? 'Employers' : 'Job Seekers'} export started. Check your downloads folder.` 
          }
        }));
        
        // Remove the iframe after a delay
        setTimeout(() => {
          document.body.removeChild(iframe);
        }, 5000);
      }, 2000);
      
    } catch (error) {
      console.error(`Error exporting ${type}:`, error);
      setExportStatus(prev => ({
        ...prev,
        [type]: { status: 'error', message: `Error exporting ${type}: ${error.message}` }
      }));
    }
  }

  // Loading state
  if (status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading export options...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>Export Data - Glodinas Flex Work</title>
        <meta name="description" content="Admin dashboard for exporting data" />
      </Head>
      
      <div className="min-h-screen bg-gray-50">
        {/* Admin Header */}
        <header className="bg-white shadow">
          <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8 flex justify-between items-center">
            <h1 className="text-2xl font-bold text-gray-900">Export Data</h1>
            <Link href="/admin">
              <a className="text-sm text-orange-600 hover:text-orange-800">
                Back to Dashboard
              </a>
            </Link>
          </div>
        </header>
        
        {/* Main Content */}
        <main className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <div className="px-6 py-5 border-b border-gray-200">
              <h3 className="text-lg font-medium text-gray-900">Export Options</h3>
              <p className="mt-1 text-sm text-gray-500">
                Export data from the system in CSV format for further analysis or record-keeping.
              </p>
            </div>
            
            <div className="px-6 py-5 space-y-6">
              {/* Employers Export */}
              <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-lg font-medium text-gray-900">Employers Data</h4>
                    <p className="mt-1 text-sm text-gray-500">
                      Export all employer submissions including company details, contact information, and status.
                    </p>
                  </div>
                  <button
                    onClick={() => handleExport('employers')}
                    disabled={exportStatus.employers.status === 'loading'}
                    className={`inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white ${
                      exportStatus.employers.status === 'loading'
                        ? 'bg-gray-400 cursor-not-allowed'
                        : 'bg-orange-600 hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500'
                    }`}
                  >
                    {exportStatus.employers.status === 'loading' ? (
                      <>
                        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Exporting...
                      </>
                    ) : (
                      <>
                        <svg className="-ml-1 mr-2 h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                        Export Employers CSV
                      </>
                    )}
                  </button>
                </div>
                
                {exportStatus.employers.status !== 'idle' && (
                  <div className={`mt-3 p-3 rounded-md ${
                    exportStatus.employers.status === 'error'
                      ? 'bg-red-50 text-red-700'
                      : exportStatus.employers.status === 'success'
                      ? 'bg-green-50 text-green-700'
                      : 'bg-blue-50 text-blue-700'
                  }`}>
                    {exportStatus.employers.message}
                  </div>
                )}
              </div>
              
              {/* Job Seekers Export */}
              <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-lg font-medium text-gray-900">Job Seekers Data</h4>
                    <p className="mt-1 text-sm text-gray-500">
                      Export all job seeker applications including personal details, skills, experience, and status.
                    </p>
                  </div>
                  <button
                    onClick={() => handleExport('job-seekers')}
                    disabled={exportStatus.jobSeekers.status === 'loading'}
                    className={`inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white ${
                      exportStatus.jobSeekers.status === 'loading'
                        ? 'bg-gray-400 cursor-not-allowed'
                        : 'bg-orange-600 hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500'
                    }`}
                  >
                    {exportStatus.jobSeekers.status === 'loading' ? (
                      <>
                        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Exporting...
                      </>
                    ) : (
                      <>
                        <svg className="-ml-1 mr-2 h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                        Export Job Seekers CSV
                      </>
                    )}
                  </button>
                </div>
                
                {exportStatus.jobSeekers.status !== 'idle' && (
                  <div className={`mt-3 p-3 rounded-md ${
                    exportStatus.jobSeekers.status === 'error'
                      ? 'bg-red-50 text-red-700'
                      : exportStatus.jobSeekers.status === 'success'
                      ? 'bg-green-50 text-green-700'
                      : 'bg-blue-50 text-blue-700'
                  }`}>
                    {exportStatus.jobSeekers.message}
                  </div>
                )}
              </div>
              
              {/* Export Instructions */}
              <div className="bg-blue-50 p-4 rounded-md">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <svg className="h-5 w-5 text-blue-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div className="ml-3 flex-1 md:flex md:justify-between">
                    <p className="text-sm text-blue-700">
                      Exported files will be downloaded as CSV files that can be opened in Excel or other spreadsheet software.
                    </p>
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
