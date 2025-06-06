import { ipcMain } from 'electron';
import { LocalStorage, STORAGE_KEYS } from '../helpers';
import { CreateModalPayload, IPC_MESSAGE } from '@nextron-app/common';

function appIpcHandler() {
    ipcMain.on(IPC_MESSAGE.CREATE_MODAL, async (event, arg: CreateModalPayload) => {
        event.reply(IPC_MESSAGE.MODAL_SHOW, { ...arg });
    });

    ipcMain.on(IPC_MESSAGE.WINDOW_ACTION_TRACK, (event, arg: { track_time: Date }) => {
        LocalStorage.set(STORAGE_KEYS.LAST_ACTION, arg?.track_time || new Date());
    });
}

export default appIpcHandler;
