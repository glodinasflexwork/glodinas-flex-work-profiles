import { useState } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';

// Sample candidate data - in production this would come from database
const sampleCandidates = [
  {
    id: 1,
    name: "Ionuț Pleșescu",
    photo: "/images/ionut_plesescu_professional.png",
    title: "Specialist Metalen en Houten Constructies",
    location: "Suceava, Roemenië",
    experience: "20 jaar",
    skills: ["Metalen Constructies", "Houten Constructies", "Metselwerk", "Timmerwerk"],
    availability: "Direct beschikbaar",
    rating: 4.9,
    industry: "construction"
  },
  {
    id: 2,
    name: "Gheorghe-Daniel Ignat",
    photo: "/images/gheorghe_daniel_ignat_professional.png",
    title: "Allround Bouwvakker",
    location: "Suceava, Roemenië",
    experience: "15 jaar",
    skills: ["Metselwerk", "Pleisterwerk", "Gipsplaat Montage", "Vloeren"],
    availability: "Direct beschikbaar",
    rating: 4.7,
    industry: "construction"
  },
  {
    id: 3,
    name: "Cristinel Roșu",
    photo: "/images/cristinel_rosu_professional.png",
    title: "Specialist Metselaar, Steenhouwer, Stukadoor",
    location: "Suceava, Roemenië",
    experience: "22 jaar",
    skills: ["Metselwerk", "Steenhouwwerk", "Pleisterwerk", "Teamleiding"],
    availability: "Direct beschikbaar",
    rating: 4.8,
    industry: "construction"
  },
  {
    id: 4,
    name: "Alexandru-Iliuță Gulei",
    photo: "/images/alexandru_gulei_professional.png",
    title: "Junior Bouwspecialist",
    location: "Suceava, Roemenië",
    experience: "5 jaar",
    skills: ["Metselwerk", "Timmerwerk", "Afwerking", "Renovaties"],
    availability: "Direct beschikbaar",
    rating: 4.6,
    industry: "construction"
  },
  {
    id: 5,
    name: "Narcis-Neculai Ionițe",
    photo: "/images/narcis_ionite_professional.png",
    title: "Specialist Bouw en Renovaties",
    location: "Suceava, Roemenië",
    experience: "12 jaar",
    skills: ["Renovaties", "Metselwerk", "Pleisterwerk", "Isolatie"],
    availability: "Direct beschikbaar",
    rating: 4.7,
    industry: "construction"
  }
];

