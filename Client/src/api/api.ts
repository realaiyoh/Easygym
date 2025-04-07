import axios, { AxiosResponse } from 'axios';
import { authTokenKey } from '@/lib/constants';
import authService from '@/api/services/authService';
import userService from '@/api/services/userService';

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

const responseBody = <T>(response: AxiosResponse<T>) => response.data;

export const requests = {
  get: <T>(url: string) => instance.get<T>(url).then(responseBody),
  post: <T>(url: string, body: {}) =>
    instance.post<T>(url, body).then(responseBody),
  put: <T>(url: string, body: {}) =>
    instance.put<T>(url, body).then(responseBody),
  delete: <T>(url: string) => instance.delete<T>(url).then(responseBody),
};

const api = {
  users: userService,
  auth: authService,
};

export default api;
