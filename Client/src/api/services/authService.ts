import { UserRegisterRequest, User } from '@/types/User';
import { requests } from '@/api/api';

const authService = {
  me: async () => {
    const user = await requests.get<User>('/auth/me');
    return user;
  },
  login: async (body: { email: string; password: string }) => {
    const token = await requests.post<string>('/auth/login', body);
    return token;
  },
  register: async (body: UserRegisterRequest) => {
    const token = await requests.post<string>('/auth/register', body);
    return token;
  },
};

export default authService;
