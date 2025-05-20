import { useState } from 'react';
import axios from 'axios';

export default function EmployerFormIntegration() {
  const [formData, setFormData] = useState({
    companyName: '',
    contactPerson: '',
    email: '',
    phone: '',
    industry: '',
    jobRequirements: '',
    workersNeeded: '',
    location: ''
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitResult, setSubmitResult] = useState(null);
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.companyName) newErrors.companyName = 'Company name is required';
    if (!formData.contactPerson) newErrors.contactPerson = 'Contact person is required';
    
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Email format is invalid';
    }
    
    if (!formData.phone) newErrors.phone = 'Phone number is required';
    if (!formData.industry) newErrors.industry = 'Industry is required';
    if (!formData.jobRequirements) newErrors.jobRequirements = 'Job requirements are required';
    if (!formData.workersNeeded) newErrors.workersNeeded = 'Number of workers needed is required';
    if (!formData.location) newErrors.location = 'Location is required';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsSubmitting(true);
    setSubmitResult(null);
    
    try {
      const response = await axios.post('/api/employers/submit', formData);
      
      setSubmitResult({
        success: true,
        message: 'Your submission has been received successfully! We will contact you soon.'
      });
      
      // Reset form after successful submission
      setFormData({
        companyName: '',
        contactPerson: '',
        email: '',
        phone: '',
        industry: '',
        jobRequirements: '',
        workersNeeded: '',
        location: ''
      });
      
    } catch (error) {
      console.error('Error submitting form:', error);
      
      setSubmitResult({
        success: false,
        message: error.response?.data?.message || 'An error occurred while submitting the form. Please try again.'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    formData,
    handleChange,
    handleSubmit,
    isSubmitting,
    submitResult,
    errors
  };
}
