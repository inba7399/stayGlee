import { resolve } from 'node:path'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

/**
 * Three real pages rather than client side routes. Each builds to its own
 * index.html, so `/stayglee/` and `/di-heritage/` are ordinary URLs: they
 * survive a refresh and a shared link on any static host, with no rewrite
 * rule to configure. Shared code still lands in common chunks.
 */
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    open: false,
  },
  build: {
    assetsInlineLimit: 2048,
    rollupOptions: {
      input: {
        home: resolve(__dirname, 'index.html'),
        stayglee: resolve(__dirname, 'stayglee/index.html'),
        heritage: resolve(__dirname, 'di-heritage/index.html'),
        celebrate: resolve(__dirname, 'celebrate/index.html'),
      },
    },
  },
})
