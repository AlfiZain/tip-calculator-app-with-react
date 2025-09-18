import { defineConfig } from 'vite';
import config from './vite.config';

export default defineConfig({
  plugins: [...config.plugins],
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: './vitest-setup.js',
  },
});
