import { NavLink } from 'react-router';
import { routes } from '@/lib/constants';

const Navbar = () => {
  return (
    <div className="flex items-center h-9 uppercase font-bold">
      <h1>EasyGym</h1>
      <div className="flex items-center w-fit ml-auto mr-16">
        <div className="flex items-center gap-4">
          <NavLink to={routes.Home}>Home</NavLink>
          <NavLink to={routes.Login}>Login</NavLink>
          <NavLink to={routes.Register}>Register</NavLink>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
