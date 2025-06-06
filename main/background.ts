import { app } from 'electron';

import { appEventHandler, createWindow, setAppPath, appSchedule } from '@/main/helpers';
import { ENV_CONFIG, WINDOW_CONFIG } from '@/main/configs';
import ipcEventHandler from '@/main/ipc';
//
import * as dotenv from 'dotenv';
dotenv.config(ENV_CONFIG);
//
const isProd = process.env.NODE_ENV === 'production';
setAppPath(isProd);
process.env['ELECTRON_DISABLE_SECURITY_WARNINGS'] = 'true';

// create app
(async () => {
    await app.whenReady();
    const mainWindow = createWindow('main', WINDOW_CONFIG);

    if (isProd) {
        await mainWindow.loadURL('app://./sleep');
    } else {
        const port = process.argv[2];
        await mainWindow.loadURL(`http://localhost:${port}/sleep`);
        mainWindow.webContents.openDevTools();
    }
    // app schedule
    appSchedule(mainWindow);
})();

appEventHandler();
ipcEventHandler();
