import schedule from 'node-schedule';
import { powerMonitor } from 'electron';
import { ENV_CONFIG } from '@/main/configs';

import * as dotenv from 'dotenv';
import { LocalStorage, STORAGE_KEYS } from './store.helper';
import { SLEEP_TIMEOUT, CronExpression } from '@nextron-app/common';
dotenv.config(ENV_CONFIG);

//
const isProd = process.env.NODE_ENV === 'production';

const appSchedule = (mainWindow) => {
    // app refresh
    const refreshSchedule = schedule.scheduleJob(CronExpression.EVERY_DAY_AT_1AM, () => {
        mainWindow.reload();
    });

    // app sleep
    const sleepSchedule = schedule.scheduleJob(CronExpression.EVERY_MINUTE, async () => {
        const lastAction: any = LocalStorage.get(STORAGE_KEYS.LAST_ACTION);
        if (!lastAction) {
            LocalStorage.set(STORAGE_KEYS.LAST_ACTION, new Date());
            return;
        }

        const lastActionTime = new Date(lastAction).getTime();
        const current = new Date().getTime(); // mili second

        if (current - lastActionTime > SLEEP_TIMEOUT * 1000) {
            if (isProd) {
                await mainWindow.loadURL('app://./sleep');
            } else {
                const port = process.argv[2];
                await mainWindow.loadURL(`http://localhost:${port}/sleep`);
            }
            LocalStorage.clear();
        }
    });

    powerMonitor.on('resume', () => {
        console.log('resumed!');
        refreshSchedule.reschedule(CronExpression.EVERY_DAY_AT_1AM);
        sleepSchedule.reschedule(CronExpression.EVERY_MINUTE);
    });

    powerMonitor.on('suspend', () => {
        console.log('suspended');
        refreshSchedule.cancel();
        sleepSchedule.cancel();
    });
};

export { appSchedule };
