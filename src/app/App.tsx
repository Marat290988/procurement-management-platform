import { AppLoader } from './app-loader';
import { AppRouter } from './app-router';
import { AppStore } from './app-store';

function App() {
  return (
    <>
      <AppStore>
        <AppLoader>
          <AppRouter />
        </AppLoader>
      </AppStore>
    </>
  );
}

export default App;
