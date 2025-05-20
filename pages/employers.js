import { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import { useNotification } from '../components/NotificationContext';

export default function Employers() {
  const { addNotification } = useNotification();
  const [activeCase, setActiveCase] = useState(0);
  const [industryFilter, setIndustryFilter] = useState('all');
  const [activeStep, setActiveStep] = useState(1);
  const [showSignupForm, setShowSignupForm] = useState(false);
  const [showROICalculator, setShowROICalculator] = useState(false);
  const [formData, setFormData] = useState({
    // Company Information
    companyName: '',
    registrationNumber: '',
    vatNumber: '',
    website: '',
    industry: '',
    companySize: '',
    address: '',
    postalCode: '',
    city: '',
    country: '',
    
    // Contact Person
    firstName: '',
    lastName: '',
    jobTitle: '',
    email: '',
    phone: '',
    preferredLanguage: 'English',
    
    // Hiring Requirements
    workersNeeded: '',
    jobCategories: [],
    requiredSkills: '',
    experienceLevel: '',
    startDate: '',
    duration: '',
    workingHours: '',
    workLocation: '',
    salaryMin: '',
    salaryMax: '',
    specialRequirements: '',
    
    // Account Creation
    password: '',
    confirmPassword: '',
    termsAccepted: false,
    privacyAccepted: false,
    marketingOptIn: false
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  
  // ROI Calculator state
  const [roiData, setRoiData] = useState({
    currentEmployees: 10,
    plannedHires: 5,
    hiringTimeWeeks: 6,
    averageSalary: 45000,
    recruitmentCostPercentage: 20,
    turnoverRate: 15
  });
  const [roiResults, setRoiResults] = useState(null);

  // Case studies data with metrics
  const caseStudies = [
    {
      id: 1,
      client: 'Logistics International B.V.',
      industry: 'logistics',
      challenge: 'Seasonal workforce fluctuations requiring 40% more staff during peak periods',
      solution: 'Implemented flexible staffing model with on-demand workforce scaling',
      results: {
        costSavings: '32%',
        timeToHire: '72 hours',
        retentionRate: '94%',
        productivityIncrease: '28%'
      },
      testimonial: 'Glodinas Flex Work transformed our staffing approach. We now have the right people at the right time, saving costs while improving productivity.',
      contact: 'Operations Director, Logistics International B.V.'
    },
    {
      id: 2,
      client: 'MedCare Solutions',
      industry: 'healthcare',
      challenge: 'Critical staff shortages during COVID-19 pandemic',
      solution: 'Rapid deployment of qualified healthcare professionals within 24-48 hours',
      results: {
        positionsFilled: '95%',
        timeToHire: '36 hours',
        qualityScore: '4.8/5',
        costSavings: '21%'
      },
      testimonial: 'During the most challenging time in healthcare, Glodinas delivered qualified staff when we needed them most. Their speed and quality of candidates were exceptional.',
      contact: 'HR Director, MedCare Solutions'
    },
    {
      id: 3,
      client: 'TechManufacturing GmbH',
      industry: 'manufacturing',
      challenge: 'Expanding operations requiring 50+ skilled workers within one month',
      solution: 'Comprehensive recruitment and onboarding program with skills verification',
      results: {
        hiringGoalAchieved: '100%',
        timeToProductivity: '2 weeks',
        retentionRate: '91%',
        costPerHire: '€1,200 (18% below industry average)'
      },
      testimonial: 'The quality of candidates and efficiency of the hiring process exceeded our expectations. Glodinas helped us scale quickly without compromising on talent quality.',
      contact: 'Production Manager, TechManufacturing GmbH'
    }
  ];

  // Filter case studies by industry
  const filteredCases = industryFilter === 'all' 
    ? caseStudies 
    : caseStudies.filter(study => study.industry === industryFilter);

  // Simulate notification for ROI calculator
  useEffect(() => {
    const timer = setTimeout(() => {
      addNotification(
        'Try our ROI calculator to see how much you could save with our flexible staffing solutions!',
        'info',
        true,
        10000
      );
    }, 20000);
    
    return () => clearTimeout(timer);
  }, [addNotification]);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    if (type === 'checkbox') {
      setFormData({
        ...formData,
        [name]: checked
      });
    } else if (name === 'jobCategories') {
      // Handle multi-select
      const selectedOptions = Array.from(e.target.selectedOptions, option => option.value);
      setFormData({
        ...formData,
        jobCategories: selectedOptions
      });
    } else {
      setFormData({
        ...formData,
        [name]: value
      });
    }
  };

  const handleROIInputChange = (e) => {
    const { name, value } = e.target;
    setRoiData({
      ...roiData,
      [name]: parseFloat(value) || 0
    });
  };

  const calculateROI = () => {
    // Traditional hiring costs
    const recruitmentCost = (roiData.plannedHires * roiData.averageSalary * (roiData.recruitmentCostPercentage / 100));
    const productivityLoss = (roiData.plannedHires * roiData.averageSalary / 52 * roiData.hiringTimeWeeks);
    const turnoverCost = (roiData.currentEmployees * (roiData.turnoverRate / 100) * roiData.averageSalary * 0.5);
    const traditionalTotal = recruitmentCost + productivityLoss + turnoverCost;
    
    // Glodinas Flex Work costs (estimated)
    const flexWorkFee = (roiData.plannedHires * roiData.averageSalary * 0.15); // 15% fee
    const reducedTurnover = (roiData.currentEmployees * ((roiData.turnoverRate * 0.7) / 100) * roiData.averageSalary * 0.5); // 30% reduction in turnover
    const flexWorkTotal = flexWorkFee + reducedTurnover;
    
    // Savings
    const savings = traditionalTotal - flexWorkTotal;
    const savingsPercentage = (savings / traditionalTotal) * 100;
    
    // Time savings
    const timeSavings = roiData.hiringTimeWeeks - 1; // Assume 1 week with Flex Work
    
    setRoiResults({
      traditionalCost: traditionalTotal.toFixed(2),
      flexWorkCost: flexWorkTotal.toFixed(2),
      savings: savings.toFixed(2),
      savingsPercentage: savingsPercentage.toFixed(1),
      timeSavings: timeSavings
    });
  };

  const validateStep = (step) => {
    let stepErrors = {};
    let isValid = true;

    if (step === 1) {
      // Company Information validation
      if (!formData.companyName.trim()) {
        stepErrors.companyName = 'Company name is required';
        isValid = false;
      }
      if (!formData.registrationNumber.trim()) {
        stepErrors.registrationNumber = 'Registration number is required';
        isValid = false;
      }
      if (!formData.industry) {
        stepErrors.industry = 'Industry is required';
        isValid = false;
      }
      if (!formData.address.trim()) {
        stepErrors.address = 'Address is required';
        isValid = false;
      }
      if (!formData.postalCode.trim()) {
        stepErrors.postalCode = 'Postal code is required';
        isValid = false;
      }
      if (!formData.city.trim()) {
        stepErrors.city = 'City is required';
        isValid = false;
      }
      if (!formData.country.trim()) {
        stepErrors.country = 'Country is required';
        isValid = false;
      }
    } else if (step === 2) {
      // Contact Person validation
      if (!formData.firstName.trim()) {
        stepErrors.firstName = 'First name is required';
        isValid = false;
      }
      if (!formData.lastName.trim()) {
        stepErrors.lastName = 'Last name is required';
        isValid = false;
      }
      if (!formData.jobTitle.trim()) {
        stepErrors.jobTitle = 'Job title is required';
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
    } else if (step === 3) {
      // Hiring Requirements validation
      if (!formData.workersNeeded) {
        stepErrors.workersNeeded = 'Number of workers is required';
        isValid = false;
      }
      if (formData.jobCategories.length === 0) {
        stepErrors.jobCategories = 'At least one job category is required';
        isValid = false;
      }
      if (!formData.requiredSkills.trim()) {
        stepErrors.requiredSkills = 'Required skills are required';
        isValid = false;
      }
      if (!formData.experienceLevel) {
        stepErrors.experienceLevel = 'Experience level is required';
        isValid = false;
      }
      if (!formData.startDate) {
        stepErrors.startDate = 'Start date is required';
        isValid = false;
      }
      if (!formData.workLocation.trim()) {
        stepErrors.workLocation = 'Work location is required';
        isValid = false;
      }
    } else if (step === 4) {
      // Account Creation validation
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateStep(activeStep)) {
      setIsSubmitting(true);
      
      try {
        // Create JSON data object
        const jsonData = {
          companyName: formData.companyName,
          contactPerson: `${formData.firstName} ${formData.lastName}`,
          email: formData.email,
          phone: formData.phone,
          industry: formData.industry,
          jobRequirements: formData.requiredSkills || 'Not specified',
          workersNeeded: formData.workersNeeded || '1',
          location: formData.workLocation || formData.city
        };
        
        console.log('Submitting employer form to API as JSON...');
        
        // Send POST request to the API endpoint with JSON data
        const response = await fetch('/api/employers/submit', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(jsonData),
        });
        
        const result = await response.json();
        
        if (response.ok) {
          console.log('Employer submission successful:', result);
          setFormSubmitted(true);
          addNotification(
            'Your company profile has been submitted successfully! We will review it within 24 hours.',
            'success',
            true,
            10000
          );
        } else {
          console.error('Employer submission failed:', result);
          addNotification(
            `Error: ${result.message || 'Failed to submit your application. Please try again.'}`,
            'error',
            true,
            10000
          );
        }
      } catch (error) {
        console.error('Error submitting employer form:', error);
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
    'Construction & Skilled Trades',
    'Information Technology',
    'Finance & Banking',
    'Education',
    'Other'
  ];

  const companySizes = [
    '1-10 employees',
    '11-50 employees',
    '51-200 employees',
    '201-500 employees',
    '501-1000 employees',
    '1000+ employees'
  ];

  const jobCategoriesList = [
    'Warehouse Staff',
    'Production Workers',
    'Drivers',
    'Administrative Staff',
    'Customer Service',
    'Healthcare Professionals',
    'Skilled Trades',
    'IT Specialists',
    'Sales Representatives',
    'Hospitality Staff',
    'Cleaning Staff',
    'Security Personnel'
  ];

  const experienceLevels = [
    'Entry Level (0-1 years)',
    'Junior (1-3 years)',
    'Mid-Level (3-5 years)',
    'Senior (5+ years)',
    'Mixed Levels'
  ];

  const durations = [
    'Less than 1 month',
    '1-3 months',
    '3-6 months',
    '6-12 months',
    'More than 12 months',
    'Permanent'
  ];

  const workingHours = [
    'Full-time',
    'Part-time',
    'Flexible hours',
    'Shifts',
    'Weekends only'
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

  const renderSignupForm = () => {
    if (formSubmitted) {
      return (
        <div className="bg-white rounded-lg shadow-lg p-8 text-center">
          <div className="text-5xl text-green-500 mb-4">✓</div>
          <h3 className="text-2xl font-bold mb-4">Registration Submitted Successfully!</h3>
          <p className="text-gray-600 mb-6">
            Thank you for registering with Glodinas Flex Work. Our team will review your company information within 24 hours.
            You will receive an email confirmation once your account is approved.
          </p>
          <p className="text-gray-600 mb-6">
            Next steps:
          </p>
          <ol className="text-left max-w-md mx-auto mb-8 space-y-2">
            <li className="flex items-start">
              <span className="flex-shrink-0 flex items-center justify-center w-6 h-6 rounded-full bg-orange-100 text-orange-500 mr-2">1</span>
              <span>Our team reviews your company information (within 24 hours)</span>
            </li>
            <li className="flex items-start">
              <span className="flex-shrink-0 flex items-center justify-center w-6 h-6 rounded-full bg-orange-100 text-orange-500 mr-2">2</span>
              <span>Your account is activated, giving you access to worker profiles</span>
            </li>
            <li className="flex items-start">
              <span className="flex-shrink-0 flex items-center justify-center w-6 h-6 rounded-full bg-orange-100 text-orange-500 mr-2">3</span>
              <span>Select suitable candidates and generate agreements</span>
            </li>
            <li className="flex items-start">
              <span className="flex-shrink-0 flex items-center justify-center w-6 h-6 rounded-full bg-orange-100 text-orange-500 mr-2">4</span>
              <span>Finalize the hiring process and welcome your new workers</span>
            </li>
          </ol>
          <Link href="/">
            <a className="btn btn-primary">Return to Homepage</a>
          </Link>
        </div>
      );
    }

    // Form content would go here
    return (
      <div className="bg-white rounded-lg shadow-lg p-6">
        {/* Form content */}
      </div>
    );
  };

  return (
    <>
      <Head>
        <title>For Employers | Glodinas Flex Work</title>
        <meta name="description" content="Find qualified staff for your business with Glodinas Flex Work. Our flexible staffing solutions help you scale your workforce efficiently." />
      </Head>

      {/* Hero Section */}
      <section className="relative pt-24 pb-16 md:pt-32 md:pb-24 bg-gradient-to-r from-orange-500 to-orange-600 text-white">
        <div className="absolute inset-0 bg-black opacity-20"></div>
        <div className="container relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-shadow-lg">
              Find Qualified Staff for Your Business
            </h1>
            <p className="text-lg md:text-xl mb-8 text-shadow">
              Our flexible staffing solutions help you scale your workforce efficiently
            </p>
            <button 
              onClick={() => setShowSignupForm(true)} 
              className="btn bg-white text-orange-600 hover:bg-gray-100"
            >
              Register Your Company
            </button>
          </div>
        </div>
      </section>

      {/* Main content */}
      <div className="py-12">
        <div className="container">
          {showSignupForm ? (
            renderSignupForm()
          ) : (
            <>
              {/* Content when signup form is not shown */}
            </>
          )}
        </div>
      </div>
    </>
  );
}
