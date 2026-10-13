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
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('theme') || 'light';
  });

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => (prev === 'light' ? 'dark' : 'light'));
  };

  return (
    <LanguageProvider>
      <HashRouter>
        <ScrollToTop />
        <div className="app-container">
          <Navbar theme={theme} toggleTheme={toggleTheme} />
        
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
