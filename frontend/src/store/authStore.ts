import api from '@/api/api';
import { authTokenKey } from '@/lib/constants';
import { UserRegisterRequest, UserRole, CurrentUser } from '@/types/User';
import { getErrorMessage } from '@/lib/utils';
import { makeAutoObservable, runInAction } from 'mobx';

export default class AuthStore {
  user: CurrentUser | null = null;
  error: string | null = null;
  isLoading: boolean = true;

  constructor() {
    makeAutoObservable(this);
  }

  get userId() {
    return this.user?.id || 0;
  }

  get isUserClient() {
    return this.user?.role === UserRole.Client;
  }

  get isUserTrainer() {
    return this.user?.role === UserRole.Trainer;
  }

  get isUserAdmin() {
    return this.user?.role === UserRole.Admin;
  }

  setLoading = (isLoading: boolean) => {
    runInAction(() => {
      this.isLoading = isLoading;
    });
  };

  setMeUser = async (): Promise<CurrentUser | null> => {
    runInAction(() => {
      this.isLoading = true;
    });

    const user = await api.auth.me();

    runInAction(() => {
      this.user = user;
      this.isLoading = false;
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
        this.error = getErrorMessage(error);
      });
    }

    runInAction(() => {
      this.isLoading = false;
    });
  };

  register = async (user: UserRegisterRequest) => {
    runInAction(() => {
      this.isLoading = true;
      this.error = null;
    });

    try {
      const token = await api.auth.register(user);
      if (token) {
        localStorage.setItem(authTokenKey, token);
        return this.setMeUser();
      }
    } catch (error) {
      runInAction(() => {
        this.error = getErrorMessage(error);
      });
    }

    runInAction(() => {
      this.isLoading = false;
    });
  };

  logout = () => {
    localStorage.removeItem(authTokenKey);
    runInAction(() => {
      this.user = null;
    });
  };
}
