import { defineConfig } from 'vitest/config';

export default defineConfig({
  optimizeDeps: {
    entries: [],
  },
  test: {
    globals: true,
    include: ['src/**/*.spec.ts'],
  },
});
