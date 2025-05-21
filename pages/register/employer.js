import { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/router';
import Layout from '../../components/Layout';

export default function EmployerRegistration() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    companyName: '',
    contactPersonName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    industry: '',
    companySize: '',
    location: '',
    hiringPositions: [],
    hiringTimeline: '',
    staffingRequirements: ''
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
      if (!formData.companyName.trim()) {
        stepErrors.companyName = 'Company name is required';
        isValid = false;
      }
      if (!formData.contactPersonName.trim()) {
        stepErrors.contactPersonName = 'Contact person name is required';
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
      if (!formData.industry) {
        stepErrors.industry = 'Industry is required';
        isValid = false;
      }
      if (!formData.companySize) {
        stepErrors.companySize = 'Company size is required';
        isValid = false;
      }
      if (!formData.location.trim()) {
        stepErrors.location = 'Location is required';
        isValid = false;
      }
    } else if (currentStep === 3) {
      if (formData.hiringPositions.length === 0) {
        stepErrors.hiringPositions = 'Please select at least one position type';
        isValid = false;
      }
      if (!formData.hiringTimeline) {
        stepErrors.hiringTimeline = 'Hiring timeline is required';
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
        router.push('/registration-success?type=employer');
      } catch (error) {
        setErrors({ submit: 'Registration failed. Please try again.' });
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  const handlePositionChange = (position) => {
    const updatedPositions = [...formData.hiringPositions];
    
    if (updatedPositions.includes(position)) {
      const index = updatedPositions.indexOf(position);
      updatedPositions.splice(index, 1);
    } else {
      updatedPositions.push(position);
    }
    
    setFormData(prev => ({
      ...prev,
      hiringPositions: updatedPositions
    }));
  };

  return (
    <Layout>
      <Head>
        <title>Employer Registration - Glodinas Flex Work</title>
        <meta name="description" content="Register as an employer with Glodinas Flex Work and find qualified talent" />
      </Head>

      <div className="pt-24 pb-16 bg-gradient-to-b from-blue-50 to-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <div className="mb-8">
              <Link href="/register">
                <a className="text-blue-600 hover:text-blue-700 flex items-center">
                  <svg className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                  Back to registration options
                </a>
              </Link>
            </div>

            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              <div className="p-8">
                <h1 className="text-3xl font-bold text-gray-900 mb-6 text-center">Employer Registration</h1>
                
                {/* Progress Bar */}
                <div className="mb-8">
                  <div className="flex justify-between mb-2">
                    <span className={`text-sm ${step >= 1 ? 'text-blue-600 font-medium' : 'text-gray-500'}`}>Basic Information</span>
                    <span className={`text-sm ${step >= 2 ? 'text-blue-600 font-medium' : 'text-gray-500'}`}>Company Details</span>
                    <span className={`text-sm ${step >= 3 ? 'text-blue-600 font-medium' : 'text-gray-500'}`}>Hiring Needs</span>
                  </div>
                  <div className="h-2 bg-gray-200 rounded-full">
                    <div 
                      className="h-full bg-blue-600 rounded-full transition-all duration-300"
                      style={{ width: `${(step / 3) * 100}%` }}
                    ></div>
                  </div>
                </div>

                <form onSubmit={handleSubmit}>
                  {/* Step 1: Basic Information */}
                  {step === 1 && (
                    <div className="space-y-6">
                      <h2 className="text-xl font-semibold text-gray-800 mb-4">Basic Information</h2>
                      
                      <div>
                        <label htmlFor="companyName" className="block text-sm font-medium text-gray-700 mb-1">Company Name</label>
                        <input
                          type="text"
                          id="companyName"
                          name="companyName"
                          value={formData.companyName}
                          onChange={updateFormData}
                          className={`form-input w-full rounded-md ${errors.companyName ? 'border-red-500' : 'border-gray-300'}`}
                          placeholder="Enter your company name"
                        />
                        {errors.companyName && <p className="mt-1 text-sm text-red-600">{errors.companyName}</p>}
                      </div>
                      
                      <div>
                        <label htmlFor="contactPersonName" className="block text-sm font-medium text-gray-700 mb-1">Contact Person Name</label>
                        <input
                          type="text"
                          id="contactPersonName"
                          name="contactPersonName"
                          value={formData.contactPersonName}
                          onChange={updateFormData}
                          className={`form-input w-full rounded-md ${errors.contactPersonName ? 'border-red-500' : 'border-gray-300'}`}
                          placeholder="Enter contact person's name"
                        />
                        {errors.contactPersonName && <p className="mt-1 text-sm text-red-600">{errors.contactPersonName}</p>}
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
                        <p className="mt-1 text-xs text-gray-500">Password must be at least 8 characters long</p>
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

                  {/* Step 2: Company Information */}
                  {step === 2 && (
                    <div className="space-y-6">
                      <h2 className="text-xl font-semibold text-gray-800 mb-4">Company Information</h2>
                      
                      <div>
                        <label htmlFor="industry" className="block text-sm font-medium text-gray-700 mb-1">Industry</label>
                        <select
                          id="industry"
                          name="industry"
                          value={formData.industry}
                          onChange={updateFormData}
                          className={`form-select w-full rounded-md ${errors.industry ? 'border-red-500' : 'border-gray-300'}`}
                        >
                          <option value="">Select your industry</option>
                          <option value="manufacturing">Manufacturing</option>
                          <option value="healthcare">Healthcare</option>
                          <option value="hospitality">Hospitality</option>
                          <option value="retail">Retail</option>
                          <option value="construction">Construction</option>
                          <option value="logistics">Logistics</option>
                          <option value="technology">Technology</option>
                          <option value="other">Other</option>
                        </select>
                        {errors.industry && <p className="mt-1 text-sm text-red-600">{errors.industry}</p>}
                      </div>
                      
                      <div>
                        <label htmlFor="companySize" className="block text-sm font-medium text-gray-700 mb-1">Company Size</label>
                        <select
                          id="companySize"
                          name="companySize"
                          value={formData.companySize}
                          onChange={updateFormData}
                          className={`form-select w-full rounded-md ${errors.companySize ? 'border-red-500' : 'border-gray-300'}`}
                        >
                          <option value="">Select company size</option>
                          <option value="1-10">1-10 employees</option>
                          <option value="11-50">11-50 employees</option>
                          <option value="51-200">51-200 employees</option>
                          <option value="201-500">201-500 employees</option>
                          <option value="501+">501+ employees</option>
                        </select>
                        {errors.companySize && <p className="mt-1 text-sm text-red-600">{errors.companySize}</p>}
                      </div>
                      
                      <div>
                        <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                        <input
                          type="text"
                          id="location"
                          name="location"
                          value={formData.location}
                          onChange={updateFormData}
                          className={`form-input w-full rounded-md ${errors.location ? 'border-red-500' : 'border-gray-300'}`}
                          placeholder="Enter your company location"
                        />
                        {errors.location && <p className="mt-1 text-sm text-red-600">{errors.location}</p>}
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

                  {/* Step 3: Hiring Needs */}
                  {step === 3 && (
                    <div className="space-y-6">
                      <h2 className="text-xl font-semibold text-gray-800 mb-4">Hiring Needs</h2>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Types of Positions</label>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                          {['Full-time', 'Part-time', 'Temporary', 'Contract', 'Seasonal', 'Internship'].map((position) => (
                            <div key={position} className="flex items-center">
                              <input
                                type="checkbox"
                                id={`position-${position}`}
                                checked={formData.hiringPositions.includes(position)}
                                onChange={() => handlePositionChange(position)}
                                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                              />
                              <label htmlFor={`position-${position}`} className="ml-2 block text-sm text-gray-700">
                                {position}
                              </label>
                            </div>
                          ))}
                        </div>
                        {errors.hiringPositions && <p className="mt-1 text-sm text-red-600">{errors.hiringPositions}</p>}
                      </div>
                      
                      <div>
                        <label htmlFor="hiringTimeline" className="block text-sm font-medium text-gray-700 mb-1">Hiring Timeline</label>
                        <select
                          id="hiringTimeline"
                          name="hiringTimeline"
                          value={formData.hiringTimeline}
                          onChange={updateFormData}
                          className={`form-select w-full rounded-md ${errors.hiringTimeline ? 'border-red-500' : 'border-gray-300'}`}
                        >
                          <option value="">Select your hiring timeline</option>
                          <option value="immediate">Immediate (within 1 week)</option>
                          <option value="soon">Soon (within 1 month)</option>
                          <option value="planning">Planning (1-3 months)</option>
                          <option value="future">Future (3+ months)</option>
                        </select>
                        {errors.hiringTimeline && <p className="mt-1 text-sm text-red-600">{errors.hiringTimeline}</p>}
                      </div>
                      
                      <div>
                        <label htmlFor="staffingRequirements" className="block text-sm font-medium text-gray-700 mb-1">Additional Staffing Requirements</label>
                        <textarea
                          id="staffingRequirements"
                          name="staffingRequirements"
                          value={formData.staffingRequirements}
                          onChange={updateFormData}
                          rows={4}
                          className="form-textarea w-full rounded-md border-gray-300"
                          placeholder="Please describe any specific staffing requirements or needs"
                        ></textarea>
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
                  <a className="text-blue-600 hover:text-blue-700 font-medium">Login here</a>
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
