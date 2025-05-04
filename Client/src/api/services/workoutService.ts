import { requests } from '@/api/api';
import { Workout } from '@/types/Workout';

const workoutService = {
  getWorkoutsForTrainee: async (traineeId: number) => {
    const workouts = await requests.get<Workout[]>(
      `/workout/trainee/${traineeId}`,
    );
    return workouts;
  },
  getWorkoutForTrainee: async (traineeId: number, workoutId: number) => {
    const workout = await requests.get<Workout>(
      `/workout/trainee/${traineeId}/${workoutId}`,
    );
    return workout;
  },
  createWorkout: async (workout: Workout) => {
    const newWorkout = await requests.post<Workout>(`/workout`, workout);
    return newWorkout;
  },
};

export default workoutService;
