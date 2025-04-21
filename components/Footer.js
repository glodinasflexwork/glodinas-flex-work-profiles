export default function Footer() {
  return (
    <footer className="bg-gray-100 text-gray-700 text-sm py-8 mt-12 border-t">
      <div className="max-w-6xl mx-auto px-4 flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
        <p>&copy; {new Date().getFullYear()} Glodinas Flex Work B.V. All rights reserved.</p>
        <div className="flex space-x-4">
          <a href="/privacy" className="hover:underline">Privacy Policy</a>
          <a href="/contact" className="hover:underline">Contact</a>
        </div>
      </div>
    </footer>
  );
}