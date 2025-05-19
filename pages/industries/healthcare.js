import Head from 'next/head';
import Link from 'next/link';
import Breadcrumb from '../../components/Breadcrumb';

export default function Healthcare() {
  return (
    <>
      <Head>
        <title>Healthcare Staffing Solutions | Glodinas Flex Work</title>
        <meta
          name="description"
          content="Specialized healthcare staffing solutions connecting qualified professionals with healthcare facilities across the Netherlands. Nursing, medical assistance, and care support staffing."
        />
      </Head>

      {/* Hero Section */}
      <section
        className="relative h-[400px] flex items-center justify-center text-white text-center px-4"
        style={{
          backgroundImage: "url('/images/industries/healthcare-hero.jpg')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="bg-black/40 absolute inset-0 z-0" />
        <div className="relative z-10 max-w-3xl">
          <h1 className="text-4xl font-bold mb-3">Healthcare Staffing Solutions</h1>
          <p className="text-lg">Supporting patient care with compassionate, qualified healthcare professionals</p>
        </div>
      </section>

      {/* Breadcrumb */}
      <div className="max-w-6xl mx-auto px-4 pt-4">
        <Breadcrumb currentPage="Healthcare" />
      </div>

      {/* Industry Overview Section */}
      <section className="py-12 px-4 max-w-6xl mx-auto text-gray-800">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold mb-6">Healthcare Industry Expertise</h2>
            <p className="text-lg mb-6">
              The healthcare sector in the Netherlands faces growing demands with an aging population and evolving care models. Glodinas Flex Work provides healthcare facilities with qualified, compassionate staff who can deliver exceptional patient care while helping facilities manage fluctuating demands and specialized needs.
            </p>
            <div className="bg-orange-50 border-l-4 border-orange-500 p-4 mb-6">
              <h3 className="font-bold text-xl mb-2">Key Industry Challenges</h3>
              <ul className="list-disc pl-5 space-y-2">
                <li>Finding qualified healthcare professionals with proper certifications</li>
                <li>Ensuring continuity of care with temporary staff</li>
                <li>Managing compliance with healthcare regulations</li>
                <li>Covering shifts during staff shortages and peak periods</li>
                <li>Balancing quality care with operational efficiency</li>
              </ul>
            </div>
          </div>
          <div>
            <img src="/images/industries/healthcare-detail.jpg" alt="Healthcare Services" className="rounded-lg shadow-md w-full h-auto object-cover" />
          </div>
        </div>
      </section>

      {/* Our Solutions Section */}
      <section className="py-12 bg-gray-50 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-center">Our Specialized Healthcare Solutions</h2>
          
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="text-4xl text-orange-500 mb-4">🔍</div>
              <h3 className="text-xl font-bold mb-3">Credential Verification</h3>
              <p className="text-gray-600">Rigorous background checks and certification validation for all healthcare staff.</p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="text-4xl text-orange-500 mb-4">🏥</div>
              <h3 className="text-xl font-bold mb-3">Healthcare-Specific Training</h3>
              <p className="text-gray-600">Specialized orientation ensuring staff understand your facility's protocols and standards.</p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="text-4xl text-orange-500 mb-4">📋</div>
              <h3 className="text-xl font-bold mb-3">Compliance Management</h3>
              <p className="text-gray-600">Ensuring all placements meet healthcare regulations and facility requirements.</p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="text-4xl text-orange-500 mb-4">⏰</div>
              <h3 className="text-xl font-bold mb-3">24/7 Availability</h3>
              <p className="text-gray-600">Round-the-clock support for emergency staffing needs and shift coverage.</p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="text-4xl text-orange-500 mb-4">🔄</div>
              <h3 className="text-xl font-bold mb-3">Specialized Matching</h3>
              <p className="text-gray-600">Precise placement based on department needs, patient population, and facility culture.</p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="text-4xl text-orange-500 mb-4">❤️</div>
              <h3 className="text-xl font-bold mb-3">Compassionate Care Focus</h3>
              <p className="text-gray-600">Staff selected for both technical skills and patient-centered care approach.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Roles We Staff Section */}
      <section className="py-12 px-4 max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold mb-8 text-center">Healthcare Roles We Staff</h2>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="border border-gray-200 rounded-lg p-4 text-center">
            <div className="text-3xl text-orange-500 mb-2">👨‍⚕️</div>
            <h3 className="font-semibold">Certified Nursing Assistants</h3>
          </div>
          
          <div className="border border-gray-200 rounded-lg p-4 text-center">
            <div className="text-3xl text-orange-500 mb-2">👩‍⚕️</div>
            <h3 className="font-semibold">Licensed Practical Nurses</h3>
          </div>
          
          <div className="border border-gray-200 rounded-lg p-4 text-center">
            <div className="text-3xl text-orange-500 mb-2">💉</div>
            <h3 className="font-semibold">Registered Nurses</h3>
          </div>
          
          <div className="border border-gray-200 rounded-lg p-4 text-center">
            <div className="text-3xl text-orange-500 mb-2">🩺</div>
            <h3 className="font-semibold">Medical Assistants</h3>
          </div>
          
          <div className="border border-gray-200 rounded-lg p-4 text-center">
            <div className="text-3xl text-orange-500 mb-2">📝</div>
            <h3 className="font-semibold">Healthcare Administrative Staff</h3>
          </div>
          
          <div className="border border-gray-200 rounded-lg p-4 text-center">
            <div className="text-3xl text-orange-500 mb-2">👵</div>
            <h3 className="font-semibold">Elderly Care Specialists</h3>
          </div>
          
          <div className="border border-gray-200 rounded-lg p-4 text-center">
            <div className="text-3xl text-orange-500 mb-2">🏠</div>
            <h3 className="font-semibold">Home Health Aides</h3>
          </div>
          
          <div className="border border-gray-200 rounded-lg p-4 text-center">
            <div className="text-3xl text-orange-500 mb-2">♿</div>
            <h3 className="font-semibold">Rehabilitation Support Staff</h3>
          </div>
        </div>
      </section>

      {/* Success Metrics Section */}
      <section className="py-12 bg-gray-50 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-center">Our Healthcare Staffing Success</h2>
          
          <div className="grid md:grid-cols-4 gap-6 text-center">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="text-4xl font-bold text-orange-600 mb-2">100%</div>
              <p className="text-gray-700">Credential verification</p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="text-4xl font-bold text-orange-600 mb-2">24h</div>
              <p className="text-gray-700">Response for critical needs</p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="text-4xl font-bold text-orange-600 mb-2">92%</div>
              <p className="text-gray-700">Patient satisfaction ratings</p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="text-4xl font-bold text-orange-600 mb-2">-40%</div>
              <p className="text-gray-700">Administrative burden</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonial Section */}
      <section className="py-12 px-4 max-w-6xl mx-auto">
        <div className="bg-orange-50 p-8 rounded-lg">
          <div className="text-5xl text-orange-300 mb-4">"</div>
          <p className="text-xl italic mb-6">
            Glodinas Flex Work understands the unique demands of healthcare staffing. Their professionals arrive with the right certifications, experience, and compassionate approach our patients deserve.
          </p>
          <p className="font-semibold">— Director of Nursing, Regional Care Center</p>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 px-4 max-w-6xl mx-auto text-center">
        <h2 className="text-3xl font-bold mb-6">Ensure Quality Patient Care</h2>
        <p className="text-lg mb-8 max-w-3xl mx-auto">
          Whether you need qualified healthcare staff or you're looking for opportunities in the healthcare sector, Glodinas Flex Work is your trusted partner.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Link href="/employers">
            <a className="bg-orange-600 hover:bg-orange-700 text-white font-semibold px-6 py-3 rounded-lg shadow">
              Find Qualified Healthcare Staff
            </a>
          </Link>
          <Link href="/job-seekers">
            <a className="bg-white text-orange-600 border border-orange-500 hover:bg-orange-50 font-semibold px-6 py-3 rounded-lg shadow">
              Explore Healthcare Positions
            </a>
          </Link>
        </div>
      </section>
    </>
  );
}
