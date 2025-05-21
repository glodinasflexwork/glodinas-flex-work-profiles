import React, { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import WorkerLayout from '../../components/layouts/WorkerLayout';
import { toast } from 'react-toastify';

export default function Interviews() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [interviews, setInterviews] = useState([]);

  // Fetch interviews data
  useEffect(() => {
    if (status === 'authenticated' && session?.user?.role === 'WORKER') {
      fetchInterviewsData();
    } else if (status === 'unauthenticated') {
      router.push('/login');
    }
  }, [status, session]);

  const fetchInterviewsData = async () => {
    try {
      // For demo purposes, we'll use mock data since the API endpoint doesn't exist yet
      // In a real implementation, this would fetch from /api/worker/interviews
      
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // Mock interviews data
      const mockInterviews = [
        {
          id: '1',
          jobTitle: 'UX/UI Designer',
          company: 'Creative Solutions',
          location: 'Rotterdam',
          interviewDate: '2025-05-25T13:00:00Z',
          interviewType: 'Video Call',
          interviewLink: 'https://zoom.us/j/123456789',
          contactPerson: 'Sarah Johnson',
          contactEmail: 'sarah@creativesolutions.nl',
          notes: 'Prepare portfolio presentation, 30 minutes interview + 15 minutes Q&A',
          status: 'UPCOMING'
        },
        {
          id: '2',
          jobTitle: 'Frontend Developer',
          company: 'Tech Innovations BV',
          location: 'Amsterdam',
          interviewDate: '2025-05-28T10:30:00Z',
          interviewType: 'In-Person',
          interviewLocation: 'Herengracht 182, Amsterdam',
          contactPerson: 'Michael Brown',
          contactEmail: 'michael@techinnovations.nl',
          notes: 'Technical interview with the development team, bring laptop for coding exercise',
          status: 'UPCOMING'
        },
        {
          id: '3',
          jobTitle: 'Product Manager',
          company: 'Digital Products NL',
          location: 'Utrecht',
          interviewDate: '2025-05-15T14:00:00Z',
          interviewType: 'Phone Call',
          contactPerson: 'Lisa van der Berg',
          contactEmail: 'lisa@digitalproducts.nl',
          notes: 'Initial screening call, 20-30 minutes',
          status: 'COMPLETED'
        }
      ];
      
      setInterviews(mockInterviews);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching interviews data:', error);
      toast.error('Failed to load interviews');
      setLoading(false);
    }
  };

  const formatInterviewDateTime = (dateTimeString) => {
    const date = new Date(dateTimeString);
    return date.toLocaleString('en-NL', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const isUpcoming = (dateTimeString) => {
    const interviewDate = new Date(dateTimeString);
    const now = new Date();
    return interviewDate > now;
  };

  // Filter interviews
  const upcomingInterviews = interviews.filter(interview => interview.status === 'UPCOMING');
  const pastInterviews = interviews.filter(interview => interview.status === 'COMPLETED');

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
        <h1 className="text-2xl font-bold mb-6">My Interviews</h1>
        
        {interviews.length === 0 ? (
          <div className="text-center py-8">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <h3 className="mt-2 text-lg font-medium text-gray-900">No interviews scheduled</h3>
            <p className="mt-1 text-gray-500">You don't have any upcoming or past interviews.</p>
          </div>
        ) : (
          <div className="space-y-8">
            {/* Upcoming Interviews */}
            <div>
              <h2 className="text-xl font-semibold mb-4">Upcoming Interviews</h2>
              
              {upcomingInterviews.length === 0 ? (
                <p className="text-gray-500 py-4">No upcoming interviews scheduled.</p>
              ) : (
                <div className="space-y-4">
                  {upcomingInterviews.map((interview) => (
                    <div key={interview.id} className="border rounded-lg p-6 bg-orange-50">
                      <div className="flex flex-col md:flex-row md:justify-between md:items-start">
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900">{interview.jobTitle}</h3>
                          <p className="text-gray-600">{interview.company} • {interview.location}</p>
                          
                          <div className="mt-4 space-y-2">
                            <div className="flex items-start">
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                              </svg>
                              <span className="text-gray-800 font-medium">{formatInterviewDateTime(interview.interviewDate)}</span>
                            </div>
                            
                            <div className="flex items-start">
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                              </svg>
                              <span className="text-gray-800">{interview.contactPerson} ({interview.contactEmail})</span>
                            </div>
                            
                            <div className="flex items-start">
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
                              </svg>
                              <span className="text-gray-800">{interview.notes}</span>
                            </div>
                            
                            <div className="flex items-start">
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                              </svg>
                              <span className="text-gray-800">{interview.interviewType}</span>
                              {interview.interviewLink && (
                                <a href={interview.interviewLink} target="_blank" rel="noopener noreferrer" className="ml-2 text-orange-600 hover:text-orange-800">
                                  Join Link
                                </a>
                              )}
                              {interview.interviewLocation && (
                                <span className="ml-2 text-gray-800">{interview.interviewLocation}</span>
                              )}
                            </div>
                          </div>
                        </div>
                        
                        <div className="mt-4 md:mt-0">
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                            Upcoming
                          </span>
                        </div>
                      </div>
                      
                      <div className="mt-6 flex justify-end space-x-3">
                        <button
                          onClick={() => toast.info('Calendar invitation sent to your email')}
                          className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
                        >
                          Add to Calendar
                        </button>
                        <button
                          onClick={() => toast.info('Preparing for interview...')}
                          className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-orange-600 hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
                        >
                          Prepare for Interview
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
            
            {/* Past Interviews */}
            <div>
              <h2 className="text-xl font-semibold mb-4">Past Interviews</h2>
              
              {pastInterviews.length === 0 ? (
                <p className="text-gray-500 py-4">No past interviews.</p>
              ) : (
                <div className="space-y-4">
                  {pastInterviews.map((interview) => (
                    <div key={interview.id} className="border rounded-lg p-6">
                      <div className="flex flex-col md:flex-row md:justify-between md:items-start">
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900">{interview.jobTitle}</h3>
                          <p className="text-gray-600">{interview.company} • {interview.location}</p>
                          
                          <div className="mt-4 space-y-2">
                            <div className="flex items-start">
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                              </svg>
                              <span className="text-gray-800">{formatInterviewDateTime(interview.interviewDate)}</span>
                            </div>
                            
                            <div className="flex items-start">
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                              </svg>
                              <span className="text-gray-800">{interview.interviewType}</span>
                            </div>
                          </div>
                        </div>
                        
                        <div className="mt-4 md:mt-0">
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                            Completed
                          </span>
                        </div>
                      </div>
                      
                      <div className="mt-6 flex justify-end">
                        <button
                          onClick={() => toast.info('Adding feedback...')}
                          className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
                        >
                          Add Interview Notes
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </WorkerLayout>
  );
}
