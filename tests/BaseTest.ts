import { test as base } from '@playwright/test';
import { APIUtility } from '../utils/APIUtility';
import { loadConfig } from '../utils/ConfigLoader';
import { connectToDatabase } from '../utils/DBUtils';
import type { ConnectionPool } from 'mssql';
import * as allure from 'allure-js-commons';
import { CommonUtils } from '../utils/CommonUtils';
import { ScreenshotUtility } from '../utils/ScreenshotUtility';
import { getEnableCapacityByTechnician, dbCallToDisableACT } from '../utils/DBUtils';


let accessToken: string;
let config: any;
let dbPool: ConnectionPool;

base.beforeAll(async () => {
    console.log('Setting up test suite...');
    
    config = loadConfig();
    console.log('Configuration loaded');
    
    dbPool = await connectToDatabase();
    console.log('Database connected');
    
    console.log('Generating Microservice access token...');
    const apiUtility = new APIUtility();
    accessToken = await apiUtility.refreshAccessToken();
    console.log('Microservice token generated successfully');
});

export const test = base;
export { expect } from '@playwright/test';
export { accessToken, config, dbPool, allure, CommonUtils, ScreenshotUtility, getEnableCapacityByTechnician, dbCallToDisableACT };
