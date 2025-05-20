import { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { signIn } from 'next-auth/react';
import { useNotification } from '../components/NotificationContext';

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
          password = 'password123';
          break;
        case 'worker':
          email = 'worker@glodinasflexwork.nl';
          password = 'worker123';
          break;
        case 'admin':
          email = 'admin@glodinasflexwork.nl';
          password = 'password123';
          break;
        default:
          email = 'employer@glodinasflexwork.nl';
          password = 'password123';
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
    <div>
      <Head>
        <title>Login | Glodinas Flex Work</title>
        <meta name="description" content="Login to your Glodinas Flex Work account to access job opportunities or manage your recruitment needs." />
      </Head>
      
      <section className="py-12 bg-gray-100">
        <div className="container mx-auto px-4">
          <div className="max-w-md mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="bg-orange-600 text-white py-4 px-6">
              <h1 className="text-2xl font-bold">Login to Your Account</h1>
            </div>
            
            <div className="p-6">
              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <label className="block text-gray-700 mb-2">Email Address</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                    required
                  />
                </div>
                
                <div className="mb-6">
                  <label className="block text-gray-700 mb-2">Password</label>
                  <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                    required
                  />
                </div>
                
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      name="rememberMe"
                      checked={formData.rememberMe}
                      onChange={handleChange}
                      className="h-4 w-4 text-orange-500 focus:ring-orange-500 border-gray-300 rounded"
                    />
                    <label className="ml-2 block text-sm text-gray-700">Remember me</label>
                  </div>
                  
                  <div className="text-sm">
                    <Link href="/forgot-password">
                      <a className="text-orange-600 hover:text-orange-800">Forgot your password?</a>
                    </Link>
                  </div>
                </div>
                
                <button
                  type="submit"
                  className={`w-full bg-orange-600 text-white py-3 px-4 rounded-md hover:bg-orange-700 transition duration-300 ${
                    isLoading ? 'opacity-70 cursor-not-allowed' : ''
                  }`}
                  disabled={isLoading}
                >
                  {isLoading ? 'Logging in...' : 'Login'}
                </button>
              </form>
              
              <div className="mt-6 text-center">
                <p className="text-gray-600">Don't have an account?{' '}
                  <Link href="/register">
                    <a className="text-orange-600 hover:text-orange-800">Register here</a>
                  </Link>
                </p>
              </div>
              
              <div className="mt-8">
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-300"></div>
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-2 bg-white text-gray-500">Demo Logins</span>
                  </div>
                </div>
                
                <div className="mt-6 grid grid-cols-3 gap-3">
                  <button
                    type="button"
                    onClick={() => handleDemoLogin('employer')}
                    className="py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
                  >
                    Employer
                  </button>
                  <button
                    type="button"
                    onClick={() => handleDemoLogin('worker')}
                    className="py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
                  >
                    Job Seeker
                  </button>
                  <button
                    type="button"
                    onClick={() => handleDemoLogin('admin')}
                    className="py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
                  >
                    Admin
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
