import { NavLink } from 'react-router';
import { routes } from '@/lib/constants';
import { useStore } from '@/store/store';
import { observer } from 'mobx-react-lite';

const Navbar = observer(() => {
  const { auth } = useStore();

  return (
    <div className="flex items-center h-9 uppercase font-bold">
      <h1>EasyGym</h1>
      <div className="flex items-center w-fit ml-auto mr-16">
        <div className="flex items-center gap-4">
          <NavLink to={routes.Home}>Home</NavLink>
          {auth.user ? (
            <NavLink to={routes.Profile}>Profile</NavLink>
          ) : (
            <>
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
