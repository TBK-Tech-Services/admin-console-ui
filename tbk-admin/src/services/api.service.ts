import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import { ErrorHandlingService } from './errorHandling.service';

// Custom Class for API Service
class ApiService {
    private api: AxiosInstance;

    constructor() {
        this.api = axios.create({
            baseURL: import.meta.env.VITE_API_URL || 'http://localhost:8000',
            timeout: 10000,
            withCredentials: true,
            headers: {
                'Content-Type': 'application/json',
            },
        });

        this.setupInterceptors();
    }

    private setupInterceptors() {
        this.api.interceptors.request.use(
            (config) => {
                return config;
            },
            (error) => {
                ErrorHandlingService.showError(error, 'Request failed');
                return Promise.reject(error);
            }
        );

        this.api.interceptors.response.use(
            (response: AxiosResponse) => {
                if (response.data?.message && response.config.method !== 'get') {
                    ErrorHandlingService.showSuccess(response.data.message);
                }
                return response;
            },
            (error) => {
                if (error.response?.status === 401) {
                    window.location.href = '/login';
                    ErrorHandlingService.showError(error, 'Session expired. Please login again.');
                } 
                else if (error.response?.status === 403) {
                    ErrorHandlingService.showError(error, 'Access denied');
                } 
                else if (error.response?.status >= 500) {
                    ErrorHandlingService.showError(error, 'Server error. Please try again later.');
                } 
                else {
                    ErrorHandlingService.showError(error);
                }
                
                return Promise.reject(error);
            }
        );
    }

    private async request<T>(config: AxiosRequestConfig): Promise<T> {
        const response = await this.api.request<T>(config);
        return response.data;
    }

    async get<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
        return this.request<T>({ ...config, method: 'GET', url });
    }

    async post<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
        return this.request<T>({ ...config, method: 'POST', url, data });
    }

    async put<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
        return this.request<T>({ ...config, method: 'PUT', url, data });
    }

    async patch<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
        return this.request<T>({ ...config, method: 'PATCH', url, data });
    }

    async delete<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
        return this.request<T>({ ...config, method: 'DELETE', url });
    }
}

export const apiService = new ApiService();