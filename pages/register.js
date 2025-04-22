import Head from 'next/head';
import { useState } from 'react';

export default function Register() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    nationality: '',
    sector: '',
    location: '',
    languages: '',
    cv: '',
    info: ''
  });

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'file' ? files[0]?.name : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch('https://script.google.com/macros/s/AKfycbyr6FwupEIt3eQUy-S_Dcf2o2q8Kj8q_4-8ID7OABbulv5exx-yDx8NHSlxgUj_Ngig/exec', {
      method: 'POST',
      mode: 'no-cors',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData)
    });

    alert('Registration submitted!');
    setFormData({
      name: '',
      email: '',
      phone: '',
      nationality: '',
      sector: '',
      location: '',
      languages: '',
      cv: '',
      info: ''
    });
  };

  return (
    <>
      <Head>
        <title>Register - Glodinas Flex Work B.V.</title>
        <meta name="description" content="Register to find flexible job opportunities with Glodinas Flex Work B.V." />
      </Head>

      {/* Hero */}
      <section
        className="relative h-[400px] flex items-center justify-center text-white text-center px-4"
        style={{ backgroundImage: "url('/images/register-hero.jpg')", backgroundSize: 'cover', backgroundPosition: 'center' }}
      >
        <div className="bg-black/40 absolute inset-0 z-0" />
        <div className="relative z-10 max-w-2xl">
          <h1 className="text-4xl font-bold mb-2">Join Our Workforce</h1>
          <p className="text-lg">Register now to discover job opportunities across the Netherlands.</p>
        </div>
      </section>

      {/* Form */}
      <section className="py-20 px-4 max-w-3xl mx-auto text-gray-800">
        <h2 className="text-2xl font-bold mb-4 text-center">Start Your Application</h2>
        <p className="mb-8 text-center">Complete the form below and our team will get in touch with you.</p>

        <form className="space-y-6" onSubmit={handleSubmit}>
          {[
            { label: 'Full Name', name: 'name', type: 'text' },
            { label: 'Email Address', name: 'email', type: 'email' },
            { label: 'Phone Number', name: 'phone', type: 'tel' },
            { label: 'Nationality', name: 'nationality', type: 'text' },
            { label: 'Preferred Location in NL', name: 'location', type: 'text' },
            { label: 'Languages Spoken', name: 'languages', type: 'text' },
          ].map(({ label, name, type }) => (
            <div key={name}>
              <label className="block mb-1 font-medium">{label}</label>
              <input name={name} type={type} onChange={handleChange} value={formData[name]} className="w-full border px-4 py-2 rounded" required={name !== 'cv'} />
            </div>
          ))}

          <div>
            <label className="block mb-1 font-medium">Preferred Job Sector</label>
            <select name="sector" onChange={handleChange} value={formData.sector} className="w-full border px-4 py-2 rounded">
              <option value="">Select one</option>
              <option>Logistics</option>
              <option>Hospitality</option>
              <option>Cleaning</option>
              <option>Food Production</option>
              <option>Technical</option>
              <option>Agriculture</option>
            </select>
          </div>

          <div>
            <label className="block mb-1 font-medium">Upload CV (optional)</label>
            <input name="cv" type="file" onChange={handleChange} className="w-full border px-4 py-2 rounded" />
          </div>

          <div>
            <label className="block mb-1 font-medium">Additional Info</label>
            <textarea name="info" rows="4" onChange={handleChange} value={formData.info} className="w-full border px-4 py-2 rounded" />
          </div>

          <button type="submit" className="bg-orange-500 hover:bg-orange-600 text-white font-semibold px-6 py-2 rounded">
            Submit
          </button>
        </form>
      </section>
    </>
  );
}
