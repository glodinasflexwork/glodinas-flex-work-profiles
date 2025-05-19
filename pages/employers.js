import { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import { useTranslation } from 'react-i18next';
import { serverSideTranslations } from '../lib/i18n';
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

      {/* Rest of the component remains unchanged */}
    </>
  );
}

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common'])),
    },
  };
}
