import { request, APIRequestContext } from 'playwright';
import { loadConfig } from '../utils/ConfigLoader';
import { APIHeaders, IAPIHeaders } from '../models/APIHeaders';
import { accessToken } from '../tests/BaseTest';

export class APIBase {


    protected readonly config = loadConfig();
    protected apiContext: APIRequestContext | null = null;

    protected async getApiContext(): Promise<APIRequestContext> {
        if (!this.apiContext) {
            this.apiContext = await request.newContext();
        }
        return this.apiContext;
    }

    public async getAuthHeaders(headerOverrides?: IAPIHeaders): Promise<Record<string, string>> {
        const defaultHeaders = APIHeaders.fromDefaults(this.config);
        const mergedHeaders = defaultHeaders.merge(headerOverrides);
        
        return {
            ...this.config.headers,
            ...mergedHeaders.toHeaders(),
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': 'application/json'
        };
    }

    public async post(endpoint: string, data?: any, headerOverrides?: IAPIHeaders): Promise<number> {
        const apiContext = await this.getApiContext();
        const headers = await this.getAuthHeaders(headerOverrides);
        
        if (process.env.log && data) {
            console.log('Request Body:', data);
        }
        
        const response = await apiContext.post(this.config.urls.microServBaseUrl + endpoint, {
            headers,
            data: data ? JSON.stringify(data) : undefined
        });

        if (process.env.log) {
            console.log('Response Status:', response.status());
        }

        return response.status();
    }

    protected async get(endpoint: string): Promise<number> {
        const apiContext = await this.getApiContext();
        const headers = await this.getAuthHeaders();
        
        const response = await apiContext.get(this.config.urls.microServBaseUrl + endpoint, {
            headers
        });

        if (process.env.log) {
            console.log('Response Status:', response.status());
        }

        return response.status();
    }

    protected async put(endpoint: string, data?: any): Promise<number> {
        const apiContext = await this.getApiContext();
        const headers = await this.getAuthHeaders();
        
        if (process.env.log && data) {
            console.log('Request Body:', data);
        }
        
        const response = await apiContext.put(this.config.urls.microServBaseUrl + endpoint, {
            headers,
            data: data ? JSON.stringify(data) : undefined
        });

        if (process.env.log) {
            console.log('Response Status:', response.status());
        }

        return response.status();
    }

    protected async delete(endpoint: string): Promise<number> {
        const apiContext = await this.getApiContext();
        const headers = await this.getAuthHeaders();
        
        const response = await apiContext.delete(this.config.urls.microServBaseUrl + endpoint, {
            headers
        });

        if (process.env.log) {
            console.log('Response Status:', response.status());
        }

        return response.status();
    }
}