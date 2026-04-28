import { request } from 'playwright';
import * as fs from "fs";
import * as path from "path";
import { loadConfig } from '../utils/ConfigLoader';


/**
 * Utility class for interacting with APIs, including token generation and Rest API calls.
 */
export class APIUtility {
     private readonly config = loadConfig();
   
    /**
     * Refreshes access token using refresh token.
     * 
     * @param {string} refreshToken - The refresh token to use for getting new access token.
     * @returns {Promise<string>} A promise that resolves to the new access token.
     */
    async refreshAccessToken(): Promise<string> {
        const apiContext = await request.newContext();
        const response = await apiContext.put(this.config.urls.apiMicroServTokenUrl, {
            headers: {
                'Content-Type': 'application/json'
            },
            data: {
                tokenRefresh: {
                    refreshToken: this.config.urls.refreshToken
                }
            }
        });

        const responseBody = await response.json();
        return responseBody.accessToken;
    }

    /**
     * Adds a technician to a team.
     * 
     * @returns {Promise<any>} A promise that resolves to the response.
     */
    async addTechnicianToTeam(): Promise<any> {
        const apiContext = await request.newContext();
        const response = await apiContext.post('https://svck.com/act/v1/teams/999/employees', {
            headers: {
                'accept': '*/*',
                'x-company-id': '210002',
                'x-request-user': '1',
                'x-department-id': 'test',
                'x-store-id': 'S100105536',
                'x-enterprise-id': '2',
                'Authorization': 'Bearer eyJraWQiOiJsa1VlYV9MMGEzb29yVFgwME1XVWQzOVZ0OEdJU2x2UW9BZzlFclFad0pzIiwiYWxnIjoiUlMyNTYifQ.eyJ2ZXIiOjEsImp0aSI6IkFULlQweXdNeC1adHlPcGVsdXBxbGZIc3d2R2h5Qmg5VF9hT2ZaQXJteG1xM1UiLCJpc3MiOiJodHRwczovL2Nvbm5lY3RjZGstZGl0Lm9rdGFwcmV2aWV3LmNvbS9vYXV0aDIvYXVzMWQxYWdjeTU5YXM3U1YwaDgiLCJhdWQiOiJJbnRlcm5hbCIsInN1YiI6IjBvYTFkeHAzZXZmRlBFcFk5MGg4IiwiaWF0IjoxNzY0MzQwNjA3LCJleHAiOjE3NjQzNDQyMDcsImNpZCI6IjBvYTFkeHAzZXZmRlBFcFk5MGg4Iiwic2NwIjpbImN1c3RvbV9zY29wZSJdLCJjZGtzaWQiOiJTWVNfVVNFUl9GSVhFRE9QU19BQ1RfRE9NQUlOIn0.BMgcsFaTUkUPTx8hXgejp7gKCTxwJ3cAk8XGsn-GqUkOvx2DE00pQ6ExAopp9hvsVlc0VMmh4E5niK0lZbhkKUlfbH6GqMaSg7zuozPQsyKjTfynWFo-eKNNLbOpTMZNRZwf_FTNitr5IIKq_rD09LUU6HmXZvKk49iqihfGHxEvWrN1gIk_yO48z5y3finaUJj4dUEsTnOo0uVbJgQ3O3B2A0sGAepkqAIa1D1x42F76753RHkMxkag3zSTr6dnSln6JmxcpDaN5q8R3bGdpOQwcvYfINX1xW4_xISGKZ30EdErBnHBnnxSQI0SwIIbC9eCGaYJu8xuBqLz8u7YdA',
                'Content-Type': 'application/json'
            },
            data: ''
        });

        return await response.json();
    }
}