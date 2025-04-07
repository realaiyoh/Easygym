import api from '@/api/api';
import { authTokenKey } from '@/lib/constants';
import { UserRole } from '@/types/User';
import { User } from '@/types/User';
import { makeAutoObservable, runInAction } from 'mobx';

export default class AuthStore {
  user: User | null = null;
  error: string | null = null;
  isLoading: boolean = false;

  constructor() {
    makeAutoObservable(this);
  }

  setMeUser = async (): Promise<User | null> => {
    const user = await api.auth.me();

    runInAction(() => {
      this.user = user;
    });

    return user;
  };

  login = async ({ email, password }: { email: string; password: string }) => {
    runInAction(() => {
      this.isLoading = true;
      this.error = null;
    });

    try {
      const token = await api.auth.login({ email, password });
      if (token) {
        localStorage.setItem(authTokenKey, token);
        return this.setMeUser();
      }
    } catch (error) {
      runInAction(() => {
        this.error = error as string;
      });
    }

    this.isLoading = false;
  };

  register = async ({
    email,
    password,
    role,
  }: {
    email: string;
    password: string;
    role: UserRole;
  }) => {
    runInAction(() => {
      this.isLoading = true;
      this.error = null;
    });

    try {
      const token = await api.auth.register({ email, password, role });
      if (token) {
        localStorage.setItem(authTokenKey, token);
        return this.setMeUser();
      }
    } catch (error) {
      runInAction(() => {
        this.error = error as string;
      });
    }

    runInAction(() => {
      this.isLoading = false;
    });
  };
}
