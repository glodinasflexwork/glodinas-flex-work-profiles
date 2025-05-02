import Head from 'next/head';
import { useState } from 'react';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

export default function Register() {
  const [formData, setFormData] = useState({});
  const [cvFile, setCvFile] = useState(null);
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    setCvFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let cvUrl = '';

    try {
      if (cvFile) {
        const base64 = await toBase64(cvFile);
        const uploadRes = await fetch('/api/upload-cv', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            file: base64.split(',')[1],
            fileName: cvFile.name,
            contentType: cvFile.type,
          }),
        });

        const uploadData = await uploadRes.json();
        cvUrl = uploadData.url || '';
      }

      const sheetRes = await fetch('/api/submit-to-sheet', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, cvUrl }),
      });

      if (sheetRes.ok) {
        setMessage('Registration successful!');
      } else {
        throw new Error('Sheet update failed');
      }
    } catch (err) {
      console.error(err);
      setMessage('There was an error submitting your application.');
    }
  };

  const toBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = reject;
    });
  };

  return (
    <>
      <Head>
        <title>Register - Glodinas Flex Work B.V.</title>
        <meta name="description" content="Register to find flexible job opportunities with Glodinas Flex Work B.V." />
      </Head>

      {/* Hero */}
      <section className="relative h-[400px] flex items-center justify-center text-white text-center px-4" style={{ backgroundImage: "url('/images/register-hero.jpg')", backgroundSize: 'cover', backgroundPosition: 'center' }}>
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
        {message && <p className="text-center text-green-600 font-semibold mb-4">{message}</p>}

        <form className="space-y-6" onSubmit={handleSubmit}>
          {['fullName', 'email', 'phone', 'nationality', 'location', 'languages', 'additional'].map((field) => (
            <div key={field}>
              <label className="block mb-1 font-medium">
                {field.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
              </label>
              <input
                type="text"
                name={field}
                className="w-full border px-4 py-2 rounded"
                onChange={handleChange}
                required={field !== 'additional'}
              />
            </div>
          ))}
          <div>
            <label className="block mb-1 font-medium">Preferred Job Sector</label>
            <select name="sector" onChange={handleChange} className="w-full border px-4 py-2 rounded">
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
            <input type="file" accept=".pdf,.doc,.docx" onChange={handleFileChange} className="w-full border px-4 py-2 rounded" />
          </div>
          <button type="submit" className="bg-orange-500 hover:bg-orange-600 text-white font-semibold px-6 py-2 rounded">
            Submit
          </button>
        </form>
      </section>
    </>
  );
}

// ✅ Needed for next-i18next to work
export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common'])),
    },
  };
}