import AuthStore from '@/store/authStore';
import { createContext, useContext } from 'react';
interface Store {
  auth: AuthStore;
}

export const store: Store = {
  auth: new AuthStore(),
};

export const StoreContext = createContext<Store>(store);

export const useStore = () => useContext(StoreContext);

export default store;
