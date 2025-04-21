export default function Footer() {
  return (
    <footer className="bg-gray-100 text-gray-700 text-sm py-10 mt-16 border-t">
      <div className="max-w-6xl mx-auto px-4 grid sm:grid-cols-2 md:grid-cols-3 gap-6">
        <div>
          <h4 className="font-semibold mb-2">Company</h4>
          <ul className="space-y-1">
            <li><a href="/about" className="hover:underline">About Us</a></li>
            <li><a href="/services" className="hover:underline">Services</a></li>
            <li><a href="/contact" className="hover:underline">Contact</a></li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold mb-2">Quick Links</h4>
          <ul className="space-y-1">
            <li><a href="/register" className="hover:underline">Register</a></li>
            <li><a href="/faq" className="hover:underline">FAQ</a></li>
            <li><a href="/privacy" className="hover:underline">Privacy Policy</a></li>
            <li><a href="/terms" className="hover:underline">Terms & Conditions</a></li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold mb-2">Contact</h4>
          <p className="text-sm">
            Glodinas Flex Work B.V.<br />
            info@glodinas.nl<br />
            +31 6 45 83 37 89<br />
            Chamber of Commerce: 300077503
          </p>
        </div>
      </div>
      <div className="text-center mt-10 text-xs text-gray-500">
        &copy; {new Date().getFullYear()} Glodinas Flex Work B.V. All rights reserved.
      </div>
    </footer>
  );
}