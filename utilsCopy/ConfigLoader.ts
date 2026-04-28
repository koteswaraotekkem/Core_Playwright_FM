import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';

dotenv.config();

export function loadConfig() {
    const environment = process.env.ENVIRONMENT || 'DEV';
    const configPath = path.resolve(__dirname, `../config/${environment.toLowerCase()}.json`);

    if (!fs.existsSync(configPath)) {
        throw new Error(`Configuration file for environment '${environment}' not found at ${configPath}`);
    }

    const config = JSON.parse(fs.readFileSync(configPath, 'utf-8'));
    return config;
}


