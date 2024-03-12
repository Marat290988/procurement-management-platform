import i18n from '@/features/language/model/i18n';
import { AppLoader } from './app-loader';
import { AppRouter } from './app-router';
import { AppStore } from './app-store';
import { I18nextProvider } from 'react-i18next';

function App() {
  return (
    <>
      <AppStore>
        <I18nextProvider i18n={i18n}>
          <AppLoader>
            <AppRouter />
          </AppLoader>
        </I18nextProvider>
      </AppStore>
    </>
  );
}

export default App;
