import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { PURCHASE_STATUS, IPC_MESSAGE, ICart } from '@nextron-app/common';

const PaymentMethod = (props: {
    id: number;
    name: string;
    image: string;
    setPurchaseStatus: Function;
}) => {
    return (
        <div
            className="mb-2 flex items-center gap-x-2 rounded-md border border-gray-300 bg-gray-50 p-2 shadow-sm hover:bg-gray-200"
            onClick={() => props.setPurchaseStatus(PURCHASE_STATUS.PAYMENT)}
        >
            <div className="relative aspect-square h-full w-20 rounded-md">
                <img
                    src={props.image}
                    alt={`${props.name}.img`}
                    className="absolute h-full w-full rounded-md object-cover"
                ></img>
            </div>

            <div className="w-full">
                <h3 className="text-center font-semibold">{props.name}</h3>
            </div>
        </div>
    );
};

const ConfirmPurchase = (props: { cart: ICart; setPurchaseStatus: Function }) => {
    const homeT = useTranslation('home');
    const [paymentMethods, setPaymentMethods] = useState([]);
    useEffect(() => {
        window.ipc.send(IPC_MESSAGE.GET_PAYMENT_METHODS, {});
        window.ipc.on(IPC_MESSAGE.GET_PAYMENT_METHODS_REPLY, (arg: any) => {
            setPaymentMethods(arg?.paymentMethods || []);
        });
    }, []);
    //
    return (
        <div className="border-primary-600 flex h-full flex-col justify-between rounded-bl-xl border-b-4 border-s-4 bg-white px-3 shadow-2xl">
            <div className="p-4">
                <div className="mb-3 flex justify-between">
                    <h5 className="font-semibold">{homeT.t('cart.cart_total')}</h5>
                    <h5 className="font-semibold">{props.cart.totalAmount} đ</h5>
                </div>
                <div className="flex flex-col gap-y-3">
                    <h5 className="mb-4">{homeT.t('cart.payment_method')}</h5>
                    {paymentMethods.map((item, idx) => {
                        return (
                            <div key={idx}>
                                <PaymentMethod
                                    id={item.id}
                                    name={item.name}
                                    image={item.image}
                                    setPurchaseStatus={props.setPurchaseStatus}
                                ></PaymentMethod>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};
export default ConfirmPurchase;
