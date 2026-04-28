# Automation Playwright Project

This project uses [Playwright](https://playwright.dev/) with TypeScript to run end-to-end tests in the Chrome browser and generate test reports using Allure.

## Getting Started
Write your API or UI Test under /tests 
It is mandatory to use the import { test, expect } from './BaseTest';
Because it is the hook for api base tests

### Install dependencies
```
npm install
```
### Example to run your specific test
 you should be in your project base dir "fixedops-shopcapacity-automation"
 npx playwright test addTechnicianToTeam.spec
```

### Run tests in Chrome
```
npx playwright test --project=chromium

```

### Generate Allure report
```
npx allure generate ./allure-results --clean -o ./allure-report
npx allure open ./allure-report
```

## Project Structure
- `tests/` - Your test files
- `playwright.config.ts` - Playwright configuration
- `allure-results/` - Allure raw results (generated after running tests)
- `allure-report/` - Allure HTML report (generated after running the above command)

## Useful Commands
- Run all tests: `npx playwright test`
- Run tests in UI mode: `npx playwright test --ui`
- Debug a test: `npx playwright test --debug`

## Documentation
- [Playwright Docs](https://playwright.dev/docs/intro)
- [Allure Playwright Reporter](https://github.com/allure-framework/allure-js/tree/master/packages/allure-playwright)
