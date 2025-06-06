import i18n from 'i18next';
import Backend from 'i18next-http-backend';
import { initReactI18next } from 'react-i18next';

import en from '../locales/en';
import vi from '../locales/vi';

const resources = { en, vi };

i18n.use(Backend)
    .use(initReactI18next)
    .init({
        resources,
        fallbackLng: 'vi',
        debug: false,
        interpolation: {
            escapeValue: false,
        },
    });

export default i18n;
