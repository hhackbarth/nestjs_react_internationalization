import React, { useContext, createContext, useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

// Create Language Context
interface LanguageContextType {
  language: string;
  setLanguage: (lang: 'de' | 'en') => void;
}

export const LanguageContext = createContext<LanguageContextType>({
  language: 'en',
  setLanguage: () => {},
});

// Language Provider Component
export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { i18n } = useTranslation();
  const [language, setLanguageState] = useState<string>(i18n.language || 'en');

  useEffect(() => {
    // Update i18n when language changes
    if (language !== i18n.language) {
      i18n.changeLanguage(language);
    }
  }, [language, i18n]);

  const setLanguage = (lang: 'de' | 'en') => {
    setLanguageState(lang);
    localStorage.setItem('language', lang);
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};

// Language Switcher Component
export const LanguageSwitcher: React.FC = () => {
  const { language, setLanguage } = useContext(LanguageContext);
  const { t } = useTranslation();

  return (
    <div className="language-switcher">
      <button
        className={`lang-btn ${language === 'de' ? 'active' : ''}`}
        onClick={() => setLanguage('de')}
        aria-label={t('common.language.de')}
      >
        DE
      </button>
      <button
        className={`lang-btn ${language === 'en' ? 'active' : ''}`}
        onClick={() => setLanguage('en')}
        aria-label={t('common.language.en')}
      >
        EN
      </button>
    </div>
  );
};
