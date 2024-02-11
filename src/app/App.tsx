import { AppRouter } from './app-router';
import { ThemeProvider } from './app-theme';

function App() {
  return (
    <>
      <ThemeProvider>
        <AppRouter />
      </ThemeProvider>
    </>
  );
}

export default App;
