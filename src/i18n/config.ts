import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import { initReactI18next } from 'react-i18next';
/* Translate Text */
import en from './translations/en'
import vi from './translations/vi'

function setLocalLanguage(): string {
    let locales = localStorage.getItem("locales");
    return locales ? locales : 'en'
}

i18n
.use(LanguageDetector)
.use(initReactI18next)
.init({
    lng: setLocalLanguage(),
    fallbackLng: 'en',
    debug: false,
    resources: {
      en: {
        translation: en,
      },
      vi: {
        translation: vi,
      }
     
    },
});

export default i18n