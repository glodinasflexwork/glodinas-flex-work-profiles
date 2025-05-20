import { useState } from 'react';
import axios from 'axios';

export default function JobSeekerFormIntegration() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    experience: '',
    skills: '',
    availability: '',
    preferredLocation: ''
  });
  
  const [cvFile, setCvFile] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitResult, setSubmitResult] = useState(null);
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.firstName) newErrors.firstName = 'First name is required';
    if (!formData.lastName) newErrors.lastName = 'Last name is required';
    
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Email format is invalid';
    }
    
    if (!formData.phone) newErrors.phone = 'Phone number is required';
    if (!formData.experience) newErrors.experience = 'Experience is required';
    if (!formData.skills) newErrors.skills = 'Skills are required';
    if (!formData.availability) newErrors.availability = 'Availability is required';
    if (!formData.preferredLocation) newErrors.preferredLocation = 'Preferred location is required';
    
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

  const handleFileChange = (e) => {
    setCvFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsSubmitting(true);
    setSubmitResult(null);
    
    try {
      // Create form data for file upload
      const formDataToSend = new FormData();
      
      // Append all form fields
      Object.keys(formData).forEach(key => {
        formDataToSend.append(key, formData[key]);
      });
      
      // Append CV file if provided
      if (cvFile) {
        formDataToSend.append('cv', cvFile);
      }
      
      const response = await axios.post('/api/job-seekers/submit', formDataToSend, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      
      setSubmitResult({
        success: true,
        message: 'Your application has been received successfully! We will contact you soon.'
      });
      
      // Reset form after successful submission
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        experience: '',
        skills: '',
        availability: '',
        preferredLocation: ''
      });
      setCvFile(null);
      
    } catch (error) {
      console.error('Error submitting form:', error);
      
      setSubmitResult({
        success: false,
        message: error.response?.data?.message || 'An error occurred while submitting your application. Please try again.'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    formData,
    handleChange,
    handleFileChange,
    handleSubmit,
    isSubmitting,
    submitResult,
    errors,
    cvFile
  };
}
