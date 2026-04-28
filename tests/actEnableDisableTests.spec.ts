import * as BaseTest from './BaseTest';
import { DealershipSettingsPage } from '../pages/DealershipSettingsPage';
import { LoginPage } from '../pages/LoginPage';

BaseTest.test.beforeAll(async () => {
     await BaseTest.dbCallToDisableACT(BaseTest.dbPool, BaseTest.config.cid);
});

BaseTest.test(' Test to enable ACT', async ({ page }) => {
    await BaseTest.CommonUtils.addTestCaseDetails('KoteswaraRao Tekkem', 'FXDOPSTOY-1150');
    // Login first
    const loginPage = new LoginPage(page);
    const screenshotUtility = new BaseTest.ScreenshotUtility(page);

    await loginPage.goto();
    await loginPage.login(process.env.UName as string, BaseTest.config.appPwd as string);
    await BaseTest.allure.logStep(`User Navigated to the application ${process.env.BASE_URL} and logged in successfully`);
    const dealershipSettings = new DealershipSettingsPage(page);
    
    await screenshotUtility.captureScreenshotAndAttachToAllure('After login');

    await dealershipSettings.navigateToDealershipSettings();
    await screenshotUtility.captureScreenshotAndAttachToAllure('Dealership settings');
    await dealershipSettings.openAppointmentCapacity();
    await screenshotUtility.captureScreenshotAndAttachToAllure('Appointment capacity page');
    await dealershipSettings.verifyAppointmentCapacityPage();
    await dealershipSettings.enableAppointmentCapacityByTechnician();

    await screenshotUtility.captureScreenshotAndAttachToAllure('Final state');
   await page.waitForTimeout(9000);
    const enableCapacity = await BaseTest.getEnableCapacityByTechnician(BaseTest.dbPool, 210002);
    BaseTest.expect(enableCapacity).toBe(true);
});

