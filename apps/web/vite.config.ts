/// <reference types="vitest" />
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import path from 'path';

export default defineConfig({
  base: process.env.GITHUB_PAGES === 'true' ? '/LostandFound_Clone/' : '/',
  plugins: [
    tailwindcss(),
    react(),
    {
      name: 'pages-public-assets',
      apply: 'build',
      generateBundle(_options, bundle) {
        if (process.env.GITHUB_PAGES !== 'true') return;
        for (const file of Object.values(bundle)) {
          if (file.type === 'chunk') {
            file.code = file.code.replace(/(?<!LostandFound_Clone)\/assets\//g, '/LostandFound_Clone/assets/');
          } else if (typeof file.source === 'string' && /\.(css|html|js)$/.test(file.fileName)) {
            file.source = file.source.replace(/(?<!LostandFound_Clone)\/assets\//g, '/LostandFound_Clone/assets/');
          }
        }
      },
    },
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    port: 3000,
  },
  test: {
    include: ['src/tests/**/*.test.{ts,tsx}'],
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./src/tests/setup.ts'],
  },
});
