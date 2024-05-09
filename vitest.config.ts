import { defineConfig } from 'vitest/config';
import path from 'path';

export default defineConfig({
  test: {
    setupFiles: ['./src/config/env']
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src/'),
    }
  }
});