export default function EmployerCandidates() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState('');
  const [experienceFilter, setExperienceFilter] = useState('all');
  const [availabilityFilter, setAvailabilityFilter] = useState('all');
  const [savedCandidates, setSavedCandidates] = useState([]);

  // Redirect if not authenticated
  if (status === 'unauthenticated') {
    router.push('/login');
    return null;
  }

  const filteredCandidates = sampleCandidates.filter(candidate => {
    const matchesSearch = candidate.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         candidate.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         candidate.skills.some(skill => skill.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesExperience = experienceFilter === 'all' || 
      (experienceFilter === 'junior' && parseInt(candidate.experience) < 5) ||
      (experienceFilter === 'medior' && parseInt(candidate.experience) >= 5 && parseInt(candidate.experience) < 10) ||
      (experienceFilter === 'senior' && parseInt(candidate.experience) >= 10);
    
    const matchesAvailability = availabilityFilter === 'all' || candidate.availability === availabilityFilter;
    
    return matchesSearch && matchesExperience && matchesAvailability;
  });

  const toggleSaveCandidate = (candidateId) => {
    if (savedCandidates.includes(candidateId)) {
      setSavedCandidates(savedCandidates.filter(id => id !== candidateId));
    } else {
      setSavedCandidates([...savedCandidates, candidateId]);
    }
  };

  return (
    <>
      <Head>
        <title>Kandidaten Zoeken | Glodinas Flex Work</title>
        <meta name="description" content="Zoek en vind gekwalificeerde kandidaten voor uw vacatures" />
      </Head>

      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <div className="bg-white shadow">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <Link href="/employer/dashboard" className="text-blue-600 hover:text-blue-700 flex items-center">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                Terug naar Dashboard
              </Link>
              <h1 className="text-2xl font-bold text-gray-900">Kandidaten Zoeken</h1>
              <div className="w-32"></div> {/* Spacer for alignment */}
            </div>
          </div>
        </div>

        {/* Search Section */}
        <div className="bg-white border-b">
          <div className="container mx-auto px-4 py-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <input
                  type="text"
                  placeholder="Zoek op naam, functie of vaardigheden..."
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <select
                className="px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={experienceFilter}
                onChange={(e) => setExperienceFilter(e.target.value)}
              >
                <option value="all">Alle ervaringsniveaus</option>
                <option value="junior">Junior (&lt; 5 jaar)</option>
                <option value="medior">Medior (5-10 jaar)</option>
                <option value="senior">Senior (10+ jaar)</option>
              </select>
              <select
                className="px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={availabilityFilter}
                onChange={(e) => setAvailabilityFilter(e.target.value)}
              >
                <option value="all">Alle beschikbaarheid</option>
                <option value="Direct beschikbaar">Direct beschikbaar</option>
                <option value="Binnen 2 weken">Binnen 2 weken</option>
                <option value="Binnen 1 maand">Binnen 1 maand</option>
              </select>
            </div>
          </div>
        </div>

        {/* Results */}
        <div className="container mx-auto px-4 py-8">
          <div className="mb-6 flex items-center justify-between">
            <p className="text-gray-600">
              <span className="font-semibold">{filteredCandidates.length}</span> kandidaten gevonden
            </p>
            {savedCandidates.length > 0 && (
              <Link
                href="/employer/saved-candidates"
                className="text-blue-600 hover:text-blue-700 font-semibold flex items-center"
              >
                <svg className="w-5 h-5 mr-1" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" />
                </svg>
                {savedCandidates.length} Opgeslagen
              </Link>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCandidates.map((candidate) => (
              <div key={candidate.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition">
                <div className="relative h-48 bg-gray-200">
                  <Image
                    src={candidate.photo}
                    alt={candidate.name}
                    fill
                    className="object-cover"
                  />
                  <button
                    onClick={() => toggleSaveCandidate(candidate.id)}
                    className="absolute top-4 right-4 p-2 bg-white rounded-full shadow-md hover:bg-gray-100 transition"
                  >
                    <svg 
                      className={`w-6 h-6 ${savedCandidates.includes(candidate.id) ? 'text-red-500 fill-current' : 'text-gray-400'}`}
                      fill={savedCandidates.includes(candidate.id) ? 'currentColor' : 'none'}
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                  </button>
                </div>
                
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{candidate.name}</h3>
                  <p className="text-gray-700 font-semibold mb-3">{candidate.title}</p>
                  
                  <div className="space-y-2 text-sm text-gray-600 mb-4">
                    <div className="flex items-center">
                      <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      </svg>
                      {candidate.location}
                    </div>
                    <div className="flex items-center">
                      <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                      {candidate.experience} ervaring
                    </div>
                    <div className="flex items-center">
                      <svg className="w-4 h-4 mr-2 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      {candidate.availability}
                    </div>
                    <div className="flex items-center">
                      <svg className="w-4 h-4 mr-2 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                      {candidate.rating} / 5.0
                    </div>
                  </div>

                  <div className="mb-4">
                    <p className="text-xs text-gray-500 mb-2">Belangrijkste Vaardigheden:</p>
                    <div className="flex flex-wrap gap-2">
                      {candidate.skills.slice(0, 3).map((skill, index) => (
                        <span key={index} className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-full">
                          {skill}
                        </span>
                      ))}
                      {candidate.skills.length > 3 && (
                        <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full">
                          +{candidate.skills.length - 3} meer
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Link
                      href={`/employees#${candidate.id}`}
                      className="flex-1 text-center bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-blue-700 transition"
                    >
                      Bekijk Profiel
                    </Link>
                    <button className="px-4 py-2 border border-blue-600 text-blue-600 rounded-lg font-semibold hover:bg-blue-50 transition">
                      Contact
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredCandidates.length === 0 && (
            <div className="bg-white rounded-lg shadow-md p-12 text-center">
              <svg className="w-16 h-16 mx-auto text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Geen kandidaten gevonden</h3>
              <p className="text-gray-600 mb-4">
                Probeer andere zoektermen of filters
              </p>
              <button
                onClick={() => {
                  setSearchTerm('');
                  setExperienceFilter('all');
                  setAvailabilityFilter('all');
                }}
                className="text-blue-600 hover:text-blue-700 font-semibold"
              >
                Filters wissen
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

