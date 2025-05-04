import AuthStore from '@/store/authStore';
import WorkoutStore from '@/store/workoutStore';
import { createContext, useContext } from 'react';

interface Store {
  auth: AuthStore;
  workout: WorkoutStore;
}

export const store: Store = {
  auth: new AuthStore(),
  workout: new WorkoutStore(),
};

export const StoreContext = createContext<Store>(store);

export const useStore = () => useContext(StoreContext);

export default store;
