import appIpcHandler from './app.ipc';
import categoryIpcHandler from './category.ipc';
import paymentIpcHandler from './payment.ipc';
import productIpcHandler from './product.ipc';

function ipcEventHandler() {
    appIpcHandler();
    productIpcHandler();
    categoryIpcHandler();
    paymentIpcHandler();
}

export default ipcEventHandler;
