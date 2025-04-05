import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import * as Localization from 'react-native-localize';

// Import translation files
import en from '../translation/en.json'; // Path to English translation file
import zh from '../translation/zh.json'; // Path to Chinese translation file

// Function to detect the user's device language
const getDeviceLanguage = () => {
  const locales = Localization.getLocales();
  return locales[0]?.languageCode || 'en'; // Default to English if no language is detected
};

// Initialize i18next
i18n
  .use(initReactI18next) // Passes i18n instance to react-i18next
  .init({
    // The initial language to load
    lng: getDeviceLanguage(), // Automatically detect device language
    fallbackLng: 'en', // Fallback language if a translation is missing

    // Translation resources
    resources: {
      en: { translation: en },
      zh: { translation: zh } // Add more languages here as needed
    },

    interpolation: {
      escapeValue: false // React already handles escaping, so we disable it
    }
  });

export default i18n;
