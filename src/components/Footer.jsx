import React from 'react';
import { Link } from 'react-router-dom';
import { profileData } from '../data/portfolioData';

export default function Footer() {
  return (
    <footer style={{ padding: '4rem 0 3rem', marginTop: '4rem', textAlign: 'center', color: 'var(--text-muted)', borderTop: '1px solid var(--glass-border)' }}>
      <div className="container">
        <div className="flex gap-4 mb-4" style={{ justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link to="/" style={{ color: 'var(--text-secondary)' }}>Home</Link>
          <Link to="/experience" style={{ color: 'var(--text-secondary)' }}>Experience</Link>
          <Link to="/publications" style={{ color: 'var(--text-secondary)' }}>Publications</Link>
          <Link to="/awards" style={{ color: 'var(--text-secondary)' }}>Awards</Link>
          <Link to="/credentials" style={{ color: 'var(--text-secondary)' }}>Credentials</Link>
        </div>
        <p style={{ fontSize: '0.9rem' }}>
          © {new Date().getFullYear()} {profileData.name} ({profileData.englishName} / {profileData.koreanName}). All rights reserved.
        </p>
      </div>
    </footer>
  );
}
