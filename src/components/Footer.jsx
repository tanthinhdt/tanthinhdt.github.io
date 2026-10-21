import React from 'react';
import { Link } from 'react-router-dom';
import { profileData } from '../data/portfolioData';
import { useLanguage } from '../useLanguage';

const CURRENT_YEAR = new Date().getFullYear();

export default function Footer() {
  const { t } = useLanguage();
  return (
    <footer style={{ padding: '4rem 0 3rem', marginTop: '4rem', textAlign: 'center', color: 'var(--text-muted)', borderTop: '1px solid var(--glass-border)' }}>
      <div className="container">
        <div className="flex gap-4 mb-4" style={{ justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link to="/" style={{ color: 'var(--text-secondary)' }}>{t('nav.home')}</Link>
          <Link to="/experience/" style={{ color: 'var(--text-secondary)' }}>{t('nav.experience')}</Link>
          <Link to="/publications/" style={{ color: 'var(--text-secondary)' }}>{t('nav.publications')}</Link>
          <Link to="/awards/" style={{ color: 'var(--text-secondary)' }}>{t('nav.awards')}</Link>
          <Link to="/credentials/" style={{ color: 'var(--text-secondary)' }}>{t('nav.credentials')}</Link>
        </div>
        <p style={{ fontSize: '0.9rem' }}>
          © {CURRENT_YEAR} {profileData.name} ({profileData.englishName} / {profileData.koreanName}). {t('footer.rights')}
        </p>
      </div>
    </footer>
  );
}
