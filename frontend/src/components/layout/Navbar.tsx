import { NavLink } from 'react-router';
import { routes } from '@/lib/constants';
import { useStore } from '@/store/store';
import { observer } from 'mobx-react-lite';
import { Button } from '@/components/ui/button';

const Navbar = observer(() => {
  const { auth } = useStore();

  return (
    <div className="flex flex-col sm:flex-row items-center min-h-9 font-bold mb-4">
      <h1 className="text-2xl uppercase">EasyGym</h1>
      <div className="flex flex-col sm:flex-row items-center w-fit ml-0 mt-2 sm:mt-0 sm:ml-auto mr-0 sm:mr-16">
        <div className="flex flex-col sm:flex-row items-center gap-4">
          {auth.userId ? (
            <>
              <NavLink to={routes.Invitations}>Invitations</NavLink>
              {auth.isUserClient && (
                <>
                  <NavLink to={''}>My trainer</NavLink>
                  <NavLink to={routes.WorkoutSessions}>Sessions</NavLink>
                </>
              )}
              <NavLink to={routes.Workouts}>Workouts</NavLink>
              <NavLink to={routes.Profile}>Profile</NavLink>
              <Button variant="outline" onClick={auth.logout}>
                Logout
              </Button>
            </>
          ) : (
            <>
              <NavLink to={routes.Home}>Home</NavLink>
              <NavLink to={routes.Login}>Login</NavLink>
              <NavLink to={routes.Register}>Register</NavLink>
            </>
          )}
        </div>
      </div>
    </div>
  );
});

export default Navbar;
