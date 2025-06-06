import i18n from '@/translation/i18n';
import { I18nextProvider } from 'react-i18next';
import { IPC_MESSAGE } from '@nextron-app/common';

import '../styles/globals.css';
import { useEffect } from 'react';

function MyApp({ Component, pageProps }) {
    const getLayout = Component.getLayout || ((page) => page);

    useEffect(() => {
        window.addEventListener('mousedown', () => {
            console.log('Mouse down');
            window.ipc.send(IPC_MESSAGE.WINDOW_ACTION_TRACK, { track_time: new Date() });
        });
        window.addEventListener('scrollend', () => {
            console.log('scroll end');
            window.ipc.send(IPC_MESSAGE.WINDOW_ACTION_TRACK, { track_time: new Date() });
        });
        window.addEventListener('touchend', () => {
            console.log('touch end');
            window.ipc.send(IPC_MESSAGE.WINDOW_ACTION_TRACK, { track_time: new Date() });
        });
    }, []);

    return (
        <>
            <I18nextProvider i18n={i18n}>
                {getLayout(<Component {...pageProps}></Component>)}
            </I18nextProvider>
        </>
    );
}

export default MyApp;
