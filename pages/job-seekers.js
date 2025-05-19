import { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useNotification } from '../components/Notification';

export default function JobSeekers() {
  const { t } = useTranslation('common');
  const { addNotification } = useNotification();
  const [showJobAlert, setShowJobAlert] = useState(false);

  // Simulate job alert notification
  useEffect(() => {
    const timer = setTimeout(() => {
      addNotification(
        'New jobs matching your profile have been added!',
        'info',
        true,
        8000
      );
    }, 10000);
    
    return () => clearTimeout(timer);
  }, [addNotification]);

  return (
    <>
      <Head>
        <title>{t('job_seekers')} | {t('site_title')}</title>
        <meta name="description" content={t('job_seekers_meta_desc')} />
      </Head>

      {/* Hero Section */}
      <section className="relative pt-24 pb-16 md:pt-32 md:pb-24 bg-gradient-to-r from-orange-500 to-orange-600 text-white">
        <div className="absolute inset-0 bg-black opacity-20"></div>
        <div className="container relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-shadow-lg">
              {t('find_your_next_job')}
            </h1>
            <p className="text-lg md:text-xl mb-8 text-shadow">
              {t('job_seekers_hero_subtitle')}
            </p>
            <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
              <Link href="/register">
                <a className="btn bg-white text-orange-600 hover:bg-gray-100">
                  {t('register_now')}
                </a>
              </Link>
              <Link href="/contact">
                <a className="btn bg-orange-600 text-white border border-white hover:bg-orange-700">
                  {t('contact_us')}
                </a>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Job Search Section */}
      <section className="py-12 md:py-16 bg-white">
        <div className="container">
          <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-6 md:p-8 -mt-16 md:-mt-24 relative z-20">
            <h2 className="text-2xl font-bold mb-6 text-center">
              {t('find_jobs')}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label htmlFor="keyword" className="form-label">
                  {t('keyword_or_title')}
                </label>
                <input
                  type="text"
                  id="keyword"
                  className="form-input"
                  placeholder={t('keyword_placeholder')}
                />
              </div>
              <div>
                <label htmlFor="location" className="form-label">
                  {t('location')}
                </label>
                <input
                  type="text"
                  id="location"
                  className="form-input"
                  placeholder={t('location_placeholder')}
                />
              </div>
              <div>
                <label htmlFor="category" className="form-label">
                  {t('category')}
                </label>
                <select id="category" className="form-input">
                  <option value="">{t('all_categories')}</option>
                  <option value="logistics">{t('industry.logistics.title')}</option>
                  <option value="manufacturing">{t('industry.manufacturing.title')}</option>
                  <option value="healthcare">{t('industry.healthcare.title')}</option>
                  <option value="hospitality">{t('industry.hospitality.title')}</option>
                  <option value="retail">{t('industry.retail.title')}</option>
                  <option value="construction">{t('industry.construction.title')}</option>
                </select>
              </div>
            </div>
            <div className="mt-6 text-center">
              <button 
                className="btn btn-primary"
                onClick={() => {
                  addNotification('Job search started! We\'ll notify you of matches.', 'success');
                  setShowJobAlert(true);
                }}
              >
                {t('search_jobs')}
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              {t('why_choose_us')}
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              {t('why_choose_us_subtitle')}
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Benefit 1 */}
            <div className="card card-hover p-6 text-center">
              <div className="text-orange-500 mb-4 mx-auto">
                <svg className="h-12 w-12 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2">
                {t('diverse_opportunities')}
              </h3>
              <p className="text-gray-600">
                {t('diverse_opportunities_desc')}
              </p>
            </div>
            
            {/* Benefit 2 */}
            <div className="card card-hover p-6 text-center">
              <div className="text-orange-500 mb-4 mx-auto">
                <svg className="h-12 w-12 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2">
                {t('personalized_matching')}
              </h3>
              <p className="text-gray-600">
                {t('personalized_matching_desc')}
              </p>
            </div>
            
            {/* Benefit 3 */}
            <div className="card card-hover p-6 text-center">
              <div className="text-orange-500 mb-4 mx-auto">
                <svg className="h-12 w-12 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2">
                {t('fast_placement')}
              </h3>
              <p className="text-gray-600">
                {t('fast_placement_desc')}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Job Categories */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              {t('job_categories')}
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              {t('job_categories_subtitle')}
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {[
              { title: t('industry.logistics.title'), icon: 'truck', count: 42 },
              { title: t('industry.manufacturing.title'), icon: 'cog', count: 38 },
              { title: t('industry.healthcare.title'), icon: 'heart', count: 24 },
              { title: t('industry.hospitality.title'), icon: 'utensils', count: 31 },
              { title: t('industry.retail.title'), icon: 'shopping-bag', count: 27 },
              { title: t('industry.construction.title'), icon: 'hard-hat', count: 19 },
              { title: t('office_admin'), icon: 'desktop', count: 22 },
              { title: t('customer_service'), icon: 'headset', count: 35 }
            ].map((category, index) => (
              <div key={index} className="card card-hover p-4 text-center">
                <div className="text-orange-500 mb-2">
                  <i className={`fas fa-${category.icon} text-2xl`}></i>
                </div>
                <h3 className="font-bold mb-1 text-sm md:text-base">
                  {category.title}
                </h3>
                <p className="text-gray-500 text-sm">
                  {category.count} {t('open_positions')}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              {t('how_it_works_for_candidates')}
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              {t('how_it_works_candidates_subtitle')}
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Step 1 */}
            <div className="text-center">
              <div className="relative inline-flex items-center justify-center w-16 h-16 rounded-full bg-orange-100 text-orange-500 mb-4 mx-auto">
                <span className="text-2xl font-bold">1</span>
                <div className="absolute -right-8 top-1/2 transform -translate-y-1/2 h-0.5 w-8 bg-orange-200 hidden md:block"></div>
              </div>
              <h3 className="text-xl font-bold mb-2">
                {t('register_profile')}
              </h3>
              <p className="text-gray-600">
                {t('register_profile_desc')}
              </p>
            </div>
            
            {/* Step 2 */}
            <div className="text-center">
              <div className="relative inline-flex items-center justify-center w-16 h-16 rounded-full bg-orange-100 text-orange-500 mb-4 mx-auto">
                <span className="text-2xl font-bold">2</span>
                <div className="absolute -right-8 top-1/2 transform -translate-y-1/2 h-0.5 w-8 bg-orange-200 hidden md:block"></div>
              </div>
              <h3 className="text-xl font-bold mb-2">
                {t('get_matched')}
              </h3>
              <p className="text-gray-600">
                {t('get_matched_desc')}
              </p>
            </div>
            
            {/* Step 3 */}
            <div className="text-center">
              <div className="relative inline-flex items-center justify-center w-16 h-16 rounded-full bg-orange-100 text-orange-500 mb-4 mx-auto">
                <span className="text-2xl font-bold">3</span>
                <div className="absolute -right-8 top-1/2 transform -translate-y-1/2 h-0.5 w-8 bg-orange-200 hidden md:block"></div>
              </div>
              <h3 className="text-xl font-bold mb-2">
                {t('interview_process')}
              </h3>
              <p className="text-gray-600">
                {t('interview_process_desc')}
              </p>
            </div>
            
            {/* Step 4 */}
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-orange-100 text-orange-500 mb-4 mx-auto">
                <span className="text-2xl font-bold">4</span>
              </div>
              <h3 className="text-xl font-bold mb-2">
                {t('start_working')}
              </h3>
              <p className="text-gray-600">
                {t('start_working_desc')}
              </p>
            </div>
          </div>
          
          <div className="text-center mt-12">
            <Link href="/register">
              <a className="btn btn-primary">
                {t('create_your_profile')}
              </a>
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Jobs */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              {t('featured_jobs')}
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              {t('featured_jobs_subtitle')}
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Job 1 */}
            <div className="card card-hover p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-lg font-bold mb-1">
                    {t('job_title_1')}
                  </h3>
                  <p className="text-gray-600 text-sm mb-2">
                    {t('job_company_1')} • {t('job_location_1')}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <span className="inline-block bg-orange-100 text-orange-800 text-xs px-2 py-1 rounded">
                      {t('full_time')}
                    </span>
                    <span className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">
                      {t('logistics')}
                    </span>
                  </div>
                </div>
                <div className="bg-gray-100 p-2 rounded-full">
                  <svg className="h-6 w-6 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
              </div>
              <div className="border-t border-gray-100 pt-4 mt-4">
                <div className="flex justify-between items-center">
                  <p className="text-gray-700 font-medium">
                    €{t('job_salary_1')}
                  </p>
                  <button 
                    className="btn btn-sm btn-primary"
                    onClick={() => {
                      addNotification('Application started! Complete your profile to apply.', 'info');
                    }}
                  >
                    {t('apply_now')}
                  </button>
                </div>
              </div>
            </div>
            
            {/* Job 2 */}
            <div className="card card-hover p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-lg font-bold mb-1">
                    {t('job_title_2')}
                  </h3>
                  <p className="text-gray-600 text-sm mb-2">
                    {t('job_company_2')} • {t('job_location_2')}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <span className="inline-block bg-orange-100 text-orange-800 text-xs px-2 py-1 rounded">
                      {t('part_time')}
                    </span>
                    <span className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">
                      {t('healthcare')}
                    </span>
                  </div>
                </div>
                <div className="bg-gray-100 p-2 rounded-full">
                  <svg className="h-6 w-6 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
              </div>
              <div className="border-t border-gray-100 pt-4 mt-4">
                <div className="flex justify-between items-center">
                  <p className="text-gray-700 font-medium">
                    €{t('job_salary_2')}
                  </p>
                  <button 
                    className="btn btn-sm btn-primary"
                    onClick={() => {
                      addNotification('Application started! Complete your profile to apply.', 'info');
                    }}
                  >
                    {t('apply_now')}
                  </button>
                </div>
              </div>
            </div>
            
            {/* Job 3 */}
            <div className="card card-hover p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-lg font-bold mb-1">
                    {t('job_title_3')}
                  </h3>
                  <p className="text-gray-600 text-sm mb-2">
                    {t('job_company_3')} • {t('job_location_3')}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <span className="inline-block bg-orange-100 text-orange-800 text-xs px-2 py-1 rounded">
                      {t('temporary')}
                    </span>
                    <span className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">
                      {t('manufacturing')}
                    </span>
                  </div>
                </div>
                <div className="bg-gray-100 p-2 rounded-full">
                  <svg className="h-6 w-6 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
              </div>
              <div className="border-t border-gray-100 pt-4 mt-4">
                <div className="flex justify-between items-center">
                  <p className="text-gray-700 font-medium">
                    €{t('job_salary_3')}
                  </p>
                  <button 
                    className="btn btn-sm btn-primary"
                    onClick={() => {
                      addNotification('Application started! Complete your profile to apply.', 'info');
                    }}
                  >
                    {t('apply_now')}
                  </button>
                </div>
              </div>
            </div>
          </div>
          
          <div className="text-center mt-10">
            <Link href="/register">
              <a className="btn btn-secondary">
                {t('view_all_jobs')}
              </a>
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              {t('success_stories')}
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              {t('success_stories_subtitle')}
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Testimonial 1 */}
            <div className="card card-hover p-6">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 rounded-full bg-gray-200 mr-4 overflow-hidden">
                  <Image
                    src="/images/testimonials/person1.jpg"
                    alt="Testimonial"
                    width={48}
                    height={48}
                    layout="responsive"
                  />
                </div>
                <div>
                  <h3 className="font-bold">{t('testimonial_name_1')}</h3>
                  <p className="text-sm text-gray-600">{t('testimonial_job_1')}</p>
                </div>
              </div>
              <p className="text-gray-700 italic">
                "{t('testimonial_content_1')}"
              </p>
            </div>
            
            {/* Testimonial 2 */}
            <div className="card card-hover p-6">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 rounded-full bg-gray-200 mr-4 overflow-hidden">
                  <Image
                    src="/images/testimonials/person2.jpg"
                    alt="Testimonial"
                    width={48}
                    height={48}
                    layout="responsive"
                  />
                </div>
                <div>
                  <h3 className="font-bold">{t('testimonial_name_2')}</h3>
                  <p className="text-sm text-gray-600">{t('testimonial_job_2')}</p>
                </div>
              </div>
              <p className="text-gray-700 italic">
                "{t('testimonial_content_2')}"
              </p>
            </div>
            
            {/* Testimonial 3 */}
            <div className="card card-hover p-6">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 rounded-full bg-gray-200 mr-4 overflow-hidden">
                  <Image
                    src="/images/testimonials/person3.jpg"
                    alt="Testimonial"
                    width={48}
                    height={48}
                    layout="responsive"
                  />
                </div>
                <div>
                  <h3 className="font-bold">{t('testimonial_name_3')}</h3>
                  <p className="text-sm text-gray-600">{t('testimonial_job_3')}</p>
                </div>
              </div>
              <p className="text-gray-700 italic">
                "{t('testimonial_content_3')}"
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-orange-500 to-orange-600 text-white py-16 md:py-20 text-center">
        <div className="container">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            {t('ready_to_start')}
          </h2>
          <p className="mb-8 max-w-2xl mx-auto text-white text-opacity-90">
            {t('ready_to_start_subtitle')}
          </p>
          <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
            <Link href="/register">
              <a className="btn bg-white text-orange-600 hover:bg-gray-100">
                {t('create_your_profile')}
              </a>
            </Link>
            <Link href="/contact">
              <a className="btn bg-orange-600 text-white border border-white hover:bg-orange-700">
                {t('contact_us')}
              </a>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common']))
    }
  };
}
