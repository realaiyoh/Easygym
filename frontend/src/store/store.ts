import AuthStore from '@/store/authStore';
import WorkoutStore from '@/store/workoutStore';
import WorkoutSessionStore from '@/store/workoutSessionStore';
import InteractionStore from '@/store/interactionStore';
import { createContext, useContext } from 'react';

interface Store {
  auth: AuthStore;
  workout: WorkoutStore;
  workoutSession: WorkoutSessionStore;
  interaction: InteractionStore;
}

export const store: Store = {
  auth: new AuthStore(),
  workout: new WorkoutStore(),
  workoutSession: new WorkoutSessionStore(),
  interaction: new InteractionStore(),
};

export const StoreContext = createContext<Store>(store);

export const useStore = () => useContext(StoreContext);

export default store;
