import { IPC_MESSAGE, CreateModalPayload } from '@nextron-app/common';

const Payment = () => {
    const handlePayment = () => {
        window.ipc.send(IPC_MESSAGE.CREATE_MODAL, {
            type: 'SUCCESS_NOTIFY',
            sub: {
                messageKey: 'message.payment_success',
                confirmButtonKey: 'button.close_title',
            },
        } as CreateModalPayload);
    };
    //
    return (
        <div className="border-primary-600 flex h-full flex-col justify-between rounded-bl-xl border-b-4 border-s-4 bg-white px-3 py-4 shadow-2xl">
            <div className="p-4">
                <h5 className="font-semibold">Thanh toán</h5>
                <h5 className="font-semibold">MÃ QR</h5>
                <h5 className="font-semibold">Thời gian còn lại: 00:00:01</h5>
            </div>

            <div className="bg-primary-600 w-full py-2">
                <button onClick={() => handlePayment()} className="w-full text-lg text-white">
                    Payment
                </button>
            </div>
        </div>
    );
};
export default Payment;
