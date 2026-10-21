import React from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';
import { AppContent } from './App';
import { LanguageProvider } from './i18n';
import { createStructuredData } from './data/structuredData';
import ExperiencePage from './pages/ExperiencePage';
import PublicationsPage from './pages/PublicationsPage';
import AwardsPage from './pages/AwardsPage';
import CredentialsPage from './pages/CredentialsPage';
import NotFoundPage from './pages/NotFoundPage';

const routeComponents = {
  ExperiencePage,
  PublicationsPage,
  AwardsPage,
  CredentialsPage,
  NotFoundPage
};

export async function render(pathname) {
  const html = renderToString(
    <LanguageProvider>
      <StaticRouter location={pathname}>
        <AppContent routeComponents={routeComponents} />
      </StaticRouter>
    </LanguageProvider>
  );

  return {
    html,
    structuredData: createStructuredData(pathname)
  };
}
