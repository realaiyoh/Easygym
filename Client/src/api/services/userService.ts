import { User } from '@/types/User';
import { requests } from '@/api/api';
import { ApiService } from '@/types/ApiService';

const userService: ApiService = {
  name: 'users',
  service: {
    single: (id: string) => requests.get<User>(`/user/${id}`),
  },
};

export default userService;
