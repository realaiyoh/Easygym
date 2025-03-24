import { UserRole } from '@/types/User';
import { requests } from '@/api/api';
import { ApiService } from '@/types/ApiService';
import { authTokenKey } from '@/lib/constants';
import {
  AuthLoginResponse,
  AuthRegisterResponse,
} from '@/types/AuthLoginResponse';

const authService: ApiService = {
  name: 'auth',
  service: {
    login: async (body: { email: string; password: string }) => {
      try {
        const { data } = await requests.post<AuthLoginResponse>(
          '/auth/login',
          body,
        );
        localStorage.setItem(authTokenKey, data.token);
      } catch (error) {
        console.error('error: ', error);
      }
    },
    register: async (body: {
      email: string;
      password: string;
      role: UserRole;
    }) => {
      try {
        const { data } = await requests.post<AuthRegisterResponse>(
          '/auth/register',
          body,
        );
        localStorage.setItem(authTokenKey, data.token);
      } catch (error) {
        console.error('error: ', error);
      }
    },
  },
};

export default authService;
