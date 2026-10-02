import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

const backend = process.env.BACKEND_URL || 'http://127.0.0.1:8080';

export default defineConfig({
  plugins: [react()],
  build: { outDir: 'build' },
  server: {
    host: true,
    port: 3000,
    strictPort: true,
    allowedHosts: ['igor.com'],
    proxy: {
      '/api': { target: backend, changeOrigin: true },
      '/avatars': { target: backend, changeOrigin: true },
      '/socket.io': { target: backend, changeOrigin: true, ws: true },
    },
    watch: {
      usePolling: true,
    },
  },
});
