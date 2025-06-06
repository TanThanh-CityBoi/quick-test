import { ipcMain } from 'electron';
import { IPC_MESSAGE } from '@nextron-app/common';
import { paymentMethods } from '@/mock-data';

function paymentIpcHandler() {
    ipcMain.on(IPC_MESSAGE.GET_PAYMENT_METHODS, (event) => {
        event.reply(IPC_MESSAGE.GET_PAYMENT_METHODS_REPLY, { paymentMethods });
    });
}

export default paymentIpcHandler;
