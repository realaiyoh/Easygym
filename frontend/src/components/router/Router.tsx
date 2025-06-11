import App from '@/App';
import { Route, BrowserRouter, Routes } from 'react-router';
import Home from '@/components/pages/Home';
import Login from '@/components/pages/Login';
import Register from '@/components/pages/Register';
import { routes } from '@/lib/constants';
import ProtectedRoute from '@/components/router/ProtectedRoute';
import Profile from '@/components/pages/user/Profile';
import AuthRoute from '@/components/router/AuthRoute';
import Workouts from '@/components/pages/workouts/Workouts';
import Workout from '@/components/pages/workouts/Workout';
import WorkoutSessions from '@/components/pages/workouts/WorkoutSessions';
import WorkoutSession from '@/components/pages/workouts/WorkoutSession';
import ProtectedClientRoute from '@/components/router/ProtectedClientRoute';
import Invitations from '@/components/pages/user/Invitations';
import MyTrainer from '@/components/pages/user/MyTrainer';

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={routes.Home} element={<App />}>
          <Route index element={<Home />} />

          {/* Auth routes for login and register */}
          <Route element={<AuthRoute />}>
            <Route path={routes.Login} element={<Login />} />
            <Route path={routes.Register} element={<Register />} />
          </Route>

          {/* Protected routes */}
          <Route element={<ProtectedRoute />}>
            <Route path={routes.Profile} element={<Profile />} />
            <Route path={routes.Workouts} element={<Workouts />} />
            <Route path={routes.Workout}>
              <Route path="create" element={<Workout />} />
              <Route path=":id/edit" element={<Workout />} />
            </Route>
            <Route element={<ProtectedClientRoute />}>
              <Route
                path={routes.WorkoutSessions}
                element={<WorkoutSessions />}
              />
              <Route path={routes.WorkoutSession}>
                <Route path="create" element={<WorkoutSession />} />
                <Route path=":id" element={<WorkoutSession />} />
              </Route>
              <Route path={routes.MyTrainer} element={<MyTrainer />} />
            </Route>
            <Route path={routes.Invitations} element={<Invitations />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
