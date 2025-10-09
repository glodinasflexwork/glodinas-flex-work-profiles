import { useState } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';

const employees = [
  {
    id: 1,
    name: "Ionuț Pleșescu",
    photo: "/images/ionut_plesescu_professional.png",
    age: 45,
    birthDate: "19.09.1979",
    location: "Suceava, Roemenië",
    nationality: "Roemeens",
    experience: "20 jaar",
    title: "Specialist Metalen en Houten Constructies",
    summary: "Ervaren professional met 20 jaar ervaring in de bouwsector, gespecialiseerd in metalen en houten constructies, metalen dakpannen montage, metselwerk en timmerwerk. Bekend om aandacht voor detail en naleving van veiligheidsnormen.",
    skills: [
      "Metalen en Houten Constructies",
      "Montage Metalen Dakpannen", 
      "Metselwerk",
      "Timmerwerk",
      "Arbeidsveiligheid",
      "Tekeningen Lezen",
      "Professioneel Gereedschap"
    ],
    certifications: [
      "Gekwalificeerd in metalen en houten constructies",
      "Gekwalificeerd in montage metalen dakpannen",
      "Certificaat metselwerk",
      "Certificaat timmerwerk"
    ],
    availability: "Direct beschikbaar",
    languages: ["Roemeens (moedertaal)"],
    rating: 4.9,
    industry: "construction"
  },
  {
    id: 2,
    name: "Gheorghe-Daniel Ignat",
    photo: "/images/gheorghe_daniel_ignat_professional.png",
    age: 38,
    birthDate: "31.08.1986",
    location: "Suceava, Roemenië",
    nationality: "Roemeens",
    experience: "15 jaar",
    title: "Allround Bouwvakker",
    summary: "Bouwvakker met uitgebreide ervaring in verschillende bouwgebieden. Gespecialiseerd in metselwerk, pleisterwerk en interieurafwerking. Gericht op kwaliteit en het naleven van deadlines.",
    skills: [
      "Algemeen Metselwerk",
      "Pleisterwerk en Afwerking",
      "Gipsplaat Montage",
      "Thermische Isolatie",
      "Vloeren en Betegeling",
      "Interieur Renovaties",
      "Bouwplaats Organisatie"
    ],
    certifications: [
      "Certificaat beroepsonderwijs",
      "Kwalificatie burgerlijke bouwkunde",
      "VCA certificaat"
    ],
    availability: "Direct beschikbaar",
    languages: ["Roemeens (moedertaal)"],
    rating: 4.7,
    industry: "construction"
  },
  {
    id: 3,
    name: "Cristinel Roșu",
    photo: "/images/cristinel_rosu_professional.png",
    age: 46,
    birthDate: "12.05.1979",
    location: "Suceava, Roemenië",
    nationality: "Roemeens",
    experience: "22 jaar",
    title: "Specialist Metselaar, Steenhouwer, Stukadoor",
    summary: "Ervaren vakman met meer dan 22 jaar in de bouw, gespecialiseerd in metselwerk, steenhouwwerk en pleisterwerk. Expert in traditionele en moderne bouwtechnieken. Teamleider met uitstekende organisatorische vaardigheden.",
    skills: [
      "Traditioneel en Modern Metselwerk",
      "Steenhouwwerk en Decoratief Metselwerk",
      "Binnen- en Buitenpleisterwerk",
      "Natuursteen Constructies",
      "Restauratie Oude Gebouwen",
      "Teamleiding",
      "Materiaal Calculatie"
    ],
    certifications: [
      "Beroepskwalificatie - Metselaar, Steenhouwer, Stukadoor",
      "Certificaat beroepsopleiding voor volwassenen",
      "VCA certificaat gevorderd niveau"
    ],
    availability: "Direct beschikbaar",
    languages: ["Roemeens (moedertaal)"],
    rating: 4.8,
    industry: "construction"
  },
  {
    id: 4,
    name: "Alexandru-Iliuță Gulei",
    photo: "/images/alexandru_gulei_professional.png",
    age: 25,
    birthDate: "07.08.2000",
    location: "Suceava, Roemenië",
    nationality: "Roemeens",
    experience: "5 jaar",
    title: "Junior Bouwspecialist",
    summary: "Energieke en gemotiveerde jonge professional met 5 jaar ervaring in de bouw. Snel in het leren en aanpassen aan nieuwe technologieën. Gespecialiseerd in moderne afwerking en montage.",
    skills: [
      "Moderne Interieurafwerking",
      "Drywall Systemen Montage",
      "Laminaat en PVC Vloeren",
      "Lichte Timmerwerken",
      "Basis Sanitaire Installaties",
      "Moderne Technologieën",
      "Teamwork"
    ],
    certifications: [
      "Kwalificatiecertificaat bouwkunde",
      "Certificaat beroepsopleiding",
      "VCA certificaat"
    ],
    availability: "Direct beschikbaar",
    languages: ["Roemeens (moedertaal)", "Engels (basis)"],
    rating: 4.6,
    industry: "construction"
  },
  {
    id: 5,
    name: "Narcis-Neculai Ionițe",
    photo: "/images/narcis_ionite_professional.png",
    age: 33,
    birthDate: "10.08.1991",
    location: "Suceava, Roemenië",
    nationality: "Roemeens",
    experience: "12 jaar",
    title: "Specialist Bouw en Renovaties",
    summary: "Professional met 12 jaar ervaring in bouw en renovaties. Gespecialiseerd in complexe renovatiewerken en modernisering. Uitstekende vaardigheden in projectcoördinatie en kwaliteitscontrole.",
    skills: [
      "Complete Renovaties",
      "Gebouw Modernisering",
      "Metselwerk en Pleisterwerk",
      "Basis Elektrische Installaties",
      "Interieur Inrichting",
      "Projectcoördinatie",
      "Kwaliteitscontrole"
    ],
    certifications: [
      "Kwalificatiecertificaat bouwkunde",
      "Certificaat renovaties en modernisering",
      "VCA certificaat"
    ],
    availability: "Direct beschikbaar",
    languages: ["Roemeens (moedertaal)"],
    rating: 4.7,
    industry: "construction"
  }
];

