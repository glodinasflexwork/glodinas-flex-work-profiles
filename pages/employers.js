import { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useNotification } from '../components/Notification';

export default function Employers() {
  const { t } = useTranslation('common');
  const { addNotification } = useNotification();
  const [activeCase, setActiveCase] = useState(0);
  const [industryFilter, setIndustryFilter] = useState('all');

  // Case studies data with metrics
  const caseStudies = [
    {
      id: 1,
      client: 'Logistics International B.V.',
      industry: 'logistics',
      challenge: 'Seasonal workforce fluctuations requiring 40% more staff during peak periods',
      solution: 'Implemented flexible staffing model with on-demand workforce scaling',
      results: {
        costSavings: '32%',
        timeToHire: '72 hours',
        retentionRate: '94%',
        productivityIncrease: '28%'
      },
      testimonial: 'Glodinas Flex Work transformed our staffing approach. We now have the right people at the right time, saving costs while improving productivity.',
      contact: 'Operations Director, Logistics International B.V.'
    },
    {
      id: 2,
      client: 'MedCare Solutions',
      industry: 'healthcare',
      challenge: 'Critical staff shortages during COVID-19 pandemic',
      solution: 'Rapid deployment of qualified healthcare professionals within 24-48 hours',
      results: {
        positionsFilled: '95%',
        timeToHire: '36 hours',
        qualityScore: '4.8/5',
        costSavings: '21%'
      },
      testimonial: 'During the most challenging time in healthcare, Glodinas delivered qualified staff when we needed them most. Their speed and quality of candidates were exceptional.',
      contact: 'HR Director, MedCare Solutions'
    },
    {
      id: 3,
      client: 'TechManufacturing GmbH',
      industry: 'manufacturing',
      challenge: 'Expanding operations requiring 50+ skilled workers within one month',
      solution: 'Comprehensive recruitment and onboarding program with skills verification',
      results: {
        hiringGoalAchieved: '100%',
        timeToProductivity: '2 weeks',
        retentionRate: '91%',
        costPerHire: '€1,200 (18% below industry average)'
      },
      testimonial: 'The quality of candidates and efficiency of the hiring process exceeded our expectations. Glodinas helped us scale quickly without compromising on talent quality.',
      contact: 'Production Manager, TechManufacturing GmbH'
    }
  ];

  // Filter case studies by industry
  const filteredCases = industryFilter === 'all' 
    ? caseStudies 
    : caseStudies.filter(study => study.industry === industryFilter);

  // Simulate notification for ROI calculator
  useEffect(() => {
    const timer = setTimeout(() => {
      addNotification(
        'Try our ROI calculator to see how much you could save with our flexible staffing solutions!',
        'info',
        true,
        10000
      );
    }, 20000);
    
    return () => clearTimeout(timer);
  }, [addNotification]);

  return (
    <>
      <Head>
        <title>{t('employers')} | {t('site_title')}</title>
        <meta name="description" content={t('employers_meta_desc')} />
      </Head>

      {/* Hero Section */}
      <section className="relative pt-24 pb-16 md:pt-32 md:pb-24 bg-gradient-to-r from-blue-600 to-blue-700 text-white">
        <div className="absolute inset-0 bg-black opacity-20"></div>
        <div className="container relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-shadow-lg">
              {t('hire_top_talent')}
            </h1>
            <p className="text-lg md:text-xl mb-8 text-shadow">
              {t('employers_hero_subtitle')}
            </p>
            <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
              <Link href="/contact">
                <a className="btn bg-white text-blue-600 hover:bg-gray-100">
                  {t('request_consultation')}
                </a>
              </Link>
              <Link href="/register">
                <a className="btn bg-blue-700 text-white border border-white hover:bg-blue-800">
                  {t('post_job')}
                </a>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ROI Calculator Section */}
      <section className="py-12 md:py-16 bg-white">
        <div className="container">
          <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-6 md:p-8 -mt-16 md:-mt-24 relative z-20">
            <h2 className="text-2xl font-bold mb-6 text-center">
              {t('calculate_your_roi')}
            </h2>
            <p className="text-gray-600 mb-6 text-center">
              {t('roi_calculator_subtitle')}
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="employees" className="form-label">
                  {t('number_of_employees')}
                </label>
                <input
                  type="number"
                  id="employees"
                  className="form-input"
                  placeholder="e.g., 50"
                  min="1"
                />
              </div>
              <div>
                <label htmlFor="industry" className="form-label">
                  {t('industry')}
                </label>
                <select id="industry" className="form-input">
                  <option value="">{t('select_industry')}</option>
                  <option value="logistics">{t('industry.logistics.title')}</option>
                  <option value="manufacturing">{t('industry.manufacturing.title')}</option>
                  <option value="healthcare">{t('industry.healthcare.title')}</option>
                  <option value="hospitality">{t('industry.hospitality.title')}</option>
                  <option value="retail">{t('industry.retail.title')}</option>
                  <option value="construction">{t('industry.construction.title')}</option>
                </select>
              </div>
              <div>
                <label htmlFor="turnover" className="form-label">
                  {t('current_turnover_rate')}
                </label>
                <select id="turnover" className="form-input">
                  <option value="">{t('select_rate')}</option>
                  <option value="low">0-10%</option>
                  <option value="medium">11-20%</option>
                  <option value="high">21-30%</option>
                  <option value="very-high">31%+</option>
                </select>
              </div>
              <div>
                <label htmlFor="hiring-needs" className="form-label">
                  {t('hiring_needs')}
                </label>
                <select id="hiring-needs" className="form-input">
                  <option value="">{t('select_needs')}</option>
                  <option value="temporary">{t('temporary_staff')}</option>
                  <option value="permanent">{t('permanent_staff')}</option>
                  <option value="both">{t('both')}</option>
                </select>
              </div>
            </div>
            <div className="mt-6 text-center">
              <button 
                className="btn btn-primary bg-blue-600 hover:bg-blue-700"
                onClick={() => {
                  addNotification('Based on your inputs, you could save approximately 25-30% on staffing costs with our flexible solutions!', 'success', true, 15000);
                }}
              >
                {t('calculate_savings')}
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Our Services Section */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              {t('our_employer_services')}
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              {t('employer_services_subtitle')}
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Service 1 */}
            <div className="card card-hover p-6">
              <div className="text-blue-500 mb-4">
                <svg className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2">
                {t('flexible_staffing')}
              </h3>
              <p className="text-gray-600 mb-4">
                {t('flexible_staffing_desc')}
              </p>
              <ul className="space-y-2 mb-4">
                <li className="flex items-start">
                  <svg className="h-5 w-5 text-blue-500 mt-0.5 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-sm">{t('flexible_staffing_point_1')}</span>
                </li>
                <li className="flex items-start">
                  <svg className="h-5 w-5 text-blue-500 mt-0.5 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-sm">{t('flexible_staffing_point_2')}</span>
                </li>
              </ul>
              <Link href="/services#flexible-staffing">
                <a className="text-blue-500 font-medium hover:text-blue-600 inline-flex items-center">
                  {t('learn_more')}
                  <svg className="ml-1 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </a>
              </Link>
            </div>
            
            {/* Service 2 */}
            <div className="card card-hover p-6">
              <div className="text-blue-500 mb-4">
                <svg className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2">
                {t('permanent_recruitment')}
              </h3>
              <p className="text-gray-600 mb-4">
                {t('permanent_recruitment_desc')}
              </p>
              <ul className="space-y-2 mb-4">
                <li className="flex items-start">
                  <svg className="h-5 w-5 text-blue-500 mt-0.5 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-sm">{t('permanent_recruitment_point_1')}</span>
                </li>
                <li className="flex items-start">
                  <svg className="h-5 w-5 text-blue-500 mt-0.5 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-sm">{t('permanent_recruitment_point_2')}</span>
                </li>
              </ul>
              <Link href="/services#permanent-recruitment">
                <a className="text-blue-500 font-medium hover:text-blue-600 inline-flex items-center">
                  {t('learn_more')}
                  <svg className="ml-1 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </a>
              </Link>
            </div>
            
            {/* Service 3 */}
            <div className="card card-hover p-6">
              <div className="text-blue-500 mb-4">
                <svg className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2">
                {t('workforce_management')}
              </h3>
              <p className="text-gray-600 mb-4">
                {t('workforce_management_desc')}
              </p>
              <ul className="space-y-2 mb-4">
                <li className="flex items-start">
                  <svg className="h-5 w-5 text-blue-500 mt-0.5 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-sm">{t('workforce_management_point_1')}</span>
                </li>
                <li className="flex items-start">
                  <svg className="h-5 w-5 text-blue-500 mt-0.5 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-sm">{t('workforce_management_point_2')}</span>
                </li>
              </ul>
              <Link href="/services#workforce-management">
                <a className="text-blue-500 font-medium hover:text-blue-600 inline-flex items-center">
                  {t('learn_more')}
                  <svg className="ml-1 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </a>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Client Success Stories */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              {t('client_success_stories')}
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              {t('client_success_stories_subtitle')}
            </p>
          </div>
          
          {/* Industry Filter */}
          <div className="flex flex-wrap justify-center mb-10 gap-2">
            <button 
              className={`px-4 py-2 rounded-full text-sm font-medium ${
                industryFilter === 'all' 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
              onClick={() => setIndustryFilter('all')}
            >
              {t('all_industries')}
            </button>
            <button 
              className={`px-4 py-2 rounded-full text-sm font-medium ${
                industryFilter === 'logistics' 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
              onClick={() => setIndustryFilter('logistics')}
            >
              {t('industry.logistics.title')}
            </button>
            <button 
              className={`px-4 py-2 rounded-full text-sm font-medium ${
                industryFilter === 'healthcare' 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
              onClick={() => setIndustryFilter('healthcare')}
            >
              {t('industry.healthcare.title')}
            </button>
            <button 
              className={`px-4 py-2 rounded-full text-sm font-medium ${
                industryFilter === 'manufacturing' 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
              onClick={() => setIndustryFilter('manufacturing')}
            >
              {t('industry.manufacturing.title')}
            </button>
          </div>
          
          {/* Case Studies */}
          <div className="grid grid-cols-1 gap-8">
            {filteredCases.map((study, index) => (
              <div key={study.id} className="card p-6 md:p-8">
                <div className="md:flex">
                  <div className="md:w-1/3 mb-6 md:mb-0 md:pr-8">
                    <h3 className="text-xl font-bold mb-2">{study.client}</h3>
                    <div className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded mb-4">
                      {t(`industry.${study.industry}.title`)}
                    </div>
                    <h4 className="font-semibold text-gray-700 mb-2">{t('challenge')}:</h4>
                    <p className="text-gray-600 mb-4">{study.challenge}</p>
                    <h4 className="font-semibold text-gray-700 mb-2">{t('solution')}:</h4>
                    <p className="text-gray-600">{study.solution}</p>
                  </div>
                  <div className="md:w-2/3">
                    <h4 className="font-semibold text-gray-700 mb-4">{t('results')}:</h4>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                      {Object.entries(study.results).map(([key, value]) => (
                        <div key={key} className="bg-gray-50 p-4 rounded-lg text-center">
                          <div className="text-2xl font-bold text-blue-600 mb-1">{value}</div>
                          <div className="text-xs text-gray-500">{t(`metric_${key}`)}</div>
                        </div>
                      ))}
                    </div>
                    <blockquote className="italic text-gray-700 border-l-4 border-blue-500 pl-4 py-2 mb-4">
                      "{study.testimonial}"
                    </blockquote>
                    <p className="text-sm text-gray-500 mb-6">— {study.contact}</p>
                    <div className="text-right">
                      <button 
                        className="btn btn-sm bg-blue-600 text-white hover:bg-blue-700"
                        onClick={() => {
                          addNotification(`Download the complete ${study.client} case study to learn more about our approach and results.`, 'info');
                        }}
                      >
                        {t('download_case_study')}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {filteredCases.length === 0 && (
            <div className="text-center py-8">
              <p className="text-gray-600">{t('no_case_studies_found')}</p>
            </div>
          )}
        </div>
      </section>

      {/* How We Work */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              {t('how_we_work')}
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              {t('how_we_work_subtitle')}
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Step 1 */}
            <div className="text-center">
              <div className="relative inline-flex items-center justify-center w-16 h-16 rounded-full bg-blue-100 text-blue-500 mb-4 mx-auto">
                <span className="text-2xl font-bold">1</span>
                <div className="absolute -right-8 top-1/2 transform -translate-y-1/2 h-0.5 w-8 bg-blue-200 hidden md:block"></div>
              </div>
              <h3 className="text-xl font-bold mb-2">
                {t('consultation')}
              </h3>
              <p className="text-gray-600">
                {t('consultation_desc')}
              </p>
            </div>
            
            {/* Step 2 */}
            <div className="text-center">
              <div className="relative inline-flex items-center justify-center w-16 h-16 rounded-full bg-blue-100 text-blue-500 mb-4 mx-auto">
                <span className="text-2xl font-bold">2</span>
                <div className="absolute -right-8 top-1/2 transform -translate-y-1/2 h-0.5 w-8 bg-blue-200 hidden md:block"></div>
              </div>
              <h3 className="text-xl font-bold mb-2">
                {t('strategy')}
              </h3>
              <p className="text-gray-600">
                {t('strategy_desc')}
              </p>
            </div>
            
            {/* Step 3 */}
            <div className="text-center">
              <div className="relative inline-flex items-center justify-center w-16 h-16 rounded-full bg-blue-100 text-blue-500 mb-4 mx-auto">
                <span className="text-2xl font-bold">3</span>
                <div className="absolute -right-8 top-1/2 transform -translate-y-1/2 h-0.5 w-8 bg-blue-200 hidden md:block"></div>
              </div>
              <h3 className="text-xl font-bold mb-2">
                {t('implementation')}
              </h3>
              <p className="text-gray-600">
                {t('implementation_desc')}
              </p>
            </div>
            
            {/* Step 4 */}
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-blue-100 text-blue-500 mb-4 mx-auto">
                <span className="text-2xl font-bold">4</span>
              </div>
              <h3 className="text-xl font-bold mb-2">
                {t('optimization')}
              </h3>
              <p className="text-gray-600">
                {t('optimization_desc')}
              </p>
            </div>
          </div>
          
          <div className="text-center mt-12">
            <Link href="/contact">
              <a className="btn bg-blue-600 text-white hover:bg-blue-700">
                {t('schedule_consultation')}
              </a>
            </Link>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              {t('frequently_asked_questions')}
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              {t('faq_subtitle')}
            </p>
          </div>
          
          <div className="max-w-3xl mx-auto">
            <div className="space-y-6">
              {/* FAQ Item 1 */}
              <div className="card p-6">
                <h3 className="text-xl font-bold mb-3">
                  {t('faq_question_1')}
                </h3>
                <p className="text-gray-600">
                  {t('faq_answer_1')}
                </p>
              </div>
              
              {/* FAQ Item 2 */}
              <div className="card p-6">
                <h3 className="text-xl font-bold mb-3">
                  {t('faq_question_2')}
                </h3>
                <p className="text-gray-600">
                  {t('faq_answer_2')}
                </p>
              </div>
              
              {/* FAQ Item 3 */}
              <div className="card p-6">
                <h3 className="text-xl font-bold mb-3">
                  {t('faq_question_3')}
                </h3>
                <p className="text-gray-600">
                  {t('faq_answer_3')}
                </p>
              </div>
              
              {/* FAQ Item 4 */}
              <div className="card p-6">
                <h3 className="text-xl font-bold mb-3">
                  {t('faq_question_4')}
                </h3>
                <p className="text-gray-600">
                  {t('faq_answer_4')}
                </p>
              </div>
            </div>
            
            <div className="text-center mt-10">
              <Link href="/faq">
                <a className="text-blue-500 font-medium hover:text-blue-600 inline-flex items-center">
                  {t('view_all_faqs')}
                  <svg className="ml-1 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </a>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-700 text-white py-16 md:py-20 text-center">
        <div className="container">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            {t('ready_to_transform')}
          </h2>
          <p className="mb-8 max-w-2xl mx-auto text-white text-opacity-90">
            {t('ready_to_transform_subtitle')}
          </p>
          <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
            <Link href="/contact">
              <a className="btn bg-white text-blue-600 hover:bg-gray-100">
                {t('schedule_consultation')}
              </a>
            </Link>
            <Link href="/register">
              <a className="btn bg-blue-700 text-white border border-white hover:bg-blue-800">
                {t('post_job')}
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
