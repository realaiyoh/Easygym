import App from '@/App';
import { Routes, Route, BrowserRouter } from 'react-router';
import Home from '@/components/pages/Home';
import Login from '@/components/pages/Login';

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<Home />} />
          <Route path="/login" element={<Login />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
