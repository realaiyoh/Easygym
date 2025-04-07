import { observer } from 'mobx-react-lite';
import { useStore } from '@/store/store';
import { Navigate, Outlet } from 'react-router';
import { routes } from '@/lib/constants';

const ProtectedRoute = observer(() => {
  const { auth } = useStore();

  if (!auth.user) {
    return <Navigate to={routes.Login} replace />;
  }

  return <Outlet />;
});

export default ProtectedRoute;
