import { requests } from '@/api/api';
import { CreateWorkoutSessionRequest, UpdateWorkoutSessionRequest, WorkoutSession } from '@/types/WorkoutSession';

const workoutSessionService = {
  getWorkoutSessionsForTrainee: async (traineeId: number) => {
    const sessions = await requests.get<WorkoutSession[]>(
      `/workoutsession/trainee/${traineeId}`,
    );
    return sessions;
  },
  getWorkoutSessionForTrainee: async (traineeId: number, sessionId: number) => {
    const session = await requests.get<WorkoutSession>(
      `/workoutsession/trainee/${traineeId}/${sessionId}`,
    );
    return session;
  },
  createWorkoutSession: async (session: CreateWorkoutSessionRequest) => {
    const newSession = await requests.post<WorkoutSession>(`/workoutsession`, session);
    return newSession;
  },
  updateWorkoutSession: async (traineeId: number, sessionId: number, session: UpdateWorkoutSessionRequest) => {
    const updatedSession = await requests.put<WorkoutSession>(
      `/workoutsession/trainee/${traineeId}/${sessionId}`, 
      session
    );
    return updatedSession;
  },
  deleteWorkoutSession: async (traineeId: number, sessionId: number) => {
    await requests.delete(`/workoutsession/trainee/${traineeId}/${sessionId}`);
  },
};

export default workoutSessionService;
