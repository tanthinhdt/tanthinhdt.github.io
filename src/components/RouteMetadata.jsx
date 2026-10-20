import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useLanguage } from '../useLanguage';

const SITE_URL = 'https://tanthinhdt.github.io';

const routeKeys = {
  '/': 'home',
  '/experience': 'experience',
  '/publications': 'publications',
  '/awards': 'awards',
  '/credentials': 'credentials'
};

function setMeta(selector, attribute, value) {
  const element = document.head.querySelector(selector);
  if (element) element.setAttribute(attribute, value);
}

export default function RouteMetadata() {
  const { pathname } = useLocation();
  const { language, t } = useLanguage();

  useEffect(() => {
    const routeKey = routeKeys[pathname] || 'notFound';
    const title = t(`seo.${routeKey}.title`);
    const description = t(`seo.${routeKey}.description`);
    const canonicalUrl = `${SITE_URL}${pathname === '/' ? '' : pathname}`;

    document.title = title;
    setMeta('meta[name="description"]', 'content', description);
    setMeta('meta[property="og:title"]', 'content', title);
    setMeta('meta[property="og:description"]', 'content', description);
    setMeta('meta[property="og:url"]', 'content', canonicalUrl);
    setMeta('meta[name="twitter:title"]', 'content', title);
    setMeta('meta[name="twitter:description"]', 'content', description);
    setMeta('link[rel="canonical"]', 'href', canonicalUrl);
    document.documentElement.lang = language;
  }, [language, pathname, t]);

  return null;
}
