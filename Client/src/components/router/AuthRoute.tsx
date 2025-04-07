import { observer } from 'mobx-react-lite';
import { useStore } from '@/store/store';
import { Navigate, Outlet } from 'react-router';
import { routes } from '@/lib/constants';

const AuthRoute = observer(() => {
  const { auth } = useStore();

  if (auth.user) {
    return <Navigate to={routes.Profile} replace />;
  }

  return <Outlet />;
});

export default AuthRoute;
