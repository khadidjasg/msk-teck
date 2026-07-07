import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import fr from './locales/fr.json';
import en from './locales/en.json';
import ar from './locales/ar.json';

const STORAGE_KEY = 'msk-lang';

const savedLang = localStorage.getItem(STORAGE_KEY);
const browserLang = navigator.language?.slice(0, 2);
const supported = ['fr', 'en', 'ar'];

const initialLang = supported.includes(savedLang)
  ? savedLang
  : supported.includes(browserLang)
    ? browserLang
    : 'en';

i18n
  .use(initReactI18next)
  .init({
    resources: {
      fr: { translation: fr },
      en: { translation: en },
      ar: { translation: ar },
    },
    lng: initialLang,
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
  });

i18n.on('languageChanged', (lng) => {
  localStorage.setItem(STORAGE_KEY, lng);
});

export const RTL_LANGUAGES = ['ar'];

export default i18n;
