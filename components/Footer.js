import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-gray-100 text-gray-700 py-12 border-t">
      <div className="max-w-6xl mx-auto px-4 grid md:grid-cols-4 gap-8 text-sm">

        {/* Brand & Mission */}
        <div>
          <img src="/images/logo.png" alt="Glodinas Flex Work" className="h-10 mb-3" />
          <p className="text-gray-600 text-sm">
            Connecting people with opportunities — reliable, multilingual staffing solutions across the Netherlands.
          </p>
        </div>

        {/* Company */}
        <div>
          <h4 className="font-semibold mb-2">Company</h4>
          <ul className="space-y-1">
            <li><Link href="/about">About Us</Link></li>
            <li><Link href="/services">Services</Link></li>
            <li><Link href="/contact">Contact</Link></li>
          </ul>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="font-semibold mb-2">Quick Links</h4>
          <ul className="space-y-1">
            <li><Link href="/register">Register</Link></li>
            <li><Link href="/faq">FAQ</Link></li>
            <li><Link href="/privacy-policy">Privacy Policy</Link></li>
            <li><Link href="/terms">Terms & Conditions</Link></li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h4 className="font-semibold mb-2">Contact</h4>
          <ul className="space-y-1">
            <li>Glodinas Flex Work B.V.</li>
            <li><a href="mailto:info@glodinas.nl">info@glodinas.nl</a></li>
            <li>+31 6 45 83 37 89</li>
            <li>Chamber of Commerce: 300077503</li>
          </ul>
        </div>
      </div>

      <div className="mt-10 text-center text-xs text-gray-500">
        &copy; {new Date().getFullYear()} Glodinas Flex Work B.V. All rights reserved.
      </div>
    </footer>
  );
}