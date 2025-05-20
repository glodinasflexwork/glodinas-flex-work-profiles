import { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import { useNotification } from '../components/NotificationContext';
import FileUpload from '../components/FileUpload';

export default function JobSeekers() {
  const { addNotification } = useNotification();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    location: '',
    preferredLanguage: 'English',
    jobTitle: '',
    experience: '',
    education: '',
    skills: [],
    availability: '',
    workPermit: false,
    relocate: false,
    salaryExpectation: '',
    resumeUrl: '',
    coverLetterUrl: '',
    referralSource: '',
    termsAccepted: false
  });
  
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };
  
  const handleSkillChange = (skill) => {
    const updatedSkills = formData.skills.includes(skill)
      ? formData.skills.filter(s => s !== skill)
      : [...formData.skills, skill];
    
    setFormData({
      ...formData,
      skills: updatedSkills
    });
  };

  const handleFileUpload = (fieldName, url) => {
    setFormData({
      ...formData,
      [fieldName]: url
    });
  };
  
  const handleNext = () => {
    // Validate current step
    if (step === 1) {
      if (!formData.firstName || !formData.lastName || !formData.email || !formData.phone) {
        addNotification('Please fill in all required fields.', 'error');
        return;
      }
    } else if (step === 2) {
      if (!formData.jobTitle || !formData.experience) {
        addNotification('Please fill in all required fields.', 'error');
        return;
      }
    } else if (step === 3) {
      if (formData.skills.length === 0) {
        addNotification('Please select at least one skill.', 'error');
        return;
      }
      
      if (!formData.resumeUrl) {
        addNotification('Please upload your resume/CV.', 'error');
        return;
      }
    }
    
    setStep(step + 1);
    window.scrollTo(0, 0);
  };
  
  const handleBack = () => {
    setStep(step - 1);
    window.scrollTo(0, 0);
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.termsAccepted) {
      addNotification('Please accept the terms and conditions.', 'error');
      return;
    }
    
    try {
      // Demo submission - would be replaced with actual API call
      addNotification('Your application has been submitted successfully!', 'success');
      
      // Reset form after successful submission
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        location: '',
        preferredLanguage: 'English',
        jobTitle: '',
        experience: '',
        education: '',
        skills: [],
        availability: '',
        workPermit: false,
        relocate: false,
        salaryExpectation: '',
        resumeUrl: '',
        coverLetterUrl: '',
        referralSource: '',
        termsAccepted: false
      });
      setStep(1);
    } catch (error) {
      addNotification('There was an error submitting your application. Please try again.', 'error');
    }
  };
  
  const skills = [
    'Customer Service',
    'Warehouse Operations',
    'Forklift Operation',
    'Inventory Management',
    'Quality Control',
    'Assembly Line',
    'CNC Operation',
    'Healthcare Support',
    'Food Preparation',
    'Cleaning Services',
    'Retail Sales',
    'Administrative Support',
    'Driving/Delivery',
    'Construction',
    'Multilingual'
  ];
  
  return (
    <div>
      <Head>
        <title>Job Seekers | Glodinas Flex Work</title>
        <meta name="description" content="Find your next career opportunity with Glodinas Flex Work. Register as a job seeker to access hundreds of job openings across Europe." />
      </Head>
      
      {/* Hero Section */}
      <section className="bg-orange-600 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Find Your Next Career Opportunity</h1>
            <p className="text-xl mb-8">Register as a job seeker to access hundreds of job openings across Europe</p>
            
            <div className="bg-white rounded-lg p-6 shadow-lg">
              <div className="flex justify-between items-center mb-8">
                <div className="flex items-center">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${step === 1 ? 'bg-orange-500' : 'bg-gray-300'} text-white font-bold`}>1</div>
                  <div className="ml-2">Personal Info</div>
                </div>
                <div className="flex-grow mx-4 h-1 bg-gray-200">
                  <div className={`h-full ${step >= 2 ? 'bg-orange-500' : 'bg-gray-200'}`} style={{ width: '100%' }}></div>
                </div>
                <div className="flex items-center">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${step === 2 ? 'bg-orange-500' : 'bg-gray-300'} text-white font-bold`}>2</div>
                  <div className="ml-2">Professional Details</div>
                </div>
                <div className="flex-grow mx-4 h-1 bg-gray-200">
                  <div className={`h-full ${step >= 3 ? 'bg-orange-500' : 'bg-gray-200'}`} style={{ width: '100%' }}></div>
                </div>
                <div className="flex items-center">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${step === 3 ? 'bg-orange-500' : 'bg-gray-300'} text-white font-bold`}>3</div>
                  <div className="ml-2">Skills & Qualifications</div>
                </div>
                <div className="flex-grow mx-4 h-1 bg-gray-200">
                  <div className={`h-full ${step >= 4 ? 'bg-orange-500' : 'bg-gray-200'}`} style={{ width: '100%' }}></div>
                </div>
                <div className="flex items-center">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${step === 4 ? 'bg-orange-500' : 'bg-gray-300'} text-white font-bold`}>4</div>
                  <div className="ml-2">Account Setup</div>
                </div>
              </div>
              
              {step === 1 && (
                <div>
                  <h2 className="text-2xl font-bold mb-6 text-gray-800">Personal Information</h2>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-gray-700 mb-2">First Name *</label>
                      <input
                        type="text"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                        className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-gray-700 mb-2">Last Name *</label>
                      <input
                        type="text"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                        className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-gray-700 mb-2">Email *</label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-gray-700 mb-2">Phone Number *</label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-gray-700 mb-2">Location</label>
                      <input
                        type="text"
                        name="location"
                        placeholder="City, Country"
                        value={formData.location}
                        onChange={handleChange}
                        className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                      />
                    </div>
                    <div>
                      <label className="block text-gray-700 mb-2">Preferred Language</label>
                      <select
                        name="preferredLanguage"
                        value={formData.preferredLanguage}
                        onChange={handleChange}
                        className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                      >
                        <option>English</option>
                        <option>Dutch</option>
                        <option>Polish</option>
                        <option>Romanian</option>
                        <option>Bulgarian</option>
                      </select>
                    </div>
                  </div>
                  <div className="mt-8 flex justify-end">
                    <button
                      type="button"
                      onClick={handleNext}
                      className="bg-orange-500 text-white px-6 py-3 rounded-md hover:bg-orange-600 transition duration-300"
                    >
                      Next
                    </button>
                  </div>
                </div>
              )}
              
              {step === 2 && (
                <div>
                  <h2 className="text-2xl font-bold mb-6 text-gray-800">Professional Details</h2>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-gray-700 mb-2">Desired Job Title *</label>
                      <input
                        type="text"
                        name="jobTitle"
                        value={formData.jobTitle}
                        onChange={handleChange}
                        className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-gray-700 mb-2">Years of Experience *</label>
                      <select
                        name="experience"
                        value={formData.experience}
                        onChange={handleChange}
                        className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                        required
                      >
                        <option value="">Select Experience</option>
                        <option value="0-1">0-1 years</option>
                        <option value="1-3">1-3 years</option>
                        <option value="3-5">3-5 years</option>
                        <option value="5-10">5-10 years</option>
                        <option value="10+">10+ years</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-gray-700 mb-2">Highest Education Level</label>
                      <select
                        name="education"
                        value={formData.education}
                        onChange={handleChange}
                        className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                      >
                        <option value="">Select Education</option>
                        <option value="High School">High School</option>
                        <option value="Vocational Training">Vocational Training</option>
                        <option value="Bachelor's Degree">Bachelor's Degree</option>
                        <option value="Master's Degree">Master's Degree</option>
                        <option value="PhD">PhD</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-gray-700 mb-2">Availability</label>
                      <select
                        name="availability"
                        value={formData.availability}
                        onChange={handleChange}
                        className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                      >
                        <option value="">Select Availability</option>
                        <option value="Immediate">Immediate</option>
                        <option value="2 weeks">2 weeks</option>
                        <option value="1 month">1 month</option>
                        <option value="2+ months">2+ months</option>
                      </select>
                    </div>
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        name="workPermit"
                        checked={formData.workPermit}
                        onChange={handleChange}
                        className="mr-2 h-5 w-5 text-orange-500"
                      />
                      <label className="text-gray-700">I have the legal right to work in the EU</label>
                    </div>
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        name="relocate"
                        checked={formData.relocate}
                        onChange={handleChange}
                        className="mr-2 h-5 w-5 text-orange-500"
                      />
                      <label className="text-gray-700">I am willing to relocate</label>
                    </div>
                  </div>
                  <div className="mt-8 flex justify-between">
                    <button
                      type="button"
                      onClick={handleBack}
                      className="bg-gray-300 text-gray-700 px-6 py-3 rounded-md hover:bg-gray-400 transition duration-300"
                    >
                      Back
                    </button>
                    <button
                      type="button"
                      onClick={handleNext}
                      className="bg-orange-500 text-white px-6 py-3 rounded-md hover:bg-orange-600 transition duration-300"
                    >
                      Next
                    </button>
                  </div>
                </div>
              )}
              
              {step === 3 && (
                <div>
                  <h2 className="text-2xl font-bold mb-6 text-gray-800">Skills & Qualifications</h2>
                  <div>
                    <label className="block text-gray-700 mb-4">Select your skills (select all that apply) *</label>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                      {skills.map((skill) => (
                        <div key={skill} className="flex items-center">
                          <input
                            type="checkbox"
                            id={skill}
                            checked={formData.skills.includes(skill)}
                            onChange={() => handleSkillChange(skill)}
                            className="mr-2 h-5 w-5 text-orange-500"
                          />
                          <label htmlFor={skill} className="text-gray-700">{skill}</label>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="mt-6">
                    <label className="block text-gray-700 mb-2">Salary Expectation (€ per year)</label>
                    <input
                      type="text"
                      name="salaryExpectation"
                      value={formData.salaryExpectation}
                      onChange={handleChange}
                      className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                      placeholder="e.g. 30,000 - 40,000"
                    />
                  </div>
                  <div className="mt-6">
                    <FileUpload 
                      label="Resume/CV Upload (PDF, DOCX, JPG) *" 
                      onUploadComplete={(url) => handleFileUpload('resumeUrl', url)}
                      acceptedFileTypes=".pdf,.docx,.jpg,.jpeg"
                    />
                  </div>
                  <div className="mt-6">
                    <FileUpload 
                      label="Cover Letter Upload (Optional)" 
                      onUploadComplete={(url) => handleFileUpload('coverLetterUrl', url)}
                      acceptedFileTypes=".pdf,.docx,.jpg,.jpeg"
                    />
                  </div>
                  <div className="mt-8 flex justify-between">
                    <button
                      type="button"
                      onClick={handleBack}
                      className="bg-gray-300 text-gray-700 px-6 py-3 rounded-md hover:bg-gray-400 transition duration-300"
                    >
                      Back
                    </button>
                    <button
                      type="button"
                      onClick={handleNext}
                      className="bg-orange-500 text-white px-6 py-3 rounded-md hover:bg-orange-600 transition duration-300"
                    >
                      Next
                    </button>
                  </div>
                </div>
              )}
              
              {step === 4 && (
                <div>
                  <h2 className="text-2xl font-bold mb-6 text-gray-800">Account Setup</h2>
                  <div className="mb-6">
                    <label className="block text-gray-700 mb-2">How did you hear about us?</label>
                    <select
                      name="referralSource"
                      value={formData.referralSource}
                      onChange={handleChange}
                      className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                    >
                      <option value="">Select an option</option>
                      <option value="Search Engine">Search Engine</option>
                      <option value="Social Media">Social Media</option>
                      <option value="Friend/Colleague">Friend/Colleague</option>
                      <option value="Job Board">Job Board</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                  <div className="mb-6">
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        name="termsAccepted"
                        checked={formData.termsAccepted}
                        onChange={handleChange}
                        className="mr-2 h-5 w-5 text-orange-500"
                        required
                      />
                      <label className="text-gray-700">
                        I agree to the{' '}
                        <Link href="/terms">
                          <a className="text-orange-500 hover:underline">Terms of Service</a>
                        </Link>
                        {' '}and{' '}
                        <Link href="/privacy-policy">
                          <a className="text-orange-500 hover:underline">Privacy Policy</a>
                        </Link>
                      </label>
                    </div>
                  </div>
                  <div className="mt-8 flex justify-between">
                    <button
                      type="button"
                      onClick={handleBack}
                      className="bg-gray-300 text-gray-700 px-6 py-3 rounded-md hover:bg-gray-400 transition duration-300"
                    >
                      Back
                    </button>
                    <button
                      type="button"
                      onClick={handleSubmit}
                      className="bg-orange-500 text-white px-6 py-3 rounded-md hover:bg-orange-600 transition duration-300"
                    >
                      Submit Application
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
      
      {/* Benefits Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Choose Glodinas Flex Work?</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">We're committed to helping you find the perfect job match</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-gray-50 rounded-lg p-6 text-center">
              <div className="text-4xl mb-4">🔍</div>
              <h3 className="text-xl font-bold mb-3">Access to Exclusive Opportunities</h3>
              <p className="text-gray-600">
                Many of our job openings are not advertised elsewhere. Register with us to access our exclusive network of top employers across Europe.
              </p>
            </div>
            
            <div className="bg-gray-50 rounded-lg p-6 text-center">
              <div className="text-4xl mb-4">🌍</div>
              <h3 className="text-xl font-bold mb-3">Multilingual Support</h3>
              <p className="text-gray-600">
                Our team provides support in Dutch, English, Polish, Romanian, and Bulgarian, making your job search experience smooth regardless of your native language.
              </p>
            </div>
            
            <div className="bg-gray-50 rounded-lg p-6 text-center">
              <div className="text-4xl mb-4">🚀</div>
              <h3 className="text-xl font-bold mb-3">Career Growth</h3>
              <p className="text-gray-600">
                We don't just find you a job; we help build your career. Our consultants provide guidance on skill development and career progression.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* FAQ Section */}
      <section className="py-16 bg-gray-100">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Frequently Asked Questions</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">Find answers to common questions about our job seeker services</p>
          </div>
          
          <div className="max-w-3xl mx-auto">
            <div className="mb-6">
              <h3 className="text-xl font-bold mb-2">Is registration free?</h3>
              <p className="text-gray-600">
                Yes, registration is completely free for all job seekers. We never charge candidates for our placement services.
              </p>
            </div>
            
            <div className="mb-6">
              <h3 className="text-xl font-bold mb-2">How quickly can I expect to find a job?</h3>
              <p className="text-gray-600">
                Placement times vary depending on your skills, experience, and the current job market. However, for in-demand positions, we often place candidates within 48 hours to 2 weeks.
              </p>
            </div>
            
            <div className="mb-6">
              <h3 className="text-xl font-bold mb-2">What types of jobs do you offer?</h3>
              <p className="text-gray-600">
                We specialize in a wide range of sectors including logistics, manufacturing, healthcare, hospitality, retail, and construction. We offer both temporary and permanent positions.
              </p>
            </div>
            
            <div className="mb-6">
              <h3 className="text-xl font-bold mb-2">Do I need to speak Dutch to find work?</h3>
              <p className="text-gray-600">
                Not necessarily. While Dutch is helpful for some positions, we have many opportunities that require English or other European languages. We'll match you with positions suitable for your language skills.
              </p>
            </div>
            
            <div>
              <h3 className="text-xl font-bold mb-2">What happens after I submit my application?</h3>
              <p className="text-gray-600">
                Our recruitment team will review your application and contact you within 1-2 business days to discuss potential opportunities and next steps in the process.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Testimonials Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Success Stories</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">Hear from job seekers who found their perfect match with us</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-gray-50 rounded-lg p-6">
              <div className="text-orange-500 text-2xl mb-4">"</div>
              <p className="text-gray-600 mb-6">
                I moved to the Netherlands without speaking Dutch and was worried about finding work. Glodinas found me a position in logistics within a week, with a company that valued my other skills.
              </p>
              <div className="flex items-center">
                <div className="w-12 h-12 rounded-full overflow-hidden mr-4">
                  <Image src="/images/testimonials/testimonial-1.jpg" alt="Testimonial" width={48} height={48} className="object-cover" />
                </div>
                <div>
                  <h4 className="font-bold">Piotr K.</h4>
                  <p className="text-sm text-gray-500">Warehouse Supervisor</p>
                </div>
              </div>
            </div>
            
            <div className="bg-gray-50 rounded-lg p-6">
              <div className="text-orange-500 text-2xl mb-4">"</div>
              <p className="text-gray-600 mb-6">
                The team at Glodinas was incredibly supportive throughout my job search. They helped me prepare for interviews and negotiate a better salary than I expected.
              </p>
              <div className="flex items-center">
                <div className="w-12 h-12 rounded-full overflow-hidden mr-4">
                  <Image src="/images/testimonials/testimonial-2.jpg" alt="Testimonial" width={48} height={48} className="object-cover" />
                </div>
                <div>
                  <h4 className="font-bold">Elena M.</h4>
                  <p className="text-sm text-gray-500">Healthcare Assistant</p>
                </div>
              </div>
            </div>
            
            <div className="bg-gray-50 rounded-lg p-6">
              <div className="text-orange-500 text-2xl mb-4">"</div>
              <p className="text-gray-600 mb-6">
                I've worked with several recruitment agencies, but Glodinas stands out for their personal approach. They found me a position that perfectly matches my skills and career goals.
              </p>
              <div className="flex items-center">
                <div className="w-12 h-12 rounded-full overflow-hidden mr-4">
                  <Image src="/images/testimonials/testimonial-3.jpg" alt="Testimonial" width={48} height={48} className="object-cover" />
                </div>
                <div>
                  <h4 className="font-bold">Thomas B.</h4>
                  <p className="text-sm text-gray-500">Technical Specialist</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-16 bg-orange-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Start Your New Career?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">Complete your registration today and our team will contact you within 24 hours to discuss available opportunities.</p>
          <button
            onClick={() => {
              window.scrollTo({ top: 0, behavior: 'smooth' });
              setStep(1);
            }}
            className="bg-white text-orange-600 hover:bg-gray-100 py-3 px-8 rounded-md font-medium text-lg"
          >
            Register Now
          </button>
        </div>
      </section>
    </div>
  );
}
