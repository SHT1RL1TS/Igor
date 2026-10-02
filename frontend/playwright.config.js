import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  workers: 1,
  timeout: 30000,
  globalSetup: './tests/setup.js',
  use: {
    baseURL: 'http://127.0.0.1:13000',
    channel: process.env.PLAYWRIGHT_CHANNEL || undefined,
    headless: true,
    trace: 'retain-on-failure',
  },
  projects: [
    { name: 'development', testMatch: 'chat.spec.js' },
    { name: 'production-build', testMatch: 'build.spec.js', use: { baseURL: 'http://127.0.0.1:13001' } },
  ],
});
