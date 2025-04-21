import Head from 'next/head';

export default function Register() {
  return (
    <>
      <Head>
        <title>Register - Glodinas Flex Work B.V.</title>
        <meta name="description" content="Register to find flexible job opportunities with Glodinas Flex Work B.V." />
        <meta name="keywords" content="job registration, work Netherlands, Glodinas Flex Work, employment registration, staffing, flexible jobs" />
        <meta name="author" content="Glodinas Flex Work B.V." />

        {/* Open Graph */}
        <meta property="og:title" content="Register for Jobs - Glodinas Flex Work B.V." />
        <meta property="og:description" content="Join our network and find work in logistics, hospitality, cleaning, and more across the Netherlands." />
        <meta property="og:image" content="https://glodinas-flex-site.vercel.app/images/register-hero.jpg" />
        <meta property="og:url" content="https://glodinas-flex-site.vercel.app/register" />
        <meta property="og:type" content="website" />

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Register for Jobs - Glodinas Flex Work B.V." />
        <meta name="twitter:description" content="Apply now for jobs in logistics, hospitality, and more across the Netherlands." />
        <meta name="twitter:image" content="https://glodinas-flex-site.vercel.app/images/register-hero.jpg" />
      </Head>

      {/* Hero Section */}
      <section
        className="relative h-[400px] flex items-center justify-center text-white text-center px-4"
        style={{
          backgroundImage: "url('/images/register-hero.jpg')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="bg-black/40 absolute inset-0 z-0" />
        <div className="relative z-10 max-w-2xl">
          <h1 className="text-4xl font-bold mb-2">Join Our Workforce</h1>
          <p className="text-lg">Register now to discover job opportunities across the Netherlands.</p>
        </div>
      </section>

      {/* Registration Section */}
      <section className="py-20 px-4 max-w-3xl mx-auto text-gray-800">
        <h2 className="text-2xl font-bold mb-4 text-center">Start Your Application</h2>
        <p className="mb-8 text-center">Complete the form below and our team will get in touch with you.</p>

        <form className="space-y-6">
          <div>
            <label className="block mb-1 font-medium">Full Name</label>
            <input type="text" className="w-full border px-4 py-2 rounded" required />
          </div>
          <div>
            <label className="block mb-1 font-medium">Email Address</label>
            <input type="email" className="w-full border px-4 py-2 rounded" required />
          </div>
          <div>
            <label className="block mb-1 font-medium">Phone Number</label>
            <input type="tel" className="w-full border px-4 py-2 rounded" required />
          </div>
          <div>
            <label className="block mb-1 font-medium">Preferred Job Sector</label>
            <select className="w-full border px-4 py-2 rounded">
              <option>Logistics</option>
              <option>Hospitality</option>
              <option>Cleaning</option>
              <option>Food Production</option>
              <option>Technical</option>
              <option>Agriculture</option>
            </select>
          </div>
          <button type="submit" className="bg-orange-500 hover:bg-orange-600 text-white font-semibold px-6 py-2 rounded">
            Submit
          </button>
        </form>
      </section>
    </>
  );
}
