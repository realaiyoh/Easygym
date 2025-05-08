import { NavLink } from 'react-router';
import { routes } from '@/lib/constants';
import { useStore } from '@/store/store';
import { observer } from 'mobx-react-lite';
import { Button } from '@/components/ui/button';

const Navbar = observer(() => {
  const { auth } = useStore();

  return (
    <div className="flex items-center h-9 font-bold mb-4">
      <h1 className="text-2xl uppercase">EasyGym</h1>
      <div className="flex items-center w-fit ml-auto mr-16">
        <div className="flex items-center gap-4">
          {auth.userId ? (
            <>
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
