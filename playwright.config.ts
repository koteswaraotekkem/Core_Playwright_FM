import { defineConfig, devices } from '@playwright/test';
import dotenv from 'dotenv';
const debug = process.env.ENVIRONMENT;


// Configure dotenv to be quiet
dotenv.config({ 
  override: true,
  quiet: true,
});
const RPconfig = {
  apiKey: 'dssa',
  endpoint: 'https://qa-reportportal.com/api/v1',
  project: 'FXDOPSTOY',
  launch: 'tekkemk_ShopCapacity',
  description: 'UI-Regression-Tests',
  
  attributes: [
    {
      key: 'ci',
      value: 'true',
    },
    {
      key: 'suite',
      value: 'Regression',
    },
    {
      key: 'application',
      value: 'fxdopstoy',
    },
    {
      key: 'type',
      value: 'UI',
    },
    {
      key: 'env',
      value: 'dev',
    },
      ],
};

export default defineConfig({
  testDir: './tests',
  timeout: 90000 * 10,
  retries: 0,
  expect: { timeout: 20000 },
  globalSetup: './global-setup.ts',
  use: {
    actionTimeout: 30000,
    launchOptions: {
      args: ['--start-maximized']
    },
    viewport: null
  },
  workers: 1,
  projects: [{
    name: '-ShopCapacity',
    use: {
      browserName: 'chromium',
      headless: process.env.CI ? true : false,
      viewport: null,
      baseURL: process.env.BASE_URL,
      screenshot: 'only-on-failure',
      trace: 'off',
      launchOptions: {
        args: ['--start-maximized']
      }
    }
  }],
  reporter: [["line"], ["allure-playwright"], ['html'], ['json', { outputFile: 'playwright-jsonReport/results.json' }], ['@reportportal/agent-js-playwright', RPconfig]],
});