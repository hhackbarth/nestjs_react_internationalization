import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// Import translations
import deTranslation from './locales/de/translation.json';
import enTranslation from './locales/en/translation.json';

// Initialize i18n
i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    // Load both languages
    resources: {
      de: { translation: deTranslation },
      en: { translation: enTranslation },
    },
    
    // Default language
    fallbackLng: 'en',
    
    // Detect user language
    detection: {
      order: ['localStorage', 'navigator'],
      caches: ['localStorage'],
    },
    
    // Interpolation settings
    interpolation: {
      escapeValue: false, // React already escapes
    },

    // Disable Suspense to prevent translation key flicker on init
    react: {
      useSuspense: false,
    },

    // Debug mode (set to false in production)
    debug: import.meta.env?.MODE === 'development',
    
    // Default namespace
    ns: ['translation'],
    defaultNS: 'translation',
  });

export default i18n;
