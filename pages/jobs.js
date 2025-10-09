import { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Layout from '../components/Layout';

// Sample job data - in production this would come from database
const sampleJobs = [
  {
    id: 1,
    title: "Metselaar",
    company: "Bouwbedrijf Amsterdam BV",
    location: "Amsterdam, Nederland",
    type: "Fulltime",
    salary: "€2,800 - €3,500 per maand",
    posted: "2 dagen geleden",
    description: "Wij zoeken een ervaren metselaar voor diverse bouwprojecten in de regio Amsterdam.",
    requirements: ["Minimaal 3 jaar ervaring", "VCA certificaat", "Eigen vervoer"],
    industry: "construction"
  },
  {
    id: 2,
    title: "Timmerman",
    company: "Houtbouw Rotterdam",
    location: "Rotterdam, Nederland",
    type: "Fulltime",
    salary: "€2,600 - €3,200 per maand",
    posted: "5 dagen geleden",
    description: "Voor onze groeiende onderneming zoeken wij een vakbekwame timmerman.",
    requirements: ["Ervaring met houtbouw", "Zelfstandig kunnen werken", "Teamspeler"],
    industry: "construction"
  },
  {
    id: 3,
    title: "Stukadoor",
    company: "Afbouw Specialist Utrecht",
    location: "Utrecht, Nederland",
    type: "Fulltime",
    salary: "€2,700 - €3,400 per maand",
    posted: "1 week geleden",
    description: "Ervaren stukadoor gezocht voor binnen- en buitenprojecten.",
    requirements: ["Minimaal 5 jaar ervaring", "Kwaliteitsgericht", "Flexibel"],
    industry: "construction"
  },
  {
    id: 4,
    title: "Allround Bouwvakker",
    company: "Bouw & Renovatie Den Haag",
    location: "Den Haag, Nederland",
    type: "Fulltime",
    salary: "€2,500 - €3,000 per maand",
    posted: "3 dagen geleden",
    description: "Wij zoeken een allround bouwvakker voor diverse werkzaamheden.",
    requirements: ["Brede bouwervaring", "Flexibel inzetbaar", "VCA basis"],
    industry: "construction"
  },
  {
    id: 5,
    title: "Dakdekker",
    company: "Dakwerken Eindhoven",
    location: "Eindhoven, Nederland",
    type: "Fulltime",
    salary: "€2,900 - €3,600 per maand",
    posted: "4 dagen geleden",
    description: "Ervaren dakdekker voor platte en hellende daken.",
    requirements: ["Minimaal 4 jaar ervaring", "Hoogtevrees niet aanwezig", "Rijbewijs B"],
    industry: "construction"
  }
];

export default function Jobs() {
  const [searchTerm, setSearchTerm] = useState('');
  const [locationFilter, setLocationFilter] = useState('all');
  const [typeFilter, setTypeFilter] = useState('all');

  const filteredJobs = sampleJobs.filter(job => {
    const matchesSearch = job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         job.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         job.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesLocation = locationFilter === 'all' || job.location.includes(locationFilter);
    const matchesType = typeFilter === 'all' || job.type === typeFilter;
    
    return matchesSearch && matchesLocation && matchesType;
  });

  return (
    <Layout>
      <Head>
        <title>Vacatures | Glodinas Flex Work</title>
        <meta name="description" content="Bekijk onze actuele vacatures in de bouw en andere sectoren. Vind jouw volgende baan bij Glodinas Flex Work." />
      </Head>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Vind Jouw Volgende Baan
            </h1>
            <p className="text-xl mb-8">
              Ontdek vacatures bij topwerkgevers in Nederland
            </p>
            
            {/* Search Bar */}
            <div className="bg-white rounded-lg shadow-lg p-4">
              <div className="flex flex-col md:flex-row gap-4">
                <input
                  type="text"
                  placeholder="Zoek op functietitel, bedrijf of trefwoord..."
                  className="flex-1 px-4 py-3 rounded-lg border border-gray-300 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <button className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition">
                  Zoeken
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Filters and Results */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-8">
            
            {/* Sidebar Filters */}
            <div className="lg:w-1/4">
              <div className="bg-white rounded-lg shadow-md p-6 sticky top-4">
                <h3 className="text-xl font-bold mb-4">Filters</h3>
                
                {/* Location Filter */}
                <div className="mb-6">
                  <label className="block text-sm font-semibold mb-2">Locatie</label>
                  <select
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={locationFilter}
                    onChange={(e) => setLocationFilter(e.target.value)}
                  >
                    <option value="all">Alle locaties</option>
                    <option value="Amsterdam">Amsterdam</option>
                    <option value="Rotterdam">Rotterdam</option>
                    <option value="Utrecht">Utrecht</option>
                    <option value="Den Haag">Den Haag</option>
                    <option value="Eindhoven">Eindhoven</option>
                  </select>
                </div>

                {/* Job Type Filter */}
                <div className="mb-6">
                  <label className="block text-sm font-semibold mb-2">Type</label>
                  <select
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={typeFilter}
                    onChange={(e) => setTypeFilter(e.target.value)}
                  >
                    <option value="all">Alle types</option>
                    <option value="Fulltime">Fulltime</option>
                    <option value="Parttime">Parttime</option>
                    <option value="Tijdelijk">Tijdelijk</option>
                  </select>
                </div>

                <button
                  onClick={() => {
                    setSearchTerm('');
                    setLocationFilter('all');
                    setTypeFilter('all');
                  }}
                  className="w-full text-blue-600 hover:text-blue-700 font-semibold"
                >
                  Filters wissen
                </button>
              </div>
            </div>

            {/* Job Listings */}
            <div className="lg:w-3/4">
              <div className="mb-6">
                <p className="text-gray-600">
                  <span className="font-semibold">{filteredJobs.length}</span> vacatures gevonden
                </p>
              </div>

              <div className="space-y-4">
                {filteredJobs.map((job) => (
                  <div key={job.id} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition">
                    <div className="flex flex-col md:flex-row md:items-start md:justify-between">
                      <div className="flex-1">
                        <h3 className="text-xl font-bold text-gray-900 mb-2">
                          {job.title}
                        </h3>
                        <p className="text-gray-700 font-semibold mb-2">{job.company}</p>
                        <div className="flex flex-wrap gap-4 text-sm text-gray-600 mb-3">
                          <span className="flex items-center">
                            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                            {job.location}
                          </span>
                          <span className="flex items-center">
                            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            {job.type}
                          </span>
                          <span className="flex items-center">
                            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            {job.salary}
                          </span>
                        </div>
                        <p className="text-gray-600 mb-3">{job.description}</p>
                        <p className="text-sm text-gray-500">{job.posted}</p>
                      </div>
                      <div className="mt-4 md:mt-0 md:ml-6">
                        <Link 
                          href="/register/job-seeker"
                          className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition whitespace-nowrap"
                        >
                          Solliciteer Nu
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}

                {filteredJobs.length === 0 && (
                  <div className="bg-white rounded-lg shadow-md p-12 text-center">
                    <svg className="w-16 h-16 mx-auto text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">Geen vacatures gevonden</h3>
                    <p className="text-gray-600 mb-4">
                      Probeer andere zoektermen of filters
                    </p>
                    <button
                      onClick={() => {
                        setSearchTerm('');
                        setLocationFilter('all');
                        setTypeFilter('all');
                      }}
                      className="text-blue-600 hover:text-blue-700 font-semibold"
                    >
                      Filters wissen
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-blue-600 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Niet gevonden wat je zoekt?
          </h2>
          <p className="text-xl mb-8">
            Registreer je en ontvang job alerts voor nieuwe vacatures
          </p>
          <Link 
            href="/register/job-seeker"
            className="inline-block bg-white text-blue-600 px-8 py-4 rounded-lg font-bold text-lg hover:bg-gray-100 transition"
          >
            Registreer Nu
          </Link>
        </div>
      </section>
    </Layout>
  );
}

