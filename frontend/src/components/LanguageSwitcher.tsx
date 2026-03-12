import React from 'react';
import { useTranslation } from 'react-i18next';

export const LanguageSwitcher: React.FC = () => {
  const { t, i18n } = useTranslation();

  const changeLanguage = (lang: 'de' | 'en') => {
    i18n.changeLanguage(lang);
  };

  return (
    <div className="language-switcher">
      <button
        className={`lang-btn ${i18n.language === 'de' ? 'active' : ''}`}
        onClick={() => changeLanguage('de')}
        aria-label={t('common.language.de')}
      >
        DE
      </button>
      <button
        className={`lang-btn ${i18n.language === 'en' ? 'active' : ''}`}
        onClick={() => changeLanguage('en')}
        aria-label={t('common.language.en')}
      >
        EN
      </button>
    </div>
  );
};
