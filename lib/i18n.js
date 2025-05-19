// Create a custom i18n solution that doesn't rely on fs
import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';

// Import translation JSON files directly
import enCommon from '../public/locales/en/common.json';
import nlCommon from '../public/locales/nl/common.json';
import deCommon from '../public/locales/de/common.json';
import plCommon from '../public/locales/pl/common.json';
import roCommon from '../public/locales/ro/common.json';
import bgCommon from '../public/locales/bg/common.json';

// Add default about_differentiators array for all locales
const defaultDifferentiators = [
  "Multilingual support in Dutch, English, Polish, Romanian and Bulgarian",
  "Housing and payroll assistance for international employees",
  "Fast service and clear communication",
  "Large network of employers across various sectors",
  "Commitment to fairness, compliance, and employee wellbeing"
];

// Ensure all locales have the about_differentiators array
if (!enCommon.about_differentiators) enCommon.about_differentiators = defaultDifferentiators;
if (!nlCommon.about_differentiators) nlCommon.about_differentiators = defaultDifferentiators;
if (!deCommon.about_differentiators) deCommon.about_differentiators = defaultDifferentiators;
if (!plCommon.about_differentiators) plCommon.about_differentiators = defaultDifferentiators;
if (!roCommon.about_differentiators) roCommon.about_differentiators = defaultDifferentiators;
if (!bgCommon.about_differentiators) bgCommon.about_differentiators = defaultDifferentiators;

// Resources object with all translations
const resources = {
  en: {
    common: enCommon
  },
  nl: {
    common: nlCommon
  },
  de: {
    common: deCommon
  },
  pl: {
    common: plCommon
  },
  ro: {
    common: roCommon
  },
  bg: {
    common: bgCommon
  }
};

// Initialize i18next
i18next
  .use(initReactI18next)
  .init({
    resources,
    lng: 'nl', // Default language
    fallbackLng: 'nl',
    interpolation: {
      escapeValue: false // React already escapes values
    },
    react: {
      useSuspense: false
    }
  });

// Serverless-compatible replacement for serverSideTranslations
export const serverSideTranslations = async (locale, namespaces) => {
  return {
    _nextI18Next: {
      initialLocale: locale,
      userConfig: {
        i18n: {
          defaultLocale: 'nl',
          locales: ['nl', 'en', 'de', 'pl', 'ro', 'bg']
        }
      }
    }
  };
};

export default i18next;
