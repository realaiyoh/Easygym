import { User } from '@/types/User';

export interface Set {
  id: number;
  name: string;
  description?: string;
  repetitions: number;
  weight?: number;
}

export interface Workout {
  id: number;
  name?: string;
  description?: string;
  traineeId: number;
  trainee?: User;
  sets?: Set[];
  restTimeSeconds?: number;
  createdAt: string;
}
