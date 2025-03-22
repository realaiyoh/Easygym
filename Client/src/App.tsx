import { ThemeProvider } from '@/components/theme/ThemeProvider';
import { Outlet } from 'react-router';

const App = () => {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="ui-theme">
      <Outlet />
    </ThemeProvider>
  );
};

export default App;
