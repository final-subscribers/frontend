import path from 'path';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    // pdf cors 우회
    proxy: {
      '/pdfFile': {
        // 상세정보
        target: 'https://www.adobe.com',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/pdfFile/, ''),
      },
      '/pdf': {
        // 공급안내표
        target: 'https://www.w3.org',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/pdf/, ''),
      },
    },
  },
});
