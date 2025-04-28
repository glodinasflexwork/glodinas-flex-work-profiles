import Head from 'next/head';
import Breadcrumb from '../../components/Breadcrumb';

export default function Industries() {
  return (
    <>
      <Head>
        <title>Industries We Serve - Glodinas Flex Work B.V.</title>
        <meta
          name="description"
          content="Explore how Glodinas Flex Work B.V. connects skilled professionals with leading employers across logistics, hospitality, cleaning, food production, technical services, and agriculture sectors in the Netherlands."
        />
      </Head>

      {/* Hero Section */}
      <section
        className="relative h-[400px] flex items-center justify-center text-white text-center px-4"
        style={{
          backgroundImage: "url('/images/industries/industries-hero.jpg')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="bg-black/40 absolute inset-0 z-0" />
        <div className="relative z-10 max-w-3xl">
          <h1 className="text-4xl font-bold mb-3">Industries We Serve</h1>
          <p className="text-lg">From logistics to hospitality, we support businesses in diverse sectors.</p>
        </div>
      </section>

      {/* Breadcrumb */}
      <div className="max-w-6xl mx-auto px-4 pt-6">
        <Breadcrumb currentPage="Industries" />
      </div>

      {/* Main Content */}
      <section className="py-20 px-4 max-w-6xl mx-auto text-gray-800 space-y-12">

        {/* Intro */}
        <div className="text-center">
          <h2 className="text-3xl font-bold mb-4">Connecting Skilled Professionals with Leading Employers</h2>
          <p className="text-lg max-w-3xl mx-auto">
            At Glodinas Flex Work B.V., we connect skilled professionals with leading employers across various sectors in the Netherlands. Our expertise spans multiple industries, ensuring that both job seekers and companies find the perfect match for their needs.
          </p>
        </div>

        {/* Logistics */}
        <div>
          <h3 className="text-2xl font-semibold mb-3">Logistics</h3>
          <p>
            The Netherlands, with its strategic location and advanced infrastructure, is a hub for logistics and distribution.
            We provide staffing solutions for roles such as warehouse operatives, forklift drivers, and supply chain coordinators.
            Our candidates are trained to handle the fast-paced demands of logistics operations, ensuring efficiency and reliability.
          </p>
        </div>

        {/* Hospitality */}
        <div>
          <h3 className="text-2xl font-semibold mb-3">Hospitality</h3>
          <p>
            The Dutch hospitality industry thrives on delivering exceptional service. 
            We supply experienced staff for hotels, restaurants, and event venues, including positions like front desk agents, chefs, and housekeeping personnel.
            Our recruits are adept at creating memorable guest experiences, contributing to the industry's reputation for excellence.
          </p>
        </div>

        {/* Cleaning */}
        <div>
          <h3 className="text-2xl font-semibold mb-3">Cleaning</h3>
          <p>
            Maintaining cleanliness and hygiene is paramount across all sectors. 
            We offer trained cleaning professionals for commercial, industrial, and residential settings.
            Our staff is equipped to handle various cleaning tasks, ensuring environments remain safe and spotless.
          </p>
        </div>

        {/* Food Production */}
        <div>
          <h3 className="text-2xl font-semibold mb-3">Food Production</h3>
          <p>
            The Netherlands is renowned for its food production capabilities.
            We provide personnel for food processing plants, packaging facilities, and quality control departments.
            Our workers are familiar with food safety standards and contribute to the efficient production of high-quality food products.
          </p>
        </div>

        {/* Technical Services */}
        <div>
          <h3 className="text-2xl font-semibold mb-3">Technical Services</h3>
          <p>
            Technical expertise is in high demand across various industries.
            We recruit skilled technicians, engineers, and maintenance personnel for sectors such as manufacturing, energy, and construction.
            Our candidates possess the technical know-how to support complex operations and drive innovation.
          </p>
        </div>

        {/* Agriculture */}
        <div>
          <h3 className="text-2xl font-semibold mb-3">Agriculture</h3>
          <p>
            Agriculture remains a vital part of the Dutch economy.
            We supply labor for farming activities, greenhouse operations, and horticulture.
            Our workforce is experienced in tasks ranging from planting and harvesting to crop maintenance, supporting the sector's productivity and sustainability.
          </p>
        </div>

        {/* Conclusion */}
        <div className="text-center pt-10">
          <h2 className="text-2xl font-bold mb-4">Supporting Growth Across Industries</h2>
          <p className="text-lg max-w-3xl mx-auto">
            By offering specialized staffing solutions across these industries, Glodinas Flex Work B.V. plays a crucial role in supporting the Dutch labor market and helping businesses thrive.
          </p>
        </div>

      </section>
    </>
  );
}
