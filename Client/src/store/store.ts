import AuthStore from '@/store/authStore';
import WorkoutStore from '@/store/workoutStore';
import WorkoutSessionStore from '@/store/workoutSessionStore';
import { createContext, useContext } from 'react';

interface Store {
  auth: AuthStore;
  workout: WorkoutStore;
  workoutSession: WorkoutSessionStore;
}

export const store: Store = {
  auth: new AuthStore(),
  workout: new WorkoutStore(),
  workoutSession: new WorkoutSessionStore(),
};

export const StoreContext = createContext<Store>(store);

export const useStore = () => useContext(StoreContext);

export default store;