export default function Employees() {
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [industryFilter, setIndustryFilter] = useState('all');

  const filteredEmployees = employees.filter(employee => {
    const matchesSearch = employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         employee.skills.some(skill => skill.toLowerCase().includes(searchTerm.toLowerCase())) ||
                         employee.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesIndustry = industryFilter === 'all' || employee.industry === industryFilter;
    return matchesSearch && matchesIndustry;
  });

  const renderStars = (rating) => {
    return [...Array(5)].map((_, i) => (
      <span key={i} className={`text-lg ${i < Math.floor(rating) ? 'text-yellow-400' : 'text-gray-300'}`}>
        ★
      </span>
    ));
  };

  return (
    <div>
      <Head>
        <title>Beschikbare Werknemers | Glodinas Flex Work</title>
        <meta name="description" content="Ontdek onze gekwalificeerde en ervaren werknemers beschikbaar voor flexibele arbeidsplaatsing in Nederland" />
      </Head>

      {/* Hero Section */}
      <section className="bg-orange-600 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Onze Beschikbare Werknemers</h1>
            <p className="text-xl mb-8 max-w-3xl mx-auto">
              Ontdek gekwalificeerde professionals klaar voor flexibele arbeidsplaatsing. 
              Elk profiel toont ervaring, vaardigheden en certificeringen.
            </p>
            <div className="flex flex-wrap justify-center gap-4 text-sm">
              <div className="bg-white bg-opacity-20 px-4 py-2 rounded-full">
                <span className="font-semibold">5</span> Beschikbare Werknemers
              </div>
              <div className="bg-white bg-opacity-20 px-4 py-2 rounded-full">
                <span className="font-semibold">95%</span> Tevredenheidscore
              </div>
              <div className="bg-white bg-opacity-20 px-4 py-2 rounded-full">
                <span className="font-semibold">24/7</span> Beschikbaarheid
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Search and Filter Section */}
      <section className="py-8 bg-gray-100">
        <div className="container mx-auto px-4">
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <input
                  type="text"
                  placeholder="Zoek op naam, vaardigheden of specialisatie..."
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <div className="md:w-48">
                <select
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  value={industryFilter}
                  onChange={(e) => setIndustryFilter(e.target.value)}
                >
                  <option value="all">Alle Sectoren</option>
                  <option value="construction">Bouw</option>
                  <option value="logistics">Logistiek</option>
                  <option value="manufacturing">Productie</option>
                </select>
              </div>
              <button 
                onClick={() => {setSearchTerm(''); setIndustryFilter('all');}}
                className="px-6 py-3 bg-gray-200 hover:bg-gray-300 rounded-lg font-medium transition duration-300"
              >
                Reset
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Employees Grid */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredEmployees.map((employee) => (
              <div key={employee.id} className="bg-white border border-gray-200 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                <div className="p-6">
                  {/* Profile Header */}
                  <div className="text-center mb-6">
                    <div className="relative mx-auto mb-4">
                      <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-orange-200 shadow-lg mx-auto">
                        <Image
                          src={employee.photo}
                          alt={employee.name}
                          width={128}
                          height={128}
                          className="object-cover w-full h-full"
                        />
                      </div>
                      <div className="absolute -bottom-2 -right-2 bg-green-500 text-white px-2 py-1 rounded-full text-xs font-semibold">
                        Beschikbaar
                      </div>
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{employee.name}</h3>
                    <p className="text-orange-600 font-semibold mb-2">{employee.title}</p>
                    <div className="flex items-center justify-center mb-2">
                      {renderStars(employee.rating)}
                      <span className="ml-2 text-sm text-gray-600">({employee.rating})</span>
                    </div>
                  </div>

                  {/* Quick Info */}
                  <div className="space-y-3 mb-6">
                    <div className="flex items-center text-sm text-gray-600">
                      <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      <span>{employee.experience} ervaring</span>
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      <span>{employee.location}</span>
                    </div>
                  </div>

                  {/* Skills Preview */}
                  <div className="mb-6">
                    <h4 className="font-semibold text-gray-900 mb-2">Belangrijkste Vaardigheden:</h4>
                    <div className="flex flex-wrap gap-1">
                      {employee.skills.slice(0, 3).map((skill, index) => (
                        <span key={index} className="bg-orange-100 text-orange-800 text-xs px-2 py-1 rounded-full">
                          {skill}
                        </span>
                      ))}
                      {employee.skills.length > 3 && (
                        <span className="bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded-full">
                          +{employee.skills.length - 3} meer
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Action Button */}
                  <button 
                    onClick={() => setSelectedEmployee(employee)}
                    className="w-full bg-orange-600 hover:bg-orange-700 text-white py-3 px-4 rounded-lg font-medium transition duration-300"
                  >
                    Bekijk Volledig Profiel
                  </button>
                </div>
              </div>
            ))}
          </div>

          {filteredEmployees.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-600 text-lg">Geen werknemers gevonden die voldoen aan uw zoekcriteria.</p>
              <button 
                onClick={() => {setSearchTerm(''); setIndustryFilter('all');}}
                className="mt-4 bg-orange-600 hover:bg-orange-700 text-white py-2 px-4 rounded-lg"
              >
                Reset Filters
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Employee Detail Modal */}
      {selectedEmployee && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-75 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              {/* Modal Header */}
              <div className="flex justify-between items-start mb-6">
                <div className="flex items-center space-x-6">
                  <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-orange-200">
                    <Image
                      src={selectedEmployee.photo}
                      alt={selectedEmployee.name}
                      width={96}
                      height={96}
                      className="object-cover w-full h-full"
                    />
                  </div>
                  <div>
                    <h2 className="text-3xl font-bold text-gray-900">{selectedEmployee.name}</h2>
                    <p className="text-xl text-orange-600 font-semibold">{selectedEmployee.title}</p>
                    <div className="flex items-center mt-2">
                      {renderStars(selectedEmployee.rating)}
                      <span className="ml-2 text-gray-600">({selectedEmployee.rating})</span>
                    </div>
                  </div>
                </div>
                <button 
                  onClick={() => setSelectedEmployee(null)}
                  className="text-gray-400 hover:text-gray-600 text-2xl font-bold"
                >
                  ✕
                </button>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Left Column - Personal Info */}
                <div className="space-y-6">
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h3 className="text-lg font-semibold mb-4 flex items-center">
                      <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                      Persoonlijke Informatie
                    </h3>
                    <div className="space-y-2 text-sm">
                      <p><strong>Leeftijd:</strong> {selectedEmployee.age} jaar</p>
                      <p><strong>Geboortedatum:</strong> {selectedEmployee.birthDate}</p>
                      <p><strong>Nationaliteit:</strong> {selectedEmployee.nationality}</p>
                      <p><strong>Ervaring:</strong> {selectedEmployee.experience}</p>
                      <p><strong>Beschikbaarheid:</strong> <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-semibold">{selectedEmployee.availability}</span></p>
                    </div>
                  </div>

                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h3 className="text-lg font-semibold mb-4 flex items-center">
                      <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      Certificeringen
                    </h3>
                    <ul className="space-y-2 text-sm list-disc list-inside">
                      {selectedEmployee.certifications.map((cert, index) => (
                        <li key={index}>{cert}</li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Right Column - Profile & Skills */}
                <div className="lg:col-span-2 space-y-6">
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h3 className="text-lg font-semibold mb-4 flex items-center">
                      <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      Professioneel Profiel
                    </h3>
                    <p className="text-sm text-gray-700">
                      {selectedEmployee.summary}
                    </p>
                  </div>

                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h3 className="text-lg font-semibold mb-4 flex items-center">
                      <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.293 2.293a1 1 0 010 1.414L11 15.414l-2.293-2.293a1 1 0 010-1.414L11 9.414l2.293 2.293a1 1 0 010 1.414L11 15.414l-2.293-2.293a1 1 0 010-1.414L11 9.414" />
                      </svg>
                      Vaardigheden en Specialisaties
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {selectedEmployee.skills.map((skill, index) => (
                        <span key={index} className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h3 className="text-lg font-semibold mb-4 flex items-center">
                      <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5h12M9 3v2m1.06 5.06l-2.12 2.12M15.94 15.94l-2.12-2.12M12 19v-2m-6.94-6.94l2.12-2.12M3 12h2m14 0h2M6.06 6.06l2.12 2.12" />
                      </svg>
                      Gesproken Talen
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {selectedEmployee.languages.map((lang, index) => (
                        <span key={index} className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm">
                          {lang}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Modal Footer */}
              <div className="mt-8 pt-6 border-t border-gray-200 text-center">
                <h3 className="text-lg font-semibold mb-4">Interesse in deze professional?</h3>
                <Link href="/contact" className="bg-green-600 hover:bg-green-700 text-white py-3 px-8 rounded-lg font-medium transition duration-300 inline-flex items-center">
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  Contact voor Inhuur
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

