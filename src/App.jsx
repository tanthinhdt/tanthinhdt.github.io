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

const lazyRouteComponents = {
  ExperiencePage,
  PublicationsPage,
  AwardsPage,
  CredentialsPage,
  NotFoundPage
};

export function AppContent({ routeComponents = lazyRouteComponents }) {
  const {
    ExperiencePage: ExperienceRoute,
    PublicationsPage: PublicationsRoute,
    AwardsPage: AwardsRoute,
    CredentialsPage: CredentialsRoute,
    NotFoundPage: NotFoundRoute
  } = routeComponents;
  const [themePreference, setThemePreference] = useState('system');
  const [systemTheme, setSystemTheme] = useState('light');
  const [preferencesReady, setPreferencesReady] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme-preference') || localStorage.getItem('theme') || 'system';
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleSystemThemeChange = (event) => {
      setSystemTheme(event.matches ? 'dark' : 'light');
    };

    // Restore browser preferences only after the server-rendered defaults hydrate.
    // oxlint-disable-next-line react/set-state-in-effect
    setThemePreference(savedTheme);
    setSystemTheme(mediaQuery.matches ? 'dark' : 'light');
    setPreferencesReady(true);
    mediaQuery.addEventListener('change', handleSystemThemeChange);
    return () => mediaQuery.removeEventListener('change', handleSystemThemeChange);
  }, []);

  const theme = themePreference === 'system' ? systemTheme : themePreference;

  useEffect(() => {
    if (!preferencesReady) return;
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme-preference', themePreference);
    localStorage.setItem('theme', themePreference);
  }, [preferencesReady, theme, themePreference]);

  const cycleTheme = () => {
    setThemePreference((prev) => {
      if (prev === 'system') return 'light';
      if (prev === 'light') return 'dark';
      return 'system';
    });
  };

  return (
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
              <Route path="/experience" element={<ExperienceRoute />} />
              <Route path="/publications" element={<PublicationsRoute />} />
              <Route path="/awards" element={<AwardsRoute />} />
              <Route path="/credentials" element={<CredentialsRoute />} />
              <Route path="*" element={<NotFoundRoute />} />
            </Routes>
          </Suspense>
        </main>

        <Footer />
      </div>
    </MotionConfig>
  );
}

export default function App() {
  return (
    <LanguageProvider>
      <BrowserRouter>
        <AppContent />
      </BrowserRouter>
    </LanguageProvider>
  );
}
