import { APIBase } from './APIBase';
import { IAPIHeaders } from '../models/APIHeaders';
import { AddTechnicianRequest, IAddTechnicianRequest } from '../models/AddTechnicianRequest';

/**
 * API class for technician team operations.
 */
export class APIAddTechnicianToTeam extends APIBase {
    /**
     * Adds a technician to a team.
     * 
     * @param {string} teamId - The team ID to add technician to.
     * @returns {Promise<number>} A promise that resolves to the HTTP status code.
     */
    async addTechnicianToTeam(teamId: string, headerOverrides?: IAPIHeaders, requestOverrides?: IAddTechnicianRequest): Promise<number> {
        const endpoint = this.config.api.endpoints.addTechnicianToTeam.replace('{teamId}', teamId);
        
        const defaultRequest = AddTechnicianRequest.fromDefaults(this.config);
        const mergedRequest = defaultRequest.merge(requestOverrides);
        const requestBody = mergedRequest.toRequestBody();
        
        return await this.post(endpoint, requestBody, headerOverrides);
    }

    /**
     * Adds a technician to a team without x-store-id header.
     */
    async addTechnicianToTeamWithoutStoreId(teamId: string): Promise<number> {
        return await this.addTechnicianToTeam(teamId, { storeId: '' });
    }

    /**
     * Removes a technician from a team.
     * 
     * @param {string} teamId - The team ID to remove technician from.
     * @param {string} employeeId - The employee ID to remove.
     * @returns {Promise<number>} A promise that resolves to the HTTP status code.
     */
    async removeTechnicianFromTeam(teamId: string, employeeId: string, headerOverrides?: IAPIHeaders): Promise<number> {
        const endpoint = this.config.api.endpoints.removeTechnicianFromTeam
            .replace('{teamId}', teamId)
            .replace('{employeeId}', employeeId);
        
        const apiContext = await this.getApiContext();
        const headers = await this.getAuthHeaders(headerOverrides);
        
        const response = await apiContext.delete(this.config.urls.microServBaseUrl + endpoint, {
            headers
        });

        return response.status();
    }
  
}