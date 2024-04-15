
import fetch from 'node-fetch';
export class SwapiClient {
    private baseURL = 'https://swapi.dev/api';

    async getCharacter(id: number): Promise<any> {

        try {
            const response = await fetch(`${this.baseURL}/people/${id}`);
            if (!response.ok) {
                throw new Error(`Failed to fetch data: ${response.status} ${response.statusText}`);
            }
            const data = await response.json();
            return data;
        } catch (error) {
            return {
                statusCode: 500,
                body: JSON.stringify({ error: error }),
            };
        }
    }
}