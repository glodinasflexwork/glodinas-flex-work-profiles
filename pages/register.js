import { useState } from 'react';
import Head from 'next/head';

export default function Register() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    nationality: '',
    jobSector: '',
    location: '',
    languages: '',
    additionalInfo: '',
  });

  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch(
        'https://script.google.com/macros/s/AKfycbyr6FwupEIt3eQUy-S_Dcf2o2q8Kj8q_4-8ID7OABbulv5exx-yDx8NHSlxgUj_Ngig/exec',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        }
      );

      if (response.ok) {
        setSubmitted(true);
        setFormData({
          fullName: '',
          email: '',
          phone: '',
          nationality: '',
          jobSector: '',
          location: '',
          languages: '',
          additionalInfo: '',
        });
      } else {
        alert('Something went wrong. Please try again.');
      }
    } catch (error) {
      alert('Error submitting form. Please check your connection.');
    }

    setLoading(false);
  };

  return (
    <>
      <Head>
        <title>Register - Glodinas Flex Work B.V.</title>
        <meta
          name="description"
          content="Register to find flexible job opportunities with Glodinas Flex Work B.V."
        />
      </Head>

      {/* Hero Section */}
      <section
        className="relative h-[400px] flex items-center justify-center text-white text-center px-4"
        style={{
          backgroundImage: "url('/images/register-hero.jpg')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="bg-black/40 absolute inset-0 z-0" />
        <div className="relative z-10 max-w-2xl">
          <h1 className="text-4xl font-bold mb-2">Join Our Workforce</h1>
          <p className="text-lg">
            Register now to discover job opportunities across the Netherlands.
          </p>
        </div>
      </section>

      {/* Registration Section */}
      <section className="py-20 px-4 max-w-3xl mx-auto text-gray-800">
        <h2 className="text-2xl font-bold mb-4 text-center">
          Start Your Application
        </h2>
        <p className="mb-8 text-center">
          Complete the form below and our team will get in touch with you.
        </p>

        {submitted ? (
          <div className="bg-green-100 border border-green-300 p-4 rounded text-center text-green-700">
            🎉 Thank you for registering! We’ll contact you shortly.
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block mb-1 font-medium">Full Name</label>
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                className="w-full border px-4 py-2 rounded"
                required
              />
            </div>
            <div>
              <label className="block mb-1 font-medium">Email Address</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full border px-4 py-2 rounded"
                required
              />
            </div>
            <div>
              <label className="block mb-1 font-medium">Phone Number</label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full border px-4 py-2 rounded"
                required
              />
            </div>
            <div>
              <label className="block mb-1 font-medium">Nationality</label>
              <input
                type="text"
                name="nationality"
                value={formData.nationality}
                onChange={handleChange}
                className="w-full border px-4 py-2 rounded"
              />
            </div>
            <div>
              <label className="block mb-1 font-medium">Preferred Job Sector</label>
              <select
                name="jobSector"
                value={formData.jobSector}
                onChange={handleChange}
                className="w-full border px-4 py-2 rounded"
              >
                <option value="">Select</option>
                <option>Logistics</option>
                <option>Hospitality</option>
                <option>Cleaning</option>
                <option>Food Production</option>
                <option>Technical</option>
                <option>Agriculture</option>
              </select>
            </div>
            <div>
              <label className="block mb-1 font-medium">Preferred Location in NL</label>
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
                className="w-full border px-4 py-2 rounded"
              />
            </div>
            <div>
              <label className="block mb-1 font-medium">Languages Spoken</label>
              <input
                type="text"
