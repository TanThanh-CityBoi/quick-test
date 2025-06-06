import { ipcMain } from 'electron';
import { IPC_MESSAGE } from '@nextron-app/common';
import { sectors } from '@/mock-data';

function categoryIpcHandler() {
    ipcMain.on(IPC_MESSAGE.GET_LIST_CATEGORIES, (event) => {
        event.reply(IPC_MESSAGE.GET_LIST_CATEGORIES_REPLY, { categories: sectors });
    });
}

export default categoryIpcHandler;
