import Head from 'next/head';
import Link from 'next/link';
import Breadcrumb from '../../components/Breadcrumb';

export default function Hospitality() {
  return (
    <>
      <Head>
        <title>Hospitality Staffing Solutions | Glodinas Flex Work</title>
        <meta
          name="description"
          content="Specialized hospitality staffing solutions connecting service-oriented professionals with hotels, restaurants, and event venues across the Netherlands."
        />
      </Head>

      {/* Hero Section */}
      <section
        className="relative h-[400px] flex items-center justify-center text-white text-center px-4"
        style={{
          backgroundImage: "url('/images/industries/hospitality-hero.jpg')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="bg-black/40 absolute inset-0 z-0" />
        <div className="relative z-10 max-w-3xl">
          <h1 className="text-4xl font-bold mb-3">Hospitality Staffing Solutions</h1>
          <p className="text-lg">Elevating guest experiences with professional, service-oriented staff</p>
        </div>
      </section>

      {/* Breadcrumb */}
      <div className="max-w-6xl mx-auto px-4 pt-4">
        <Breadcrumb currentPage="Hospitality" />
      </div>

      {/* Industry Overview Section */}
      <section className="py-12 px-4 max-w-6xl mx-auto text-gray-800">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold mb-6">Hospitality Industry Expertise</h2>
            <p className="text-lg mb-6">
              The hospitality industry in the Netherlands thrives on tourism and business travel, demanding flexible staffing solutions that can adapt to seasonal fluctuations and event-driven demands. Glodinas Flex Work specializes in providing hospitality businesses with service-oriented professionals who enhance guest experiences and operational efficiency.
            </p>
            <div className="bg-orange-50 border-l-4 border-orange-500 p-4 mb-6">
              <h3 className="font-bold text-xl mb-2">Key Industry Challenges</h3>
              <ul className="list-disc pl-5 space-y-2">
                <li>Managing seasonal and event-driven staffing fluctuations</li>
                <li>Finding staff with appropriate service skills and languages</li>
                <li>Ensuring consistent guest experiences with temporary workers</li>
                <li>Covering multiple positions and shifts during peak periods</li>
                <li>Quick onboarding for time-sensitive staffing needs</li>
              </ul>
            </div>
          </div>
          <div>
            <img src="/images/industries/hospitality-detail.jpg" alt="Hospitality Services" className="rounded-lg shadow-md w-full h-auto object-cover" />
          </div>
        </div>
      </section>

      {/* Our Solutions Section */}
      <section className="py-12 bg-gray-50 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-center">Our Specialized Hospitality Solutions</h2>
          
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="text-4xl text-orange-500 mb-4">🏨</div>
              <h3 className="text-xl font-bold mb-3">Service-Trained Staff</h3>
              <p className="text-gray-600">Professionals with verified hospitality experience and service excellence.</p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="text-4xl text-orange-500 mb-4">🌍</div>
              <h3 className="text-xl font-bold mb-3">Multilingual Professionals</h3>
              <p className="text-gray-600">Staff fluent in multiple languages to serve international guests effectively.</p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="text-4xl text-orange-500 mb-4">📊</div>
              <h3 className="text-xl font-bold mb-3">Flexible Scheduling</h3>
              <p className="text-gray-600">Adaptable staffing for seasonal peaks, events, and fluctuating demands.</p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="text-4xl text-orange-500 mb-4">⏱️</div>
              <h3 className="text-xl font-bold mb-3">Last-Minute Solutions</h3>
              <p className="text-gray-600">Rapid response staffing for unexpected needs and emergency coverage.</p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="text-4xl text-orange-500 mb-4">🎓</div>
              <h3 className="text-xl font-bold mb-3">Certified Professionals</h3>
              <p className="text-gray-600">Staff with verified hospitality certifications and specialized training.</p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="text-4xl text-orange-500 mb-4">🤝</div>
              <h3 className="text-xl font-bold mb-3">Brand Alignment</h3>
              <p className="text-gray-600">Workers trained to represent your brand values and service standards.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Roles We Staff Section */}
      <section className="py-12 px-4 max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold mb-8 text-center">Hospitality Roles We Staff</h2>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="border border-gray-200 rounded-lg p-4 text-center">
            <div className="text-3xl text-orange-500 mb-2">🛎️</div>
            <h3 className="font-semibold">Front Desk & Reception</h3>
          </div>
          
          <div className="border border-gray-200 rounded-lg p-4 text-center">
            <div className="text-3xl text-orange-500 mb-2">🛏️</div>
            <h3 className="font-semibold">Housekeeping Staff</h3>
          </div>
          
          <div className="border border-gray-200 rounded-lg p-4 text-center">
            <div className="text-3xl text-orange-500 mb-2">🍽️</div>
            <h3 className="font-semibold">Food & Beverage Servers</h3>
          </div>
          
          <div className="border border-gray-200 rounded-lg p-4 text-center">
            <div className="text-3xl text-orange-500 mb-2">🍸</div>
            <h3 className="font-semibold">Bartenders & Baristas</h3>
          </div>
          
          <div className="border border-gray-200 rounded-lg p-4 text-center">
            <div className="text-3xl text-orange-500 mb-2">👨‍🍳</div>
            <h3 className="font-semibold">Kitchen Staff</h3>
          </div>
          
          <div className="border border-gray-200 rounded-lg p-4 text-center">
            <div className="text-3xl text-orange-500 mb-2">🎪</div>
            <h3 className="font-semibold">Event Staff</h3>
          </div>
          
          <div className="border border-gray-200 rounded-lg p-4 text-center">
            <div className="text-3xl text-orange-500 mb-2">🧳</div>
            <h3 className="font-semibold">Concierge Services</h3>
          </div>
          
          <div className="border border-gray-200 rounded-lg p-4 text-center">
            <div className="text-3xl text-orange-500 mb-2">👨‍💼</div>
            <h3 className="font-semibold">Hotel & Restaurant Managers</h3>
          </div>
        </div>
      </section>

      {/* Success Metrics Section */}
      <section className="py-12 bg-gray-50 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-center">Our Hospitality Staffing Success</h2>
          
          <div className="grid md:grid-cols-4 gap-6 text-center">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="text-4xl font-bold text-orange-600 mb-2">2h</div>
              <p className="text-gray-700">Response time for urgent needs</p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="text-4xl font-bold text-orange-600 mb-2">100%</div>
              <p className="text-gray-700">Coverage in tourist destinations</p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="text-4xl font-bold text-orange-600 mb-2">96%</div>
              <p className="text-gray-700">Client satisfaction rate</p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="text-4xl font-bold text-orange-600 mb-2">5+</div>
              <p className="text-gray-700">Languages supported</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonial Section */}
      <section className="py-12 px-4 max-w-6xl mx-auto">
        <div className="bg-orange-50 p-8 rounded-lg">
          <div className="text-5xl text-orange-300 mb-4">"</div>
          <p className="text-xl italic mb-6">
            During our busiest season, Glodinas Flex Work provided us with professional staff who maintained our service standards and delighted our guests. Their flexibility and quality of workers make them our go-to staffing partner.
          </p>
          <p className="font-semibold">— General Manager, Luxury Hotel Amsterdam</p>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 px-4 max-w-6xl mx-auto text-center">
        <h2 className="text-3xl font-bold mb-6">Elevate Your Guest Experience</h2>
        <p className="text-lg mb-8 max-w-3xl mx-auto">
          Whether you need qualified hospitality staff or you're looking for opportunities in the hospitality sector, Glodinas Flex Work is your trusted partner.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Link href="/employers">
            <a className="bg-orange-600 hover:bg-orange-700 text-white font-semibold px-6 py-3 rounded-lg shadow">
              Find Professional Hospitality Staff
            </a>
          </Link>
          <Link href="/job-seekers">
            <a className="bg-white text-orange-600 border border-orange-500 hover:bg-orange-50 font-semibold px-6 py-3 rounded-lg shadow">
              Discover Hospitality Opportunities
            </a>
          </Link>
        </div>
      </section>
    </>
  );
}
