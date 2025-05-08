import { ThemeProvider } from '@/components/theme/ThemeProvider';
import { Outlet } from 'react-router';
import { Toaster } from '@/components/ui/sonner';
import ModeToggle from '@/components/theme/ModeToggle';
import Navbar from '@/components/layout/Navbar';
import { useEffect } from 'react';
import { useStore } from '@/store/store';
import { authTokenKey } from '@/lib/constants';
import Loader from '@/components/ui/widgets/Loader';
import { observer } from 'mobx-react-lite';

const App = observer(() => {
  const { auth } = useStore();

  useEffect(() => {
    if (localStorage.getItem(authTokenKey)) {
      auth.setMeUser();
    } else {
      auth.setLoading(false);
    }
  }, [auth]);

  return (
    <ThemeProvider defaultTheme="dark" storageKey="ui-theme">
      <div className="wrapper">
        {auth.isLoading && <Loader />}
        <Navbar />
        <ModeToggle className="absolute top-0 right-0" />
        <Toaster />
        <Outlet />
      </div>
    </ThemeProvider>
  );
});

export default App;
