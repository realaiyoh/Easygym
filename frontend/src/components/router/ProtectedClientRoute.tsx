import { observer } from 'mobx-react-lite';
import { useStore } from '@/store/store';
import { Navigate, Outlet } from 'react-router';
import { routes } from '@/lib/constants';

const ProtectedClientRoute = observer(() => {
  const { auth } = useStore();

  if (!auth.isUserClient) return <Navigate to={routes.Profile} replace />;

  return <Outlet />;
});

export default ProtectedClientRoute;
