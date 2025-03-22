import App from '@/App';
import { Routes, Route, BrowserRouter } from 'react-router';
import Home from '@/components/pages/Home';

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<Home />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
