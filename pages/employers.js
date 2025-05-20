import { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import { useTranslation } from 'react-i18next';
import { serverSideTranslations } from '../lib/i18n';
import { useNotification } from '../components/Notification';

export default function Employers() {
  const { t } = useTranslation('common');
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
            <div className="flex-1">Company Info</div>
            <div className="flex-1">Contact Person</div>
            <div className="flex-1">Hiring Needs</div>
            <div className="flex-1">Account Setup</div>
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          {activeStep === 1 && (
            <div className="space-y-4">
              <h3 className="text-xl font-semibold mb-4">Company Information</h3>
              
              <div>
                <label className="block text-gray-700 mb-1">Company Name *</label>
                <input
                  type="text"
                  name="companyName"
                  value={formData.companyName}
                  onChange={handleInputChange}
                  className={`w-full p-2 border rounded ${errors.companyName ? 'border-red-500' : 'border-gray-300'}`}
                />
                {errors.companyName && <p className="text-red-500 text-sm mt-1">{errors.companyName}</p>}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-700 mb-1">Registration Number (KvK) *</label>
                  <input
                    type="text"
                    name="registrationNumber"
                    value={formData.registrationNumber}
                    onChange={handleInputChange}
                    className={`w-full p-2 border rounded ${errors.registrationNumber ? 'border-red-500' : 'border-gray-300'}`}
                  />
                  {errors.registrationNumber && <p className="text-red-500 text-sm mt-1">{errors.registrationNumber}</p>}
                </div>
                <div>
                  <label className="block text-gray-700 mb-1">VAT Number</label>
                  <input
                    type="text"
                    name="vatNumber"
                    value={formData.vatNumber}
                    onChange={handleInputChange}
                    className="w-full p-2 border border-gray-300 rounded"
                  />
                </div>
              </div>

              <div>
                <label className="block text-gray-700 mb-1">Company Website</label>
                <input
                  type="url"
                  name="website"
                  value={formData.website}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded"
                  placeholder="https://www.example.com"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-700 mb-1">Industry/Sector *</label>
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
                  <label className="block text-gray-700 mb-1">Company Size</label>
                  <select
                    name="companySize"
                    value={formData.companySize}
                    onChange={handleInputChange}
                    className="w-full p-2 border border-gray-300 rounded"
                  >
                    <option value="">Select company size</option>
                    {companySizes.map((size) => (
                      <option key={size} value={size}>{size}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-gray-700 mb-1">Company Address *</label>
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  className={`w-full p-2 border rounded ${errors.address ? 'border-red-500' : 'border-gray-300'}`}
                />
                {errors.address && <p className="text-red-500 text-sm mt-1">{errors.address}</p>}
              </div>

              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-gray-700 mb-1">Postal Code *</label>
                  <input
                    type="text"
                    name="postalCode"
                    value={formData.postalCode}
                    onChange={handleInputChange}
                    className={`w-full p-2 border rounded ${errors.postalCode ? 'border-red-500' : 'border-gray-300'}`}
                  />
                  {errors.postalCode && <p className="text-red-500 text-sm mt-1">{errors.postalCode}</p>}
                </div>
                <div>
                  <label className="block text-gray-700 mb-1">City *</label>
                  <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleInputChange}
                    className={`w-full p-2 border rounded ${errors.city ? 'border-red-500' : 'border-gray-300'}`}
                  />
                  {errors.city && <p className="text-red-500 text-sm mt-1">{errors.city}</p>}
                </div>
                <div>
                  <label className="block text-gray-700 mb-1">Country *</label>
                  <input
                    type="text"
                    name="country"
                    value={formData.country}
                    onChange={handleInputChange}
                    className={`w-full p-2 border rounded ${errors.country ? 'border-red-500' : 'border-gray-300'}`}
                  />
                  {errors.country && <p className="text-red-500 text-sm mt-1">{errors.country}</p>}
                </div>
              </div>

              <div>
                <label className="block text-gray-700 mb-1">Company Logo (JPG, PNG - max 2MB)</label>
                <input
                  type="file"
                  className="w-full p-2 border border-gray-300 rounded"
                  accept=".jpg,.jpeg,.png"
                />
              </div>

              <div>
                <label className="block text-gray-700 mb-1">Company Registration Document (PDF - max 5MB)</label>
                <input
                  type="file"
                  className="w-full p-2 border border-gray-300 rounded"
                  accept=".pdf"
                />
              </div>
            </div>
          )}

          {activeStep === 2 && (
            <div className="space-y-4">
              <h3 className="text-xl font-semibold mb-4">Contact Person Details</h3>
              
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
                <label className="block text-gray-700 mb-1">Job Title *</label>
                <input
                  type="text"
                  name="jobTitle"
                  value={formData.jobTitle}
                  onChange={handleInputChange}
                  className={`w-full p-2 border rounded ${errors.jobTitle ? 'border-red-500' : 'border-gray-300'}`}
                />
                {errors.jobTitle && <p className="text-red-500 text-sm mt-1">{errors.jobTitle}</p>}
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
                <label className="block text-gray-700 mb-1">Preferred Language</label>
                <select
                  name="preferredLanguage"
                  value={formData.preferredLanguage}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded"
                >
                  {languages.map((lang) => (
                    <option key={lang} value={lang}>{lang}</option>
                  ))}
                </select>
              </div>
            </div>
          )}

          {activeStep === 3 && (
            <div className="space-y-4">
              <h3 className="text-xl font-semibold mb-4">Hiring Requirements</h3>
              
              <div>
                <label className="block text-gray-700 mb-1">Number of Workers Needed *</label>
                <input
                  type="number"
                  name="workersNeeded"
                  value={formData.workersNeeded}
                  onChange={handleInputChange}
                  min="1"
                  className={`w-full p-2 border rounded ${errors.workersNeeded ? 'border-red-500' : 'border-gray-300'}`}
                />
                {errors.workersNeeded && <p className="text-red-500 text-sm mt-1">{errors.workersNeeded}</p>}
              </div>

              <div>
                <label className="block text-gray-700 mb-1">Job Categories *</label>
                <select
                  name="jobCategories"
                  value={formData.jobCategories}
                  onChange={handleInputChange}
                  multiple
                  size="5"
                  className={`w-full p-2 border rounded ${errors.jobCategories ? 'border-red-500' : 'border-gray-300'}`}
                >
                  {jobCategoriesList.map((category) => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
                <p className="text-gray-500 text-sm mt-1">Hold Ctrl (or Cmd) to select multiple categories</p>
                {errors.jobCategories && <p className="text-red-500 text-sm mt-1">{errors.jobCategories}</p>}
              </div>

              <div>
                <label className="block text-gray-700 mb-1">Required Skills *</label>
                <textarea
                  name="requiredSkills"
                  value={formData.requiredSkills}
                  onChange={handleInputChange}
                  className={`w-full p-2 border rounded ${errors.requiredSkills ? 'border-red-500' : 'border-gray-300'}`}
                  placeholder="List key skills separated by commas"
                  rows="3"
                ></textarea>
                {errors.requiredSkills && <p className="text-red-500 text-sm mt-1">{errors.requiredSkills}</p>}
              </div>

              <div>
                <label className="block text-gray-700 mb-1">Experience Level *</label>
                <select
                  name="experienceLevel"
                  value={formData.experienceLevel}
                  onChange={handleInputChange}
                  className={`w-full p-2 border rounded ${errors.experienceLevel ? 'border-red-500' : 'border-gray-300'}`}
                >
                  <option value="">Select experience level</option>
                  {experienceLevels.map((level) => (
                    <option key={level} value={level}>{level}</option>
                  ))}
                </select>
                {errors.experienceLevel && <p className="text-red-500 text-sm mt-1">{errors.experienceLevel}</p>}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-700 mb-1">Start Date *</label>
                  <input
                    type="date"
                    name="startDate"
                    value={formData.startDate}
                    onChange={handleInputChange}
                    className={`w-full p-2 border rounded ${errors.startDate ? 'border-red-500' : 'border-gray-300'}`}
                  />
                  {errors.startDate && <p className="text-red-500 text-sm mt-1">{errors.startDate}</p>}
                </div>
                <div>
                  <label className="block text-gray-700 mb-1">Duration</label>
                  <select
                    name="duration"
                    value={formData.duration}
                    onChange={handleInputChange}
                    className="w-full p-2 border border-gray-300 rounded"
                  >
                    <option value="">Select duration</option>
                    {durations.map((duration) => (
                      <option key={duration} value={duration}>{duration}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-gray-700 mb-1">Working Hours</label>
                <select
                  name="workingHours"
                  value={formData.workingHours}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded"
                >
                  <option value="">Select working hours</option>
                  {workingHours.map((hours) => (
                    <option key={hours} value={hours}>{hours}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-gray-700 mb-1">Location of Work *</label>
                <input
                  type="text"
                  name="workLocation"
                  value={formData.workLocation}
                  onChange={handleInputChange}
                  className={`w-full p-2 border rounded ${errors.workLocation ? 'border-red-500' : 'border-gray-300'}`}
                  placeholder="City, Country"
                />
                {errors.workLocation && <p className="text-red-500 text-sm mt-1">{errors.workLocation}</p>}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-700 mb-1">Salary Range (Min) €</label>
                  <input
                    type="number"
                    name="salaryMin"
                    value={formData.salaryMin}
                    onChange={handleInputChange}
                    className="w-full p-2 border border-gray-300 rounded"
                    placeholder="Minimum salary"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 mb-1">Salary Range (Max) €</label>
                  <input
                    type="number"
                    name="salaryMax"
                    value={formData.salaryMax}
                    onChange={handleInputChange}
                    className="w-full p-2 border border-gray-300 rounded"
                    placeholder="Maximum salary"
                  />
                </div>
              </div>

              <div>
                <label className="block text-gray-700 mb-1">Special Requirements</label>
                <textarea
                  name="specialRequirements"
                  value={formData.specialRequirements}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded"
                  placeholder="Any additional requirements or information"
                  rows="3"
                ></textarea>
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
                    <span>I would like to receive updates and newsletters (Optional)</span>
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
                {isSubmitting ? 'Submitting...' : 'Create Account'}
              </button>
            )}
          </div>
        </form>
      </div>
    );
  };

  const renderROICalculator = () => {
    return (
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h3 className="text-xl font-semibold mb-4">ROI Calculator</h3>
        <p className="text-gray-600 mb-6">
          Estimate your potential savings with Glodinas Flex Work compared to traditional hiring methods.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <label className="block text-gray-700 mb-1">Current Number of Employees</label>
              <input
                type="number"
                name="currentEmployees"
                value={roiData.currentEmployees}
                onChange={handleROIInputChange}
                min="1"
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>
            
            <div>
              <label className="block text-gray-700 mb-1">Planned New Hires (Next 12 Months)</label>
              <input
                type="number"
                name="plannedHires"
                value={roiData.plannedHires}
                onChange={handleROIInputChange}
                min="1"
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>
            
            <div>
              <label className="block text-gray-700 mb-1">Average Time to Hire (Weeks)</label>
              <input
                type="number"
                name="hiringTimeWeeks"
                value={roiData.hiringTimeWeeks}
                onChange={handleROIInputChange}
                min="1"
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>
            
            <div>
              <label className="block text-gray-700 mb-1">Average Annual Salary (€)</label>
              <input
                type="number"
                name="averageSalary"
                value={roiData.averageSalary}
                onChange={handleROIInputChange}
                min="1000"
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>
            
            <div>
              <label className="block text-gray-700 mb-1">Recruitment Cost (% of Annual Salary)</label>
              <input
                type="number"
                name="recruitmentCostPercentage"
                value={roiData.recruitmentCostPercentage}
                onChange={handleROIInputChange}
                min="1"
                max="100"
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>
            
            <div>
              <label className="block text-gray-700 mb-1">Annual Employee Turnover Rate (%)</label>
              <input
                type="number"
                name="turnoverRate"
                value={roiData.turnoverRate}
                onChange={handleROIInputChange}
                min="0"
                max="100"
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>
            
            <button
              type="button"
              onClick={calculateROI}
              className="btn btn-primary w-full"
            >
              Calculate Savings
            </button>
          </div>
          
          <div className="bg-gray-50 p-6 rounded-lg">
            <h4 className="text-lg font-semibold mb-4">Your Potential Savings</h4>
            
            {roiResults ? (
              <div className="space-y-4">
                <div className="flex justify-between items-center pb-2 border-b border-gray-200">
                  <span className="text-gray-700">Traditional Hiring Cost:</span>
                  <span className="font-semibold">€{roiResults.traditionalCost}</span>
                </div>
                
                <div className="flex justify-between items-center pb-2 border-b border-gray-200">
                  <span className="text-gray-700">Glodinas Flex Work Cost:</span>
                  <span className="font-semibold">€{roiResults.flexWorkCost}</span>
                </div>
                
                <div className="flex justify-between items-center pb-2 border-b border-gray-200">
                  <span className="text-gray-700">Total Savings:</span>
                  <span className="font-semibold text-green-600">€{roiResults.savings}</span>
                </div>
                
                <div className="flex justify-between items-center pb-2 border-b border-gray-200">
                  <span className="text-gray-700">Savings Percentage:</span>
                  <span className="font-semibold text-green-600">{roiResults.savingsPercentage}%</span>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-gray-700">Time Savings:</span>
                  <span className="font-semibold">{roiResults.timeSavings} weeks per hire</span>
                </div>
                
                <div className="mt-6 text-center">
                  <p className="text-gray-600 text-sm">
                    These calculations are estimates based on industry averages and your inputs.
                    Contact us for a detailed analysis specific to your business.
                  </p>
                  <button
                    type="button"
                    onClick={() => setShowSignupForm(true)}
                    className="btn btn-primary mt-4"
                  >
                    Register to Get Started
                  </button>
                </div>
              </div>
            ) : (
              <div className="text-center py-8">
                <p className="text-gray-500">
                  Enter your information and click "Calculate Savings" to see your potential ROI.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };

  return (
    <>
      <Head>
        <title>Employers | Glodinas Flex Work</title>
        <meta name="description" content="Partner with Glodinas Flex Work for flexible, efficient, and cost-effective staffing solutions. Access pre-screened workers and streamline your hiring process." />
      </Head>

      {/* Hero Section */}
      <section className="relative pt-24 pb-16 md:pt-32 md:pb-24 bg-gradient-to-r from-orange-500 to-orange-600 text-white">
        <div className="absolute inset-0 bg-black opacity-20"></div>
        <div className="container relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-shadow-lg">
              Flexible Staffing Solutions for Your Business
            </h1>
            <p className="text-lg md:text-xl mb-8 text-shadow">
              Access pre-screened workers, streamline your hiring process, and reduce administrative burden with our comprehensive staffing services.
            </p>
            <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
              <button
                onClick={() => {
                  setShowSignupForm(true);
                  setShowROICalculator(false);
                  window.scrollTo(0, 0);
                }}
                className="btn bg-white text-orange-600 hover:bg-gray-100"
              >
                Register Your Company
              </button>
              <button
                onClick={() => {
                  setShowROICalculator(true);
                  setShowSignupForm(false);
                  window.scrollTo(0, 0);
                }}
                className="btn bg-orange-600 text-white border border-white hover:bg-orange-700"
              >
                Calculate Your ROI
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Section */}
      <section className="py-16 bg-gray-50">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            {showSignupForm && renderSignupForm()}
            {showROICalculator && renderROICalculator()}
            
            {!showSignupForm && !showROICalculator && (
              <>
                {/* Process Section */}
                <div className="mb-16">
                  <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">How Our Process Works</h2>
                    <p className="text-gray-600 max-w-2xl mx-auto">Our streamlined process connects you with qualified workers quickly and efficiently</p>
                  </div>
                  
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    <div className="bg-white rounded-lg p-6 shadow-sm text-center">
                      <div className="w-16 h-16 bg-orange-100 text-orange-500 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">1</div>
                      <h3 className="text-xl font-bold mb-3">Create Your Account</h3>
                      <p className="text-gray-600">Register with your company details and set up secure login credentials. This takes approximately 5 minutes.</p>
                    </div>
                    
                    <div className="bg-white rounded-lg p-6 shadow-sm text-center">
                      <div className="w-16 h-16 bg-orange-100 text-orange-500 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">2</div>
                      <h3 className="text-xl font-bold mb-3">Specify Your Needs</h3>
                      <p className="text-gray-600">Detail your staffing requirements including number of workers, skills needed, work location, and timeline.</p>
                    </div>
                    
                    <div className="bg-white rounded-lg p-6 shadow-sm text-center">
                      <div className="w-16 h-16 bg-orange-100 text-orange-500 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">3</div>
                      <h3 className="text-xl font-bold mb-3">Account Verification</h3>
                      <p className="text-gray-600">Our team reviews your company information within 24 hours to verify your business details.</p>
                    </div>
                    
                    <div className="bg-white rounded-lg p-6 shadow-sm text-center">
                      <div className="w-16 h-16 bg-orange-100 text-orange-500 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">4</div>
                      <h3 className="text-xl font-bold mb-3">Access Worker Profiles</h3>
                      <p className="text-gray-600">Browse through our database of pre-screened candidates that match your requirements.</p>
                    </div>
                    
                    <div className="bg-white rounded-lg p-6 shadow-sm text-center">
                      <div className="w-16 h-16 bg-orange-100 text-orange-500 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">5</div>
                      <h3 className="text-xl font-bold mb-3">Generate Agreements</h3>
                      <p className="text-gray-600">Select workers and generate digital agreements directly through our platform.</p>
                    </div>
                    
                    <div className="bg-white rounded-lg p-6 shadow-sm text-center">
                      <div className="w-16 h-16 bg-orange-100 text-orange-500 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">6</div>
                      <h3 className="text-xl font-bold mb-3">Finalize Hiring</h3>
                      <p className="text-gray-600">Once agreements are signed, you'll receive confirmation and contact details for your new workers.</p>
                    </div>
                  </div>
                  
                  <div className="text-center mt-8">
                    <button
                      onClick={() => {
                        setShowSignupForm(true);
                        setShowROICalculator(false);
                        window.scrollTo(0, 0);
                      }}
                      className="btn btn-primary"
                    >
                      Get Started Today
                    </button>
                  </div>
                </div>

                {/* Benefits Section */}
                <div className="mb-16">
                  <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">Benefits for Employers</h2>
                  </div>
                  
                  <div className="grid md:grid-cols-2 gap-8">
                    <div className="bg-white rounded-lg p-6 shadow-sm">
                      <div className="text-4xl text-orange-500 mb-4">⚡</div>
                      <h3 className="text-xl font-bold mb-2">Rapid Staffing</h3>
                      <p className="text-gray-600">Access to pre-screened workers within 72 hours, significantly faster than traditional recruitment.</p>
                    </div>
                    
                    <div className="bg-white rounded-lg p-6 shadow-sm">
                      <div className="text-4xl text-orange-500 mb-4">📊</div>
                      <h3 className="text-xl font-bold mb-2">Flexible Solutions</h3>
                      <p className="text-gray-600">Scale your workforce up or down based on business needs without long-term commitments.</p>
                    </div>
                    
                    <div className="bg-white rounded-lg p-6 shadow-sm">
                      <div className="text-4xl text-orange-500 mb-4">⚖️</div>
                      <h3 className="text-xl font-bold mb-2">Compliance Assured</h3>
                      <p className="text-gray-600">All contracts and agreements comply with Dutch and EU regulations, minimizing legal risks.</p>
                    </div>
                    
                    <div className="bg-white rounded-lg p-6 shadow-sm">
                      <div className="text-4xl text-orange-500 mb-4">📝</div>
                      <h3 className="text-xl font-bold mb-2">Administrative Efficiency</h3>
                      <p className="text-gray-600">We handle payroll, taxes, and employment paperwork, reducing your administrative burden.</p>
                    </div>
                    
                    <div className="bg-white rounded-lg p-6 shadow-sm">
                      <div className="text-4xl text-orange-500 mb-4">🌍</div>
                      <h3 className="text-xl font-bold mb-2">Multilingual Support</h3>
                      <p className="text-gray-600">Communication in 5 languages for international businesses and diverse workforces.</p>
                    </div>
                    
                    <div className="bg-white rounded-lg p-6 shadow-sm">
                      <div className="text-4xl text-orange-500 mb-4">✓</div>
                      <h3 className="text-xl font-bold mb-2">Quality Guarantee</h3>
                      <p className="text-gray-600">All workers are vetted and skills-verified, with a replacement guarantee if they don't meet expectations.</p>
                    </div>
                  </div>
                </div>

                {/* Case Studies Section */}
                <div className="mb-16">
                  <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">Success Stories</h2>
                    <p className="text-gray-600 max-w-2xl mx-auto">See how other companies have transformed their workforce strategy with Glodinas Flex Work</p>
                  </div>
                  
                  <div className="mb-6">
                    <div className="flex flex-wrap justify-center gap-2 mb-8">
                      <button
                        onClick={() => setIndustryFilter('all')}
                        className={`px-4 py-2 rounded-full ${industryFilter === 'all' ? 'bg-orange-500 text-white' : 'bg-gray-200 text-gray-700'}`}
                      >
                        All Industries
                      </button>
                      <button
                        onClick={() => setIndustryFilter('logistics')}
                        className={`px-4 py-2 rounded-full ${industryFilter === 'logistics' ? 'bg-orange-500 text-white' : 'bg-gray-200 text-gray-700'}`}
                      >
                        Logistics
                      </button>
                      <button
                        onClick={() => setIndustryFilter('healthcare')}
                        className={`px-4 py-2 rounded-full ${industryFilter === 'healthcare' ? 'bg-orange-500 text-white' : 'bg-gray-200 text-gray-700'}`}
                      >
                        Healthcare
                      </button>
                      <button
                        onClick={() => setIndustryFilter('manufacturing')}
                        className={`px-4 py-2 rounded-full ${industryFilter === 'manufacturing' ? 'bg-orange-500 text-white' : 'bg-gray-200 text-gray-700'}`}
                      >
                        Manufacturing
                      </button>
                    </div>
                    
                    <div className="space-y-8">
                      {filteredCases.map((study) => (
                        <div key={study.id} className="bg-white rounded-lg shadow-sm overflow-hidden">
                          <div className="p-6">
                            <h3 className="text-xl font-bold mb-2">{study.client}</h3>
                            <p className="text-gray-500 mb-4">Industry: {study.industry.charAt(0).toUpperCase() + study.industry.slice(1)}</p>
                            
                            <div className="mb-4">
                              <h4 className="font-semibold mb-1">Challenge:</h4>
                              <p className="text-gray-600">{study.challenge}</p>
                            </div>
                            
                            <div className="mb-4">
                              <h4 className="font-semibold mb-1">Solution:</h4>
                              <p className="text-gray-600">{study.solution}</p>
                            </div>
                            
                            <div className="mb-6">
                              <h4 className="font-semibold mb-3">Results:</h4>
                              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                {Object.entries(study.results).map(([key, value]) => (
                                  <div key={key} className="bg-gray-50 p-3 rounded text-center">
                                    <div className="text-xl font-bold text-orange-600">{value}</div>
                                    <div className="text-gray-600 text-sm">{key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}</div>
                                  </div>
                                ))}
                              </div>
                            </div>
                            
                            <div className="border-t border-gray-100 pt-4">
                              <p className="text-gray-600 italic mb-2">"{study.testimonial}"</p>
                              <p className="text-gray-500 text-sm">{study.contact}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* FAQ Section */}
                <div className="mb-16">
                  <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">Frequently Asked Questions</h2>
                  </div>
                  
                  <div className="space-y-6">
                    <div className="bg-white rounded-lg p-6 shadow-sm">
                      <h3 className="text-xl font-bold mb-2">How quickly can we get workers after signing up?</h3>
                      <p className="text-gray-600">After account verification, you can immediately access worker profiles. Once agreements are signed, workers can typically start within 24-72 hours.</p>
                    </div>
                    
                    <div className="bg-white rounded-lg p-6 shadow-sm">
                      <h3 className="text-xl font-bold mb-2">What types of agreements do you offer?</h3>
                      <p className="text-gray-600">We offer temporary staffing agreements, direct placement contracts, and payrolling services, all customizable to your specific needs.</p>
                    </div>
                    
                    <div className="bg-white rounded-lg p-6 shadow-sm">
                      <h3 className="text-xl font-bold mb-2">How are workers vetted before appearing in the database?</h3>
                      <p className="text-gray-600">All workers undergo identity verification, skills assessment, reference checks, and right-to-work verification before being added to our database.</p>
                    </div>
                    
                    <div className="bg-white rounded-lg p-6 shadow-sm">
                      <h3 className="text-xl font-bold mb-2">What happens if a worker doesn't meet our expectations?</h3>
                      <p className="text-gray-600">We offer a replacement guarantee. If a worker doesn't meet your requirements within the first week, we'll replace them at no additional cost.</p>
                    </div>
                    
                    <div className="bg-white rounded-lg p-6 shadow-sm">
                      <h3 className="text-xl font-bold mb-2">How are the agreements legally binding?</h3>
                      <p className="text-gray-600">Our digital agreements use secure electronic signature technology that complies with eIDAS regulations, making them legally binding in all EU countries.</p>
                    </div>
                    
                    <div className="bg-white rounded-lg p-6 shadow-sm">
                      <h3 className="text-xl font-bold mb-2">What administrative responsibilities do we have as the employer?</h3>
                      <p className="text-gray-600">Minimal. We handle payroll, taxes, insurance, and compliance requirements. You're responsible only for day-to-day management and providing a safe work environment.</p>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-orange-500 text-white">
        <div className="container">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Transform Your Workforce Strategy?</h2>
            <p className="text-lg mb-8">Register today to access our pool of qualified workers and streamline your hiring process.</p>
            <button
              onClick={() => {
                setShowSignupForm(true);
                setShowROICalculator(false);
                window.scrollTo(0, 0);
              }}
              className="btn bg-white text-orange-600 hover:bg-gray-100"
            >
              Get Started Now
            </button>
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
