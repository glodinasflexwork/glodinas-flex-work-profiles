import { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { useUser } from '@clerk/nextjs';
import { useRouter } from 'next/router';

export default function NewJobPosting() {
  const { user, isLoaded } = useUser();
  const router = useRouter();
  
  const [formData, setFormData] = useState({
    title: '',
    company: '',
    location: '',
    type: 'Fulltime',
    salary: '',
    description: '',
    requirements: '',
    benefits: '',
    industry: 'construction',
    experience: 'medior',
    education: '',
    startDate: '',
    endDate: '',
    positions: '1'
  });

  const [currentStep, setCurrentStep] = useState(1);
  const [loading, setLoading] = useState(false);

  // Redirect if not authenticated
  if (status === 'unauthenticated') {
    router.push('/login');
    return null;
  }

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      router.push('/employer/job-postings');
    }, 1500);

    // In production, this would call an API endpoint:
    // try {
    //   await fetch('/api/employer/job-postings', {
    //     method: 'POST',
    //     headers: { 'Content-Type': 'application/json' },
    //     body: JSON.stringify(formData)
    //   });
    //   router.push('/employer/job-postings');
    // } catch (err) {
    //   console.error(err);
    // } finally {
    //   setLoading(false);
    // }
  };

  const nextStep = () => setCurrentStep(currentStep + 1);
  const prevStep = () => setCurrentStep(currentStep - 1);

  return (
    <>
      <Head>
        <title>Nieuwe Vacature Plaatsen | Glodinas Flex Work</title>
        <meta name="description" content="Plaats een nieuwe vacature" />
      </Head>

      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <div className="bg-white shadow">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <Link href="/employer/job-postings" className="text-blue-600 hover:text-blue-700 flex items-center">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                Terug
              </Link>
              <h1 className="text-2xl font-bold text-gray-900">Nieuwe Vacature Plaatsen</h1>
              <div className="w-20"></div>
            </div>
          </div>
        </div>

        {/* Progress Steps */}
        <div className="bg-white border-b">
          <div className="container mx-auto px-4 py-6">
            <div className="flex items-center justify-center">
              {[1, 2, 3].map((step) => (
                <div key={step} className="flex items-center">
                  <div className={`flex items-center justify-center w-10 h-10 rounded-full ${
                    currentStep >= step ? 'bg-blue-600 text-white' : 'bg-gray-300 text-gray-600'
                  }`}>
                    {step}
                  </div>
                  {step < 3 && (
                    <div className={`w-24 h-1 mx-2 ${
                      currentStep > step ? 'bg-blue-600' : 'bg-gray-300'
                    }`} />
                  )}
                </div>
              ))}
            </div>
            <div className="flex justify-center mt-4 space-x-32">
              <span className={currentStep >= 1 ? 'text-blue-600 font-semibold' : 'text-gray-500'}>
                Basis Info
              </span>
              <span className={currentStep >= 2 ? 'text-blue-600 font-semibold' : 'text-gray-500'}>
                Details
              </span>
              <span className={currentStep >= 3 ? 'text-blue-600 font-semibold' : 'text-gray-500'}>
                Preview
              </span>
            </div>
          </div>
        </div>

        {/* Form */}
        <div className="container mx-auto px-4 py-8 max-w-3xl">
          <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-md p-8">
            
            {/* Step 1: Basic Info */}
            {currentStep === 1 && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold mb-6">Basis Informatie</h2>
                
                <div>
                  <label className="block text-sm font-semibold mb-2">Functietitel *</label>
                  <input
                    type="text"
                    name="title"
                    required
                    value={formData.title}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="bijv. Metselaar, Timmerman, Stukadoor"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-2">Bedrijfsnaam *</label>
                  <input
                    type="text"
                    name="company"
                    required
                    value={formData.company}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold mb-2">Locatie *</label>
                    <input
                      type="text"
                      name="location"
                      required
                      value={formData.location}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Stad, Nederland"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold mb-2">Type *</label>
                    <select
                      name="type"
                      value={formData.type}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="Fulltime">Fulltime</option>
                      <option value="Parttime">Parttime</option>
                      <option value="Tijdelijk">Tijdelijk</option>
                      <option value="Freelance">Freelance</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold mb-2">Sector *</label>
                    <select
                      name="industry"
                      value={formData.industry}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="construction">Bouw</option>
                      <option value="logistics">Logistiek</option>
                      <option value="hospitality">Horeca</option>
                      <option value="healthcare">Zorg</option>
                      <option value="cleaning">Schoonmaak</option>
                      <option value="agriculture">Landbouw</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold mb-2">Ervaringsniveau *</label>
                    <select
                      name="experience"
                      value={formData.experience}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="junior">Junior (0-3 jaar)</option>
                      <option value="medior">Medior (3-7 jaar)</option>
                      <option value="senior">Senior (7+ jaar)</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-2">Salaris</label>
                  <input
                    type="text"
                    name="salary"
                    value={formData.salary}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="bijv. €2,500 - €3,500 per maand"
                  />
                </div>

                <div className="flex justify-end">
                  <button
                    type="button"
                    onClick={nextStep}
                    className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
                  >
                    Volgende
                  </button>
                </div>
              </div>
            )}

            {/* Step 2: Details */}
            {currentStep === 2 && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold mb-6">Vacature Details</h2>
                
                <div>
                  <label className="block text-sm font-semibold mb-2">Functieomschrijving *</label>
                  <textarea
                    name="description"
                    required
                    rows={6}
                    value={formData.description}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Beschrijf de functie, verantwoordelijkheden en taken..."
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-2">Vereisten *</label>
                  <textarea
                    name="requirements"
                    required
                    rows={4}
                    value={formData.requirements}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Lijst met vereisten (één per regel)"
                  />
                  <p className="text-sm text-gray-500 mt-1">Plaats elk vereiste op een nieuwe regel</p>
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-2">Wat wij bieden</label>
                  <textarea
                    name="benefits"
                    rows={4}
                    value={formData.benefits}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Secundaire arbeidsvoorwaarden, voordelen, etc."
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-semibold mb-2">Aantal posities</label>
                    <input
                      type="number"
                      name="positions"
                      min="1"
                      value={formData.positions}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold mb-2">Startdatum</label>
                    <input
                      type="date"
                      name="startDate"
                      value={formData.startDate}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold mb-2">Einddatum</label>
                    <input
                      type="date"
                      name="endDate"
                      value={formData.endDate}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>

                <div className="flex justify-between">
                  <button
                    type="button"
                    onClick={prevStep}
                    className="border border-gray-300 text-gray-700 px-6 py-3 rounded-lg font-semibold hover:bg-gray-50 transition"
                  >
                    Vorige
                  </button>
                  <button
                    type="button"
                    onClick={nextStep}
                    className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
                  >
                    Preview
                  </button>
                </div>
              </div>
            )}

            {/* Step 3: Preview */}
            {currentStep === 3 && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold mb-6">Preview & Publiceren</h2>
                
                <div className="bg-gray-50 p-6 rounded-lg">
                  <h3 className="text-2xl font-bold mb-2">{formData.title}</h3>
                  <p className="text-lg text-gray-700 mb-4">{formData.company}</p>
                  
                  <div className="flex flex-wrap gap-4 text-sm text-gray-600 mb-6">
                    <span className="flex items-center">
                      <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      </svg>
                      {formData.location}
                    </span>
                    <span className="flex items-center">
                      <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      {formData.type}
                    </span>
                    {formData.salary && (
                      <span className="flex items-center">
                        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        {formData.salary}
                      </span>
                    )}
                  </div>

                  <div className="mb-6">
                    <h4 className="font-bold mb-2">Functieomschrijving</h4>
                    <p className="text-gray-700 whitespace-pre-line">{formData.description}</p>
                  </div>

                  {formData.requirements && (
                    <div className="mb-6">
                      <h4 className="font-bold mb-2">Vereisten</h4>
                      <ul className="list-disc list-inside text-gray-700 space-y-1">
                        {formData.requirements.split('\n').filter(r => r.trim()).map((req, i) => (
                          <li key={i}>{req}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {formData.benefits && (
                    <div className="mb-6">
                      <h4 className="font-bold mb-2">Wat wij bieden</h4>
                      <p className="text-gray-700 whitespace-pre-line">{formData.benefits}</p>
                    </div>
                  )}
                </div>

                <div className="flex justify-between">
                  <button
                    type="button"
                    onClick={prevStep}
                    className="border border-gray-300 text-gray-700 px-6 py-3 rounded-lg font-semibold hover:bg-gray-50 transition"
                  >
                    Vorige
                  </button>
                  <button
                    type="submit"
                    disabled={loading}
                    className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition disabled:opacity-50"
                  >
                    {loading ? 'Publiceren...' : 'Publiceer Vacature'}
                  </button>
                </div>
              </div>
            )}
          </form>
        </div>
      </div>
    </>
  );
}

