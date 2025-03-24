import axios from 'axios';
import { authTokenKey } from '@/lib/constants';
import { ApiService } from '@/types/ApiService';
import services from '@/api/services/services';

axios.defaults.baseURL = import.meta.env.VITE_APP_API_URL;

const instance = axios.create({
  baseURL: import.meta.env.VITE_APP_API_URL,
  timeout: 10000,
  headers: { 'Content-Type': 'application/json' },
});

instance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem(authTokenKey);
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

export const requests = {
  get: async <T>(url: string) => await instance.get<T>(url),
  post: async <T>(url: string, body: {}) => await instance.post<T>(url, body),
  put: async <T>(url: string, body: {}) => await instance.put<T>(url, body),
  delete: async <T>(url: string) => await instance.delete<T>(url),
};

const api = services.reduce(
  (acc: Record<string, ApiService['service']>, service: ApiService) => {
    acc[service.name] = service.service;
    return acc;
  },
  {} as Record<string, ApiService['service']>,
);

export default api;
