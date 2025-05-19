import Head from 'next/head';
import Link from 'next/link';
import Breadcrumb from '../../components/Breadcrumb';

export default function Manufacturing() {
  return (
    <>
      <Head>
        <title>Manufacturing Staffing Solutions | Glodinas Flex Work</title>
        <meta
          name="description"
          content="Specialized manufacturing staffing solutions connecting skilled workers with leading production companies across the Netherlands. Production, assembly, and quality control staffing."
        />
      </Head>

      {/* Hero Section */}
      <section
        className="relative h-[400px] flex items-center justify-center text-white text-center px-4"
        style={{
          backgroundImage: "url('/images/industries/manufacturing-hero.jpg')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="bg-black/40 absolute inset-0 z-0" />
        <div className="relative z-10 max-w-3xl">
          <h1 className="text-4xl font-bold mb-3">Manufacturing Staffing Solutions</h1>
          <p className="text-lg">Powering production lines with skilled, reliable workers across the Netherlands</p>
        </div>
      </section>

      {/* Breadcrumb */}
      <div className="max-w-6xl mx-auto px-4 pt-4">
        <Breadcrumb currentPage="Manufacturing" />
      </div>

      {/* Industry Overview Section */}
      <section className="py-12 px-4 max-w-6xl mx-auto text-gray-800">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold mb-6">Manufacturing Industry Expertise</h2>
            <p className="text-lg mb-6">
              The manufacturing sector in the Netherlands is known for innovation and precision, from high-tech equipment to food processing. Glodinas Flex Work specializes in providing manufacturing companies with the skilled workforce needed to maintain production efficiency, quality standards, and operational flexibility.
            </p>
            <div className="bg-orange-50 border-l-4 border-orange-500 p-4 mb-6">
              <h3 className="font-bold text-xl mb-2">Key Industry Challenges</h3>
              <ul className="list-disc pl-5 space-y-2">
                <li>Finding workers with technical skills and manufacturing experience</li>
                <li>Scaling workforce to meet production demands</li>
                <li>Maintaining quality standards with temporary staff</li>
                <li>Ensuring workplace safety compliance</li>
                <li>Managing shift coverage and attendance</li>
              </ul>
            </div>
          </div>
          <div>
            <img src="/images/industries/manufacturing-detail.jpg" alt="Manufacturing Operations" className="rounded-lg shadow-md w-full h-auto object-cover" />
          </div>
        </div>
      </section>

      {/* Our Solutions Section */}
      <section className="py-12 bg-gray-50 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-center">Our Specialized Manufacturing Solutions</h2>
          
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="text-4xl text-orange-500 mb-4">🔧</div>
              <h3 className="text-xl font-bold mb-3">Technical Skills Assessment</h3>
              <p className="text-gray-600">Rigorous verification of technical abilities and manufacturing experience.</p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="text-4xl text-orange-500 mb-4">⏰</div>
              <h3 className="text-xl font-bold mb-3">All-Shift Coverage</h3>
              <p className="text-gray-600">Production-experienced staff available for all shifts, including nights and weekends.</p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="text-4xl text-orange-500 mb-4">✓</div>
              <h3 className="text-xl font-bold mb-3">Quality-Focused Training</h3>
              <p className="text-gray-600">Comprehensive onboarding emphasizing your quality standards and processes.</p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="text-4xl text-orange-500 mb-4">🛡️</div>
              <h3 className="text-xl font-bold mb-3">Safety Certification</h3>
              <p className="text-gray-600">Workers verified for safety training and compliance with industry regulations.</p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="text-4xl text-orange-500 mb-4">📊</div>
              <h3 className="text-xl font-bold mb-3">Attendance Management</h3>
              <p className="text-gray-600">Proactive monitoring and shift coverage guarantees to maintain production.</p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="text-4xl text-orange-500 mb-4">📈</div>
              <h3 className="text-xl font-bold mb-3">Scalable Workforce</h3>
              <p className="text-gray-600">Flexible staffing to quickly adapt to changing production demands.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Roles We Staff Section */}
      <section className="py-12 px-4 max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold mb-8 text-center">Manufacturing Roles We Staff</h2>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="border border-gray-200 rounded-lg p-4 text-center">
            <div className="text-3xl text-orange-500 mb-2">🏭</div>
            <h3 className="font-semibold">Production Line Operators</h3>
          </div>
          
          <div className="border border-gray-200 rounded-lg p-4 text-center">
            <div className="text-3xl text-orange-500 mb-2">🔧</div>
            <h3 className="font-semibold">Assembly Workers</h3>
          </div>
          
          <div className="border border-gray-200 rounded-lg p-4 text-center">
            <div className="text-3xl text-orange-500 mb-2">⚙️</div>
            <h3 className="font-semibold">Machine Operators</h3>
          </div>
          
          <div className="border border-gray-200 rounded-lg p-4 text-center">
            <div className="text-3xl text-orange-500 mb-2">🔍</div>
            <h3 className="font-semibold">Quality Control Inspectors</h3>
          </div>
          
          <div className="border border-gray-200 rounded-lg p-4 text-center">
            <div className="text-3xl text-orange-500 mb-2">🛠️</div>
            <h3 className="font-semibold">Maintenance Technicians</h3>
          </div>
          
          <div className="border border-gray-200 rounded-lg p-4 text-center">
            <div className="text-3xl text-orange-500 mb-2">👨‍💼</div>
            <h3 className="font-semibold">Production Supervisors</h3>
          </div>
          
          <div className="border border-gray-200 rounded-lg p-4 text-center">
            <div className="text-3xl text-orange-500 mb-2">📦</div>
            <h3 className="font-semibold">Packaging Specialists</h3>
          </div>
          
          <div className="border border-gray-200 rounded-lg p-4 text-center">
            <div className="text-3xl text-orange-500 mb-2">🚚</div>
            <h3 className="font-semibold">Material Handlers</h3>
          </div>
        </div>
      </section>

      {/* Success Metrics Section */}
      <section className="py-12 bg-gray-50 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-center">Our Manufacturing Staffing Success</h2>
          
          <div className="grid md:grid-cols-4 gap-6 text-center">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="text-4xl font-bold text-orange-600 mb-2">98%</div>
              <p className="text-gray-700">Shift fulfillment rate</p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="text-4xl font-bold text-orange-600 mb-2">40%</div>
              <p className="text-gray-700">Faster placement than average</p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="text-4xl font-bold text-orange-600 mb-2">100%</div>
              <p className="text-gray-700">Verified technical certifications</p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="text-4xl font-bold text-orange-600 mb-2">-50%</div>
              <p className="text-gray-700">Reduced training time</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonial Section */}
      <section className="py-12 px-4 max-w-6xl mx-auto">
        <div className="bg-orange-50 p-8 rounded-lg">
          <div className="text-5xl text-orange-300 mb-4">"</div>
          <p className="text-xl italic mb-6">
            When our production demands increased unexpectedly, Glodinas Flex Work provided qualified staff within 48 hours. Their workers understood our processes and integrated seamlessly with our permanent team.
          </p>
          <p className="font-semibold">— Production Manager, Electronics Manufacturer</p>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 px-4 max-w-6xl mx-auto text-center">
        <h2 className="text-3xl font-bold mb-6">Ready to Scale Your Production Capacity?</h2>
        <p className="text-lg mb-8 max-w-3xl mx-auto">
          Whether you need qualified manufacturing staff or you're looking for opportunities in the manufacturing sector, Glodinas Flex Work is your trusted partner.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Link href="/employers">
            <a className="bg-orange-600 hover:bg-orange-700 text-white font-semibold px-6 py-3 rounded-lg shadow">
              Scale Your Production Capacity
            </a>
          </Link>
          <Link href="/job-seekers">
            <a className="bg-white text-orange-600 border border-orange-500 hover:bg-orange-50 font-semibold px-6 py-3 rounded-lg shadow">
              Find Manufacturing Opportunities
            </a>
          </Link>
        </div>
      </section>
    </>
  );
}
