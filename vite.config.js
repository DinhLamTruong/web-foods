import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import path from 'path';
import { fileURLToPath } from 'url';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      '@': path.resolve(fileURLToPath(new URL('.', import.meta.url)), './src'),
      '@api': path.resolve(fileURLToPath(new URL('.', import.meta.url)), './src/api'),
      '@components': path.resolve(fileURLToPath(new URL('.', import.meta.url)), './src/components'),
      '@css': path.resolve(fileURLToPath(new URL('.', import.meta.url)), './src/css'),
      '@hooks': path.resolve(fileURLToPath(new URL('.', import.meta.url)), './src/hooks'),
      '@images': path.resolve(fileURLToPath(new URL('.', import.meta.url)), './src/images'),
      '@interfaces': path.resolve(fileURLToPath(new URL('.', import.meta.url)), './src/interfaces'),
      '@layout': path.resolve(fileURLToPath(new URL('.', import.meta.url)), './src/layout'),
      '@pages': path.resolve(fileURLToPath(new URL('.', import.meta.url)), './src/pages'),
      '@utils': path.resolve(fileURLToPath(new URL('.', import.meta.url)), './src/utils'),
    },
  },

});
