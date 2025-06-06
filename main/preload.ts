import { contextBridge, ipcRenderer, IpcRendererEvent } from 'electron';

const handler = {
    send(channel: string, value: unknown) {
        ipcRenderer.send(channel, value);
    },
    sendSync(channel: string, value: unknown) {
        // block the renderer process until a reply is received.
        return ipcRenderer.sendSync(channel, value);
    },
    invoke(channel: string, value: unknown) {
        //
        return ipcRenderer.invoke(channel, value);
    },
    on(channel: string, callback: (...args: unknown[]) => void) {
        const subscription = (_event: IpcRendererEvent, ...args: unknown[]) => callback(...args);
        ipcRenderer.on(channel, subscription);

        return () => {
            ipcRenderer.removeListener(channel, subscription);
        };
    },
};

contextBridge.exposeInMainWorld('ipc', handler);

export type IpcHandler = typeof handler;
