import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useLocation } from 'react-router-dom';
import { LanguageSwitcher } from './LanguageSwitcher';

export const Navigation: React.FC = () => {
  const { t } = useTranslation();
  const location = useLocation();

  return (
    <nav className="navigation">
      <div className="nav-logo">i18n Demo</div>
      <div className="nav-links">
        <Link
          to="/"
          className={location.pathname === '/' ? 'active' : ''}
        >
          {t('navigation.home')}
        </Link>
        <Link
          to="/order"
          className={location.pathname === '/order' ? 'active' : ''}
        >
          {t('navigation.order')}
        </Link>
        <div className="nav-language-switcher">
          <LanguageSwitcher />
        </div>
      </div>
    </nav>
  );
};
