import React from 'react';
import { useTranslation } from 'react-i18next';

export const HomePage: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div className="home-page">
      <h1 className="home-title">{t('home.title')}</h1>
      <p className="home-description">{t('home.description')}</p>
      
      <section className="features">
        <h2>{t('home.features.title')}</h2>
        <ul className="feature-list">
          <li>{t('home.features.feature1')}</li>
          <li>{t('home.features.feature2')}</li>
          <li>{t('home.features.feature3')}</li>
          <li>{t('home.features.feature4')}</li>
        </ul>
      </section>
    </div>
  );
};
