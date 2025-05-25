import { observer } from 'mobx-react-lite';
import { useStore } from '@/store/store';
import { Navigate, Outlet } from 'react-router';
import { routes } from '@/lib/constants';
import LoadingSpinner from '@/components/ui/widgets/LoadingSpinner';

const AuthRoute = observer(() => {
  const { auth } = useStore();

  // If we're still loading the user, don't redirect yet
  if (auth.isLoading) return <LoadingSpinner />;

  // Only redirect if we're not loading and the user is authenticated
  if (auth.user) return <Navigate to={routes.Profile} replace />;

  return <Outlet />;
});

export default AuthRoute;
