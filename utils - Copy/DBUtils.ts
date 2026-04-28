import sql from 'mssql';
import { loadConfig } from './ConfigLoader';

//if 0 disabled

export async function getEnableCapacityByTechnician(pool: sql.ConnectionPool, asrStoreID: number): Promise<any> {
    const query = `select EnableCapacityByTechnician from org.DealerCrossRef where ASRStoreID=${asrStoreID}`;
    const result = await pool.request().query(query);
    if (result.recordset.length === 0) {
        throw new Error('No records found for the given ASRStoreID');
    }
    return result.recordset[0].EnableCapacityByTechnician;
}

export async function connectToDatabase(): Promise<sql.ConnectionPool> {
    const config = loadConfig();
    const dbConfig = config.database;

    return await sql.connect({
        user: dbConfig.user,
        password: dbConfig.password,
        server: dbConfig.server,
        database: dbConfig.database,
        options: {
            encrypt: true, // Use true if you're on Azure
            trustServerCertificate: true, // For local dev/testing
        },
    });
}

export async function closeDatabaseConnection(pool: sql.ConnectionPool): Promise<void> {
    await pool.close();
}

export async function dbCallToDisableACT(pool: sql.ConnectionPool, loopCompanyId: number): Promise<void> {
    const updateQuery = `UPDATE ServiceBook.org.DealerCrossRef SET EnableCapacityByTechnician=0 WHERE loopCompanyId=${loopCompanyId}`;
     await pool.request().query(updateQuery);
}