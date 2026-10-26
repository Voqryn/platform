import { defineConfig } from 'vite';

// Development-only same-origin proxy. No browser-side API credentials.
export default defineConfig({
  server: {
    proxy: {
      '/v1': { target: 'http://127.0.0.1:8000', changeOrigin: false },
      '/healthz': { target: 'http://127.0.0.1:8000', changeOrigin: false },
    },
  },
});
