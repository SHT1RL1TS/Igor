import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    host: true,
    port: 3000,
    allowedHosts: true, // Разрешает Nginx проксировать запросы с igor.com
    watch: {
      usePolling: true,
    },
  },
});
