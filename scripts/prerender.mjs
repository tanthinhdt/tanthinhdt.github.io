import { readFile, writeFile } from 'node:fs/promises';
import react from '@vitejs/plugin-react';
import { createServer } from 'vite';

const pages = [
  { pathname: '/', file: 'dist/index.html' },
  { pathname: '/experience/', file: 'dist/experience/index.html' },
  { pathname: '/publications/', file: 'dist/publications/index.html' },
  { pathname: '/awards/', file: 'dist/awards/index.html' },
  { pathname: '/credentials/', file: 'dist/credentials/index.html' }
];

const vite = await createServer({
  appType: 'custom',
  configFile: false,
  logLevel: 'error',
  plugins: [react()],
  server: { middlewareMode: true, hmr: false, ws: false }
});

try {
  const { render } = await vite.ssrLoadModule('/src/entry-server.jsx');

  await Promise.all(pages.map(async ({ pathname, file }) => {
    const document = await readFile(file, 'utf8');
    const { html, structuredData } = await render(pathname);
    const serializedStructuredData = JSON.stringify(structuredData).replaceAll('<', '\\u003c');
    const prerendered = document
      .replace('<div id="root"></div>', `<div id="root">${html}</div>`)
      .replace(
        /<script id="structured-data" type="application\/ld\+json">[\s\S]*?<\/script>/,
        `<script id="structured-data" type="application/ld+json">${serializedStructuredData}</script>`
      );

    if (prerendered === document) {
      throw new Error(`Unable to inject prerendered content into ${file}`);
    }

    await writeFile(file, prerendered);
  }));
} finally {
  await vite.close();
}
