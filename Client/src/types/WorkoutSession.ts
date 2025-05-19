import { User } from "@/types/User";
import { Workout } from "@/types/Workout";

export interface WorkoutSession {
    id: number;
    workoutId: number;
    workout?: Workout;
    traineeId: number;
    trainee?: User;
    startTime: string;
    endTime: string;
    perceivedDifficulty?: number;
    notes?: string;
  }

export interface CreateWorkoutSessionRequest {
    workoutId: number;
    traineeId: number;
    startTime: string;
    endTime: string;
    perceivedDifficulty?: number;
    notes?: string;
}

export interface UpdateWorkoutSessionRequest {
    perceivedDifficulty?: number;
    notes?: string;
}