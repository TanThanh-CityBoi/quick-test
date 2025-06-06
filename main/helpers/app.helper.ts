import { app } from 'electron';
import serve from 'electron-serve';
import { LocalStorage } from './store.helper';

const appEventHandler = () => {
    app.on('window-all-closed', () => {
        LocalStorage.clear();
        app.quit();
    });
};

const setAppPath = (isProd) => {
    if (isProd) {
        serve({ directory: 'app' });
    } else {
        app.setPath('userData', `${app.getPath('userData')} (development)`);
    }
};

export { appEventHandler, setAppPath };
