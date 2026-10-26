import { defineConfig } from 'vite';
import { resolve } from 'node:path';

// Multi-page build: include the free IP tool in dist/tools/my-ip/.
export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(import.meta.dirname, 'index.html'),
        myIp: resolve(import.meta.dirname, 'tools/my-ip/index.html'),
      },
    },
  },
  server: {
    proxy: {
      '/v1': { target: 'http://127.0.0.1:8000', changeOrigin: false },
      '/healthz': { target: 'http://127.0.0.1:8000', changeOrigin: false },
    },
  },
});
