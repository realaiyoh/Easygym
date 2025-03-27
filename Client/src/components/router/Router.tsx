import App from '@/App';
import { Route, BrowserRouter, Routes } from 'react-router';
import Home from '@/components/pages/Home';
import Login from '@/components/pages/Login';
import { routes } from '@/lib/constants';

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={routes.Home} element={<App />}>
          <Route index element={<Home />} />
          <Route path={routes.Login} element={<Login />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
