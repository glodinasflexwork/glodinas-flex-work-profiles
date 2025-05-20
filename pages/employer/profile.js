import React, { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import EmployerLayout from '../../components/layouts/EmployerLayout';
import Notification from '../../components/Notification';

export default function CompanyProfile() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [profile, setProfile] = useState(null);
  const [notification, setNotification] = useState(null);

  // Fetch employer profile data
  useEffect(() => {
    if (status === 'authenticated' && session?.user?.role === 'EMPLOYER') {
      fetchEmployerProfile();
    } else if (status === 'unauthenticated') {
      router.push('/login');
    }
  }, [status, session]);

  const fetchEmployerProfile = async () => {
    try {
      const response = await fetch('/api/employer/profile');
      if (response.ok) {
        const data = await response.json();
        setProfile(data);
      } else {
        showNotification('Error loading profile', 'error');
      }
    } catch (error) {
      console.error('Error fetching profile:', error);
      showNotification('Error loading profile', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfile(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);

    try {
      const response = await fetch('/api/employer/profile', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          phone: profile.phone,
          vatNumber: profile.vatNumber,
          location: profile.location
        }),
      });

      if (response.ok) {
        showNotification('Profile updated successfully', 'success');
      } else {
        const error = await response.json();
        showNotification(`Error: ${error.message}`, 'error');
      }
    } catch (error) {
      console.error('Error updating profile:', error);
      showNotification('Error updating profile', 'error');
    } finally {
      setSaving(false);
    }
  };

  const showNotification = (message, type) => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 5000);
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
      {notification && (
        <Notification 
          message={notification.message} 
          type={notification.type} 
          onClose={() => setNotification(null)} 
        />
      )}
      
      <div className="bg-white shadow-md rounded-lg p-6">
        <h1 className="text-2xl font-bold mb-6">Company Profile</h1>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Company Information Section */}
          <div className="border-b pb-6">
            <h2 className="text-xl font-semibold mb-4">Company Information</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Company Name - Read Only */}
              <div>
                <label className="block text-gray-700 mb-1">Company Name</label>
                <input
                  type="text"
                  value={profile?.companyName || ''}
                  className="w-full p-2 border border-gray-300 rounded bg-gray-100"
                  disabled
                />
                <p className="text-xs text-gray-500 mt-1">Contact admin to update company name</p>
              </div>
              
              {/* KVK Number - Read Only */}
              <div>
                <label className="block text-gray-700 mb-1">KVK Number</label>
                <input
                  type="text"
                  value={profile?.kvkNumber || 'Not provided'}
                  className="w-full p-2 border border-gray-300 rounded bg-gray-100"
                  disabled
                />
                <p className="text-xs text-gray-500 mt-1">Contact admin to update KVK number</p>
              </div>
              
              {/* VAT Number - Editable */}
              <div>
                <label className="block text-gray-700 mb-1">VAT Number</label>
                <input
                  type="text"
                  name="vatNumber"
                  value={profile?.vatNumber || ''}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded"
                />
              </div>
              
              {/* Industry - Read Only */}
              <div>
                <label className="block text-gray-700 mb-1">Industry</label>
                <input
                  type="text"
                  value={profile?.industry || ''}
                  className="w-full p-2 border border-gray-300 rounded bg-gray-100"
                  disabled
                />
              </div>
            </div>
          </div>
          
          {/* Contact Information Section */}
          <div className="border-b pb-6">
            <h2 className="text-xl font-semibold mb-4">Contact Information</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Contact Person - Read Only */}
              <div>
                <label className="block text-gray-700 mb-1">Contact Person</label>
                <input
                  type="text"
                  value={profile?.contactPerson || ''}
                  className="w-full p-2 border border-gray-300 rounded bg-gray-100"
                  disabled
                />
              </div>
              
              {/* Email - Read Only */}
              <div>
                <label className="block text-gray-700 mb-1">Email Address</label>
                <input
                  type="email"
                  value={session?.user?.email || ''}
                  className="w-full p-2 border border-gray-300 rounded bg-gray-100"
                  disabled
                />
              </div>
              
              {/* Phone - Editable */}
              <div>
                <label className="block text-gray-700 mb-1">Phone Number</label>
                <input
                  type="tel"
                  name="phone"
                  value={profile?.phone || ''}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded"
                />
              </div>
              
              {/* Location - Editable */}
              <div>
                <label className="block text-gray-700 mb-1">Location</label>
                <input
                  type="text"
                  name="location"
                  value={profile?.location || ''}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded"
                />
              </div>
            </div>
          </div>
          
          {/* Subscription Information - Read Only */}
          <div className="border-b pb-6">
            <h2 className="text-xl font-semibold mb-4">Subscription Information</h2>
            
            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="flex justify-between items-center mb-2">
                <span className="font-medium">Current Plan:</span>
                <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                  {profile?.subscription?.tier || 'BASIC'}
                </span>
              </div>
              
              <div className="flex justify-between items-center mb-2">
                <span className="font-medium">Job Posting Limit:</span>
                <span>{profile?.subscription?.jobPostingLimit || 0} jobs</span>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="font-medium">Active Jobs:</span>
                <span>{profile?.subscription?.activeJobsCount || 0} / {profile?.subscription?.jobPostingLimit || 0}</span>
              </div>
            </div>
          </div>
          
          {/* Company Logo Section */}
          <div className="border-b pb-6">
            <h2 className="text-xl font-semibold mb-4">Company Logo</h2>
            
            <div className="flex items-center space-x-6">
              <div className="w-32 h-32 bg-gray-200 rounded-lg flex items-center justify-center overflow-hidden">
                {profile?.logo ? (
                  <img 
                    src={profile.logo} 
                    alt="Company Logo" 
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <span className="text-gray-400">No logo</span>
                )}
              </div>
              
              <div>
                <button
                  type="button"
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
                  onClick={() => alert('Logo upload functionality will be implemented in the next phase')}
                >
                  Upload New Logo
                </button>
                <p className="text-xs text-gray-500 mt-2">
                  Recommended size: 400x400px. Max file size: 2MB.
                  <br />
                  Supported formats: JPG, PNG
                </p>
              </div>
            </div>
          </div>
          
          {/* Save Button */}
          <div className="flex justify-end">
            <button
              type="submit"
              className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded flex items-center"
              disabled={saving}
            >
              {saving ? (
                <>
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Saving...
                </>
              ) : 'Save Changes'}
            </button>
          </div>
        </form>
      </div>
    </EmployerLayout>
  );
}
