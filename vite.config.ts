import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    port: 5173,
    host: true,
  },
  build: {
    chunkSizeWarningLimit: 600,
    rollupOptions: {
      output: {
        manualChunks: {
          // Geo / Map libraries — largest dependency
          'leaflet-vendor': ['leaflet', 'react-leaflet'],
          // Chart library
          'recharts-vendor': ['recharts'],
          // React core
          'react-vendor': ['react', 'react-dom', 'react-router-dom'],
          // Icons
          'lucide-vendor': ['lucide-react'],
        },
      },
    },
  },
});
