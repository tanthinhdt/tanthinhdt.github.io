import React, { useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { Sun, Moon, Monitor, Menu, X } from 'lucide-react';
import { languages, useLanguage } from '../i18n';

export default function Navbar({ theme, themePreference = 'system', systemTheme = 'light', cycleTheme, toggleTheme }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { language, setLanguage, t } = useLanguage();

  const handleToggle = cycleTheme || toggleTheme;

  const closeMobile = () => setMobileMenuOpen(false);

  const getThemeTitle = () => {
    if (themePreference === 'system') {
      return `Theme: System (${systemTheme}) · Click for Light`;
    }
    if (themePreference === 'light') {
      return 'Theme: Light · Click for Dark';
    }
    return 'Theme: Dark · Click for System';
  };

  const renderThemeIcon = () => {
    if (themePreference === 'system') {
      return <Monitor size={18} />;
    }
    return theme === 'light' ? <Sun size={18} /> : <Moon size={18} />;
  };

  return (
    <nav className="navbar">
      <div className="container flex items-center" style={{ justifyContent: 'space-between' }}>
        <Link 
          to="/" 
          onClick={closeMobile}
          style={{ 
            fontFamily: 'var(--font-display)', 
            fontWeight: 800, 
            fontSize: '1.25rem', 
            letterSpacing: '-0.02em', 
            color: 'var(--text-primary)',
            display: 'flex',
            alignItems: 'center',
            gap: '2px'
          }}
        >
          TAN THINH<span style={{ color: 'var(--accent-purple)' }}>.</span>
        </Link>
        
        {/* Desktop Navigation */}
        <div className="flex items-center gap-4 desktop-nav">
          <div className="nav-links flex gap-1">
            <NavLink to="/" end className={({ isActive }) => isActive ? 'nav-item active' : 'nav-item'}>
              {t('nav.home')}
            </NavLink>
            <NavLink to="/experience" className={({ isActive }) => isActive ? 'nav-item active' : 'nav-item'}>
              {t('nav.experience')}
            </NavLink>
            <NavLink to="/publications" className={({ isActive }) => isActive ? 'nav-item active' : 'nav-item'}>
              {t('nav.publications')}
            </NavLink>
            <NavLink to="/awards" className={({ isActive }) => isActive ? 'nav-item active' : 'nav-item'}>
              {t('nav.awards')}
            </NavLink>
            <NavLink to="/credentials" className={({ isActive }) => isActive ? 'nav-item active' : 'nav-item'}>
              {t('nav.credentials')}
            </NavLink>
          </div>

          <label className="language-switcher">
            <span className="sr-only">{t('language.label')}</span>
            <select
              value={language}
              onChange={(event) => setLanguage(event.target.value)}
              aria-label={t('language.switchTo')}
            >
              {Object.entries(languages).map(([code, option]) => (
                <option key={code} value={code}>{option.shortLabel}</option>
              ))}
            </select>
          </label>

          {/* Theme Switcher Button */}
          <button 
            onClick={handleToggle} 
            className="theme-toggle-btn"
            aria-label={`Theme: ${themePreference}. Click to cycle.`}
            title={getThemeTitle()}
          >
            {renderThemeIcon()}
          </button>
        </div>

        {/* Mobile controls */}
        <div className="mobile-controls flex items-center gap-2">
          <button 
            onClick={handleToggle} 
            className="theme-toggle-btn"
            aria-label={`Theme: ${themePreference}. Click to cycle.`}
            title={getThemeTitle()}
          >
            {renderThemeIcon()}
          </button>
          
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)} 
            className="theme-toggle-btn"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="mobile-drawer glass-panel" style={{ margin: '0.75rem 1.5rem', padding: '1rem' }}>
          <div className="flex" style={{ flexDirection: 'column', gap: '0.5rem' }}>
            <NavLink to="/" end onClick={closeMobile} className={({ isActive }) => isActive ? 'nav-item active' : 'nav-item'}>
              {t('nav.home')}
            </NavLink>
            <NavLink to="/experience" onClick={closeMobile} className={({ isActive }) => isActive ? 'nav-item active' : 'nav-item'}>
              {t('nav.experience')}
            </NavLink>
            <NavLink to="/publications" onClick={closeMobile} className={({ isActive }) => isActive ? 'nav-item active' : 'nav-item'}>
              {t('nav.publications')}
            </NavLink>
            <NavLink to="/awards" onClick={closeMobile} className={({ isActive }) => isActive ? 'nav-item active' : 'nav-item'}>
              {t('nav.awards')}
            </NavLink>
            <NavLink to="/credentials" onClick={closeMobile} className={({ isActive }) => isActive ? 'nav-item active' : 'nav-item'}>
              {t('nav.credentials')}
            </NavLink>
          </div>
          <label className="language-switcher mobile-language-switcher">
            <span className="sr-only">{t('language.label')}</span>
            <select
              value={language}
              onChange={(event) => setLanguage(event.target.value)}
              aria-label={t('language.switchTo')}
            >
              {Object.entries(languages).map(([code, option]) => (
                <option key={code} value={code}>{option.label}</option>
              ))}
            </select>
          </label>
        </div>
      )}
    </nav>
  );
}
