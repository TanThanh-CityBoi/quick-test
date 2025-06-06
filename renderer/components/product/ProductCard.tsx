import { useTranslation } from 'react-i18next';
import { IPC_MESSAGE } from '@nextron-app/common';
import { useRef } from 'react';

type ProductProps = {
    id: number;
    name_en: string;
    name_vi: string;
    price: number;
    sellPrice: number;
    thumbnail: string;
    discount?: number;
    amount: number;
};

const DiscountTag = (props: { discount: number }) => {
    return (
        <div className="absolute left-2 top-2 flex h-14 w-14 flex-col justify-center rounded-tl-lg bg-[#ff1f1f]">
            <div>
                <p className="text-center font-bold text-[#fbbf24]">KM</p>
            </div>
            <div>
                <p className="text-center font-bold text-[#fbbf24]">{props.discount}%</p>
            </div>
        </div>
    );
};

const ProductCard = (props: ProductProps) => {
    const { i18n } = useTranslation();
    const lang = i18n.language;
    const itemRef = useRef(null);

    const handleAddToCart = (item) => {
        window.ipc.send(IPC_MESSAGE.ADD_TO_CART, item);

        if (item?.amount > 0) {
            itemRef?.current?.classList?.add('prod-card-add');
            setTimeout(() => {
                itemRef?.current?.classList?.remove('prod-card-add');
            }, 1000);
        }
    };

    return (
        <div
            ref={itemRef}
            className="relative h-full w-full rounded-xl bg-white p-2 shadow-lg"
            onClick={() => handleAddToCart({ ...props })}
        >
            <div className="relative h-3/5 w-full rounded-t-xl">
                <img
                    className="absolute h-full w-full rounded-t-xl object-cover"
                    src={props.thumbnail}
                    alt="product.img"
                ></img>
            </div>

            <div className="py-2">
                <p className="text-center font-semibold">{props?.[`name_${lang}`]}</p>
                <p className="text-center font-semibold">{props.sellPrice} đ</p>
                <p className="text-center line-through">{props.price} đ</p>
            </div>

            <div className="absolute right-3 top-3 flex h-10 w-10 items-center justify-center rounded-lg bg-gray-100">
                <p className="font-bold text-gray-600">{props.amount}</p>
            </div>

            <DiscountTag discount={props.discount}></DiscountTag>
        </div>
    );
};

export default ProductCard;
