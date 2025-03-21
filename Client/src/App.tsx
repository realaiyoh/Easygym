import '@/App.css';
import { ThemeProvider } from '@/components/ThemeProvider';
import { ModeToggle } from '@/components/ModeToggle';

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="ui-theme">
      <div className="bg-background">
        <ModeToggle />
      </div>
    </ThemeProvider>
  );
}

export default App;
