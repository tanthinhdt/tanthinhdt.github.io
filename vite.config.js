import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import { mkdir, readFile, writeFile } from 'node:fs/promises'

const routeMetadata = {
  experience: {
    title: 'Experience — Duong Tan Thinh',
    description: 'Professional experience in AI engineering, data quality, and Vietnamese-language AI systems.'
  },
  publications: {
    title: 'Publications — Duong Tan Thinh',
    description: 'Peer-reviewed research in audio-visual speech recognition, computer vision, and biomedical AI.'
  },
  awards: {
    title: 'Awards — Duong Tan Thinh',
    description: 'Academic honors and awards received by Duong Tan Thinh.'
  },
  credentials: {
    title: 'Credentials — Duong Tan Thinh',
    description: 'Professional certificates and academic credentials of Duong Tan Thinh.'
  }
}

function replaceMeta(html, route, metadata) {
  const url = `https://tanthinhdt.github.io/${route}/`

  return html
    .replace(/<title>[^<]*<\/title>/, `<title>${metadata.title}</title>`)
    .replace(/<meta name="description" content="[^"]*" \/>/, `<meta name="description" content="${metadata.description}" />`)
    .replace(/<meta property="og:title" content="[^"]*" \/>/, `<meta property="og:title" content="${metadata.title}" />`)
    .replace(/<meta property="og:description" content="[^"]*" \/>/, `<meta property="og:description" content="${metadata.description}" />`)
    .replace(/<meta property="og:url" content="[^"]*" \/>/, `<meta property="og:url" content="${url}" />`)
    .replace(/<meta name="twitter:title" content="[^"]*" \/>/, `<meta name="twitter:title" content="${metadata.title}" />`)
    .replace(/<meta name="twitter:description" content="[^"]*" \/>/, `<meta name="twitter:description" content="${metadata.description}" />`)
    .replace(/<link rel="canonical" href="[^"]*" \/>/, `<link rel="canonical" href="${url}" />`)
}

function staticRouteEntries() {
  return {
    name: 'static-route-entries',
    apply: 'build',
    async closeBundle() {
      const rootHtml = await readFile('dist/index.html', 'utf8')

      await Promise.all(Object.entries(routeMetadata).map(async ([route, metadata]) => {
        const routeDirectory = `dist/${route}`
        await mkdir(routeDirectory, { recursive: true })
        await writeFile(`${routeDirectory}/index.html`, replaceMeta(rootHtml, route, metadata))
      }))
    }
  }
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), staticRouteEntries()],
  base: '/', // User-site repository deploys at the GitHub Pages origin root
  server: {
    host: '0.0.0.0',
    port: 5173,
  },
})
