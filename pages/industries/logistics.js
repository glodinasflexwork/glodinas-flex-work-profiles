import Head from 'next/head';
import Link from 'next/link';
import Breadcrumb from '../../components/Breadcrumb';

export default function Logistics() {
  return (
    <>
      <Head>
        <title>Logistics Staffing Solutions | Glodinas Flex Work</title>
        <meta
          name="description"
          content="Specialized logistics staffing solutions connecting skilled workers with leading logistics companies across the Netherlands. Warehouse, distribution, and transportation staffing."
        />
      </Head>

      {/* Hero Section */}
      <section
        className="relative h-[400px] flex items-center justify-center text-white text-center px-4"
        style={{
          backgroundImage: "url('/images/industries/logistics-hero.jpg')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="bg-black/40 absolute inset-0 z-0" />
        <div className="relative z-10 max-w-3xl">
          <h1 className="text-4xl font-bold mb-3">Logistics Staffing Solutions</h1>
          <p className="text-lg">Connecting skilled workers with leading logistics companies across the Netherlands</p>
        </div>
      </section>

      {/* Breadcrumb */}
      <div className="max-w-6xl mx-auto px-4 pt-4">
        <Breadcrumb currentPage="Logistics" />
      </div>

      {/* Industry Overview Section */}
      <section className="py-12 px-4 max-w-6xl mx-auto text-gray-800">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold mb-6">Logistics Industry Expertise</h2>
            <p className="text-lg mb-6">
              The logistics sector is the backbone of the Dutch economy, with Rotterdam being Europe's largest port and the Netherlands serving as a key distribution hub. At Glodinas Flex Work, we understand the unique staffing challenges facing logistics companies - from seasonal fluctuations to specialized skill requirements and tight delivery deadlines.
            </p>
            <div className="bg-orange-50 border-l-4 border-orange-500 p-4 mb-6">
              <h3 className="font-bold text-xl mb-2">Key Industry Challenges</h3>
              <ul className="list-disc pl-5 space-y-2">
                <li>Managing workforce fluctuations during peak seasons</li>
                <li>Finding qualified workers with specific certifications (forklift, reach truck, etc.)</li>
                <li>Maintaining efficiency with temporary staff</li>
                <li>Multilingual requirements for international operations</li>
                <li>Compliance with transportation and safety regulations</li>
              </ul>
            </div>
          </div>
          <div>
            <img src="/images/industries/logistics-detail.jpg" alt="Logistics Operations" className="rounded-lg shadow-md w-full h-auto object-cover" />
          </div>
        </div>
      </section>

      {/* Our Solutions Section */}
      <section className="py-12 bg-gray-50 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-center">Our Specialized Logistics Solutions</h2>
          
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="text-4xl text-orange-500 mb-4">⏱️</div>
              <h3 className="text-xl font-bold mb-3">Rapid Deployment</h3>
              <p className="text-gray-600">Pre-screened, certified logistics personnel available within 24 hours for urgent staffing needs.</p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="text-4xl text-orange-500 mb-4">📊</div>
              <h3 className="text-xl font-bold mb-3">Flexible Staffing Models</h3>
              <p className="text-gray-600">Scalable workforce solutions to handle seasonal demands and fluctuating workloads.</p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="text-4xl text-orange-500 mb-4">🌍</div>
              <h3 className="text-xl font-bold mb-3">Multilingual Workers</h3>
              <p className="text-gray-600">Staff fluent in Dutch, English, Polish, Romanian, and Bulgarian to support international operations.</p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="text-4xl text-orange-500 mb-4">🔄</div>
              <h3 className="text-xl font-bold mb-3">Comprehensive Onboarding</h3>
              <p className="text-gray-600">Thorough safety training and orientation to ensure workers are productive from day one.</p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="text-4xl text-orange-500 mb-4">📱</div>
              <h3 className="text-xl font-bold mb-3">Digital Management Tools</h3>
              <p className="text-gray-600">Real-time tracking and management of your temporary workforce through our platform.</p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="text-4xl text-orange-500 mb-4">✅</div>
              <h3 className="text-xl font-bold mb-3">Compliance Assurance</h3>
              <p className="text-gray-600">All workers verified for proper certifications and compliance with industry regulations.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Roles We Staff Section */}
      <section className="py-12 px-4 max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold mb-8 text-center">Logistics Roles We Staff</h2>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="border border-gray-200 rounded-lg p-4 text-center">
            <div className="text-3xl text-orange-500 mb-2">🏭</div>
            <h3 className="font-semibold">Warehouse Associates</h3>
          </div>
          
          <div className="border border-gray-200 rounded-lg p-4 text-center">
            <div className="text-3xl text-orange-500 mb-2">🚜</div>
            <h3 className="font-semibold">Forklift Drivers</h3>
          </div>
          
          <div className="border border-gray-200 rounded-lg p-4 text-center">
            <div className="text-3xl text-orange-500 mb-2">📦</div>
            <h3 className="font-semibold">Order Pickers & Packers</h3>
          </div>
          
          <div className="border border-gray-200 rounded-lg p-4 text-center">
            <div className="text-3xl text-orange-500 mb-2">📋</div>
            <h3 className="font-semibold">Shipping Coordinators</h3>
          </div>
          
          <div className="border border-gray-200 rounded-lg p-4 text-center">
            <div className="text-3xl text-orange-500 mb-2">🔍</div>
            <h3 className="font-semibold">Inventory Specialists</h3>
          </div>
          
          <div className="border border-gray-200 rounded-lg p-4 text-center">
            <div className="text-3xl text-orange-500 mb-2">📈</div>
            <h3 className="font-semibold">Logistics Planners</h3>
          </div>
          
          <div className="border border-gray-200 rounded-lg p-4 text-center">
            <div className="text-3xl text-orange-500 mb-2">👨‍💼</div>
            <h3 className="font-semibold">Supervisors</h3>
          </div>
          
          <div className="border border-gray-200 rounded-lg p-4 text-center">
            <div className="text-3xl text-orange-500 mb-2">🚚</div>
            <h3 className="font-semibold">Delivery Drivers</h3>
          </div>
        </div>
      </section>

      {/* Success Metrics Section */}
      <section className="py-12 bg-gray-50 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-center">Our Logistics Staffing Success</h2>
          
          <div className="grid md:grid-cols-4 gap-6 text-center">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="text-4xl font-bold text-orange-600 mb-2">24h</div>
              <p className="text-gray-700">Placement for urgent logistics needs</p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="text-4xl font-bold text-orange-600 mb-2">95%</div>
              <p className="text-gray-700">Client satisfaction rate</p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="text-4xl font-bold text-orange-600 mb-2">30%</div>
              <p className="text-gray-700">Reduction in onboarding time</p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="text-4xl font-bold text-orange-600 mb-2">100%</div>
              <p className="text-gray-700">Coverage of major logistics hubs</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonial Section */}
      <section className="py-12 px-4 max-w-6xl mx-auto">
        <div className="bg-orange-50 p-8 rounded-lg">
          <div className="text-5xl text-orange-300 mb-4">"</div>
          <p className="text-xl italic mb-6">
            Glodinas Flex Work has been instrumental in helping us manage our warehouse staffing during peak seasons. Their workers arrive trained, certified, and ready to contribute from day one.
          </p>
          <p className="font-semibold">— Operations Manager, Major Distribution Center</p>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 px-4 max-w-6xl mx-auto text-center">
        <h2 className="text-3xl font-bold mb-6">Ready to Solve Your Logistics Staffing Challenges?</h2>
        <p className="text-lg mb-8 max-w-3xl mx-auto">
          Whether you need qualified logistics staff or you're looking for opportunities in the logistics sector, Glodinas Flex Work is your trusted partner.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Link href="/employers">
            <a className="bg-orange-600 hover:bg-orange-700 text-white font-semibold px-6 py-3 rounded-lg shadow">
              Need Qualified Logistics Staff?
            </a>
          </Link>
          <Link href="/job-seekers">
            <a className="bg-white text-orange-600 border border-orange-500 hover:bg-orange-50 font-semibold px-6 py-3 rounded-lg shadow">
              Looking for Logistics Work?
            </a>
          </Link>
        </div>
      </section>
    </>
  );
}
