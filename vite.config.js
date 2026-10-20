import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/', // User-site repository deploys at the GitHub Pages origin root
  server: {
    host: '0.0.0.0',
    port: 5173,
  },
})
