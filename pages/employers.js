import { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useNotification } from '../components/NotificationContext';

export default function Employers() {
  const router = useRouter();
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
    languages: [],
    
    // Account Setup
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
    currentStaffCount: 10,
    plannedHires: 5,
    avgSalary: 3000,
    hiringTimeWeeks: 8,
    turnoverRate: 20,
    productivityLoss: 30
  });
  const [roiResults, setRoiResults] = useState(null);
  
  // Case studies
  const caseStudies = [
    {
      title: "Manufacturing Excellence",
      industry: "manufacturing",
      company: "EuroTech Manufacturing",
      challenge: "Needed 50 skilled production workers within 2 weeks for a new product line",
      solution: "Rapid recruitment and onboarding of pre-vetted candidates with manufacturing experience",
      results: "Full staffing achieved in 10 days, production targets met with 98% efficiency",
      testimonial: "Glodinas delivered qualified staff faster than we thought possible. Their workers integrated seamlessly with our existing team.",
      image: "/images/case-manufacturing.jpg"
    },
    {
      title: "Logistics Expansion",
      industry: "logistics",
      company: "FastTrack Logistics",
      challenge: "Seasonal demand required 200+ warehouse staff across multiple locations",
      solution: "Coordinated multi-site recruitment with flexible contracts and shift patterns",
      results: "100% staffing levels maintained throughout peak season, overtime reduced by 35%",
      testimonial: "The quality of workers and the speed of deployment gave us a competitive edge during our busiest period.",
      image: "/images/case-logistics.jpg"
    },
    {
      title: "Healthcare Support",
      industry: "healthcare",
      company: "CarePlus Facilities",
      challenge: "Urgent need for 30 qualified care assistants with specific certifications",
      solution: "Targeted recruitment of certified healthcare workers with additional training provided",
      results: "All positions filled with fully qualified staff, patient satisfaction increased by 22%",
      testimonial: "Finding qualified healthcare workers is always challenging, but Glodinas delivered exceptional candidates who truly care about their work.",
      image: "/images/case-healthcare.jpg"
    },
    {
      title: "Hospitality Staffing",
      industry: "hospitality",
      company: "Grand Hotel Group",
      challenge: "Opening three new hotels simultaneously requiring 120+ staff across all departments",
      solution: "Comprehensive recruitment campaign with multi-lingual support and hospitality-specific assessments",
      results: "Successful opening of all three properties on schedule with fully trained staff",
      testimonial: "The multilingual capabilities of Glodinas' team made it possible to build our diverse workforce quickly and efficiently.",
      image: "/images/case-hospitality.jpg"
    }
  ];
  
  // Industry options
  const industries = [
    'Logistics & Transportation',
    'Manufacturing',
    'Healthcare',
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
  
  // Auto-rotate case studies
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveCase(prev => (prev + 1) % caseStudies.length);
    }, 8000);
    
    return () => clearInterval(interval);
  }, [caseStudies.length]);
  
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
  
  const handleMultiSelect = (e, field) => {
    const value = e.target.value;
    setFormData(prev => {
      const currentValues = [...prev[field]];
      if (currentValues.includes(value)) {
        return {
          ...prev,
          [field]: currentValues.filter(item => item !== value)
        };
      } else {
        return {
          ...prev,
          [field]: [...currentValues, value]
        };
      }
    });
  };
  
  const validateStep = () => {
    const newErrors = {};
    
    switch (activeStep) {
      case 1:
        if (!formData.companyName.trim()) newErrors.companyName = 'Company name is required';
        if (!formData.registrationNumber.trim()) newErrors.registrationNumber = 'Registration number is required';
        if (!formData.industry) newErrors.industry = 'Industry is required';
        break;
      case 2:
        if (!formData.firstName.trim()) newErrors.firstName = 'First name is required';
        if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required';
        if (!formData.email.trim()) newErrors.email = 'Email is required';
        else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email is invalid';
        if (!formData.phone.trim()) newErrors.phone = 'Phone number is required';
        break;
      case 3:
        if (!formData.workersNeeded) newErrors.workersNeeded = 'Number of workers is required';
        if (formData.jobCategories.length === 0) newErrors.jobCategories = 'At least one job category is required';
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
      addNotification('Your company registration has been submitted successfully!', 'success');
    }, 1500);
  };
  
  const calculateROI = () => {
    const {
      currentStaffCount,
      plannedHires,
      avgSalary,
      hiringTimeWeeks,
      turnoverRate,
      productivityLoss
    } = roiData;
    
    // Traditional hiring costs
    const traditionalCostPerHire = avgSalary * 0.25; // 25% of annual salary
    const traditionalTimeToHire = hiringTimeWeeks; // weeks
    const traditionalProductivityRamp = 8; // weeks
    const traditionalTurnover = turnoverRate / 100;
    
    // Glodinas costs
    const glodinasCostPerHire = avgSalary * 0.18; // 18% of annual salary
    const glodinasTimeToHire = hiringTimeWeeks * 0.5; // 50% faster
    const glodinasProductivityRamp = 4; // weeks
    const glodinasTurnover = (turnoverRate / 100) * 0.7; // 30% lower turnover
    
    // Calculate costs
    const traditionalHiringCost = traditionalCostPerHire * plannedHires;
    const glodinasHiringCost = glodinasCostPerHire * plannedHires;
    
    // Calculate productivity loss
    const weeklyProductivity = avgSalary / 4; // weekly productivity value
    const traditionalProductivityLoss = (traditionalTimeToHire + traditionalProductivityRamp) * weeklyProductivity * plannedHires * (productivityLoss / 100);
    const glodinasProductivityLoss = (glodinasTimeToHire + glodinasProductivityRamp) * weeklyProductivity * plannedHires * (productivityLoss / 100);
    
    // Calculate turnover costs
    const traditionalTurnoverCost = traditionalTurnover * plannedHires * traditionalCostPerHire;
    const glodinasTurnoverCost = glodinasTurnover * plannedHires * glodinasCostPerHire;
    
    // Total costs
    const traditionalTotalCost = traditionalHiringCost + traditionalProductivityLoss + traditionalTurnoverCost;
    const glodinasTotalCost = glodinasHiringCost + glodinasProductivityLoss + glodinasTurnoverCost;
    
    // Savings
    const savings = traditionalTotalCost - glodinasTotalCost;
    const savingsPercentage = (savings / traditionalTotalCost) * 100;
    
    // Time savings
    const timeSavingsWeeks = (traditionalTimeToHire - glodinasTimeToHire) * plannedHires;
    
    setRoiResults({
      traditionalCost: traditionalTotalCost.toFixed(0),
      glodinasCost: glodinasTotalCost.toFixed(0),
      savings: savings.toFixed(0),
      savingsPercentage: savingsPercentage.toFixed(1),
      timeSavingsWeeks: timeSavingsWeeks.toFixed(1)
    });
  };
  
  const handleRoiChange = (e) => {
    const { name, value } = e.target;
    setRoiData(prev => ({
      ...prev,
      [name]: Number(value)
    }));
  };
  
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
          {/* Step 1: Company Information */}
          {activeStep === 1 && (
            <div className="space-y-4">
              <h3 className="text-xl font-semibold mb-4">Company Information</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Company Name *</label>
                  <input
                    type="text"
                    name="companyName"
                    value={formData.companyName}
                    onChange={handleChange}
                    className={`form-input ${errors.companyName ? 'border-red-500' : ''}`}
                  />
                  {errors.companyName && <p className="text-red-500 text-xs mt-1">{errors.companyName}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Registration Number *</label>
                  <input
                    type="text"
                    name="registrationNumber"
                    value={formData.registrationNumber}
                    onChange={handleChange}
                    className={`form-input ${errors.registrationNumber ? 'border-red-500' : ''}`}
                  />
                  {errors.registrationNumber && <p className="text-red-500 text-xs mt-1">{errors.registrationNumber}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">VAT Number</label>
                  <input
                    type="text"
                    name="vatNumber"
                    value={formData.vatNumber}
                    onChange={handleChange}
                    className="form-input"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Website</label>
                  <input
                    type="text"
                    name="website"
                    value={formData.website}
                    onChange={handleChange}
                    className="form-input"
                    placeholder="https://"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Industry *</label>
                  <select
                    name="industry"
                    value={formData.industry}
                    onChange={handleChange}
                    className={`form-select ${errors.industry ? 'border-red-500' : ''}`}
                  >
                    <option value="">Select Industry</option>
                    {industries.map((industry, index) => (
                      <option key={index} value={industry.toLowerCase().replace(/\s+/g, '-')}>
                        {industry}
                      </option>
                    ))}
                  </select>
                  {errors.industry && <p className="text-red-500 text-xs mt-1">{errors.industry}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Company Size</label>
                  <select
                    name="companySize"
                    value={formData.companySize}
                    onChange={handleChange}
                    className="form-select"
                  >
                    <option value="">Select Company Size</option>
                    {companySizes.map((size, index) => (
                      <option key={index} value={size}>
                        {size}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
                  <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    className="form-input"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Postal Code</label>
                  <input
                    type="text"
                    name="postalCode"
                    value={formData.postalCode}
                    onChange={handleChange}
                    className="form-input"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">City</label>
                  <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    className="form-input"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Country</label>
                  <input
                    type="text"
                    name="country"
                    value={formData.country}
                    onChange={handleChange}
                    className="form-input"
                  />
                </div>
              </div>
            </div>
          )}
          
          {/* Step 2: Contact Person */}
          {activeStep === 2 && (
            <div className="space-y-4">
              <h3 className="text-xl font-semibold mb-4">Contact Person</h3>
              
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
                  <label className="block text-sm font-medium text-gray-700 mb-1">Job Title</label>
                  <input
                    type="text"
                    name="jobTitle"
                    value={formData.jobTitle}
                    onChange={handleChange}
                    className="form-input"
                  />
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
                  <label className="block text-sm font-medium text-gray-700 mb-1">Preferred Language</label>
                  <select
                    name="preferredLanguage"
                    value={formData.preferredLanguage}
                    onChange={handleChange}
                    className="form-select"
                  >
                    <option value="English">English</option>
                    <option value="Dutch">Dutch</option>
                    <option value="German">German</option>
                    <option value="French">French</option>
                    <option value="Polish">Polish</option>
                  </select>
                </div>
              </div>
            </div>
          )}
          
          {/* Step 3: Hiring Requirements */}
          {activeStep === 3 && (
            <div className="space-y-4">
              <h3 className="text-xl font-semibold mb-4">Hiring Requirements</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Number of Workers Needed *</label>
                  <input
                    type="number"
                    name="workersNeeded"
                    value={formData.workersNeeded}
                    onChange={handleChange}
                    min="1"
                    className={`form-input ${errors.workersNeeded ? 'border-red-500' : ''}`}
                  />
                  {errors.workersNeeded && <p className="text-red-500 text-xs mt-1">{errors.workersNeeded}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Experience Level</label>
                  <select
                    name="experienceLevel"
                    value={formData.experienceLevel}
                    onChange={handleChange}
                    className="form-select"
                  >
                    <option value="">Select Experience Level</option>
                    {experienceLevels.map((level, index) => (
                      <option key={index} value={level}>
                        {level}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Start Date</label>
                  <input
                    type="date"
                    name="startDate"
                    value={formData.startDate}
                    onChange={handleChange}
                    className="form-input"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Duration</label>
                  <select
                    name="duration"
                    value={formData.duration}
                    onChange={handleChange}
                    className="form-select"
                  >
                    <option value="">Select Duration</option>
                    {durations.map((duration, index) => (
                      <option key={index} value={duration}>
                        {duration}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Working Hours</label>
                  <select
                    name="workingHours"
                    value={formData.workingHours}
                    onChange={handleChange}
                    className="form-select"
                  >
                    <option value="">Select Working Hours</option>
                    {workingHours.map((hours, index) => (
                      <option key={index} value={hours}>
                        {hours}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              
              <div className="mt-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">Job Categories *</label>
                <p className="text-sm text-gray-500 mb-2">Select all that apply</p>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                  {jobCategoriesList.map((category, index) => (
                    <div key={index} className="flex items-center">
                      <input
                        type="checkbox"
                        id={`category-${index}`}
                        value={category}
                        checked={formData.jobCategories.includes(category)}
                        onChange={(e) => handleMultiSelect(e, 'jobCategories')}
                        className="form-checkbox"
                      />
                      <label htmlFor={`category-${index}`} className="ml-2 text-sm text-gray-700">
                        {category}
                      </label>
                    </div>
                  ))}
                </div>
                {errors.jobCategories && <p className="text-red-500 text-xs mt-1">{errors.jobCategories}</p>}
              </div>
              
              <div className="mt-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">Required Skills</label>
                <textarea
                  name="requiredSkills"
                  value={formData.requiredSkills}
                  onChange={handleChange}
                  className="form-textarea h-24"
                  placeholder="Describe any specific skills or qualifications required"
                ></textarea>
              </div>
              
              <div className="mt-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">Language Requirements</label>
                <p className="text-sm text-gray-500 mb-2">Select all that apply</p>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                  {languages.map((language, index) => (
                    <div key={index} className="flex items-center">
                      <input
                        type="checkbox"
                        id={`language-${index}`}
                        value={language}
                        checked={formData.languages.includes(language)}
                        onChange={(e) => handleMultiSelect(e, 'languages')}
                        className="form-checkbox"
                      />
                      <label htmlFor={`language-${index}`} className="ml-2 text-sm text-gray-700">
                        {language}
                      </label>
                    </div>
                  ))}
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
                    I would like to receive updates about staffing solutions and industry insights
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
                {isSubmitting ? 'Submitting...' : 'Submit Registration'}
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
        <h3 className="text-xl font-semibold mb-4">Staffing ROI Calculator</h3>
        <p className="text-gray-600 mb-6">
          Compare the costs and benefits of traditional hiring versus Glodinas Flex Work's staffing solutions.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <h4 className="font-medium text-lg">Your Business Parameters</h4>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Current Staff Count</label>
              <input
                type="number"
                name="currentStaffCount"
                value={roiData.currentStaffCount}
                onChange={handleRoiChange}
                min="1"
                className="form-input"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Planned New Hires</label>
              <input
                type="number"
                name="plannedHires"
                value={roiData.plannedHires}
                onChange={handleRoiChange}
                min="1"
                className="form-input"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Average Monthly Salary (€)</label>
              <input
                type="number"
                name="avgSalary"
                value={roiData.avgSalary}
                onChange={handleRoiChange}
                min="1000"
                step="100"
                className="form-input"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Average Hiring Time (weeks)</label>
              <input
                type="number"
                name="hiringTimeWeeks"
                value={roiData.hiringTimeWeeks}
                onChange={handleRoiChange}
                min="1"
                max="52"
                className="form-input"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Annual Turnover Rate (%)</label>
              <input
                type="number"
                name="turnoverRate"
                value={roiData.turnoverRate}
                onChange={handleRoiChange}
                min="0"
                max="100"
                className="form-input"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Productivity Loss During Onboarding (%)</label>
              <input
                type="number"
                name="productivityLoss"
                value={roiData.productivityLoss}
                onChange={handleRoiChange}
                min="0"
                max="100"
                className="form-input"
              />
            </div>
            
            <button
              type="button"
              onClick={calculateROI}
              className="btn btn-primary w-full mt-4"
            >
              Calculate Savings
            </button>
          </div>
          
          {roiResults && (
            <div className="bg-gray-50 p-6 rounded-lg">
              <h4 className="font-medium text-lg mb-4">Your Potential Savings</h4>
              
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-gray-600">Traditional Hiring Cost</p>
                  <p className="text-xl font-bold">€{roiResults.traditionalCost}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Glodinas Flex Work Cost</p>
                  <p className="text-xl font-bold text-orange-600">€{roiResults.glodinasCost}</p>
                </div>
                <div className="pt-4 border-t border-gray-200">
                  <p className="text-sm text-gray-600">Total Cost Savings</p>
                  <p className="text-2xl font-bold text-green-600">€{roiResults.savings}</p>
                  <p className="text-sm text-gray-600">({roiResults.savingsPercentage}% reduction)</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Time Savings</p>
                  <p className="text-xl font-bold text-blue-600">{roiResults.timeSavingsWeeks} weeks</p>
                </div>
                
                <div className="pt-4">
                  <p className="text-sm text-gray-600">
                    These calculations are estimates based on industry averages and your inputs.
                    Contact us for a detailed analysis specific to your business needs.
                  </p>
                </div>
                
                <button
                  type="button"
                  onClick={() => {
                    setShowROICalculator(false);
                    setShowSignupForm(true);
                  }}
                  className="btn btn-primary w-full mt-2"
                >
                  Get Started Now
                </button>
              </div>
            </div>
          )}
        </div>
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
          ) : showROICalculator ? (
            renderROICalculator()
          ) : (
            <>
              {/* Benefits Section */}
              <section className="mb-16">
                <div className="text-center mb-12">
                  <h2 className="text-3xl font-bold mb-4">Why Choose Glodinas Flex Work?</h2>
                  <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                    We provide comprehensive staffing solutions tailored to your business needs,
                    helping you find the right talent quickly and efficiently.
                  </p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  <div className="bg-white rounded-lg shadow-md p-6 text-center">
                    <div className="w-16 h-16 bg-orange-100 text-orange-500 rounded-full flex items-center justify-center mx-auto mb-4">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <h3 className="text-xl font-semibold mb-2">Fast Placement</h3>
                    <p className="text-gray-600">
                      Get qualified workers in as little as 48 hours, with pre-screened candidates ready to start immediately.
                    </p>
                  </div>
                  
                  <div className="bg-white rounded-lg shadow-md p-6 text-center">
                    <div className="w-16 h-16 bg-orange-100 text-orange-500 rounded-full flex items-center justify-center mx-auto mb-4">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                      </svg>
                    </div>
                    <h3 className="text-xl font-semibold mb-2">Quality Guaranteed</h3>
                    <p className="text-gray-600">
                      All candidates undergo thorough screening, skills assessment, and background checks before placement.
                    </p>
                  </div>
                  
                  <div className="bg-white rounded-lg shadow-md p-6 text-center">
                    <div className="w-16 h-16 bg-orange-100 text-orange-500 rounded-full flex items-center justify-center mx-auto mb-4">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <h3 className="text-xl font-semibold mb-2">Cost-Effective</h3>
                    <p className="text-gray-600">
                      Flexible staffing solutions that reduce hiring costs and eliminate the administrative burden.
                    </p>
                  </div>
                </div>
                
                <div className="text-center mt-8">
                  <button 
                    onClick={() => setShowROICalculator(true)} 
                    className="btn btn-secondary"
                  >
                    Calculate Your ROI
                  </button>
                </div>
              </section>
              
              {/* Case Studies Section */}
              <section className="mb-16">
                <div className="text-center mb-8">
                  <h2 className="text-3xl font-bold mb-4">Success Stories</h2>
                  <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                    See how businesses like yours have benefited from our staffing solutions
                  </p>
                </div>
                
                <div className="mb-6">
                  <div className="flex justify-center space-x-2">
                    <button 
                      onClick={() => setIndustryFilter('all')} 
                      className={`px-4 py-2 rounded-full text-sm ${industryFilter === 'all' ? 'bg-orange-500 text-white' : 'bg-gray-200 text-gray-700'}`}
                    >
                      All Industries
                    </button>
                    <button 
                      onClick={() => setIndustryFilter('manufacturing')} 
                      className={`px-4 py-2 rounded-full text-sm ${industryFilter === 'manufacturing' ? 'bg-orange-500 text-white' : 'bg-gray-200 text-gray-700'}`}
                    >
                      Manufacturing
                    </button>
                    <button 
                      onClick={() => setIndustryFilter('logistics')} 
                      className={`px-4 py-2 rounded-full text-sm ${industryFilter === 'logistics' ? 'bg-orange-500 text-white' : 'bg-gray-200 text-gray-700'}`}
                    >
                      Logistics
                    </button>
                    <button 
                      onClick={() => setIndustryFilter('healthcare')} 
                      className={`px-4 py-2 rounded-full text-sm ${industryFilter === 'healthcare' ? 'bg-orange-500 text-white' : 'bg-gray-200 text-gray-700'}`}
                    >
                      Healthcare
                    </button>
                    <button 
                      onClick={() => setIndustryFilter('hospitality')} 
                      className={`px-4 py-2 rounded-full text-sm ${industryFilter === 'hospitality' ? 'bg-orange-500 text-white' : 'bg-gray-200 text-gray-700'}`}
                    >
                      Hospitality
                    </button>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {caseStudies
                    .filter(study => industryFilter === 'all' || study.industry === industryFilter)
                    .map((study, index) => (
                      <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden">
                        <div className="md:flex">
                          <div className="md:w-1/3 relative h-48 md:h-auto">
                            <div className="absolute inset-0 bg-orange-500">
                              {/* Image placeholder */}
                              <div className="h-full flex items-center justify-center text-white">
                                <span className="text-lg font-medium">{study.industry.charAt(0).toUpperCase() + study.industry.slice(1)}</span>
                              </div>
                            </div>
                          </div>
                          <div className="p-6 md:w-2/3">
                            <h3 className="text-xl font-semibold mb-2">{study.title}</h3>
                            <p className="text-sm text-gray-500 mb-3">{study.company}</p>
                            
                            <div className="mb-4">
                              <p className="text-sm font-medium text-gray-700">Challenge:</p>
                              <p className="text-sm text-gray-600 mb-2">{study.challenge}</p>
                              
                              <p className="text-sm font-medium text-gray-700">Solution:</p>
                              <p className="text-sm text-gray-600 mb-2">{study.solution}</p>
                              
                              <p className="text-sm font-medium text-gray-700">Results:</p>
                              <p className="text-sm text-gray-600">{study.results}</p>
                            </div>
                            
                            <blockquote className="italic text-sm text-gray-600 border-l-4 border-orange-500 pl-3">
                              "{study.testimonial}"
                            </blockquote>
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
              </section>
              
              {/* CTA Section */}
              <section className="bg-gray-50 rounded-lg p-8 text-center">
                <h2 className="text-2xl font-bold mb-4">Ready to Find Your Perfect Staff?</h2>
                <p className="text-lg text-gray-600 mb-6 max-w-2xl mx-auto">
                  Register your company today and get access to our pool of qualified candidates.
                  Our team will help you find the right staff for your business needs.
                </p>
                <div className="flex flex-col sm:flex-row justify-center gap-4">
                  <button 
                    onClick={() => setShowSignupForm(true)} 
                    className="btn btn-primary"
                  >
                    Register Your Company
                  </button>
                  <button 
                    onClick={() => setShowROICalculator(true)} 
                    className="btn btn-secondary"
                  >
                    Calculate Your ROI
                  </button>
                </div>
              </section>
            </>
          )}
        </div>
      </div>
    </>
  );
}
