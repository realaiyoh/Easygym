export const authTokenKey = 'auth-token';

export const routes = {
  Home: '/',
  Login: '/login',
  Register: '/register',
  Profile: '/profile',
  Logout: '/logout',
  Workouts: '/workouts',
  Workout: '/workout',
  CreateWorkout: '/workout/create',
  EditWorkout: (id: number) => `/workout/${id}/edit`,
  WorkoutSessions: '/workout-sessions',
  WorkoutSession: '/workout-session',
  CreateWorkoutSession: '/workout-session/create',
  EditWorkoutSession: (id: number) => `/workout-session/${id}/edit`,
};
