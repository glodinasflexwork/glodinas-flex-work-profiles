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
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Industry *</label>
                  <select
                    name="industry"
                    value={formData.industry}
                    onChange={handleChange}
                    className={`form-select ${errors.industry ? 'border-red-500' : ''}`}
                  >
                    <option value="">Select Industry</option>
                    {industries.map((industry) => (
                      <option key={industry} value={industry}>{industry}</option>
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
                    {companySizes.map((size) => (
                      <option key={size} value={size}>{size}</option>
                    ))}
                  </select>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  className="form-input"
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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
              
              <div className="flex justify-end mt-6">
                <button
                  type="button"
                  onClick={() => handleStepChange('next')}
                  className="btn btn-primary"
                >
                  Next Step
                </button>
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
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                  <label className="block text-sm font-medium text-gray-700 mb-1">Phone *</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className={`form-input ${errors.phone ? 'border-red-500' : ''}`}
                  />
                  {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
                </div>
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
              
              <div className="flex justify-between mt-6">
                <button
                  type="button"
                  onClick={() => handleStepChange('prev')}
                  className="btn btn-outline"
                >
                  Previous Step
                </button>
                <button
                  type="button"
                  onClick={() => handleStepChange('next')}
                  className="btn btn-primary"
                >
                  Next Step
                </button>
              </div>
            </div>
          )}
          
          {/* Step 3: Hiring Requirements */}
          {activeStep === 3 && (
            <div className="space-y-4">
              <h3 className="text-xl font-semibold mb-4">Hiring Requirements</h3>
              
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
                <label className="block text-sm font-medium text-gray-700 mb-1">Job Categories *</label>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                  {jobCategoriesList.map((category) => (
                    <div key={category} className="flex items-center">
                      <input
                        type="checkbox"
                        id={`category-${category}`}
                        value={category}
                        checked={formData.jobCategories.includes(category)}
                        onChange={(e) => handleMultiSelect(e, 'jobCategories')}
                        className="h-4 w-4 text-orange-600 focus:ring-orange-500 border-gray-300 rounded"
                      />
                      <label htmlFor={`category-${category}`} className="ml-2 block text-sm text-gray-700">
                        {category}
                      </label>
                    </div>
                  ))}
                </div>
                {errors.jobCategories && <p className="text-red-500 text-xs mt-1">{errors.jobCategories}</p>}
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Required Skills</label>
                <textarea
                  name="requiredSkills"
                  value={formData.requiredSkills}
                  onChange={handleChange}
                  rows="3"
                  className="form-textarea"
                  placeholder="Describe any specific skills or qualifications required"
                ></textarea>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Experience Level</label>
                  <select
                    name="experienceLevel"
                    value={formData.experienceLevel}
                    onChange={handleChange}
                    className="form-select"
                  >
                    <option value="">Select Experience Level</option>
                    {experienceLevels.map((level) => (
                      <option key={level} value={level}>{level}</option>
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
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Duration</label>
                  <select
                    name="duration"
                    value={formData.duration}
                    onChange={handleChange}
                    className="form-select"
                  >
                    <option value="">Select Duration</option>
                    {durations.map((duration) => (
                      <option key={duration} value={duration}>{duration}</option>
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
                    {workingHours.map((hours) => (
                      <option key={hours} value={hours}>{hours}</option>
                    ))}
                  </select>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Required Languages</label>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-2">
                  {languages.map((language) => (
                    <div key={language} className="flex items-center">
                      <input
                        type="checkbox"
                        id={`language-${language}`}
                        value={language}
                        checked={formData.languages.includes(language)}
                        onChange={(e) => handleMultiSelect(e, 'languages')}
                        className="h-4 w-4 text-orange-600 focus:ring-orange-500 border-gray-300 rounded"
                      />
                      <label htmlFor={`language-${language}`} className="ml-2 block text-sm text-gray-700">
                        {language}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="flex justify-between mt-6">
                <button
                  type="button"
                  onClick={() => handleStepChange('prev')}
                  className="btn btn-outline"
                >
                  Previous Step
                </button>
                <button
                  type="button"
                  onClick={() => handleStepChange('next')}
                  className="btn btn-primary"
                >
                  Next Step
                </button>
              </div>
            </div>
          )}
          
          {/* Step 4: Account Setup */}
          {activeStep === 4 && (
            <div className="space-y-4">
              <h3 className="text-xl font-semibold mb-4">Account Setup</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                  <p className="text-gray-500 text-xs mt-1">Must be at least 8 characters</p>
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
              </div>
              
              <div className="space-y-2 mt-4">
                <div className="flex items-start">
                  <div className="flex items-center h-5">
                    <input
                      type="checkbox"
                      id="termsAccepted"
                      name="termsAccepted"
                      checked={formData.termsAccepted}
                      onChange={handleChange}
                      className={`h-4 w-4 text-orange-600 focus:ring-orange-500 border-gray-300 rounded ${errors.termsAccepted ? 'border-red-500' : ''}`}
                    />
                  </div>
                  <div className="ml-3 text-sm">
                    <label htmlFor="termsAccepted" className="text-gray-700">
                      I accept the <a href="/terms" className="text-orange-600 hover:text-orange-500">Terms and Conditions</a> *
                    </label>
                    {errors.termsAccepted && <p className="text-red-500 text-xs mt-1">{errors.termsAccepted}</p>}
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="flex items-center h-5">
                    <input
                      type="checkbox"
                      id="privacyAccepted"
                      name="privacyAccepted"
                      checked={formData.privacyAccepted}
                      onChange={handleChange}
                      className={`h-4 w-4 text-orange-600 focus:ring-orange-500 border-gray-300 rounded ${errors.privacyAccepted ? 'border-red-500' : ''}`}
                    />
                  </div>
                  <div className="ml-3 text-sm">
                    <label htmlFor="privacyAccepted" className="text-gray-700">
                      I accept the <a href="/privacy" className="text-orange-600 hover:text-orange-500">Privacy Policy</a> *
                    </label>
                    {errors.privacyAccepted && <p className="text-red-500 text-xs mt-1">{errors.privacyAccepted}</p>}
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="flex items-center h-5">
                    <input
                      type="checkbox"
                      id="marketingOptIn"
                      name="marketingOptIn"
                      checked={formData.marketingOptIn}
                      onChange={handleChange}
                      className="h-4 w-4 text-orange-600 focus:ring-orange-500 border-gray-300 rounded"
                    />
                  </div>
                  <div className="ml-3 text-sm">
                    <label htmlFor="marketingOptIn" className="text-gray-700">
                      I would like to receive updates about new services and features
                    </label>
                  </div>
                </div>
              </div>
              
              <div className="flex justify-between mt-6">
                <button
                  type="button"
                  onClick={() => handleStepChange('prev')}
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
    );
  };
  
  const renderROICalculator = () => {
    return (
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h3 className="text-xl font-semibold mb-6">Staffing ROI Calculator</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-medium text-gray-800 mb-4">Your Staffing Parameters</h4>
            
            <div className="space-y-4">
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
                <label className="block text-sm font-medium text-gray-700 mb-1">Current Hiring Time (weeks)</label>
                <input
                  type="number"
                  name="hiringTimeWeeks"
                  value={roiData.hiringTimeWeeks}
                  onChange={handleRoiChange}
                  min="1"
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
                <label className="block text-sm font-medium text-gray-700 mb-1">Productivity Loss During Vacancy (%)</label>
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
                className="btn btn-primary w-full"
              >
                Calculate ROI
              </button>
            </div>
          </div>
          
          <div>
            {roiResults ? (
              <div>
                <h4 className="font-medium text-gray-800 mb-4">Your Potential Savings</h4>
                
                <div className="bg-gray-50 p-4 rounded-lg mb-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-gray-700">Traditional Hiring Cost:</span>
                    <span className="font-semibold">€{roiResults.traditionalCost}</span>
                  </div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-gray-700">Glodinas Flex Work Cost:</span>
                    <span className="font-semibold">€{roiResults.glodinasCost}</span>
                  </div>
                  <div className="flex justify-between items-center pt-2 border-t border-gray-200">
                    <span className="text-gray-700 font-medium">Total Savings:</span>
                    <span className="font-bold text-green-600">€{roiResults.savings}</span>
                  </div>
                </div>
                
                <div className="bg-orange-50 p-4 rounded-lg mb-4">
                  <div className="text-center mb-2">
                    <span className="text-2xl font-bold text-orange-600">{roiResults.savingsPercentage}%</span>
                  </div>
                  <p className="text-center text-gray-700">Cost reduction with Glodinas Flex Work</p>
                </div>
                
                <div className="bg-blue-50 p-4 rounded-lg">
                  <div className="text-center mb-2">
                    <span className="text-2xl font-bold text-blue-600">{roiResults.timeSavingsWeeks} weeks</span>
                  </div>
                  <p className="text-center text-gray-700">Time saved in the hiring process</p>
                </div>
                
                <div className="mt-6">
                  <Link href="/register/employer">
                    <a className="btn btn-primary w-full">
                      Register to Get Started
                    </a>
                  </Link>
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center h-full">
                <div className="text-center mb-6">
                  <svg className="mx-auto h-16 w-16 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                  </svg>
                  <h4 className="mt-2 text-lg font-medium text-gray-900">Calculate Your Savings</h4>
                  <p className="mt-1 text-gray-500">
                    Adjust the parameters on the left to see how much you could save with Glodinas Flex Work.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={calculateROI}
                  className="btn btn-primary"
                >
                  Calculate ROI
                </button>
              </div>
            )}
          </div>
        </div>
        
        <div className="mt-6 text-center">
          <button
            type="button"
            onClick={() => setShowROICalculator(false)}
            className="btn btn-outline"
          >
            Close Calculator
          </button>
        </div>
      </div>
    );
  };

  return (
    <div>
      <Head>
        <title>Employers | Glodinas Flex Work</title>
        <meta name="description" content="Find qualified workers for your business with Glodinas Flex Work. Our flexible staffing solutions help you scale your workforce efficiently." />
      </Head>
      
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-500 text-white py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="flex flex-col md:flex-row items-center">
              <div className="md:w-1/2 mb-8 md:mb-0 md:pr-8">
                <h1 className="text-4xl md:text-5xl font-bold mb-6">Flexible Staffing Solutions for Your Business</h1>
                <p className="text-xl mb-8">Access a pre-vetted pool of qualified workers across multiple industries with our efficient and reliable staffing solutions.</p>
                
                <div className="flex flex-wrap gap-4">
                  <Link href="/register/employer">
                    <a className="btn btn-white btn-lg">
                      Register as Employer
                    </a>
                  </Link>
                  <button
                    onClick={() => setShowROICalculator(true)}
                    className="btn btn-outline-white btn-lg"
                  >
                    Calculate ROI
                  </button>
                </div>
              </div>
              <div className="md:w-1/2">
                <div className="relative h-80 md:h-96 w-full rounded-lg overflow-hidden shadow-xl">
                  <Image
                    src="/images/employer-hero.jpg"
                    alt="Business professionals in a meeting"
                    layout="fill"
                    objectFit="cover"
                    priority
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Benefits Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Choose Glodinas Flex Work</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">Our flexible staffing solutions provide numerous advantages for businesses of all sizes</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <div className="bg-blue-50 rounded-lg p-6 text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="h-8 w-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">Rapid Deployment</h3>
              <p className="text-gray-600">Get qualified workers in as little as 48 hours, with all paperwork and onboarding handled efficiently.</p>
            </div>
            
            <div className="bg-blue-50 rounded-lg p-6 text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="h-8 w-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">Flexible Scaling</h3>
              <p className="text-gray-600">Easily scale your workforce up or down based on seasonal demands or project requirements.</p>
            </div>
            
            <div className="bg-blue-50 rounded-lg p-6 text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="h-8 w-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">Quality Assurance</h3>
              <p className="text-gray-600">All workers are pre-vetted, with skills verified and references checked to ensure high-quality performance.</p>
            </div>
            
            <div className="bg-blue-50 rounded-lg p-6 text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="h-8 w-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">Cost Efficiency</h3>
              <p className="text-gray-600">Reduce hiring costs, eliminate administrative overhead, and optimize your staffing budget.</p>
            </div>
            
            <div className="bg-blue-50 rounded-lg p-6 text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="h-8 w-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">Dedicated Support</h3>
              <p className="text-gray-600">Receive personalized assistance from our account managers who understand your industry and needs.</p>
            </div>
            
            <div className="bg-blue-50 rounded-lg p-6 text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="h-8 w-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">Compliance Guaranteed</h3>
              <p className="text-gray-600">We handle all legal requirements, work permits, and compliance issues, reducing your administrative burden.</p>
            </div>
          </div>
          
          <div className="text-center mt-12">
            <Link href="/register/employer">
              <a className="btn btn-primary btn-lg">
                Get Started Today
              </a>
            </Link>
          </div>
        </div>
      </section>
      
      {/* Industries Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Industries We Serve</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">We provide staffing solutions across a wide range of industries, with specialized expertise in each sector</p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 max-w-6xl mx-auto">
            <div className="bg-white rounded-lg p-6 text-center shadow-sm hover:shadow-md transition duration-300">
              <div className="w-16 h-16 mx-auto mb-4">
                <Image
                  src="/images/industries/logistics.jpg"
                  alt="Logistics & Transportation"
                  width={64}
                  height={64}
                  className="rounded-full"
                />
              </div>
              <h3 className="font-bold text-gray-800">Logistics</h3>
            </div>
            
            <div className="bg-white rounded-lg p-6 text-center shadow-sm hover:shadow-md transition duration-300">
              <div className="w-16 h-16 mx-auto mb-4">
                <Image
                  src="/images/industries/manufacturing.jpg"
                  alt="Manufacturing"
                  width={64}
                  height={64}
                  className="rounded-full"
                />
              </div>
              <h3 className="font-bold text-gray-800">Manufacturing</h3>
            </div>
            
            <div className="bg-white rounded-lg p-6 text-center shadow-sm hover:shadow-md transition duration-300">
              <div className="w-16 h-16 mx-auto mb-4">
                <Image
                  src="/images/industries/healthcare.jpg"
                  alt="Healthcare"
                  width={64}
                  height={64}
                  className="rounded-full"
                />
              </div>
              <h3 className="font-bold text-gray-800">Healthcare</h3>
            </div>
            
            <div className="bg-white rounded-lg p-6 text-center shadow-sm hover:shadow-md transition duration-300">
              <div className="w-16 h-16 mx-auto mb-4">
                <Image
                  src="/images/industries/hospitality.jpg"
                  alt="Hospitality"
                  width={64}
                  height={64}
                  className="rounded-full"
                />
              </div>
              <h3 className="font-bold text-gray-800">Hospitality</h3>
            </div>
            
            <div className="bg-white rounded-lg p-6 text-center shadow-sm hover:shadow-md transition duration-300">
              <div className="w-16 h-16 mx-auto mb-4">
                <Image
                  src="/images/industries/retail.jpg"
                  alt="Retail"
                  width={64}
                  height={64}
                  className="rounded-full"
                />
              </div>
              <h3 className="font-bold text-gray-800">Retail</h3>
            </div>
            
            <div className="bg-white rounded-lg p-6 text-center shadow-sm hover:shadow-md transition duration-300">
              <div className="w-16 h-16 mx-auto mb-4">
                <Image
                  src="/images/industries/construction.jpg"
                  alt="Construction"
                  width={64}
                  height={64}
                  className="rounded-full"
                />
              </div>
              <h3 className="font-bold text-gray-800">Construction</h3>
            </div>
          </div>
        </div>
      </section>
      
      {/* Case Studies Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Success Stories</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">See how we've helped businesses like yours solve their staffing challenges</p>
          </div>
          
          <div className="mb-8">
            <div className="flex justify-center space-x-2">
              <button
                onClick={() => setIndustryFilter('all')}
                className={`px-4 py-2 rounded-full text-sm ${
                  industryFilter === 'all' 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                All Industries
              </button>
              <button
                onClick={() => setIndustryFilter('manufacturing')}
                className={`px-4 py-2 rounded-full text-sm ${
                  industryFilter === 'manufacturing' 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                Manufacturing
              </button>
              <button
                onClick={() => setIndustryFilter('logistics')}
                className={`px-4 py-2 rounded-full text-sm ${
                  industryFilter === 'logistics' 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                Logistics
              </button>
              <button
                onClick={() => setIndustryFilter('healthcare')}
                className={`px-4 py-2 rounded-full text-sm ${
                  industryFilter === 'healthcare' 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                Healthcare
              </button>
              <button
                onClick={() => setIndustryFilter('hospitality')}
                className={`px-4 py-2 rounded-full text-sm ${
                  industryFilter === 'hospitality' 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                Hospitality
              </button>
            </div>
          </div>
          
          <div className="max-w-5xl mx-auto">
            {caseStudies
              .filter(study => industryFilter === 'all' || study.industry === industryFilter)
              .map((study, index) => (
                <div 
                  key={study.title}
                  className={`bg-white rounded-lg shadow-lg overflow-hidden mb-8 transition-opacity duration-500 ${
                    activeCase === index && (industryFilter === 'all' || study.industry === industryFilter)
                      ? 'opacity-100'
                      : 'opacity-0 hidden'
                  }`}
                >
                  <div className="md:flex">
                    <div className="md:w-1/3 relative h-64 md:h-auto">
                      <Image
                        src={study.image}
                        alt={study.title}
                        layout="fill"
                        objectFit="cover"
                      />
                    </div>
                    <div className="md:w-2/3 p-6">
                      <div className="mb-4">
                        <span className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full uppercase tracking-wide">
                          {study.industry}
                        </span>
                      </div>
                      <h3 className="text-2xl font-bold text-gray-800 mb-2">{study.title}</h3>
                      <p className="text-gray-600 mb-4">{study.company}</p>
                      
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                        <div>
                          <h4 className="font-semibold text-gray-800 mb-1">Challenge</h4>
                          <p className="text-gray-600 text-sm">{study.challenge}</p>
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-800 mb-1">Solution</h4>
                          <p className="text-gray-600 text-sm">{study.solution}</p>
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-800 mb-1">Results</h4>
                          <p className="text-gray-600 text-sm">{study.results}</p>
                        </div>
                      </div>
                      
                      <blockquote className="italic text-gray-700 border-l-4 border-blue-500 pl-4 py-2 mb-4">
                        "{study.testimonial}"
                      </blockquote>
                      
                      <Link href="/register/employer">
                        <a className="btn btn-primary">
                          Get Similar Results
                        </a>
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
          </div>
          
          <div className="flex justify-center mt-6">
            <div className="flex space-x-2">
              {caseStudies
                .filter(study => industryFilter === 'all' || study.industry === industryFilter)
                .map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveCase(index)}
                    className={`w-3 h-3 rounded-full ${
                      activeCase === index ? 'bg-blue-600' : 'bg-gray-300'
                    }`}
                    aria-label={`View case study ${index + 1}`}
                  ></button>
                ))}
            </div>
          </div>
        </div>
      </section>
      
      {/* How It Works Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">How It Works</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">Our streamlined process makes it easy to find and manage qualified workers</p>
          </div>
          
          <div className="max-w-5xl mx-auto">
            <div className="relative">
              {/* Progress Line */}
              <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-1 bg-blue-200 transform -translate-x-1/2"></div>
              
              {/* Steps */}
              <div className="space-y-12 md:space-y-0 md:grid md:grid-cols-2 md:gap-16">
                {/* Step 1 */}
                <div className="md:text-right">
                  <div className="relative flex md:justify-end">
                    <div className="hidden md:flex absolute top-0 -right-8 md:right-0 items-center justify-center w-16 h-16 rounded-full bg-blue-100 border-4 border-blue-200 z-10 transform md:translate-x-1/2">
                      <span className="text-blue-600 font-bold text-xl">1</span>
                    </div>
                    <div className="md:mr-8">
                      <h3 className="text-xl font-bold text-gray-800 mb-2">Register Your Company</h3>
                      <p className="text-gray-600">Create your employer account with your company details and staffing requirements.</p>
                    </div>
                  </div>
                </div>
                
                <div className="md:h-32"></div>
                
                {/* Step 2 */}
                <div className="md:h-32"></div>
                
                <div>
                  <div className="relative flex">
                    <div className="hidden md:flex absolute top-0 -left-8 md:left-0 items-center justify-center w-16 h-16 rounded-full bg-blue-100 border-4 border-blue-200 z-10 transform md:-translate-x-1/2">
                      <span className="text-blue-600 font-bold text-xl">2</span>
                    </div>
                    <div className="md:ml-8">
                      <h3 className="text-xl font-bold text-gray-800 mb-2">Specify Your Needs</h3>
                      <p className="text-gray-600">Tell us about your staffing requirements, including skills, experience, and number of workers needed.</p>
                    </div>
                  </div>
                </div>
                
                {/* Step 3 */}
                <div className="md:text-right">
                  <div className="relative flex md:justify-end">
                    <div className="hidden md:flex absolute top-0 -right-8 md:right-0 items-center justify-center w-16 h-16 rounded-full bg-blue-100 border-4 border-blue-200 z-10 transform md:translate-x-1/2">
                      <span className="text-blue-600 font-bold text-xl">3</span>
                    </div>
                    <div className="md:mr-8">
                      <h3 className="text-xl font-bold text-gray-800 mb-2">Review Candidates</h3>
                      <p className="text-gray-600">Browse pre-vetted candidates that match your requirements and select the best fit for your needs.</p>
                    </div>
                  </div>
                </div>
                
                <div className="md:h-32"></div>
                
                {/* Step 4 */}
                <div className="md:h-32"></div>
                
                <div>
                  <div className="relative flex">
                    <div className="hidden md:flex absolute top-0 -left-8 md:left-0 items-center justify-center w-16 h-16 rounded-full bg-blue-100 border-4 border-blue-200 z-10 transform md:-translate-x-1/2">
                      <span className="text-blue-600 font-bold text-xl">4</span>
                    </div>
                    <div className="md:ml-8">
                      <h3 className="text-xl font-bold text-gray-800 mb-2">Onboard Workers</h3>
                      <p className="text-gray-600">We handle all paperwork, contracts, and onboarding processes to get your workers started quickly.</p>
                    </div>
                  </div>
                </div>
                
                {/* Step 5 */}
                <div className="md:text-right">
                  <div className="relative flex md:justify-end">
                    <div className="hidden md:flex absolute top-0 -right-8 md:right-0 items-center justify-center w-16 h-16 rounded-full bg-blue-100 border-4 border-blue-200 z-10 transform md:translate-x-1/2">
                      <span className="text-blue-600 font-bold text-xl">5</span>
                    </div>
                    <div className="md:mr-8">
                      <h3 className="text-xl font-bold text-gray-800 mb-2">Manage & Scale</h3>
                      <p className="text-gray-600">Easily manage your workforce through our platform and scale up or down as your needs change.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="text-center mt-16">
              <Link href="/register/employer">
                <a className="btn btn-primary btn-lg">
                  Start Hiring Today
                </a>
              </Link>
            </div>
          </div>
        </div>
      </section>
      
      {/* ROI Calculator Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="bg-blue-50 rounded-lg p-8 md:p-12 shadow-md">
              <div className="md:flex items-center">
                <div className="md:w-2/3 md:pr-8 mb-6 md:mb-0">
                  <h2 className="text-3xl font-bold text-gray-800 mb-4">Calculate Your Staffing ROI</h2>
                  <p className="text-gray-600 mb-6">
                    Our flexible staffing solutions can save you up to 30% on hiring costs while reducing time-to-hire by 50%.
                    Use our calculator to see how much you could save.
                  </p>
                  <button
                    onClick={() => setShowROICalculator(true)}
                    className="btn btn-primary"
                  >
                    Calculate Your Savings
                  </button>
                </div>
                <div className="md:w-1/3">
                  <div className="bg-white rounded-lg p-6 shadow-sm">
                    <div className="text-center mb-4">
                      <span className="text-3xl font-bold text-blue-600">30%</span>
                      <p className="text-gray-600">Average cost savings</p>
                    </div>
                    <div className="text-center mb-4">
                      <span className="text-3xl font-bold text-blue-600">50%</span>
                      <p className="text-gray-600">Faster hiring process</p>
                    </div>
                    <div className="text-center">
                      <span className="text-3xl font-bold text-blue-600">95%</span>
                      <p className="text-gray-600">Client satisfaction rate</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* FAQ Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Frequently Asked Questions</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">Find answers to common questions about our employer services</p>
          </div>
          
          <div className="max-w-3xl mx-auto space-y-6">
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <h3 className="text-xl font-bold text-gray-800 mb-2">How quickly can you provide workers?</h3>
              <p className="text-gray-600">For standard positions, we can typically provide qualified workers within 48-72 hours. For specialized roles or larger teams, it may take 3-5 business days to ensure the right match.</p>
            </div>
            
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <h3 className="text-xl font-bold text-gray-800 mb-2">What industries do you specialize in?</h3>
              <p className="text-gray-600">We specialize in logistics, manufacturing, healthcare, hospitality, retail, and construction. However, we also serve many other industries and can tailor our services to your specific needs.</p>
            </div>
            
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <h3 className="text-xl font-bold text-gray-800 mb-2">How do you ensure worker quality?</h3>
              <p className="text-gray-600">All workers undergo a thorough vetting process including skills assessment, reference checks, and background verification. We also provide ongoing performance monitoring and regular check-ins.</p>
            </div>
            
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <h3 className="text-xl font-bold text-gray-800 mb-2">What is the minimum contract period?</h3>
              <p className="text-gray-600">We offer flexible arrangements starting from as short as one week. There's no minimum contract period, allowing you to scale your workforce according to your actual needs.</p>
            </div>
            
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <h3 className="text-xl font-bold text-gray-800 mb-2">How are your services priced?</h3>
              <p className="text-gray-600">Our pricing is transparent and based on the worker's hourly rate plus a service fee. The exact rates depend on the skill level, industry, and contract duration. Contact us for a personalized quote.</p>
            </div>
          </div>
          
          <div className="text-center mt-12">
            <p className="text-gray-600 mb-6">Have more questions? Contact our team or register to speak with a staffing consultant.</p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link href="/contact">
                <a className="btn btn-outline">
                  Contact Us
                </a>
              </Link>
              <Link href="/register/employer">
                <a className="btn btn-primary">
                  Register as Employer
                </a>
              </Link>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-blue-500 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Transform Your Workforce?</h2>
            <p className="text-xl mb-8">Join hundreds of businesses that have optimized their staffing with Glodinas Flex Work.</p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link href="/register/employer">
                <a className="btn btn-white btn-lg">
                  Register Now
                </a>
              </Link>
              <Link href="/contact">
                <a className="btn btn-outline-white btn-lg">
                  Contact Us
                </a>
              </Link>
            </div>
          </div>
        </div>
      </section>
      
      {/* Modal for Signup Form */}
      {showSignupForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-screen overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-800">Employer Registration</h2>
                <button
                  onClick={() => setShowSignupForm(false)}
                  className="text-gray-500 hover:text-gray-700 focus:outline-none"
                >
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              
              {renderSignupForm()}
            </div>
          </div>
        </div>
      )}
      
      {/* Modal for ROI Calculator */}
      {showROICalculator && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-screen overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-800">Staffing ROI Calculator</h2>
                <button
                  onClick={() => setShowROICalculator(false)}
                  className="text-gray-500 hover:text-gray-700 focus:outline-none"
                >
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              
              {renderROICalculator()}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
