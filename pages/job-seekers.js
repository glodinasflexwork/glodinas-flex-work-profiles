import Head from 'next/head';

export default function JobSeekers() {
  return (
    <>
      <Head>
        <title>Job Seekers - Glodinas Flex Work B.V.</title>
        <meta name="description" content="Find your next job with Glodinas Flex Work B.V. We connect you with employers in logistics, food, hospitality and more across the Netherlands." />
      </Head>

      {/* Hero Section */}
      <section
        className="relative h-[400px] flex items-center justify-center text-white text-center px-4"
        style={{
          backgroundImage: "url('/images/jobseekers-hero.jpg')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="bg-black/50 absolute inset-0 z-0" />
        <div className="relative z-10 max-w-3xl">
          <h1 className="text-4xl font-bold mb-2">Looking for Work?</h1>
          <p className="text-lg">We help you find jobs across the Netherlands</p>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 px-4 max-w-6xl mx-auto text-gray-800">
        <h2 className="text-3xl font-bold text-center mb-10">What You Get</h2>
        <div className="grid md:grid-cols-2 gap-10">
          <ul className="list-disc space-y-4 pl-6">
            <li>Job placement in logistics, cleaning, hospitality and more</li>
            <li>Help with housing near your work location</li>
            <li>Weekly salary payments, always on time</li>
            <li>Official contracts and registration</li>
            <li>Multilingual support in NL, EN, PL, RO, BG</li>
          </ul>

          <div>
            <p className="mb-4">
              Whether you're looking for seasonal work or a longer-term opportunity, we match your profile with trusted employers who are actively hiring.
            </p>
            <p>
              Our support doesn't stop after placement — we assist with onboarding, documentation, and housing to help you get started quickly and comfortably.
            </p>
          </div>
        </div>

        <div className="mt-16 text-center">
          <h2 className="text-2xl font-bold mb-4">Ready to Start?</h2>
          <p className="mb-6">Complete your registration today and let us help you find your next job.</p>
          <a href="/register" className="inline-block bg-orange-500 hover:bg-orange-600 text-white font-semibold px-6 py-3 rounded">
            Register Today
          </a>
        </div>
      </section>
    </>
  );
}