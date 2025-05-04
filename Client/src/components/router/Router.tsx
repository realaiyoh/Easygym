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
import WorkoutForm from '@/components/pages/workouts/WorkoutForm';

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
            <Route path={routes.CreateWorkout} element={<WorkoutForm />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
