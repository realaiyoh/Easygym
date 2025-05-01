import { User } from '@/types/User';
import { requests } from '@/api/api';

const userService = {
  single: (id: string) => requests.get<User>(`/user/${id}`),
};

export default userService;
