import Head from 'next/head';

export default function Register() {
  return (
    <>
      <Head>
        <title>Register - Glodinas Flex Work B.V.</title>
      </Head>
      <section className="py-20 px-4 max-w-4xl mx-auto text-gray-800">
        <h1 className="text-4xl font-bold mb-6 text-center">Register with Us</h1>
        <p className="text-lg mb-6 text-center">
          Whether you're looking for a job or seeking new workers, fill out our form and we'll get in touch with you.
        </p>
        <form className="bg-white p-6 rounded shadow-md grid gap-4">
          <input type="text" placeholder="Full Name" className="border px-4 py-2 rounded" required />
          <input type="email" placeholder="Email Address" className="border px-4 py-2 rounded" required />
          <input type="tel" placeholder="Phone Number" className="border px-4 py-2 rounded" />
          <textarea placeholder="Tell us more..." rows="4" className="border px-4 py-2 rounded" />
          <button type="submit" className="bg-orange-500 text-white px-6 py-2 rounded hover:bg-orange-600">
            Submit
          </button>
        </form>
      </section>
    </>
  );
}