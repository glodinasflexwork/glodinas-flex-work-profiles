import { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/router';
import Layout from '../../components/Layout';

export default function JobSeekerRegistration() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    jobPreferences: [],
    experienceLevel: '',
    availability: '',
    resumeUrl: '',
    coverLetterUrl: ''
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const updateFormData = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const validateStep = (currentStep) => {
    let stepErrors = {};
    let isValid = true;

    if (currentStep === 1) {
      if (!formData.firstName.trim()) {
        stepErrors.firstName = 'First name is required';
        isValid = false;
      }
      if (!formData.lastName.trim()) {
        stepErrors.lastName = 'Last name is required';
        isValid = false;
      }
      if (!formData.email.trim()) {
        stepErrors.email = 'Email is required';
        isValid = false;
      } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
        stepErrors.email = 'Email is invalid';
        isValid = false;
      }
      if (!formData.phone.trim()) {
        stepErrors.phone = 'Phone number is required';
        isValid = false;
      }
      if (!formData.password) {
        stepErrors.password = 'Password is required';
        isValid = false;
      } else if (formData.password.length < 8) {
        stepErrors.password = 'Password must be at least 8 characters';
        isValid = false;
      }
      if (formData.password !== formData.confirmPassword) {
        stepErrors.confirmPassword = 'Passwords do not match';
        isValid = false;
      }
    } else if (currentStep === 2) {
      if (formData.jobPreferences.length === 0) {
        stepErrors.jobPreferences = 'Please select at least one job preference';
        isValid = false;
      }
      if (!formData.experienceLevel) {
        stepErrors.experienceLevel = 'Experience level is required';
        isValid = false;
      }
      if (!formData.availability) {
        stepErrors.availability = 'Availability is required';
        isValid = false;
      }
    }

    setErrors(stepErrors);
    return isValid;
  };

  const nextStep = () => {
    if (validateStep(step)) {
      setStep(step + 1);
      window.scrollTo(0, 0);
    }
  };

  const prevStep = () => {
    setStep(step - 1);
    window.scrollTo(0, 0);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (validateStep(step)) {
      setIsSubmitting(true);
      
      try {
        // Here you would typically send the data to your API
        // For now, we'll just simulate a successful registration
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        // Redirect to success page or login
        router.push('/registration-success?type=job-seeker');
      } catch (error) {
        setErrors({ submit: 'Registration failed. Please try again.' });
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  const handleJobPreferenceChange = (preference) => {
    const updatedPreferences = [...formData.jobPreferences];
    
    if (updatedPreferences.includes(preference)) {
      const index = updatedPreferences.indexOf(preference);
      updatedPreferences.splice(index, 1);
    } else {
      updatedPreferences.push(preference);
    }
    
    setFormData(prev => ({
      ...prev,
      jobPreferences: updatedPreferences
    }));
  };

  return (
    <Layout>
      <Head>
        <title>Job Seeker Registration - Glodinas Flex Work</title>
        <meta name="description" content="Register as a job seeker with Glodinas Flex Work and find your next opportunity" />
      </Head>

      <div className="pt-24 pb-16 bg-gradient-to-b from-orange-50 to-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <div className="mb-8">
              <Link href="/register">
                <a className="text-orange-600 hover:text-orange-700 flex items-center">
                  <svg className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                  Back to registration options
                </a>
              </Link>
            </div>

            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              <div className="p-8">
                <h1 className="text-3xl font-bold text-gray-900 mb-6 text-center">Job Seeker Registration</h1>
                
                {/* Progress Bar */}
                <div className="mb-8">
                  <div className="flex justify-between mb-2">
                    <span className={`text-sm ${step >= 1 ? 'text-orange-600 font-medium' : 'text-gray-500'}`}>Basic Information</span>
                    <span className={`text-sm ${step >= 2 ? 'text-orange-600 font-medium' : 'text-gray-500'}`}>Professional Details</span>
                    <span className={`text-sm ${step >= 3 ? 'text-orange-600 font-medium' : 'text-gray-500'}`}>Document Upload</span>
                  </div>
                  <div className="h-2 bg-gray-200 rounded-full">
                    <div 
                      className="h-full bg-orange-600 rounded-full transition-all duration-300"
                      style={{ width: `${(step / 3) * 100}%` }}
                    ></div>
                  </div>
                </div>

                <form onSubmit={handleSubmit}>
                  {/* Step 1: Basic Information */}
                  {step === 1 && (
                    <div className="space-y-6">
                      <h2 className="text-xl font-semibold text-gray-800 mb-4">Basic Information</h2>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
                          <input
                            type="text"
                            id="firstName"
                            name="firstName"
                            value={formData.firstName}
                            onChange={updateFormData}
                            className={`form-input w-full rounded-md ${errors.firstName ? 'border-red-500' : 'border-gray-300'}`}
                            placeholder="Enter your first name"
                          />
                          {errors.firstName && <p className="mt-1 text-sm text-red-600">{errors.firstName}</p>}
                        </div>
                        
                        <div>
                          <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
                          <input
                            type="text"
                            id="lastName"
                            name="lastName"
                            value={formData.lastName}
                            onChange={updateFormData}
                            className={`form-input w-full rounded-md ${errors.lastName ? 'border-red-500' : 'border-gray-300'}`}
                            placeholder="Enter your last name"
                          />
                          {errors.lastName && <p className="mt-1 text-sm text-red-600">{errors.lastName}</p>}
                        </div>
                      </div>
                      
                      <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={formData.email}
                          onChange={updateFormData}
                          className={`form-input w-full rounded-md ${errors.email ? 'border-red-500' : 'border-gray-300'}`}
                          placeholder="Enter your email address"
                        />
                        {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
                      </div>
                      
                      <div>
                        <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                        <input
                          type="tel"
                          id="phone"
                          name="phone"
                          value={formData.phone}
                          onChange={updateFormData}
                          className={`form-input w-full rounded-md ${errors.phone ? 'border-red-500' : 'border-gray-300'}`}
                          placeholder="Enter your phone number"
                        />
                        {errors.phone && <p className="mt-1 text-sm text-red-600">{errors.phone}</p>}
                      </div>
                      
                      <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                        <input
                          type="password"
                          id="password"
                          name="password"
                          value={formData.password}
                          onChange={updateFormData}
                          className={`form-input w-full rounded-md ${errors.password ? 'border-red-500' : 'border-gray-300'}`}
                          placeholder="Create a password"
                        />
                        {errors.password && <p className="mt-1 text-sm text-red-600">{errors.password}</p>}
                        <p className="mt-1 text-sm text-gray-500">Password must be at least 8 characters long</p>
                      </div>
                      
                      <div>
                        <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">Confirm Password</label>
                        <input
                          type="password"
                          id="confirmPassword"
                          name="confirmPassword"
                          value={formData.confirmPassword}
                          onChange={updateFormData}
                          className={`form-input w-full rounded-md ${errors.confirmPassword ? 'border-red-500' : 'border-gray-300'}`}
                          placeholder="Confirm your password"
                        />
                        {errors.confirmPassword && <p className="mt-1 text-sm text-red-600">{errors.confirmPassword}</p>}
                      </div>
                      
                      <div className="flex justify-end">
                        <button
                          type="button"
                          onClick={nextStep}
                          className="btn btn-primary"
                        >
                          Next Step
                        </button>
                      </div>
                    </div>
                  )}

                  {/* Step 2: Professional Information */}
                  {step === 2 && (
                    <div className="space-y-6">
                      <h2 className="text-xl font-semibold text-gray-800 mb-4">Professional Information</h2>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Job Preferences</label>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                          {['Manufacturing', 'Healthcare', 'Hospitality', 'Retail', 'Construction', 'Logistics', 'Office', 'Other'].map((job) => (
                            <div key={job} className="flex items-center">
                              <input
                                type="checkbox"
                                id={`job-${job}`}
                                checked={formData.jobPreferences.includes(job)}
                                onChange={() => handleJobPreferenceChange(job)}
                                className="h-4 w-4 text-orange-600 focus:ring-orange-500 border-gray-300 rounded"
                              />
                              <label htmlFor={`job-${job}`} className="ml-2 block text-sm text-gray-700">
                                {job}
                              </label>
                            </div>
                          ))}
                        </div>
                        {errors.jobPreferences && <p className="mt-1 text-sm text-red-600">{errors.jobPreferences}</p>}
                      </div>
                      
                      <div>
                        <label htmlFor="experienceLevel" className="block text-sm font-medium text-gray-700 mb-1">Experience Level</label>
                        <select
                          id="experienceLevel"
                          name="experienceLevel"
                          value={formData.experienceLevel}
                          onChange={updateFormData}
                          className={`form-select w-full rounded-md ${errors.experienceLevel ? 'border-red-500' : 'border-gray-300'}`}
                        >
                          <option value="">Select your experience level</option>
                          <option value="entry">Entry Level (0-2 years)</option>
                          <option value="mid">Mid Level (3-5 years)</option>
                          <option value="senior">Senior Level (6+ years)</option>
                        </select>
                        {errors.experienceLevel && <p className="mt-1 text-sm text-red-600">{errors.experienceLevel}</p>}
                      </div>
                      
                      <div>
                        <label htmlFor="availability" className="block text-sm font-medium text-gray-700 mb-1">Availability</label>
                        <select
                          id="availability"
                          name="availability"
                          value={formData.availability}
                          onChange={updateFormData}
                          className={`form-select w-full rounded-md ${errors.availability ? 'border-red-500' : 'border-gray-300'}`}
                        >
                          <option value="">Select your availability</option>
                          <option value="immediate">Immediate</option>
                          <option value="2weeks">2 Weeks</option>
                          <option value="1month">1 Month</option>
                          <option value="flexible">Flexible</option>
                        </select>
                        {errors.availability && <p className="mt-1 text-sm text-red-600">{errors.availability}</p>}
                      </div>
                      
                      <div className="flex justify-between">
                        <button
                          type="button"
                          onClick={prevStep}
                          className="btn btn-outline"
                        >
                          Previous Step
                        </button>
                        <button
                          type="button"
                          onClick={nextStep}
                          className="btn btn-primary"
                        >
                          Next Step
                        </button>
                      </div>
                    </div>
                  )}

                  {/* Step 3: Document Upload */}
                  {step === 3 && (
                    <div className="space-y-6">
                      <h2 className="text-xl font-semibold text-gray-800 mb-4">Document Upload</h2>
                      
                      <div className="bg-gray-50 p-6 rounded-lg border border-dashed border-gray-300">
                        <div className="text-center">
                          <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                          </svg>
                          <p className="mt-1 text-sm text-gray-600">
                            Drag and drop your resume/CV here, or click to browse
                          </p>
                          <p className="mt-1 text-xs text-gray-500">
                            Accepted formats: PDF, DOCX, JPG (Max 5MB)
                          </p>
                          <button
                            type="button"
                            className="mt-4 btn btn-outline btn-sm"
                          >
                            Upload Resume/CV
                          </button>
                        </div>
                      </div>
                      
                      <div className="bg-gray-50 p-6 rounded-lg border border-dashed border-gray-300">
                        <div className="text-center">
                          <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                          </svg>
                          <p className="mt-1 text-sm text-gray-600">
                            Drag and drop your cover letter here, or click to browse (optional)
                          </p>
                          <p className="mt-1 text-xs text-gray-500">
                            Accepted formats: PDF, DOCX, JPG (Max 5MB)
                          </p>
                          <button
                            type="button"
                            className="mt-4 btn btn-outline btn-sm"
                          >
                            Upload Cover Letter
                          </button>
                        </div>
                      </div>
                      
                      {errors.submit && (
                        <div className="bg-red-50 p-4 rounded-md">
                          <p className="text-sm text-red-600">{errors.submit}</p>
                        </div>
                      )}
                      
                      <div className="flex justify-between">
                        <button
                          type="button"
                          onClick={prevStep}
                          className="btn btn-outline"
                        >
                          Previous Step
                        </button>
                        <button
                          type="submit"
                          className={`btn btn-primary ${isSubmitting ? 'opacity-75 cursor-not-allowed' : ''}`}
                          disabled={isSubmitting}
                        >
                          {isSubmitting ? 'Submitting...' : 'Complete Registration'}
                        </button>
                      </div>
                    </div>
                  )}
                </form>
              </div>
            </div>

            <div className="text-center mt-8">
              <p className="text-gray-600">
                Already have an account?{' '}
                <Link href="/login">
                  <a className="text-orange-600 hover:text-orange-700 font-medium">Login here</a>
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
