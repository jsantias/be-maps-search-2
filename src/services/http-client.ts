import axios, { AxiosResponse } from 'axios';

export class HttpClient {
    async get(url: string, params?: any): Promise<any> {
        try {
            const response: AxiosResponse = await axios.get(url, { params });
            return response;
        } catch (error: any) {
            throw new Error(`Failed to fetch data from ${url}: ${error.message}`);
        }
    }
}
