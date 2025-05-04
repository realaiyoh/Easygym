import workoutService from '@/api/services/workoutService';
import { getErrorMessage } from '@/lib/utils';
import { Workout } from '@/types/Workout';
import { makeAutoObservable, runInAction } from 'mobx';

export default class WorkoutStore {
  workouts: Workout[] = [];
  isLoading: boolean = false;
  error: string | null = null;

  constructor() {
    makeAutoObservable(this);
  }

  fetchWorkouts = async (traineeId: number) => {
    runInAction(() => {
      this.isLoading = true;
      this.error = null;
    });

    try {
      const workouts = await workoutService.getWorkoutsForTrainee(traineeId);
      runInAction(() => {
        this.workouts = workouts;
      });
    } catch (error) {
      runInAction(() => {
        this.error = getErrorMessage(error);
      });
    }

    runInAction(() => {
      this.isLoading = false;
    });
  };
}
