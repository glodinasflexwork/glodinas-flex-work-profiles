import { useState, useEffect, useRef } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import { useNotification } from '../components/NotificationContext';

export default function JobSeekers() {
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
          {/* Step 1: Personal Information */}
          {activeStep === 1 && (
            <div className="space-y-4">
              <h3 className="text-xl font-semibold mb-4">Personal Information</h3>
              
              {/* Form fields for step 1 */}
              {/* ... */}
            </div>
          )}

          {/* Step 2: Professional Details */}
          {activeStep === 2 && (
            <div className="space-y-4">
              <h3 className="text-xl font-semibold mb-4">Professional Details</h3>
              
              {/* Form fields for step 2 */}
              {/* ... */}
            </div>
          )}

          {/* Step 3: Skills & Qualifications */}
          {activeStep === 3 && (
            <div className="space-y-4">
              <h3 className="text-xl font-semibold mb-4">Skills & Qualifications</h3>
              
              {/* Form fields for step 3 */}
              {/* ... */}
            </div>
          )}

          {/* Step 4: Account Setup */}
          {activeStep === 4 && (
            <div className="space-y-4">
              <h3 className="text-xl font-semibold mb-4">Account Setup</h3>
              
              {/* Form fields for step 4 */}
              {/* ... */}
            </div>
          )}

          {/* Navigation buttons */}
          <div className="flex justify-between mt-8">
            {activeStep > 1 && (
              <button
                type="button"
                onClick={prevStep}
                className="btn btn-secondary"
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
