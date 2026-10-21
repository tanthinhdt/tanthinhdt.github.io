# Duong Tan Thinh — Portfolio

Multilingual research portfolio for Duong Tan Thinh, built with React and Vite and deployed to GitHub Pages.

## Local development

```bash
npm install
npm run dev
```

Production checks:

```bash
npm run build
npm run lint
```

## Content

- Profile, updates, publications, experience, credentials, education, awards, and lab affiliation: `src/data/portfolioData.js`
- Interface translations: `src/i18n.jsx`
- Structured identity data: `src/data/structuredData.js`
- Page components: `src/pages/`
- Public certificates and images: `public/`

When adding a publication, include a stable `id`, DOI, external paper URL, abstract, keywords, and BibTeX. Add translated content under the same ID in `src/i18n.jsx`.

## Automated updates

- `npm run update-citations` refreshes Crossref citation counts.
- `npm run update-journal-ranks` refreshes journal quartiles.
- `npm run update-visitors` refreshes Umami country metrics when the required Umami environment variables are available.

The corresponding scheduled workflows live in `.github/workflows/`.

## Deployment

Pushes to `main` are built and deployed through `.github/workflows/deploy.yml`. The production build prerenders each public route before React hydrates it in the browser. Clean client-side routes are supported on GitHub Pages through `public/404.html`.
