import { ENV_CONFIG } from './env.config';
import path from 'path';
import * as dotenv from 'dotenv';
dotenv.config(ENV_CONFIG);

const isProd = process.env.NODE_ENV === 'production';

const PROD_CONFIG: Electron.BrowserWindowConstructorOptions = {
    fullscreen: true,
    alwaysOnTop: true,
    titleBarStyle: 'hidden',

    webPreferences: {
        nodeIntegration: true,
        preload: path.join(__dirname, 'preload.js'),
    },
};

const DEV_CONFIG: Electron.BrowserWindowConstructorOptions = {
    webPreferences: {
        nodeIntegration: true,
        preload: path.join(__dirname, 'preload.js'),
    },
};

export const WINDOW_CONFIG = isProd ? PROD_CONFIG : DEV_CONFIG;
