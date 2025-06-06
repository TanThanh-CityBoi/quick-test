import { FaPlus } from 'react-icons/fa';
import { FaMinus } from 'react-icons/fa';
import { TiDelete } from 'react-icons/ti';
import { useTranslation } from 'react-i18next';

import { IPC_MESSAGE } from '@nextron-app/common';

const CartItem = (props: {
    id: number;
    name_en: string;
    name_vi: string;
    price: number;
    amount: number;
    thumbnail: string;
}) => {
    const commonT = useTranslation('common');
    const lang = commonT.i18n.language;

    const addItem = (id) => {
        window.ipc.send(IPC_MESSAGE.ADD_TO_CART, { id });
    };

    const removeItem = ({ id, amount }: { id: number; amount: number }) => {
        window.ipc.send(IPC_MESSAGE.REMOVE_CART_ITEM, { id, amount });
    };

    return (
        <div
            id={`cart-item-${props.id}`}
            className="cart-item-show relative my-3 flex items-center gap-x-4 rounded-xl border border-gray-200 bg-white px-4 py-1 shadow-md"
        >
            <div className="relative aspect-square h-20 w-20">
                <img
                    className="absolute h-full w-full rounded-full object-cover"
                    alt="thumbnail.img"
                    src={props.thumbnail}
                ></img>
            </div>
            <div>
                <h6 className="line-clamp-1 font-bold leading-6">{props?.[`name_${lang}`]}</h6>
                <h6 className="line-clamp-1 font-semibold leading-6">
                    {commonT.t('cart.cart_item.price')}: {props.price} đ
                </h6>
                <div className="flex gap-x-4 py-1 font-semibold text-gray-400">
                    <h6 className="line-clamp-1">{commonT.t('cart.cart_item.amount')}: </h6>
                    <div className="flex">
                        <button
                            className="bg-primary-300 rounded-sm px-2 py-1"
                            onClick={() => removeItem({ id: props.id, amount: 1 })}
                        >
                            <FaMinus />
                        </button>
                        <input
                            type="number"
                            max={5}
                            value={props.amount}
                            onChange={() => {}}
                            className="hide-arrows-input w-10 border border-gray-200 text-center text-lg"
                        />
                        <button
                            className="bg-primary-300 rounded-sm px-2 py-1"
                            onClick={() => addItem(props.id)}
                        >
                            <FaPlus />
                        </button>
                    </div>
                </div>
            </div>

            <div className="absolute -right-3 -top-4">
                <button onClick={() => removeItem({ id: props.id, amount: props.amount })}>
                    <TiDelete className="text-primary-500" size={35} />
                </button>
            </div>
        </div>
    );
};
export default CartItem;
