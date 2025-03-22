import '@/App.css';
import { ThemeProvider } from '@/components/ThemeProvider';
import { ModeToggle } from '@/components/ModeToggle';
import { User } from '@/types/User';
import agent from '@/api/agent';
import { useState } from 'react';

function App() {
  const [user, setUser] = useState<User | null>(null);

  const fetchUser = async () => {
    const user = await agent.users.single('1');
    setUser(user.data);
  };

  return (
    <ThemeProvider defaultTheme="dark" storageKey="ui-theme">
      <div className="bg-background">
        <ModeToggle />
        <p onClick={fetchUser}>FETCH SINGLE USER</p>
        <p>{user?.name}</p>
      </div>
    </ThemeProvider>
  );
}

export default App;
