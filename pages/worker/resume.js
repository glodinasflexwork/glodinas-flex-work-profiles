import React, { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import WorkerLayout from '../../components/layouts/WorkerLayout';
import { toast } from 'react-toastify';

export default function Resume() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [resume, setResume] = useState({
    hasResume: false,
    fileName: '',
    uploadDate: null,
    fileUrl: '',
    fileSize: ''
  });

  // Fetch resume data
  useEffect(() => {
    if (status === 'authenticated' && session?.user?.role === 'WORKER') {
      fetchResumeData();
    } else if (status === 'unauthenticated') {
      router.push('/login');
    }
  }, [status, session]);

  const fetchResumeData = async () => {
    try {
      // For demo purposes, we'll use mock data since the API endpoint doesn't exist yet
      // In a real implementation, this would fetch from /api/worker/resume
      
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // Mock resume data
      const mockResume = {
        hasResume: true,
        fileName: 'john_doe_resume.pdf',
        uploadDate: '2025-05-10T14:30:00Z',
        fileUrl: '#',
        fileSize: '1.2 MB'
      };
      
      setResume(mockResume);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching resume data:', error);
      toast.error('Failed to load resume data');
      setLoading(false);
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    
    // Check file type
    const validTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
    if (!validTypes.includes(file.type)) {
      toast.error('Please upload a PDF or Word document');
      return;
    }
    
    // Check file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast.error('File size must be less than 5MB');
      return;
    }
    
    handleUpload(file);
  };

  const handleUpload = async (file) => {
    setUploading(true);
    
    try {
      // For demo purposes, we'll simulate a successful upload
      // In a real implementation, this would upload to /api/worker/resume
      
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Update resume state with new file info
      setResume({
        hasResume: true,
        fileName: file.name,
        uploadDate: new Date().toISOString(),
        fileUrl: '#',
        fileSize: `${(file.size / (1024 * 1024)).toFixed(2)} MB`
      });
      
      toast.success('Resume uploaded successfully');
    } catch (error) {
      console.error('Error uploading resume:', error);
      toast.error('Failed to upload resume');
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async () => {
    try {
      // For demo purposes, we'll simulate a successful deletion
      // In a real implementation, this would delete from /api/worker/resume
      
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 800));
      
      setResume({
        hasResume: false,
        fileName: '',
        uploadDate: null,
        fileUrl: '',
        fileSize: ''
      });
      
      toast.success('Resume deleted successfully');
    } catch (error) {
      console.error('Error deleting resume:', error);
      toast.error('Failed to delete resume');
    }
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
        <h1 className="text-2xl font-bold mb-6">Resume & CV</h1>
        
        <div className="mb-8">
          <h2 className="text-lg font-semibold mb-2">Upload Your Resume</h2>
          <p className="text-gray-600 mb-4">
            Upload your resume in PDF or Word format. This will be shared with employers when you apply for jobs.
          </p>
          
          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Resume File
            </label>
            <div className="flex items-center">
              <input
                type="file"
                accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                onChange={handleFileChange}
                className="hidden"
                id="resume-upload"
                disabled={uploading}
              />
              <label
                htmlFor="resume-upload"
                className={`px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium ${
                  uploading ? 'bg-gray-100 text-gray-500 cursor-not-allowed' : 'bg-white text-gray-700 hover:bg-gray-50 cursor-pointer'
                } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500`}
              >
                {uploading ? 'Uploading...' : 'Choose File'}
              </label>
              <span className="ml-3 text-sm text-gray-500">
                {uploading ? 'Please wait...' : 'PDF or Word document, max 5MB'}
              </span>
            </div>
          </div>
        </div>
        
        {resume.hasResume && (
          <div className="border rounded-lg p-6 bg-gray-50">
            <h2 className="text-lg font-semibold mb-4">Current Resume</h2>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="p-2 rounded-full bg-orange-100 text-orange-600">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <div className="ml-4">
                  <h3 className="text-sm font-medium text-gray-900">{resume.fileName}</h3>
                  <div className="text-xs text-gray-500 mt-1">
                    <span>Uploaded on {new Date(resume.uploadDate).toLocaleDateString()}</span>
                    <span className="mx-2">•</span>
                    <span>{resume.fileSize}</span>
                  </div>
                </div>
              </div>
              
              <div className="flex space-x-3">
                <button
                  onClick={() => toast.info('Viewing resume...')}
                  className="text-sm text-orange-600 hover:text-orange-800"
                >
                  View
                </button>
                <button
                  onClick={handleDelete}
                  className="text-sm text-red-600 hover:text-red-800"
                >
                  Delete
                </button>
              </div>
            </div>
            
            <div className="mt-6">
              <h3 className="text-sm font-medium text-gray-900 mb-2">Resume Tips</h3>
              <ul className="list-disc pl-5 text-sm text-gray-600 space-y-1">
                <li>Keep your resume concise and relevant to the jobs you're applying for</li>
                <li>Highlight your achievements rather than just listing responsibilities</li>
                <li>Use keywords from job descriptions to help your resume pass through ATS systems</li>
                <li>Regularly update your resume with new skills and experiences</li>
              </ul>
            </div>
          </div>
        )}
        
        {!resume.hasResume && (
          <div className="text-center py-8 border rounded-lg bg-gray-50">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <h3 className="mt-2 text-lg font-medium text-gray-900">No resume uploaded</h3>
            <p className="mt-1 text-gray-500">Upload your resume to apply for jobs more quickly.</p>
            <div className="mt-6">
              <label
                htmlFor="resume-upload"
                className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-orange-600 hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 cursor-pointer"
              >
                Upload Resume
              </label>
            </div>
          </div>
        )}
      </div>
    </WorkerLayout>
  );
}
