import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { viteSingleFile } from 'vite-plugin-singlefile'

export default defineConfig({
  plugins: [react(), viteSingleFile()],
  // Base URL for assets – '/' works when deployed at the root of the domain.
  base: '/',
  // Development server proxy (only used locally). In production Vercel will hit the real API URL.
  server: {
    port: 5173,
    proxy: {
      '/api': {
        target: 'http://localhost:5000',
        changeOrigin: true,
        secure: false
      },
      '/socket.io': {
        target: 'http://localhost:5000',
        ws: true,
        changeOrigin: true,
        secure: false
      }
    }
  },
  // Build config – the single‑file plugin inlines CSS, JS and assets into index.html.
  build: {
    // No extra files will be emitted; everything ends up in index.html.
    // You can still customize rollup if needed.
  }
});