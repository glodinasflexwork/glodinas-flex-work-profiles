import { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useNotification } from '../components/NotificationContext';

export default function JobSeekers() {
  const router = useRouter();
  const { addNotification } = useNotification();
  const [activeStep, setActiveStep] = useState(1);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const nextStep = () => {
    setActiveStep(prev => Math.min(prev + 1, 4));
  };
  
  const prevStep = () => {
    setActiveStep(prev => Math.max(prev - 1, 1));
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
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
