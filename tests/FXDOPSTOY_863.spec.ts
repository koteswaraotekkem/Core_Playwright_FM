import { test, expect,  } from '@playwright/test';
import { DealershipSettingsPage } from '../pages/DealershipSettingsPage';
import { LoginPage } from '../pages/LoginPage';
import { Helper } from '../utils/Helper';
import { CommonUtils } from '../utils/CommonUtils';
import * as allure from "allure-js-commons";
import { ScreenshotUtility } from '../utils/ScreenshotUtility';
import { connectToDatabase, closeDatabaseConnection, getEnableCapacityByTechnician, dbCallToDisableACT } from '../utils/DBUtils';
import { before } from 'node:test';
import { loadConfig } from '../utils/ConfigLoader';

before(async () => {
     const config = loadConfig();
    const pool = await connectToDatabase();
        await dbCallToDisableACT(pool, config.cid);
      
});

test(' Test to enable ACT', async ({ page }, testInfo) => {
    await CommonUtils.addTestCaseDetails('KoteswaraRao Tekkem', 'FXDOPSTOY-863');
    const config = loadConfig();
    // Login first
    const loginPage = new LoginPage(page);
    const screenshotUtility = new ScreenshotUtility(page);

    await loginPage.goto();
    await loginPage.login(process.env.UName as string, config.appPwd as string);
    await allure.logStep(`User Navigated to the application ${process.env.BASE_URL} and logged in successfully`);
    const dealershipSettings = new DealershipSettingsPage(page);
    const helper = new Helper(page, testInfo);
    await screenshotUtility.captureScreenshotAndAttachToAllure('After login');

    await dealershipSettings.navigateToDealershipSettings();
    await screenshotUtility.captureScreenshotAndAttachToAllure('Dealership settings');
    const isPopupDisplayed = await dealershipSettings.isEnableActPopUpDisplayed();
    expect(isPopupDisplayed).toBe(true);
    
    await screenshotUtility.captureScreenshotAndAttachToAllure('Alert ACT Enable');
    const pool = await connectToDatabase();
   await page.waitForTimeout(9000);
        const enableCapacity = await getEnableCapacityByTechnician(pool, config.cid);
        expect(enableCapacity).toBe(true);
        await closeDatabaseConnection(pool);
});

