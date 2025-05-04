import workoutService from '@/api/services/workoutService';
import { getErrorMessage } from '@/lib/utils';
import { CreateWorkoutRequest, Workout } from '@/types/Workout';
import { makeAutoObservable, runInAction } from 'mobx';

export default class WorkoutStore {
  workouts: Workout[] = [];
  isLoading: boolean = false;
  error: string | null = null;
  workoutFetchPromise: Promise<Workout> | null = null;

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

  fetchWorkout = async (traineeId: number, workoutId: number) => {
    runInAction(() => {
      this.isLoading = true;
      this.error = null;
    });

    // If the workout is already in the store, don't add it again
    if (this.workouts.find((w) => w.id === workoutId)) return;

    try {
      // If the workout is already being fetched, return the existing promise
      if (this.workoutFetchPromise) {
        return await this.workoutFetchPromise;
      }

      const fetchPromise = workoutService.getWorkoutForTrainee(
        traineeId,
        workoutId,
      );

      runInAction(() => {
        this.workoutFetchPromise = fetchPromise;
      });

      const workout = await fetchPromise;

      runInAction(() => {
        this.workouts.push(workout);
      });
    } catch (error) {
      runInAction(() => {
        this.error = getErrorMessage(error);
      });
    }

    runInAction(() => {
      this.isLoading = false;
      this.workoutFetchPromise = null;
    });
  };

  createWorkout = async (workout: CreateWorkoutRequest) => {
    try {
      const newWorkout = await workoutService.createWorkout(workout);
      runInAction(() => {
        this.workouts.push(newWorkout);
      });
    } catch (error) {
      runInAction(() => {
        this.error = getErrorMessage(error);
      });
    }
  };

  deleteWorkout = async (traineeId: number, workoutId: number) => {
    try {
      await workoutService.deleteWorkout(traineeId, workoutId);
      runInAction(() => {
        this.workouts = this.workouts.filter((w) => w.id !== workoutId);
      });
    } catch (error) {
      runInAction(() => {
        this.error = getErrorMessage(error);
      });
    }
  };
}
