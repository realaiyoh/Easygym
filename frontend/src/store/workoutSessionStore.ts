import workoutSessionService from '@/api/services/workoutSessionService';
import { getErrorMessage } from '@/lib/utils';
import { CreateWorkoutSessionRequest, UpdateWorkoutSessionRequest, WorkoutSession } from '@/types/WorkoutSession';
import { makeAutoObservable, runInAction } from 'mobx';

export default class WorkoutSessionStore {
  workoutSessions: WorkoutSession[] = [];
  isLoading: boolean = false;
  error: string | null = null;
  sessionFetchPromise: Promise<WorkoutSession> | null = null;

  constructor() {
    makeAutoObservable(this);
  }

  getWorkoutSession = (sessionId: number) => {
    return this.workoutSessions.find((s) => s.id === sessionId);
  };

  fetchWorkoutSessions = async (traineeId: number) => {
    runInAction(() => {
      this.isLoading = true;
      this.error = null;
    });

    try {
      const sessions = await workoutSessionService.getWorkoutSessionsForTrainee(traineeId);
      runInAction(() => {
        this.workoutSessions = sessions;
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

  fetchWorkoutSession = async (traineeId: number, sessionId: number) => {
    runInAction(() => {
      this.isLoading = true;
      this.error = null;
    });

    // If the session is already in the store, don't add it again
    if (this.workoutSessions.find((s) => s.id === sessionId)) return;

    try {
      // If the session is already being fetched, return the existing promise
      if (this.sessionFetchPromise) {
        return await this.sessionFetchPromise;
      }

      this.sessionFetchPromise = workoutSessionService.getWorkoutSessionForTrainee(traineeId, sessionId);
      const session = await this.sessionFetchPromise;

      runInAction(() => {
        this.workoutSessions.push(session);
      });

      return session;
    } catch (error) {
      runInAction(() => {
        this.error = getErrorMessage(error);
      });
    } finally {
      runInAction(() => {
        this.isLoading = false;
        this.sessionFetchPromise = null;
      });
    }
  };

  createWorkoutSession = async (session: CreateWorkoutSessionRequest) => {
    runInAction(() => {
      this.isLoading = true;
      this.error = null;
    });

    try {
      const newSession = await workoutSessionService.createWorkoutSession(session);
      runInAction(() => {
        this.workoutSessions.push(newSession);
      });
      return newSession;
    } catch (error) {
      runInAction(() => {
        this.error = getErrorMessage(error);
      });
    } finally {
      runInAction(() => {
        this.isLoading = false;
      });
    }
  };

  updateWorkoutSession = async (traineeId: number, sessionId: number, session: UpdateWorkoutSessionRequest) => {
    runInAction(() => {
      this.isLoading = true;
      this.error = null;
    });

    try {
      const updatedSession = await workoutSessionService.updateWorkoutSession(traineeId, sessionId, session);
      runInAction(() => {
        const index = this.workoutSessions.findIndex((s) => s.id === sessionId);
        if (index !== -1) {
          this.workoutSessions[index] = updatedSession;
        }
      });
      return updatedSession;
    } catch (error) {
      runInAction(() => {
        this.error = getErrorMessage(error);
      });
    } finally {
      runInAction(() => {
        this.isLoading = false;
      });
    }
  };

  deleteWorkoutSession = async (sessionId: number) => {
    runInAction(() => {
      this.isLoading = true;
      this.error = null;
    });

    try {
      await workoutSessionService.deleteWorkoutSession(sessionId);
      runInAction(() => {
        this.workoutSessions = this.workoutSessions.filter((s) => s.id !== sessionId);
      });
    } catch (error) {
      runInAction(() => {
        this.error = getErrorMessage(error);
      });
    } finally {
      runInAction(() => {
        this.isLoading = false;
      });
    }
  };
}
