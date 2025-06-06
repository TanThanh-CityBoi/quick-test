import { RiArrowGoBackFill } from 'react-icons/ri';
import { FaCartShopping } from 'react-icons/fa6';
import { useTranslation } from 'react-i18next';
import { FaMoneyBill } from 'react-icons/fa';
import { IoQrCodeSharp } from 'react-icons/io5';

import { PURCHASE_STATUS, ICart } from '@nextron-app/common';

const ProductCartHeader = (props: {
    collapsed: boolean;
    collapToggle: Function;
    purchaseStatus: string;
    setPurchaseStatus: Function;
    cart: ICart;
}) => {
    const homeT = useTranslation('home');

    const titleMapping = {
        ORDER: homeT.t('cart.order_title', { amount: props.cart?.totalItems }),
        CONFIRM_PURCHASE: homeT.t('cart.confirm_title'),
        PAYMENT: homeT.t('cart.payment_title'),
    };
    const getTitle = (key: string) => {
        return titleMapping?.[key] || '';
    };

    const iconTitleMapping = {
        ORDER: <FaCartShopping className="text-primary-600" size={25} />,
        CONFIRM_PURCHASE: <FaMoneyBill className="text-primary-600" size={25} />,
        PAYMENT: <IoQrCodeSharp className="text-primary-600" size={25} />,
    };
    const getIconTitle = (key: string) => {
        return iconTitleMapping?.[key] || '';
    };

    const getBack = (key: string) => {
        const backMapping = {
            CONFIRM_PURCHASE: PURCHASE_STATUS.ORDER,
            PAYMENT: PURCHASE_STATUS.CONFIRM_PURCHASE,
        };
        return backMapping?.[key] || PURCHASE_STATUS.ORDER;
    };

    return (
        <div className="grid grid-cols-5">
            <div className={`${props.collapsed ? 'prod-header-show' : 'col-span-3'}`}>
                <div className="from-primary-500 to-primary-700 line-clamp-1 w-max rounded-e-full bg-gradient-to-r px-16 py-2 font-semibold text-gray-100">
                    <h5 className="text-center">{homeT.t('product_list.title')}</h5>
                </div>
            </div>
            <div
                className={`${props.collapsed ? 'cart-header-hide' : 'cart-header-show'} relative`}
            >
                <div className="from-primary-500 to-primary-700 relative w-full bg-gradient-to-r py-2 ps-8">
                    <h5 className="line-clamp-1 pe-10 ps-4 text-center font-semibold text-white">
                        {getTitle(props.purchaseStatus)}
                    </h5>

                    <button
                        className="bg-primary-600 absolute -left-7 -top-3 z-10 h-16 w-16 rounded-full p-1"
                        onClick={() => props.collapToggle(!props.collapsed)}
                    >
                        <span className="flex h-full w-full items-center justify-center rounded-full bg-white">
                            {getIconTitle(props.purchaseStatus)}
                        </span>
                    </button>

                    {props.purchaseStatus !== PURCHASE_STATUS.ORDER && (
                        <button
                            className="absolute right-1.5 top-1.5 rounded-md bg-white px-3 py-1"
                            onClick={() => props.setPurchaseStatus(getBack(props.purchaseStatus))}
                        >
                            <span className="flex h-full w-full items-center justify-center rounded-full bg-white">
                                <RiArrowGoBackFill className="text-primary-600" size={25} />
                            </span>
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ProductCartHeader;
