import React, { useState, useEffect } from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import HomePage from './pages/HomePage';
import ExperiencePage from './pages/ExperiencePage';
import PublicationsPage from './pages/PublicationsPage';
import AwardsPage from './pages/AwardsPage';
import CredentialsPage from './pages/CredentialsPage';
import { LanguageProvider } from './i18n';
import './index.css';

export default function App() {
  const [themePreference, setThemePreference] = useState(() => {
    return localStorage.getItem('theme-preference') || localStorage.getItem('theme') || 'system';
  });
  const [systemTheme, setSystemTheme] = useState(() =>
    typeof window !== 'undefined' && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
  );

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleSystemThemeChange = (event) => {
      setSystemTheme(event.matches ? 'dark' : 'light');
    };

    mediaQuery.addEventListener('change', handleSystemThemeChange);
    return () => mediaQuery.removeEventListener('change', handleSystemThemeChange);
  }, []);

  const theme = themePreference === 'system' ? systemTheme : themePreference;

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme-preference', themePreference);
    localStorage.setItem('theme', themePreference);
  }, [theme, themePreference]);

  const cycleTheme = () => {
    setThemePreference((prev) => {
      if (prev === 'system') return 'light';
      if (prev === 'light') return 'dark';
      return 'system';
    });
  };

  return (
    <LanguageProvider>
      <HashRouter>
        <ScrollToTop />
        <div className="app-container">
          <Navbar 
            theme={theme} 
            themePreference={themePreference} 
            systemTheme={systemTheme} 
            cycleTheme={cycleTheme}
            toggleTheme={cycleTheme} 
          />
        
        <main>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/experience" element={<ExperiencePage />} />
            <Route path="/publications" element={<PublicationsPage />} />
            <Route path="/awards" element={<AwardsPage />} />
            <Route path="/credentials" element={<CredentialsPage />} />
            <Route path="*" element={<HomePage />} />
          </Routes>
        </main>

          <Footer />
        </div>
      </HashRouter>
    </LanguageProvider>
  );
}
