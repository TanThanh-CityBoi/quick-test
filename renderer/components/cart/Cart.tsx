import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';

import {
    IPC_MESSAGE,
    scrollToBottom,
    PURCHASE_STATUS,
    ICart,
    CreateModalPayload,
} from '@nextron-app/common';
import PrimaryButton from '../ui/button/PrimaryButton';
import CartItem from './CartItem';

const Cart = (props: { setPurchaseStatus: Function }) => {
    const homeT = useTranslation('home');
    const commonT = useTranslation('common');
    const cartItemRef = useRef(null);

    const [cartItemNumbers, setCartItemNumbers] = useState(0);
    const [cart, setCart] = useState<ICart>({
        totalAmount: 0,
        totalItems: 0,
        items: [],
    });

    const handlePayment = () => {
        if (cart.totalItems < 1) {
            window.ipc.send(IPC_MESSAGE.CREATE_MODAL, {
                type: 'ERROR_NOTIFY',
                sub: {
                    messageKey: 'message.empty_cart',
                    confirmButtonKey: 'button.close_title',
                },
            } as CreateModalPayload);
            return;
        }
        props.setPurchaseStatus(PURCHASE_STATUS.CONFIRM_PURCHASE);
    };

    useEffect(() => {
        if (cart.items.length > cartItemNumbers && cart.items.length > 5) {
            scrollToBottom(cartItemRef.current);
        }
        setCartItemNumbers(cart.items.length);
    }, [cart.items]);

    useEffect(() => {
        window.ipc.send(IPC_MESSAGE.GET_CART_INFO, {});
        window.ipc.on(IPC_MESSAGE.GET_CART_INFO_REPLY, (arg: ICart) => {
            setCart(arg);
        });
    }, []);

    return (
        <div className="border-primary-600 flex h-full flex-col justify-between rounded-bl-xl border-b-4 border-s-4 bg-white shadow-xl">
            <div className="h-max max-h-[580px] px-2 py-3">
                <div className="no-scrollbar h-full overflow-x-scroll">
                    {cart?.items?.map((item, idx) => {
                        return (
                            <div className="px-2" key={idx}>
                                <CartItem
                                    id={item.id}
                                    thumbnail={item.thumbnail}
                                    name_en={item.name_en}
                                    name_vi={item.name_vi}
                                    amount={item.amount}
                                    price={item.price}
                                ></CartItem>
                            </div>
                        );
                    })}
                    <div ref={cartItemRef} />
                </div>
            </div>

            <div className="bg-primary-100 flex h-[250px] flex-col justify-between rounded-bl-xl px-4 pb-5 pt-5">
                <div className="mb-3 flex justify-between">
                    <h5 className="font-semibold">{homeT.t('cart.cart_total')}:</h5>
                    <h5 className="font-semibold">{cart.totalAmount} đ</h5>
                </div>
                <div className="flex justify-end">
                    <PrimaryButton
                        onClick={() => handlePayment()}
                        content={commonT.t('cart.btn_payment')}
                        className="w-full px-8 py-3 font-semibold"
                    ></PrimaryButton>
                </div>
            </div>
        </div>
    );
};
export default Cart;
