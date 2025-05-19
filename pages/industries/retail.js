import Head from 'next/head';
import Link from 'next/link';
import Breadcrumb from '../../components/Breadcrumb';

export default function Retail() {
  return (
    <>
      <Head>
        <title>Retail Staffing Solutions | Glodinas Flex Work</title>
        <meta
          name="description"
          content="Specialized retail staffing solutions connecting sales-focused professionals with retail businesses across the Netherlands. Enhance customer experiences and boost sales."
        />
      </Head>

      {/* Hero Section */}
      <section
        className="relative h-[400px] flex items-center justify-center text-white text-center px-4"
        style={{
          backgroundImage: "url('/images/industries/retail-hero.jpg')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="bg-black/40 absolute inset-0 z-0" />
        <div className="relative z-10 max-w-3xl">
          <h1 className="text-4xl font-bold mb-3">Retail Staffing Solutions</h1>
          <p className="text-lg">Enhancing customer experiences with sales-focused, reliable retail professionals</p>
        </div>
      </section>

      {/* Breadcrumb */}
      <div className="max-w-6xl mx-auto px-4 pt-4">
        <Breadcrumb currentPage="Retail" />
      </div>

      {/* Industry Overview Section */}
      <section className="py-12 px-4 max-w-6xl mx-auto text-gray-800">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold mb-6">Retail Industry Expertise</h2>
            <p className="text-lg mb-6">
              The retail landscape in the Netherlands combines traditional shopping districts with modern retail concepts, all requiring flexible staffing solutions to manage seasonal peaks and evolving consumer expectations. Glodinas Flex Work provides retailers with customer-focused staff who drive sales and enhance the shopping experience.
            </p>
            <div className="bg-orange-50 border-l-4 border-orange-500 p-4 mb-6">
              <h3 className="font-bold text-xl mb-2">Key Industry Challenges</h3>
              <ul className="list-disc pl-5 space-y-2">
                <li>Scaling staff for holiday seasons and promotional events</li>
                <li>Finding sales-oriented professionals with product knowledge</li>
                <li>Maintaining consistent customer experiences</li>
                <li>Managing extended hours and weekend coverage</li>
                <li>Balancing staffing costs with sales performance</li>
              </ul>
            </div>
          </div>
          <div>
            <img src="/images/industries/retail-detail.jpg" alt="Retail Operations" className="rounded-lg shadow-md w-full h-auto object-cover" />
          </div>
        </div>
      </section>

      {/* Our Solutions Section */}
      <section className="py-12 bg-gray-50 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-center">Our Specialized Retail Solutions</h2>
          
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="text-4xl text-orange-500 mb-4">🛍️</div>
              <h3 className="text-xl font-bold mb-3">Sales-Focused Staff</h3>
              <p className="text-gray-600">Retail professionals with proven sales capabilities and customer service skills.</p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="text-4xl text-orange-500 mb-4">📊</div>
              <h3 className="text-xl font-bold mb-3">Seasonal Flexibility</h3>
              <p className="text-gray-600">Scalable workforce solutions for holiday seasons and promotional periods.</p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="text-4xl text-orange-500 mb-4">🎓</div>
              <h3 className="text-xl font-bold mb-3">Customer Service Training</h3>
              <p className="text-gray-600">Staff with verified customer service training and retail experience.</p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="text-4xl text-orange-500 mb-4">⏱️</div>
              <h3 className="text-xl font-bold mb-3">Quick Deployment</h3>
              <p className="text-gray-600">Rapid staffing solutions for last-minute coverage and extended hours.</p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="text-4xl text-orange-500 mb-4">🏆</div>
              <h3 className="text-xl font-bold mb-3">Performance-Based Selection</h3>
              <p className="text-gray-600">Staff selected for sales aptitude and performance metrics for critical positions.</p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="text-4xl text-orange-500 mb-4">🤝</div>
              <h3 className="text-xl font-bold mb-3">Brand Representation</h3>
              <p className="text-gray-600">Workers trained to embody your brand values and customer experience standards.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Roles We Staff Section */}
      <section className="py-12 px-4 max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold mb-8 text-center">Retail Roles We Staff</h2>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="border border-gray-200 rounded-lg p-4 text-center">
            <div className="text-3xl text-orange-500 mb-2">👔</div>
            <h3 className="font-semibold">Sales Associates</h3>
          </div>
          
          <div className="border border-gray-200 rounded-lg p-4 text-center">
            <div className="text-3xl text-orange-500 mb-2">💰</div>
            <h3 className="font-semibold">Cashiers & POS Specialists</h3>
          </div>
          
          <div className="border border-gray-200 rounded-lg p-4 text-center">
            <div className="text-3xl text-orange-500 mb-2">🎨</div>
            <h3 className="font-semibold">Visual Merchandisers</h3>
          </div>
          
          <div className="border border-gray-200 rounded-lg p-4 text-center">
            <div className="text-3xl text-orange-500 mb-2">📦</div>
            <h3 className="font-semibold">Stock Room Associates</h3>
          </div>
          
          <div className="border border-gray-200 rounded-lg p-4 text-center">
            <div className="text-3xl text-orange-500 mb-2">👨‍💼</div>
            <h3 className="font-semibold">Department Managers</h3>
          </div>
          
          <div className="border border-gray-200 rounded-lg p-4 text-center">
            <div className="text-3xl text-orange-500 mb-2">🙋‍♀️</div>
            <h3 className="font-semibold">Customer Service Representatives</h3>
          </div>
          
          <div className="border border-gray-200 rounded-lg p-4 text-center">
            <div className="text-3xl text-orange-500 mb-2">🔒</div>
            <h3 className="font-semibold">Retail Security Personnel</h3>
          </div>
          
          <div className="border border-gray-200 rounded-lg p-4 text-center">
            <div className="text-3xl text-orange-500 mb-2">📊</div>
            <h3 className="font-semibold">Store Managers</h3>
          </div>
        </div>
      </section>

      {/* Success Metrics Section */}
      <section className="py-12 bg-gray-50 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-center">Our Retail Staffing Success</h2>
          
          <div className="grid md:grid-cols-4 gap-6 text-center">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="text-4xl font-bold text-orange-600 mb-2">35%</div>
              <p className="text-gray-700">Faster seasonal ramp-up</p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="text-4xl font-bold text-orange-600 mb-2">100%</div>
              <p className="text-gray-700">Major shopping district coverage</p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="text-4xl font-bold text-orange-600 mb-2">94%</div>
              <p className="text-gray-700">Customer satisfaction ratings</p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="text-4xl font-bold text-orange-600 mb-2">-25%</div>
              <p className="text-gray-700">Reduced turnover rate</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonial Section */}
      <section className="py-12 px-4 max-w-6xl mx-auto">
        <div className="bg-orange-50 p-8 rounded-lg">
          <div className="text-5xl text-orange-300 mb-4">"</div>
          <p className="text-xl italic mb-6">
            Glodinas Flex Work has been essential to our success during the holiday season. Their retail staff arrive with the right attitude, product knowledge, and customer service skills to represent our brand effectively.
          </p>
          <p className="font-semibold">— Regional Manager, National Retail Chain</p>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 px-4 max-w-6xl mx-auto text-center">
        <h2 className="text-3xl font-bold mb-6">Boost Your Sales Performance</h2>
        <p className="text-lg mb-8 max-w-3xl mx-auto">
          Whether you need customer-focused retail staff or you're looking for opportunities in the retail sector, Glodinas Flex Work is your trusted partner.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Link href="/employers">
            <a className="bg-orange-600 hover:bg-orange-700 text-white font-semibold px-6 py-3 rounded-lg shadow">
              Find Customer-Focused Retail Staff
            </a>
          </Link>
          <Link href="/job-seekers">
            <a className="bg-white text-orange-600 border border-orange-500 hover:bg-orange-50 font-semibold px-6 py-3 rounded-lg shadow">
              Explore Retail Positions
            </a>
          </Link>
        </div>
      </section>
    </>
  );
}
