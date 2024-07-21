import axios, { AxiosResponse } from 'axios';
import { BrandApi, BrandData } from '../types';

// Define the base URL for the API
const apiClient = axios.create({
    baseURL: 'http://localhost:3001/api',
    headers: {
        'Content-Type': 'application/json',
    },
});

interface ApiResponse<T> {
    data: T;
}

// API service functions
const apiService = {

    // Fetch all brands
    getBrands: async (): Promise<BrandApi[]> => {
        const response: AxiosResponse<ApiResponse<BrandApi[]>> = await apiClient.get('/brands');
        return response.data.data;
    },

    // Fetch brand by id
    getBrandById: async (id: string): Promise<BrandData> => {
        const response: AxiosResponse<ApiResponse<BrandData>> = await apiClient.get(`/brands/${id}`);
        return response.data as unknown as BrandData;
    }

};

export default apiService;
