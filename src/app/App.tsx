import { AppRouter } from './app-router';
import { AppStore } from './app-store';

function App() {
  return (
    <>
      <AppStore>
        <AppRouter />
      </AppStore>
    </>
  );
}

export default App;
