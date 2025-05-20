import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import { useNotification } from './Notification';

const Navbar = () => {
  const { t } = useTranslation('common');
  const router = useRouter();
  const { addNotification } = useNotification();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [unreadNotifications, setUnreadNotifications] = useState(0);

  // Handle scroll effect for navbar
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Simulate notifications (in a real app, this would come from an API)
  useEffect(() => {
    // Simulate receiving notifications
    const timer = setTimeout(() => {
      setUnreadNotifications(2);
      
      // Show a sample notification
      if (router.pathname === '/') {
        addNotification(
          'New job matches available in your area!',
          'info',
          true,
          8000
        );
      }
    }, 5000);
    
    return () => clearTimeout(timer);
  }, [addNotification, router.pathname]);

  const handleNotificationClick = () => {
    addNotification('You have viewed all notifications', 'success');
    setUnreadNotifications(0);
  };

  return (
    <nav className={`fixed top-0 w-full z-30 transition-all duration-300 ${
      scrolled ? 'bg-white shadow-md py-2' : 'bg-white bg-opacity-95 py-4'
    }`}>
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link href="/">
            <a className="flex items-center">
              <Image 
                src="/images/logo.png" 
                alt="Glodinas Flex Work" 
                width={40} 
                height={40} 
                className="mr-2"
              />
              <span className="font-bold text-xl text-gray-900 hidden sm:inline-block">
                Glodinas Flex Work
              </span>
            </a>
          </Link>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            <Link href="/job-seekers">
              <a className={`px-3 py-2 rounded-md text-sm font-medium ${
                router.pathname === '/job-seekers' 
                  ? 'text-orange-600' 
                  : 'text-gray-700 hover:text-orange-500'
              }`}>
                {t('job_seekers')}
              </a>
            </Link>
            <Link href="/employers">
              <a className={`px-3 py-2 rounded-md text-sm font-medium ${
                router.pathname === '/employers' 
                  ? 'text-orange-600' 
                  : 'text-gray-700 hover:text-orange-500'
              }`}>
                {t('employers')}
              </a>
            </Link>
            <Link href="/services">
              <a className={`px-3 py-2 rounded-md text-sm font-medium ${
                router.pathname === '/services' 
                  ? 'text-orange-600' 
                  : 'text-gray-700 hover:text-orange-500'
              }`}>
                {t('services')}
              </a>
            </Link>
            <Link href="/about">
              <a className={`px-3 py-2 rounded-md text-sm font-medium ${
                router.pathname === '/about' 
                  ? 'text-orange-600' 
                  : 'text-gray-700 hover:text-orange-500'
              }`}>
                {t('about')}
              </a>
            </Link>
            <Link href="/contact">
              <a className={`px-3 py-2 rounded-md text-sm font-medium ${
                router.pathname === '/contact' 
                  ? 'text-orange-600' 
                  : 'text-gray-700 hover:text-orange-500'
              }`}>
                {t('contact')}
              </a>
            </Link>
            
            {/* Notification Bell */}
            <button 
              onClick={handleNotificationClick}
              className="relative p-2 text-gray-700 hover:text-orange-500 focus:outline-none"
              aria-label="Notifications"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
              </svg>
              {unreadNotifications > 0 && (
                <span className="job-alert-badge">{unreadNotifications}</span>
              )}
            </button>
            
            {/* Login/Register Buttons */}
            <div className="flex items-center ml-4 space-x-2">
              <Link href="/admin/login">
                <a className="btn btn-secondary btn-sm">
                  {t('login')}
                </a>
              </Link>
              <Link href="/register">
                <a className="btn btn-primary btn-sm">
                  {t('register')}
                </a>
              </Link>
            </div>
          </div>
          
          {/* Mobile menu button */}
          <div className="flex items-center md:hidden">
            {/* Notification Bell (Mobile) */}
            <button 
              onClick={handleNotificationClick}
              className="relative p-2 mr-2 text-gray-700 hover:text-orange-500 focus:outline-none"
              aria-label="Notifications"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
              </svg>
              {unreadNotifications > 0 && (
                <span className="job-alert-badge">{unreadNotifications}</span>
              )}
            </button>
            
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-md text-gray-700 hover:text-orange-500 focus:outline-none"
              aria-expanded={isOpen}
              aria-label="Toggle menu"
            >
              <svg
                className={`h-6 w-6 transition-all duration-300 ${isOpen ? 'hidden' : 'block'}`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
              <svg
                className={`h-6 w-6 transition-all duration-300 ${isOpen ? 'block' : 'hidden'}`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile Navigation Menu */}
      <div className={`mobile-nav ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
        <div className={`mobile-nav-content ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
          <div className="p-4">
            <div className="flex items-center justify-between mb-6">
              <Link href="/">
                <a className="flex items-center" onClick={() => setIsOpen(false)}>
                  <Image 
                    src="/images/logo.png" 
                    alt="Glodinas Flex Work" 
                    width={32} 
                    height={32} 
                    className="mr-2"
                  />
                  <span className="font-bold text-lg text-gray-900">
                    Glodinas Flex Work
                  </span>
                </a>
              </Link>
              <button
                onClick={() => setIsOpen(false)}
                className="p-2 rounded-md text-gray-700 hover:text-orange-500 focus:outline-none"
                aria-label="Close menu"
              >
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            <div className="space-y-1">
              <Link href="/job-seekers">
                <a 
                  className={`block px-3 py-2 rounded-md text-base font-medium ${
                    router.pathname === '/job-seekers' 
                      ? 'text-orange-600 bg-orange-50' 
                      : 'text-gray-700 hover:text-orange-500 hover:bg-orange-50'
                  }`}
                  onClick={() => setIsOpen(false)}
                >
                  {t('job_seekers')}
                </a>
              </Link>
              <Link href="/employers">
                <a 
                  className={`block px-3 py-2 rounded-md text-base font-medium ${
                    router.pathname === '/employers' 
                      ? 'text-orange-600 bg-orange-50' 
                      : 'text-gray-700 hover:text-orange-500 hover:bg-orange-50'
                  }`}
                  onClick={() => setIsOpen(false)}
                >
                  {t('employers')}
                </a>
              </Link>
              <Link href="/services">
                <a 
                  className={`block px-3 py-2 rounded-md text-base font-medium ${
                    router.pathname === '/services' 
                      ? 'text-orange-600 bg-orange-50' 
                      : 'text-gray-700 hover:text-orange-500 hover:bg-orange-50'
                  }`}
                  onClick={() => setIsOpen(false)}
                >
                  {t('services')}
                </a>
              </Link>
              <Link href="/about">
                <a 
                  className={`block px-3 py-2 rounded-md text-base font-medium ${
                    router.pathname === '/about' 
                      ? 'text-orange-600 bg-orange-50' 
                      : 'text-gray-700 hover:text-orange-500 hover:bg-orange-50'
                  }`}
                  onClick={() => setIsOpen(false)}
                >
                  {t('about')}
                </a>
              </Link>
              <Link href="/contact">
                <a 
                  className={`block px-3 py-2 rounded-md text-base font-medium ${
                    router.pathname === '/contact' 
                      ? 'text-orange-600 bg-orange-50' 
                      : 'text-gray-700 hover:text-orange-500 hover:bg-orange-50'
                  }`}
                  onClick={() => setIsOpen(false)}
                >
                  {t('contact')}
                </a>
              </Link>
            </div>
            
            <div className="mt-6 pt-6 border-t border-gray-200">
              <div className="flex flex-col space-y-3">
                <Link href="/admin/login">
                  <a 
                    className="btn btn-secondary w-full justify-center"
                    onClick={() => setIsOpen(false)}
                  >
                    {t('login')}
                  </a>
                </Link>
                <Link href="/register">
                  <a 
                    className="btn btn-primary w-full justify-center"
                    onClick={() => setIsOpen(false)}
                  >
                    {t('register')}
                  </a>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
