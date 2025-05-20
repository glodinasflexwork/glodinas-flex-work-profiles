import { useState, useEffect, useRef } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import { useTranslation } from 'react-i18next';
import { serverSideTranslations } from '../lib/i18n';
import { useNotification } from '../components/Notification';

export default function JobSeekers() {
  const { t } = useTranslation('common');
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
      addNotification(
        'New jobs matching your profile have been added!',
        'info',
        true,
        8000
      );
    }, 10000);
    
    return () => clearTimeout(timer);
  }, [addNotification]);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const validateStep = (step) => {
    let stepErrors = {};
    let isValid = true;

    if (step === 1) {
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
      if (!formData.location.trim()) {
        stepErrors.location = 'Location is required';
        isValid = false;
      }
    } else if (step === 2) {
      if (!formData.experience) {
        stepErrors.experience = 'Experience is required';
        isValid = false;
      }
      if (!formData.industry) {
        stepErrors.industry = 'Industry preference is required';
        isValid = false;
      }
      if (!formData.jobType) {
        stepErrors.jobType = 'Job type preference is required';
        isValid = false;
      }
      if (!formData.availability) {
        stepErrors.availability = 'Availability is required';
        isValid = false;
      }
      if (!formData.workPermit) {
        stepErrors.workPermit = 'Work permit status is required';
        isValid = false;
      }
    } else if (step === 3) {
      if (!formData.skills.trim()) {
        stepErrors.skills = 'Skills are required';
        isValid = false;
      }
      if (!formData.education) {
        stepErrors.education = 'Education level is required';
        isValid = false;
      }
    } else if (step === 4) {
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
      if (!formData.termsAccepted) {
        stepErrors.termsAccepted = 'You must accept the Terms & Conditions';
        isValid = false;
      }
      if (!formData.privacyAccepted) {
        stepErrors.privacyAccepted = 'You must accept the Privacy Policy';
        isValid = false;
      }
    }

    setErrors(stepErrors);
    return isValid;
  };

  const nextStep = () => {
    if (validateStep(activeStep)) {
      setActiveStep(activeStep + 1);
      window.scrollTo(0, 0);
    }
  };

  const prevStep = () => {
    setActiveStep(activeStep - 1);
    window.scrollTo(0, 0);
  };

  // File input references
  const cvInputRef = useRef(null);
  const photoInputRef = useRef(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateStep(activeStep)) {
      setIsSubmitting(true);
      
      try {
        // Create JSON data object instead of FormData
        const jsonData = {
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          phone: formData.phone,
          experience: formData.experience,
          skills: formData.skills,
          availability: formData.availability,
          preferredLocation: formData.location
        };
        
        // Note: File uploads are temporarily disabled
        console.log('Submitting job seeker form to API as JSON...');
        
        // Send POST request to the API endpoint with JSON data
        const response = await fetch('/api/job-seekers/submit', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(jsonData),
        });
        
        const result = await response.json();
        
        if (response.ok) {
          console.log('Job seeker submission successful:', result);
          setFormSubmitted(true);
          addNotification(
            'Your profile has been submitted successfully! We will review it within 24 hours.',
            'success',
            true,
            10000
          );
        } else {
          console.error('Job seeker submission failed:', result);
          addNotification(
            `Error: ${result.message || 'Failed to submit your application. Please try again.'}`,
            'error',
            true,
            10000
          );
        }
      } catch (error) {
        console.error('Error submitting job seeker form:', error);
        addNotification(
          'An error occurred while submitting your application. Please try again.',
          'error',
          true,
          10000
        );
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  const industries = [
    'Logistics & Supply Chain',
    'Manufacturing & Production',
    'Healthcare & Medical',
    'Hospitality & Tourism',
    'Retail & Customer Service',
    'Construction & Skilled Trades'
  ];

  const jobTypes = [
    'Full-time',
    'Part-time',
    'Temporary',
    'Contract'
  ];

  const availabilityOptions = [
    'Immediate',
    '2 weeks',
    '1 month',
    'Other'
  ];

  const workPermitOptions = [
    'EU Citizen',
    'Work Permit Holder',
    'Need Sponsorship'
  ];

  const educationLevels = [
    'High School',
    'Vocational Training',
    'Bachelor\'s Degree',
    'Master\'s Degree',
    'PhD',
    'Other'
  ];

  const languages = [
    'Dutch',
    'English',
    'Polish',
    'Romanian',
    'Bulgarian',
    'German',
    'French',
    'Spanish'
  ];

  const renderForm = () => {
    if (formSubmitted) {
      return (
        <div className="bg-white rounded-lg shadow-lg p-8 text-center">
          <div className="text-5xl text-green-500 mb-4">✓</div>
          <h3 className="text-2xl font-bold mb-4">Application Submitted Successfully!</h3>
          <p className="text-gray-600 mb-6">
            Thank you for registering with Glodinas Flex Work. Our team will review your profile within 24 hours.
            You will receive an email confirmation once your profile is approved.
          </p>
          <p className="text-gray-600 mb-6">
            Next steps:
          </p>
          <ol className="text-left max-w-md mx-auto mb-8 space-y-2">
            <li className="flex items-start">
              <span className="flex-shrink-0 flex items-center justify-center w-6 h-6 rounded-full bg-orange-100 text-orange-500 mr-2">1</span>
              <span>Our team reviews your profile (within 24 hours)</span>
            </li>
            <li className="flex items-start">
              <span className="flex-shrink-0 flex items-center justify-center w-6 h-6 rounded-full bg-orange-100 text-orange-500 mr-2">2</span>
              <span>Your profile is matched with suitable job openings</span>
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
          {activeStep === 1 && (
            <div className="space-y-4">
              <h3 className="text-xl font-semibold mb-4">Personal Information</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-700 mb-1">First Name *</label>
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    className={`w-full p-2 border rounded ${errors.firstName ? 'border-red-500' : 'border-gray-300'}`}
                  />
                  {errors.firstName && <p className="text-red-500 text-sm mt-1">{errors.firstName}</p>}
                </div>
                <div>
                  <label className="block text-gray-700 mb-1">Last Name *</label>
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    className={`w-full p-2 border rounded ${errors.lastName ? 'border-red-500' : 'border-gray-300'}`}
                  />
                  {errors.lastName && <p className="text-red-500 text-sm mt-1">{errors.lastName}</p>}
                </div>
              </div>

              <div>
                <label className="block text-gray-700 mb-1">Email Address *</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className={`w-full p-2 border rounded ${errors.email ? 'border-red-500' : 'border-gray-300'}`}
                />
                {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
              </div>

              <div>
                <label className="block text-gray-700 mb-1">Phone Number *</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className={`w-full p-2 border rounded ${errors.phone ? 'border-red-500' : 'border-gray-300'}`}
                  placeholder="+31 6 12345678"
                />
                {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
              </div>

              <div>
                <label className="block text-gray-700 mb-1">Current Location *</label>
                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleInputChange}
                  className={`w-full p-2 border rounded ${errors.location ? 'border-red-500' : 'border-gray-300'}`}
                  placeholder="City, Country"
                />
                {errors.location && <p className="text-red-500 text-sm mt-1">{errors.location}</p>}
              </div>

              <div>
                <label className="block text-gray-700 mb-1">Preferred Language</label>
                <select
                  name="language"
                  value={formData.language}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded"
                >
                  {languages.map((lang) => (
                    <option key={lang} value={lang}>{lang}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-gray-700 mb-1">Upload CV/Resume (PDF, DOC, DOCX - max 5MB)</label>
                <input
                  type="file"
                  ref={cvInputRef}
                  className="w-full p-2 border border-gray-300 rounded"
                  accept=".pdf,.doc,.docx"
                />
              </div>

              <div>
                <label className="block text-gray-700 mb-1">Upload Photo (Optional - JPG, PNG - max 2MB)</label>
                <input
                  type="file"
                  ref={photoInputRef}
                  className="w-full p-2 border border-gray-300 rounded"
                  accept=".jpg,.jpeg,.png"
                />
              </div>
            </div>
          )}

          {activeStep === 2 && (
            <div className="space-y-4">
              <h3 className="text-xl font-semibold mb-4">Professional Details</h3>
              
              <div>
                <label className="block text-gray-700 mb-1">Years of Experience *</label>
                <select
                  name="experience"
                  value={formData.experience}
                  onChange={handleInputChange}
                  className={`w-full p-2 border rounded ${errors.experience ? 'border-red-500' : 'border-gray-300'}`}
                >
                  <option value="">Select experience</option>
                  <option value="0-1">Less than 1 year</option>
                  <option value="1-3">1-3 years</option>
                  <option value="3-5">3-5 years</option>
                  <option value="5-10">5-10 years</option>
                  <option value="10+">10+ years</option>
                </select>
                {errors.experience && <p className="text-red-500 text-sm mt-1">{errors.experience}</p>}
              </div>

              <div>
                <label className="block text-gray-700 mb-1">Industry Preference *</label>
                <select
                  name="industry"
                  value={formData.industry}
                  onChange={handleInputChange}
                  className={`w-full p-2 border rounded ${errors.industry ? 'border-red-500' : 'border-gray-300'}`}
                >
                  <option value="">Select industry</option>
                  {industries.map((industry) => (
                    <option key={industry} value={industry}>{industry}</option>
                  ))}
                </select>
                {errors.industry && <p className="text-red-500 text-sm mt-1">{errors.industry}</p>}
              </div>

              <div>
                <label className="block text-gray-700 mb-1">Job Type Preference *</label>
                <select
                  name="jobType"
                  value={formData.jobType}
                  onChange={handleInputChange}
                  className={`w-full p-2 border rounded ${errors.jobType ? 'border-red-500' : 'border-gray-300'}`}
                >
                  <option value="">Select job type</option>
                  {jobTypes.map((type) => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
                {errors.jobType && <p className="text-red-500 text-sm mt-1">{errors.jobType}</p>}
              </div>

              <div>
                <label className="block text-gray-700 mb-1">Availability *</label>
                <select
                  name="availability"
                  value={formData.availability}
                  onChange={handleInputChange}
                  className={`w-full p-2 border rounded ${errors.availability ? 'border-red-500' : 'border-gray-300'}`}
                >
                  <option value="">Select availability</option>
                  {availabilityOptions.map((option) => (
                    <option key={option} value={option}>{option}</option>
                  ))}
                </select>
                {errors.availability && <p className="text-red-500 text-sm mt-1">{errors.availability}</p>}
              </div>

              <div>
                <label className="block text-gray-700 mb-1">Willing to Relocate</label>
                <div className="flex space-x-4">
                  <label className="inline-flex items-center">
                    <input
                      type="radio"
                      name="relocate"
                      value="Yes"
                      checked={formData.relocate === 'Yes'}
                      onChange={handleInputChange}
                      className="mr-2"
                    />
                    Yes
                  </label>
                  <label className="inline-flex items-center">
                    <input
                      type="radio"
                      name="relocate"
                      value="No"
                      checked={formData.relocate === 'No'}
                      onChange={handleInputChange}
                      className="mr-2"
                    />
                    No
                  </label>
                </div>
              </div>

              <div>
                <label className="block text-gray-700 mb-1">Work Permit Status *</label>
                <select
                  name="workPermit"
                  value={formData.workPermit}
                  onChange={handleInputChange}
                  className={`w-full p-2 border rounded ${errors.workPermit ? 'border-red-500' : 'border-gray-300'}`}
                >
                  <option value="">Select status</option>
                  {workPermitOptions.map((option) => (
                    <option key={option} value={option}>{option}</option>
                  ))}
                </select>
                {errors.workPermit && <p className="text-red-500 text-sm mt-1">{errors.workPermit}</p>}
              </div>
            </div>
          )}

          {activeStep === 3 && (
            <div className="space-y-4">
              <h3 className="text-xl font-semibold mb-4">Skills & Qualifications</h3>
              
              <div>
                <label className="block text-gray-700 mb-1">Primary Skills *</label>
                <textarea
                  name="skills"
                  value={formData.skills}
                  onChange={handleInputChange}
                  className={`w-full p-2 border rounded ${errors.skills ? 'border-red-500' : 'border-gray-300'}`}
                  placeholder="List your key skills separated by commas"
                  rows="3"
                ></textarea>
                {errors.skills && <p className="text-red-500 text-sm mt-1">{errors.skills}</p>}
              </div>

              <div>
                <label className="block text-gray-700 mb-1">Languages Spoken</label>
                <textarea
                  name="languages"
                  value={formData.languages}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded"
                  placeholder="E.g., English (Fluent), Dutch (Basic)"
                  rows="2"
                ></textarea>
              </div>

              <div>
                <label className="block text-gray-700 mb-1">Certifications/Licenses</label>
                <textarea
                  name="certifications"
                  className="w-full p-2 border border-gray-300 rounded"
                  placeholder="List any relevant certifications or licenses"
                  rows="2"
                ></textarea>
              </div>

              <div>
                <label className="block text-gray-700 mb-1">Education Level *</label>
                <select
                  name="education"
                  value={formData.education}
                  onChange={handleInputChange}
                  className={`w-full p-2 border rounded ${errors.education ? 'border-red-500' : 'border-gray-300'}`}
                >
                  <option value="">Select education level</option>
                  {educationLevels.map((level) => (
                    <option key={level} value={level}>{level}</option>
                  ))}
                </select>
                {errors.education && <p className="text-red-500 text-sm mt-1">{errors.education}</p>}
              </div>
            </div>
          )}

          {activeStep === 4 && (
            <div className="space-y-4">
              <h3 className="text-xl font-semibold mb-4">Account Creation</h3>
              
              <div>
                <label className="block text-gray-700 mb-1">Password *</label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className={`w-full p-2 border rounded ${errors.password ? 'border-red-500' : 'border-gray-300'}`}
                />
                {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
                <p className="text-gray-500 text-sm mt-1">Must be at least 8 characters</p>
              </div>

              <div>
                <label className="block text-gray-700 mb-1">Confirm Password *</label>
                <input
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  className={`w-full p-2 border rounded ${errors.confirmPassword ? 'border-red-500' : 'border-gray-300'}`}
                />
                {errors.confirmPassword && <p className="text-red-500 text-sm mt-1">{errors.confirmPassword}</p>}
              </div>

              <div className="space-y-2 mt-4">
                <div>
                  <label className="inline-flex items-center">
                    <input
                      type="checkbox"
                      name="termsAccepted"
                      checked={formData.termsAccepted}
                      onChange={handleInputChange}
                      className={`mr-2 ${errors.termsAccepted ? 'border-red-500' : ''}`}
                    />
                    <span>I accept the <Link href="/terms"><a className="text-orange-500 hover:underline">Terms & Conditions</a></Link> *</span>
                  </label>
                  {errors.termsAccepted && <p className="text-red-500 text-sm mt-1">{errors.termsAccepted}</p>}
                </div>

                <div>
                  <label className="inline-flex items-center">
                    <input
                      type="checkbox"
                      name="privacyAccepted"
                      checked={formData.privacyAccepted}
                      onChange={handleInputChange}
                      className={`mr-2 ${errors.privacyAccepted ? 'border-red-500' : ''}`}
                    />
                    <span>I accept the <Link href="/privacy-policy"><a className="text-orange-500 hover:underline">Privacy Policy</a></Link> *</span>
                  </label>
                  {errors.privacyAccepted && <p className="text-red-500 text-sm mt-1">{errors.privacyAccepted}</p>}
                </div>

                <div>
                  <label className="inline-flex items-center">
                    <input
                      type="checkbox"
                      name="marketingOptIn"
                      checked={formData.marketingOptIn}
                      onChange={handleInputChange}
                      className="mr-2"
                    />
                    <span>I would like to receive job alerts and newsletters (Optional)</span>
                  </label>
                </div>
              </div>
            </div>
          )}

          <div className="mt-8 flex justify-between">
            {activeStep > 1 && (
              <button
                type="button"
                onClick={prevStep}
                className="btn btn-outline"
              >
                Previous
              </button>
            )}
            {activeStep < 4 ? (
              <button
                type="button"
                onClick={nextStep}
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
        <meta name="description" content="Find your next job with Glodinas Flex Work. Register today and get matched with top employers across Europe." />
      </Head>

      {/* Hero Section */}
      <section className="relative pt-24 pb-16 md:pt-32 md:pb-24 bg-gradient-to-r from-orange-500 to-orange-600 text-white">
        <div className="absolute inset-0 bg-black opacity-20"></div>
        <div className="container relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-shadow-lg">
              Find Your Next Career Opportunity
            </h1>
            <p className="text-lg md:text-xl mb-8 text-shadow">
              Register today and get matched with top employers across Europe. Our streamlined process makes job hunting simple and efficient.
            </p>
          </div>
        </div>
      </section>

      {/* Registration Form Section */}
      <section className="py-16 bg-gray-50">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            {renderForm()}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16 bg-white">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">How Our Process Works</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">Our streamlined application process connects you with the right opportunities quickly and efficiently</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-gray-50 rounded-lg p-6 text-center">
              <div className="w-16 h-16 bg-orange-100 text-orange-500 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">1</div>
              <h3 className="text-xl font-bold mb-3">Create Your Account</h3>
              <p className="text-gray-600">Register with basic information and set up your login credentials. This takes just 2 minutes and gives you access to our job seeker portal.</p>
            </div>
            
            <div className="bg-gray-50 rounded-lg p-6 text-center">
              <div className="w-16 h-16 bg-orange-100 text-orange-500 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">2</div>
              <h3 className="text-xl font-bold mb-3">Complete Your Profile</h3>
              <p className="text-gray-600">Fill in your professional details, upload your CV, and highlight your skills and experience. The more complete your profile, the better we can match you.</p>
            </div>
            
            <div className="bg-gray-50 rounded-lg p-6 text-center">
              <div className="w-16 h-16 bg-orange-100 text-orange-500 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">3</div>
              <h3 className="text-xl font-bold mb-3">Verification & Approval</h3>
              <p className="text-gray-600">Our team reviews your profile within 24 hours to verify your information and ensure your qualifications meet our standards.</p>
            </div>
            
            <div className="bg-gray-50 rounded-lg p-6 text-center">
              <div className="w-16 h-16 bg-orange-100 text-orange-500 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">4</div>
              <h3 className="text-xl font-bold mb-3">Employer Matching</h3>
              <p className="text-gray-600">Our advanced matching system automatically connects your profile with suitable job openings from our employer partners.</p>
            </div>
            
            <div className="bg-gray-50 rounded-lg p-6 text-center">
              <div className="w-16 h-16 bg-orange-100 text-orange-500 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">5</div>
              <h3 className="text-xl font-bold mb-3">Job Offers & Notifications</h3>
              <p className="text-gray-600">When an employer selects your profile, you'll receive an automatic notification with job details. Review and accept or decline directly.</p>
            </div>
            
            <div className="bg-gray-50 rounded-lg p-6 text-center">
              <div className="w-16 h-16 bg-orange-100 text-orange-500 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">6</div>
              <h3 className="text-xl font-bold mb-3">Ready to Work Confirmation</h3>
              <p className="text-gray-600">Once you accept a position, you'll receive an automatic "Ready to Work" confirmation with all necessary details about your start date.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-16 bg-gray-50">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Choose Our Process</h2>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <div className="text-4xl text-orange-500 mb-4">⚡</div>
              <h3 className="text-xl font-bold mb-2">Fast Placement</h3>
              <p className="text-gray-600">72-hour average placement time for qualified candidates, getting you to work quickly.</p>
            </div>
            
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <div className="text-4xl text-orange-500 mb-4">🏢</div>
              <h3 className="text-xl font-bold mb-2">Employer Network</h3>
              <p className="text-gray-600">Direct access to hundreds of vetted employers across Europe in various industries.</p>
            </div>
            
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <div className="text-4xl text-orange-500 mb-4">🌍</div>
              <h3 className="text-xl font-bold mb-2">Multilingual Support</h3>
              <p className="text-gray-600">Assistance available in 5 languages throughout the process for international job seekers.</p>
            </div>
            
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <div className="text-4xl text-orange-500 mb-4">📝</div>
              <h3 className="text-xl font-bold mb-2">Paperwork Handling</h3>
              <p className="text-gray-600">We manage all employment documentation and contracts, making the process hassle-free.</p>
            </div>
            
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <div className="text-4xl text-orange-500 mb-4">👥</div>
              <h3 className="text-xl font-bold mb-2">Ongoing Support</h3>
              <p className="text-gray-600">Dedicated advisors to help with any questions or concerns throughout your employment.</p>
            </div>
            
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <div className="text-4xl text-orange-500 mb-4">🔒</div>
              <h3 className="text-xl font-bold mb-2">Data Security</h3>
              <p className="text-gray-600">GDPR-compliant processes ensure your personal information is secure and protected.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 bg-white">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Success Stories</h2>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="bg-gray-50 rounded-lg p-6">
              <div className="text-5xl text-orange-300 opacity-50 mb-2">"</div>
              <p className="text-gray-700 italic mb-4">I created my profile on Tuesday, received a job match on Wednesday, and started working the following Monday. The process was incredibly smooth and efficient.</p>
              <p className="font-semibold">- Warehouse Specialist, Rotterdam</p>
            </div>
            
            <div className="bg-gray-50 rounded-lg p-6">
              <div className="text-5xl text-orange-300 opacity-50 mb-2">"</div>
              <p className="text-gray-700 italic mb-4">As someone new to the Netherlands, I appreciated the multilingual support and how the platform guided me through each step of the application process.</p>
              <p className="font-semibold">- Production Worker, Amsterdam</p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-gray-50">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Frequently Asked Questions</h2>
          </div>
          
          <div className="max-w-3xl mx-auto space-y-6">
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <h3 className="text-xl font-bold mb-2">How long does the application process take?</h3>
              <p className="text-gray-600">From registration to job placement typically takes 2-7 days, depending on your qualifications and current market demand.</p>
            </div>
            
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <h3 className="text-xl font-bold mb-2">Do I need to create a new application for each job?</h3>
              <p className="text-gray-600">No, your single profile is automatically matched with all suitable positions in our database.</p>
            </div>
            
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <h3 className="text-xl font-bold mb-2">How will I know when an employer is interested?</h3>
              <p className="text-gray-600">You'll receive immediate notifications via email and SMS when an employer selects your profile.</p>
            </div>
            
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <h3 className="text-xl font-bold mb-2">What happens after I receive the "Ready to Work" confirmation?</h3>
              <p className="text-gray-600">The confirmation includes all details about your start date, location, required documents, and contact information for your workplace supervisor.</p>
            </div>
            
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <h3 className="text-xl font-bold mb-2">Can I update my profile after submission?</h3>
              <p className="text-gray-600">Yes, you can update your profile anytime through your account dashboard.</p>
            </div>
            
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <h3 className="text-xl font-bold mb-2">Is my personal information secure?</h3>
              <p className="text-gray-600">We follow strict GDPR compliance protocols and only share relevant professional information with potential employers.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-orange-500 text-white">
        <div className="container">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Start Your New Career?</h2>
            <p className="text-lg mb-8">Complete your profile today and get matched with top employers across Europe.</p>
            <a href="#top" className="btn bg-white text-orange-600 hover:bg-gray-100">Register Now</a>
          </div>
        </div>
      </section>
    </>
  );
}

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common'])),
    },
  };
}
