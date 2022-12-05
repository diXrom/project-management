import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import EN from './en.json';
import RU from './ru.json';

i18n.use(initReactI18next).init({
  resources: {
    EN: {
      translation: EN,
    },
    RU: {
      translation: RU,
    },
  },
  fallbackLng: localStorage.getItem('DMV_LANG') || 'EN',
});

export default i18n;
