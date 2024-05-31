import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

i18n
  .use(initReactI18next)
  .init({
    lng: 'en',
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
    react: {
      useSuspense: false,
    },
    backend: {
      loadPath: './lang-data/{{ns}}.json',
    }
  });

fetch('./lang-data/en.json')
  .then(response => response.json())
  .then(data => {
    i18n.addResourceBundle('en', 'translation', data);
  });

fetch('./lang-data/ru.json')
  .then(response => response.json())
  .then(data => {
    i18n.addResourceBundle('ru', 'translation', data);
  });

export default i18n;