import { User } from '@/types/User';
import axios from 'axios';

axios.defaults.baseURL = import.meta.env.VITE_APP_API_URL;

const requests = {
  get: async <T>(url: string) => await axios.get<T>(url),
  post: async <T>(url: string, body: {}) => await axios.post<T>(url, body),
  put: async <T>(url: string, body: {}) => await axios.put<T>(url, body),
  delete: async <T>(url: string) => await axios.delete<T>(url),
};

// TODO: Temp for testing
const users = {
  single: (id: string) => requests.get<User>(`/user/${id}`),
};

const agent = {
  users,
};

export default agent;
