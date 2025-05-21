import { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import { signIn } from 'next-auth/react';
import { useNotification } from '../components/NotificationContext';
import Layout from '../components/Layout';

export default function Login() {
  const { addNotification } = useNotification();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false
  });
  
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.email || !formData.password) {
      addNotification('Please fill in all required fields.', 'error');
      return;
    }
    
    setIsLoading(true);
    
    try {
      const result = await signIn('credentials', {
        redirect: false,
        email: formData.email,
        password: formData.password
      });
      
      if (result.error) {
        addNotification('Invalid email or password. Please try again.', 'error');
        setIsLoading(false);
      } else {
        addNotification('Login successful! Redirecting...', 'success');
        // Redirect will be handled by next-auth
      }
    } catch (error) {
      addNotification('An error occurred during login. Please try again.', 'error');
      setIsLoading(false);
    }
  };
  
  const handleDemoLogin = async (role) => {
    setIsLoading(true);
    
    try {
      let email, password;
      
      switch (role) {
        case 'employer':
          email = 'employer@glodinasflexwork.nl';
          password = 'employer123';
          break;
        case 'worker':
          email = 'worker@glodinasflexwork.nl';
          password = 'worker123';
          break;
        default:
          email = 'employer@glodinasflexwork.nl';
          password = 'employer123';
      }
      
      const result = await signIn('credentials', {
        redirect: false,
        email,
        password
      });
      
      if (result.error) {
        addNotification('Demo login failed. Please try again.', 'error');
        setIsLoading(false);
      } else {
        addNotification(`Logged in as demo ${role}! Redirecting...`, 'success');
        // Redirect will be handled by next-auth
      }
    } catch (error) {
      addNotification('An error occurred during login. Please try again.', 'error');
      setIsLoading(false);
    }
  };
  
  return (
    <Layout>
      <Head>
        <title>Login | Glodinas Flex Work</title>
        <meta name="description" content="Login to your Glodinas Flex Work account to access job opportunities or manage your recruitment needs." />
      </Head>
      
      <section className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl w-full flex flex-col md:flex-row rounded-xl shadow-2xl overflow-hidden">
          {/* Left side - Image and branding */}
          <div className="md:w-1/2 bg-gradient-to-br from-orange-500 to-orange-600 p-8 flex flex-col justify-between relative overflow-hidden">
            <div className="relative z-10">
              <div className="mb-6">
                <Image 
                  src="/images/logo.png" 
                  alt="Glodinas Flex Work" 
                  width={60} 
                  height={60} 
                  className="rounded-lg"
                />
              </div>
              <h1 className="text-3xl font-bold text-white mb-4">Welcome Back</h1>
              <p className="text-white text-opacity-90 mb-6">
                Log in to access your personalized dashboard and connect with opportunities that match your skills and preferences.
              </p>
              <div className="hidden md:block">
                <h3 className="text-white text-xl font-semibold mb-3">Why Glodinas Flex Work?</h3>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <svg className="h-6 w-6 text-white mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-white text-opacity-90">Access to exclusive job opportunities</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="h-6 w-6 text-white mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-white text-opacity-90">Personalized job matching</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="h-6 w-6 text-white mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-white text-opacity-90">Career growth support</span>
                  </li>
                </ul>
              </div>
            </div>
            
            {/* Decorative elements */}
            <div className="absolute bottom-0 right-0 transform translate-x-1/4 translate-y-1/4">
              <svg className="w-64 h-64 text-orange-400 opacity-20" fill="currentColor" viewBox="0 0 200 200">
                <path d="M44.5,-76.5C59.1,-69.8,73.2,-60.1,79.4,-46.6C85.7,-33,84,-15.5,81.8,1.3C79.7,18,77,34.1,68.9,47.1C60.8,60.1,47.2,70.1,32.5,75.8C17.8,81.5,1.9,82.9,-12.9,79.8C-27.7,76.7,-41.4,69.1,-53.8,59C-66.2,48.9,-77.3,36.3,-82.5,21.3C-87.7,6.3,-87,-11.1,-81.6,-26.5C-76.2,-41.9,-66.1,-55.3,-52.7,-62.5C-39.3,-69.7,-22.7,-70.7,-6.2,-61.8C10.3,-52.9,29.9,-83.2,44.5,-76.5Z" transform="translate(100 100)" />
              </svg>
            </div>
            
            <div className="absolute top-0 left-0 transform -translate-x-1/4 -translate-y-1/4">
              <svg className="w-64 h-64 text-orange-400 opacity-10" fill="currentColor" viewBox="0 0 200 200">
                <path d="M39.9,-65.7C52.8,-60.5,65.2,-51.8,71.8,-39.7C78.4,-27.6,79.2,-12.3,76.9,1.3C74.7,15,69.3,27,61.6,37.4C53.9,47.8,43.9,56.5,32.4,62.7C20.9,68.9,7.8,72.5,-4.4,78.8C-16.6,85.1,-27.9,94.1,-39.4,92.9C-50.9,91.7,-62.5,80.3,-70.8,67.3C-79.1,54.3,-84.1,39.7,-85.1,25.4C-86.1,11.1,-83.2,-2.9,-77.8,-15.1C-72.4,-27.3,-64.6,-37.6,-54.5,-44.9C-44.4,-52.2,-32.1,-56.4,-20.4,-62.4C-8.7,-68.4,2.4,-76.2,14.6,-77.1C26.8,-78,39.9,-72,39.9,-65.7Z" transform="translate(100 100)" />
              </svg>
            </div>
          </div>
          
          {/* Right side - Login form */}
          <div className="md:w-1/2 bg-white p-8">
            <div className="mb-8 text-center">
              <h2 className="text-2xl font-bold text-gray-900">Login to Your Account</h2>
              <p className="text-gray-600 mt-2">Enter your credentials to access your account</p>
            </div>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                <input
                  id="email"
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="form-input"
                  placeholder="Enter your email address"
                  required
                />
              </div>
              
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                <input
                  id="password"
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="form-input"
                  placeholder="Enter your password"
                  required
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    id="rememberMe"
                    type="checkbox"
                    name="rememberMe"
                    checked={formData.rememberMe}
                    onChange={handleChange}
                    className="h-4 w-4 text-orange-500 focus:ring-orange-500 border-gray-300 rounded"
                  />
                  <label htmlFor="rememberMe" className="ml-2 block text-sm text-gray-700">Remember me</label>
                </div>
                
                <div className="text-sm">
                  <Link href="/forgot-password">
                    <a className="text-orange-600 hover:text-orange-800 font-medium">Forgot your password?</a>
                  </Link>
                </div>
              </div>
              
              <button
                type="submit"
                className={`w-full btn btn-primary ${isLoading ? 'opacity-70 cursor-not-allowed' : ''}`}
                disabled={isLoading}
              >
                {isLoading ? (
                  <span className="flex items-center justify-center">
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Logging in...
                  </span>
                ) : 'Login'}
              </button>
            </form>
            
            <div className="mt-6 text-center">
              <p className="text-gray-600">Don't have an account?{' '}
                <Link href="/register">
                  <a className="text-orange-600 hover:text-orange-800 font-medium">Register here</a>
                </Link>
              </p>
            </div>
            
            <div className="mt-8">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white text-gray-500">Quick Access</span>
                </div>
              </div>
              
              <div className="mt-6 grid grid-cols-2 gap-4">
                <button
                  type="button"
                  onClick={() => handleDemoLogin('employer')}
                  className="flex items-center justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 transition-all duration-200"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-orange-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                  Employer Demo
                </button>
                <button
                  type="button"
                  onClick={() => handleDemoLogin('worker')}
                  className="flex items-center justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 transition-all duration-200"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-orange-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  Job Seeker Demo
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
