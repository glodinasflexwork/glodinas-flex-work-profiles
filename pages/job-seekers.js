import { useState, useEffect, useRef } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useNotification } from '../components/NotificationContext';

export default function JobSeekers() {
  const router = useRouter();
  const { addNotification } = useNotification();
  const [showJobAlert, setShowJobAlert] = useState(false);
  const [activeStep, setActiveStep] = useState(1);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    location: '',
    language: 'English',
    experience: '',
    industry: '',
    jobType: '',
    availability: '',
    relocate: '',
    workPermit: '',
    skills: '',
    languages: '',
    education: '',
    password: '',
    confirmPassword: '',
    termsAccepted: false,
    privacyAccepted: false,
    marketingOptIn: false
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);

  // Simulate job alert notification
  useEffect(() => {
    const timer = setTimeout(() => {
      addNotification('New job matches found in your area!', 'info');
      setShowJobAlert(true);
    }, 5000);
    
    return () => clearTimeout(timer);
  }, [addNotification]);
  
  const nextStep = () => {
    setActiveStep(prev => Math.min(prev + 1, 4));
  };
  
  const prevStep = () => {
    setActiveStep(prev => Math.max(prev - 1, 1));
  };
  
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    
    // Clear error when field is edited
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };
  
  const validateStep = () => {
    const newErrors = {};
    
    switch (activeStep) {
      case 1:
        if (!formData.firstName.trim()) newErrors.firstName = 'First name is required';
        if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required';
        if (!formData.email.trim()) newErrors.email = 'Email is required';
        else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email is invalid';
        if (!formData.phone.trim()) newErrors.phone = 'Phone number is required';
        break;
      case 2:
        if (!formData.experience) newErrors.experience = 'Experience level is required';
        if (!formData.industry) newErrors.industry = 'Industry preference is required';
        if (!formData.jobType) newErrors.jobType = 'Job type is required';
        break;
      case 3:
        if (!formData.skills.trim()) newErrors.skills = 'Skills are required';
        break;
      case 4:
        if (!formData.password) newErrors.password = 'Password is required';
        else if (formData.password.length < 8) newErrors.password = 'Password must be at least 8 characters';
        if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = 'Passwords do not match';
        if (!formData.termsAccepted) newErrors.termsAccepted = 'You must accept the terms and conditions';
        if (!formData.privacyAccepted) newErrors.privacyAccepted = 'You must accept the privacy policy';
        break;
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleStepChange = (direction) => {
    if (direction === 'next') {
      if (validateStep()) {
        nextStep();
      }
    } else {
      prevStep();
    }
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateStep()) return;
    
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setFormSubmitted(true);
      addNotification('Your application has been submitted successfully!', 'success');
    }, 1500);
  };
  
  const renderForm = () => {
    if (formSubmitted) {
      return (
        <div className="bg-white rounded-lg shadow-lg p-8 text-center">
          <div className="text-5xl text-green-500 mb-4">✓</div>
          <h3 className="text-2xl font-bold mb-4">Application Submitted Successfully!</h3>
          <p className="text-gray-600 mb-6">
            Thank you for registering with Glodinas Flex Work. Our team will review your application within 24 hours.
            You will receive an email confirmation once your profile is approved.
          </p>
          <p className="text-gray-600 mb-6">
            Next steps:
          </p>
          <ol className="text-left max-w-md mx-auto mb-8 space-y-2">
            <li className="flex items-start">
              <span className="flex-shrink-0 flex items-center justify-center w-6 h-6 rounded-full bg-orange-100 text-orange-500 mr-2">1</span>
              <span>Our team reviews your application (within 24 hours)</span>
            </li>
            <li className="flex items-start">
              <span className="flex-shrink-0 flex items-center justify-center w-6 h-6 rounded-full bg-orange-100 text-orange-500 mr-2">2</span>
              <span>Your profile is matched with suitable job opportunities</span>
            </li>
            <li className="flex items-start">
              <span className="flex-shrink-0 flex items-center justify-center w-6 h-6 rounded-full bg-orange-100 text-orange-500 mr-2">3</span>
              <span>You receive job offers and notifications</span>
            </li>
            <li className="flex items-start">
              <span className="flex-shrink-0 flex items-center justify-center w-6 h-6 rounded-full bg-orange-100 text-orange-500 mr-2">4</span>
              <span>Accept an offer and receive your "Ready to Work" confirmation</span>
            </li>
          </ol>
          <Link href="/">
            <a className="btn btn-primary">Return to Homepage</a>
          </Link>
        </div>
      );
    }
    return (
      <div className="bg-white rounded-lg shadow-lg p-6">
        <div className="mb-8">
          <div className="flex justify-between items-center mb-4">
            {[1, 2, 3, 4].map((step) => (
              <div 
                key={step} 
                className={`flex-1 relative ${step < 4 ? 'after:content-[""] after:h-1 after:w-full after:absolute after:top-1/2 after:-translate-y-1/2 after:left-1/2 after:bg-gray-200 after:z-0' : ''}`}
              >
                <div className={`w-10 h-10 rounded-full flex items-center justify-center z-10 relative mx-auto ${activeStep >= step ? 'bg-orange-500 text-white' : 'bg-gray-200 text-gray-500'}`}>
                  {step}
                </div>
              </div>
            ))}
          </div>
          <div className="flex justify-between text-sm text-center text-gray-600">
            <div className="flex-1">Personal Info</div>
            <div className="flex-1">Professional Details</div>
            <div className="flex-1">Skills & Qualifications</div>
            <div className="flex-1">Account Setup</div>
          </div>
        </div>
        <form onSubmit={handleSubmit}>
          {/* Step 1: Personal Information */}
          {activeStep === 1 && (
            <div className="space-y-4">
              <h3 className="text-xl font-semibold mb-4">Personal Information</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">First Name *</label>
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    className={`form-input ${errors.firstName ? 'border-red-500' : ''}`}
                  />
                  {errors.firstName && <p className="text-red-500 text-xs mt-1">{errors.firstName}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Last Name *</label>
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    className={`form-input ${errors.lastName ? 'border-red-500' : ''}`}
                  />
                  {errors.lastName && <p className="text-red-500 text-xs mt-1">{errors.lastName}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email *</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={`form-input ${errors.email ? 'border-red-500' : ''}`}
                  />
                  {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number *</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className={`form-input ${errors.phone ? 'border-red-500' : ''}`}
                  />
                  {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                  <input
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    className="form-input"
                    placeholder="City, Country"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Preferred Language</label>
                  <select
                    name="language"
                    value={formData.language}
                    onChange={handleChange}
                    className="form-select"
                  >
                    <option value="English">English</option>
                    <option value="Dutch">Dutch</option>
                    <option value="Polish">Polish</option>
                    <option value="Romanian">Romanian</option>
                    <option value="Bulgarian">Bulgarian</option>
                  </select>
                </div>
              </div>
            </div>
          )}
          {/* Step 2: Professional Details */}
          {activeStep === 2 && (
            <div className="space-y-4">
              <h3 className="text-xl font-semibold mb-4">Professional Details</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Experience Level *</label>
                  <select
                    name="experience"
                    value={formData.experience}
                    onChange={handleChange}
                    className={`form-select ${errors.experience ? 'border-red-500' : ''}`}
                  >
                    <option value="">Select Experience</option>
                    <option value="entry">Entry Level (0-1 years)</option>
                    <option value="junior">Junior (1-3 years)</option>
                    <option value="mid">Mid-Level (3-5 years)</option>
                    <option value="senior">Senior (5+ years)</option>
                  </select>
                  {errors.experience && <p className="text-red-500 text-xs mt-1">{errors.experience}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Preferred Industry *</label>
                  <select
                    name="industry"
                    value={formData.industry}
                    onChange={handleChange}
                    className={`form-select ${errors.industry ? 'border-red-500' : ''}`}
                  >
                    <option value="">Select Industry</option>
                    <option value="logistics">Logistics & Transportation</option>
                    <option value="manufacturing">Manufacturing</option>
                    <option value="healthcare">Healthcare</option>
                    <option value="hospitality">Hospitality & Tourism</option>
                    <option value="retail">Retail & Customer Service</option>
                    <option value="construction">Construction & Skilled Trades</option>
                    <option value="it">Information Technology</option>
                    <option value="other">Other</option>
                  </select>
                  {errors.industry && <p className="text-red-500 text-xs mt-1">{errors.industry}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Job Type *</label>
                  <select
                    name="jobType"
                    value={formData.jobType}
                    onChange={handleChange}
                    className={`form-select ${errors.jobType ? 'border-red-500' : ''}`}
                  >
                    <option value="">Select Job Type</option>
                    <option value="fulltime">Full-time</option>
                    <option value="parttime">Part-time</option>
                    <option value="temporary">Temporary</option>
                    <option value="contract">Contract</option>
                    <option value="seasonal">Seasonal</option>
                  </select>
                  {errors.jobType && <p className="text-red-500 text-xs mt-1">{errors.jobType}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Availability</label>
                  <select
                    name="availability"
                    value={formData.availability}
                    onChange={handleChange}
                    className="form-select"
                  >
                    <option value="">Select Availability</option>
                    <option value="immediate">Immediate</option>
                    <option value="1week">Within 1 week</option>
                    <option value="2weeks">Within 2 weeks</option>
                    <option value="1month">Within 1 month</option>
                    <option value="3months">Within 3 months</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Willing to Relocate?</label>
                  <select
                    name="relocate"
                    value={formData.relocate}
                    onChange={handleChange}
                    className="form-select"
                  >
                    <option value="">Select Option</option>
                    <option value="yes">Yes</option>
                    <option value="no">No</option>
                    <option value="maybe">Maybe, depending on location</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">EU Work Permit</label>
                  <select
                    name="workPermit"
                    value={formData.workPermit}
                    onChange={handleChange}
                    className="form-select"
                  >
                    <option value="">Select Option</option>
                    <option value="eu">EU Citizen</option>
                    <option value="permit">Have Work Permit</option>
                    <option value="none">Need Sponsorship</option>
                  </select>
                </div>
              </div>
            </div>
          )}
          {/* Step 3: Skills & Qualifications */}
          {activeStep === 3 && (
            <div className="space-y-4">
              <h3 className="text-xl font-semibold mb-4">Skills & Qualifications</h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Skills *</label>
                  <textarea
                    name="skills"
                    value={formData.skills}
                    onChange={handleChange}
                    className={`form-textarea h-24 ${errors.skills ? 'border-red-500' : ''}`}
                    placeholder="List your key skills, separated by commas"
                  ></textarea>
                  {errors.skills && <p className="text-red-500 text-xs mt-1">{errors.skills}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Languages</label>
                  <textarea
                    name="languages"
                    value={formData.languages}
                    onChange={handleChange}
                    className="form-textarea"
                    placeholder="Languages you speak and proficiency level (e.g., English - Fluent, Dutch - Basic)"
                  ></textarea>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Education</label>
                  <textarea
                    name="education"
                    value={formData.education}
                    onChange={handleChange}
                    className="form-textarea"
                    placeholder="Your educational background"
                  ></textarea>
                </div>
              </div>
            </div>
          )}
          {/* Step 4: Account Setup */}
          {activeStep === 4 && (
            <div className="space-y-4">
              <h3 className="text-xl font-semibold mb-4">Account Setup</h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Password *</label>
                  <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    className={`form-input ${errors.password ? 'border-red-500' : ''}`}
                  />
                  {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Confirm Password *</label>
                  <input
                    type="password"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    className={`form-input ${errors.confirmPassword ? 'border-red-500' : ''}`}
                  />
                  {errors.confirmPassword && <p className="text-red-500 text-xs mt-1">{errors.confirmPassword}</p>}
                </div>
                <div className="space-y-2">
                  <div className="flex items-start">
                    <input
                      type="checkbox"
                      id="termsAccepted"
                      name="termsAccepted"
                      checked={formData.termsAccepted}
                      onChange={handleChange}
                      className={`form-checkbox mt-1 ${errors.termsAccepted ? 'border-red-500' : ''}`}
                    />
                    <label htmlFor="termsAccepted" className="ml-2 block text-sm text-gray-700">
                      I accept the <Link href="/terms"><a className="text-blue-600 hover:underline">Terms and Conditions</a></Link> *
                    </label>
                  </div>
                  {errors.termsAccepted && <p className="text-red-500 text-xs">{errors.termsAccepted}</p>}
                </div>
                <div className="space-y-2">
                  <div className="flex items-start">
                    <input
                      type="checkbox"
                      id="privacyAccepted"
                      name="privacyAccepted"
                      checked={formData.privacyAccepted}
                      onChange={handleChange}
                      className={`form-checkbox mt-1 ${errors.privacyAccepted ? 'border-red-500' : ''}`}
                    />
                    <label htmlFor="privacyAccepted" className="ml-2 block text-sm text-gray-700">
                      I accept the <Link href="/privacy-policy"><a className="text-blue-600 hover:underline">Privacy Policy</a></Link> *
                    </label>
                  </div>
                  {errors.privacyAccepted && <p className="text-red-500 text-xs">{errors.privacyAccepted}</p>}
                </div>
                <div className="flex items-start">
                  <input
                    type="checkbox"
                    id="marketingOptIn"
                    name="marketingOptIn"
                    checked={formData.marketingOptIn}
                    onChange={handleChange}
                    className="form-checkbox mt-1"
                  />
                  <label htmlFor="marketingOptIn" className="ml-2 block text-sm text-gray-700">
                    I would like to receive job alerts and other marketing communications
                  </label>
                </div>
              </div>
            </div>
          )}
          {/* Navigation buttons */}
          <div className="flex justify-between mt-8">
            {activeStep > 1 && (
              <button
                type="button"
                onClick={() => handleStepChange('prev')}
                className="btn btn-secondary"
              >
                Previous
              </button>
            )}
            
            {activeStep < 4 ? (
              <button
                type="button"
                onClick={() => handleStepChange('next')}
                className="btn btn-primary ml-auto"
              >
                Next
              </button>
            ) : (
              <button
                type="submit"
                className="btn btn-primary ml-auto"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Submitting...' : 'Submit Application'}
              </button>
            )}
          </div>
        </form>
      </div>
    );
  };
  
  return (
    <>
      <Head>
        <title>Job Seekers | Glodinas Flex Work</title>
        <meta name="description" content="Find your next career opportunity with Glodinas Flex Work. Register as a job seeker to access hundreds of job openings across Europe." />
      </Head>
      <div className="bg-gray-50 py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-8">
              <h1 className="text-3xl md:text-4xl font-bold mb-4">Find Your Next Career Opportunity</h1>
              <p className="text-lg text-gray-600">
                Register as a job seeker to access hundreds of job openings across Europe
              </p>
            </div>
            
            {renderForm()}
          </div>
        </div>
      </div>
    </>
  );
}
