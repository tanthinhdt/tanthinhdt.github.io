import React, { lazy, Suspense, useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { MotionConfig } from 'framer-motion';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import RouteMetadata from './components/RouteMetadata';
import SkipLink from './components/SkipLink';
import HomePage from './pages/HomePage';
import { LanguageProvider } from './i18n';
import './index.css';

const ExperiencePage = lazy(() => import('./pages/ExperiencePage'));
const PublicationsPage = lazy(() => import('./pages/PublicationsPage'));
const AwardsPage = lazy(() => import('./pages/AwardsPage'));
const CredentialsPage = lazy(() => import('./pages/CredentialsPage'));
const NotFoundPage = lazy(() => import('./pages/NotFoundPage'));

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
      <BrowserRouter>
        <MotionConfig reducedMotion="user">
          <ScrollToTop />
          <RouteMetadata />
          <SkipLink />
          <div className="app-container">
            <Navbar
              theme={theme}
              themePreference={themePreference}
              systemTheme={systemTheme}
              cycleTheme={cycleTheme}
              toggleTheme={cycleTheme}
            />

            <main id="main-content">
              <Suspense fallback={<div className="route-loading" role="status">Loading…</div>}>
                <Routes>
                  <Route path="/" element={<HomePage />} />
                  <Route path="/experience" element={<ExperiencePage />} />
                  <Route path="/publications" element={<PublicationsPage />} />
                  <Route path="/awards" element={<AwardsPage />} />
                  <Route path="/credentials" element={<CredentialsPage />} />
                  <Route path="*" element={<NotFoundPage />} />
                </Routes>
              </Suspense>
            </main>

            <Footer />
          </div>
        </MotionConfig>
      </BrowserRouter>
    </LanguageProvider>
  );
}
