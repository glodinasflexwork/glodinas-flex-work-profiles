import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useTranslation } from 'next-i18next';

const Footer = () => {
  const { t } = useTranslation('common');
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email) {
      // In a real implementation, this would send the email to a server
      setSubscribed(true);
      setEmail('');
      
      // Reset the subscribed state after 5 seconds
      setTimeout(() => {
        setSubscribed(false);
      }, 5000);
    }
  };

  return (
    <footer className="bg-gray-900 text-white pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* Logo and About */}
          <div className="col-span-1 md:col-span-1">
            <Link href="/">
              <a className="flex items-center mb-4">
                <Image 
                  src="/images/logo-white.png" 
                  alt="Glodinas Flex Work" 
                  width={40} 
                  height={40} 
                  className="mr-2"
                />
                <span className="font-bold text-xl ml-2">
                  Glodinas Flex Work
                </span>
              </a>
            </Link>
            <p className="text-gray-400 mb-4">
              {t('footer_about')}
            </p>
            <div className="flex space-x-4">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
                <i className="fab fa-facebook-f"></i>
                <span className="sr-only">Facebook</span>
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
                <i className="fab fa-twitter"></i>
                <span className="sr-only">Twitter</span>
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
                <i className="fab fa-linkedin-in"></i>
                <span className="sr-only">LinkedIn</span>
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
                <i className="fab fa-instagram"></i>
                <span className="sr-only">Instagram</span>
              </a>
            </div>
          </div>
          
          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-bold mb-4">{t('quick_links')}</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/job-seekers">
                  <a className="text-gray-400 hover:text-white transition-colors">
                    {t('job_seekers')}
                  </a>
                </Link>
              </li>
              <li>
                <Link href="/employers">
                  <a className="text-gray-400 hover:text-white transition-colors">
                    {t('employers')}
                  </a>
                </Link>
              </li>
              <li>
                <Link href="/services">
                  <a className="text-gray-400 hover:text-white transition-colors">
                    {t('services')}
                  </a>
                </Link>
              </li>
              <li>
                <Link href="/about">
                  <a className="text-gray-400 hover:text-white transition-colors">
                    {t('about')}
                  </a>
                </Link>
              </li>
              <li>
                <Link href="/contact">
                  <a className="text-gray-400 hover:text-white transition-colors">
                    {t('contact')}
                  </a>
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Industries */}
          <div>
            <h3 className="text-lg font-bold mb-4">{t('industries')}</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/industries/logistics">
                  <a className="text-gray-400 hover:text-white transition-colors">
                    {t('industry.logistics.title')}
                  </a>
                </Link>
              </li>
              <li>
                <Link href="/industries/manufacturing">
                  <a className="text-gray-400 hover:text-white transition-colors">
                    {t('industry.manufacturing.title')}
                  </a>
                </Link>
              </li>
              <li>
                <Link href="/industries/healthcare">
                  <a className="text-gray-400 hover:text-white transition-colors">
                    {t('industry.healthcare.title')}
                  </a>
                </Link>
              </li>
              <li>
                <Link href="/industries/hospitality">
                  <a className="text-gray-400 hover:text-white transition-colors">
                    {t('industry.hospitality.title')}
                  </a>
                </Link>
              </li>
              <li>
                <Link href="/industries/retail">
                  <a className="text-gray-400 hover:text-white transition-colors">
                    {t('industry.retail.title')}
                  </a>
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Newsletter */}
          <div>
            <h3 className="text-lg font-bold mb-4">{t('newsletter')}</h3>
            <p className="text-gray-400 mb-4">
              {t('newsletter_desc')}
            </p>
            <form onSubmit={handleSubscribe} className="space-y-2">
              <div className="flex">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={t('email_placeholder')}
                  className="form-input bg-gray-800 border-gray-700 text-white placeholder-gray-500 flex-grow rounded-l-md focus:ring-orange-500 focus:border-orange-500"
                  required
                />
                <button
                  type="submit"
                  className="bg-orange-500 text-white px-4 py-2 rounded-r-md hover:bg-orange-600 transition-colors"
                >
                  {t('subscribe')}
                </button>
              </div>
              {subscribed && (
                <p className="text-green-400 text-sm">
                  {t('subscribe_success')}
                </p>
              )}
            </form>
          </div>
        </div>
        
        {/* Bottom Footer */}
        <div className="border-t border-gray-800 pt-8 mt-8 flex flex-col md:flex-row justify-between items-center">
          <div className="text-gray-400 text-sm mb-4 md:mb-0">
            &copy; {new Date().getFullYear()} Glodinas Flex Work B.V. {t('all_rights_reserved')}
          </div>
          <div className="flex space-x-4 text-sm">
            <Link href="/privacy-policy">
              <a className="text-gray-400 hover:text-white transition-colors">
                {t('privacy_policy')}
              </a>
            </Link>
            <Link href="/terms">
              <a className="text-gray-400 hover:text-white transition-colors">
                {t('terms_conditions')}
              </a>
            </Link>
            <Link href="/faq">
              <a className="text-gray-400 hover:text-white transition-colors">
                {t('faq')}
              </a>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
