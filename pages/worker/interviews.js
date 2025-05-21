import React, { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import WorkerLayout from '../../components/layouts/WorkerLayout';

export default function Interviews() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [interviews, setInterviews] = useState([]);
  const [filter, setFilter] = useState('upcoming');

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
      // This would normally fetch from an API endpoint
      // For now, we'll use mock data
      const mockInterviews = [
        {
          id: '1',
          jobId: '102',
          jobTitle: 'Administrative Assistant',
          companyName: 'XYZ Corporation',
          location: 'Rotterdam, Netherlands',
          interviewDate: new Date('2025-05-25T14:00:00'),
          interviewType: 'In-person',
          interviewAddress: 'XYZ Corporation HQ, Weena 505, 3013 AL Rotterdam',
          contactPerson: 'Jane Smith',
          contactEmail: 'jane.smith@xyzcorp.com',
          contactPhone: '+31 10 123 4567',
          notes: 'Bring portfolio and references. Business casual attire.',
          status: 'SCHEDULED'
        },
        {
          id: '2',
          jobId: '105',
          jobTitle: 'Executive Secretary',
          companyName: 'Global Enterprises',
          location: 'Amsterdam, Netherlands',
          interviewDate: new Date('2025-05-28T10:30:00'),
          interviewType: 'Video',
          interviewLink: 'https://zoom.us/j/123456789',
          contactPerson: 'Michael Brown',
          contactEmail: 'michael.brown@globalent.com',
          notes: 'Prepare for a 45-minute interview with potential skills assessment.',
          status: 'SCHEDULED'
        },
        {
          id: '3',
          jobId: '106',
          jobTitle: 'Customer Support Specialist',
          companyName: 'Tech Solutions',
          location: 'Utrecht, Netherlands',
          interviewDate: new Date('2025-05-20T15:00:00'),
          interviewType: 'Phone',
          contactPerson: 'Sarah Johnson',
          contactPhone: '+31 30 987 6543',
          notes: 'Initial screening call, expect questions about previous customer service experience.',
          status: 'COMPLETED'
        },
        {
          id: '4',
          jobId: '107',
          jobTitle: 'Office Manager',
          companyName: 'Dutch Innovations',
          location: 'The Hague, Netherlands',
          interviewDate: new Date('2025-05-18T11:00:00'),
          interviewType: 'In-person',
          interviewAddress: 'Dutch Innovations Office, Prinses Beatrixlaan 800, 2595 BN Den Haag',
          contactPerson: 'Robert van der Meer',
          contactEmail: 'robert@dutchinnovations.nl',
          contactPhone: '+31 70 456 7890',
          notes: 'Interview was with HR and department manager. Follow-up expected within a week.',
          status: 'COMPLETED'
        }
      ];
      
      setInterviews(mockInterviews);
    } catch (error) {
      console.error('Error fetching interviews data:', error);
    } finally {
      setLoading(false);
    }
  };

  const getFilteredInterviews = () => {
    if (filter === 'all') return interviews;
    if (filter === 'upcoming') return interviews.filter(interview => interview.status === 'SCHEDULED' && new Date(interview.interviewDate) > new Date());
    if (filter === 'past') return interviews.filter(interview => interview.status === 'COMPLETED' || new Date(interview.interviewDate) < new Date());
    return interviews;
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-NL', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const formatTime = (date) => {
    return new Date(date).toLocaleTimeString('en-NL', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getInterviewTypeIcon = (type) => {
    switch (type) {
      case 'In-person':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
        );
      case 'Video':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
          </svg>
        );
      case 'Phone':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-purple-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
          </svg>
        );
      default:
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
        );
    }
  };

  const isUpcoming = (date) => {
    return new Date(date) > new Date();
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
      <div className="bg-white shadow-md rounded-lg p-6 mb-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800 mb-4 md:mb-0">My Interviews</h1>
          
          <div className="flex space-x-2">
            <button
              onClick={() => setFilter('all')}
              className={`px-3 py-1 rounded-md text-sm ${filter === 'all' ? 'bg-orange-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
            >
              All
            </button>
            <button
              onClick={() => setFilter('upcoming')}
              className={`px-3 py-1 rounded-md text-sm ${filter === 'upcoming' ? 'bg-orange-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
            >
              Upcoming
            </button>
            <button
              onClick={() => setFilter('past')}
              className={`px-3 py-1 rounded-md text-sm ${filter === 'past' ? 'bg-orange-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
            >
              Past
            </button>
          </div>
        </div>

        {interviews.length === 0 ? (
          <div className="text-center py-8">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <h3 className="mt-2 text-lg font-medium text-gray-900">No interviews scheduled</h3>
            <p className="mt-1 text-gray-500">When you get invited to interviews, they will appear here.</p>
            <div className="mt-6">
              <Link href="/worker/applications" legacyBehavior>
                <a className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-orange-600 hover:bg-orange-700">
                  View Applications
                </a>
              </Link>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            {getFilteredInterviews().map((interview) => (
              <div key={interview.id} className={`border rounded-lg overflow-hidden ${isUpcoming(interview.interviewDate) ? 'border-orange-200' : 'border-gray-200'}`}>
                <div className="p-6">
                  <div className="flex items-center justify-between">
                    <h2 className="text-xl font-semibold text-gray-800">{interview.jobTitle}</h2>
                    <div className="flex items-center">
                      {getInterviewTypeIcon(interview.interviewType)}
                      <span className="ml-1 text-sm text-gray-600">{interview.interviewType}</span>
                    </div>
                  </div>
                  
                  <div className="mt-2 text-gray-600">{interview.companyName}</div>
                  
                  <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <h3 className="text-sm font-medium text-gray-500">Date & Time</h3>
                      <div className="mt-1">
                        <p className="text-sm text-gray-900">{formatDate(interview.interviewDate)}</p>
                        <p className="text-sm text-gray-900">{formatTime(interview.interviewDate)}</p>
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="text-sm font-medium text-gray-500">Contact Person</h3>
                      <div className="mt-1">
                        <p className="text-sm text-gray-900">{interview.contactPerson}</p>
                        {interview.contactEmail && (
                          <p className="text-sm text-gray-600">{interview.contactEmail}</p>
                        )}
                        {interview.contactPhone && (
                          <p className="text-sm text-gray-600">{interview.contactPhone}</p>
                        )}
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-4">
                    <h3 className="text-sm font-medium text-gray-500">Location</h3>
                    <div className="mt-1">
                      {interview.interviewType === 'In-person' && (
                        <p className="text-sm text-gray-900">{interview.interviewAddress}</p>
                      )}
                      {interview.interviewType === 'Video' && (
                        <a href={interview.interviewLink} target="_blank" rel="noopener noreferrer" className="text-sm text-orange-600 hover:text-orange-800">
                          {interview.interviewLink}
                        </a>
                      )}
                      {interview.interviewType === 'Phone' && (
                        <p className="text-sm text-gray-900">They will call you at the scheduled time.</p>
                      )}
                    </div>
                  </div>
                  
                  {interview.notes && (
                    <div className="mt-4">
                      <h3 className="text-sm font-medium text-gray-500">Notes</h3>
                      <p className="mt-1 text-sm text-gray-900">{interview.notes}</p>
                    </div>
                  )}
                  
                  <div className="mt-6 flex justify-between items-center">
                    <div>
                      {isUpcoming(interview.interviewDate) ? (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                          Upcoming
                        </span>
                      ) : (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                          Completed
                        </span>
                      )}
                    </div>
                    
                    <div className="flex space-x-3">
                      {isUpcoming(interview.interviewDate) && (
                        <>
                          <button
                            onClick={() => alert(`Add to calendar: ${interview.jobTitle} interview`)}
                            className="px-3 py-1 border border-gray-300 rounded-md text-sm text-gray-700 hover:bg-gray-50"
                          >
                            Add to Calendar
                          </button>
                          
                          <button
                            onClick={() => alert(`Reschedule interview for ${interview.jobTitle}`)}
                            className="px-3 py-1 border border-gray-300 rounded-md text-sm text-gray-700 hover:bg-gray-50"
                          >
                            Reschedule
                          </button>
                        </>
                      )}
                      
                      <Link href={`/worker/applications`} legacyBehavior>
                        <a className="px-3 py-1 bg-orange-600 text-white rounded-md text-sm hover:bg-orange-700">
                          View Application
                        </a>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      
      <div className="bg-white shadow-md rounded-lg p-6">
        <h2 className="text-xl font-bold mb-4">Interview Preparation Tips</h2>
        <div className="space-y-4">
          <div className="flex items-start">
            <div className="flex-shrink-0">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-orange-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm text-gray-700">Research the company thoroughly before your interview.</p>
            </div>
          </div>
          <div className="flex items-start">
            <div className="flex-shrink-0">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-orange-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm text-gray-700">Prepare answers for common interview questions.</p>
            </div>
          </div>
          <div className="flex items-start">
            <div className="flex-shrink-0">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-orange-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm text-gray-700">For video interviews, test your equipment beforehand.</p>
            </div>
          </div>
          <div className="flex items-start">
            <div className="flex-shrink-0">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-orange-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm text-gray-700">Dress professionally, even for remote interviews.</p>
            </div>
          </div>
          <div className="flex items-start">
            <div className="flex-shrink-0">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-orange-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm text-gray-700">Prepare thoughtful questions to ask the interviewer.</p>
            </div>
          </div>
        </div>
      </div>
    </WorkerLayout>
  );
}
