import { useEffect, useState } from 'react';
import { GrCaretNext, GrCaretPrevious } from 'react-icons/gr';

import { IPC_MESSAGE, PURCHASE_STATUS, ICart } from '@nextron-app/common';
import ConfirmPurchase from '../payment/ConfirmPurchase';
import ProductCartHeader from './ProductCartHeader';
import ProductCatalog from './ProductCatalog';
import Payment from '../payment/Payment';
import Cart from '../cart/Cart';

const Paging = (props: {
    perPage: number;
    currentPage: number;
    handleChangePage: Function;
    amount: number;
}) => {
    const totalPages = Math.ceil(props.amount / props.perPage);
    const arrayEmpty = new Array(totalPages).fill('');

    return (
        <div className="flex h-10 items-center justify-center gap-2">
            {arrayEmpty.map((val, idx) => (
                <div
                    key={idx}
                    className={`${props.currentPage === idx + 1 ? 'page-dot bg-primary-200 w-[120px]' : ' bg-primary-50 w-20'} h-5 rounded-xl border border-gray-300 shadow-md`}
                    onClick={() => props.handleChangePage(idx + 1)}
                ></div>
            ))}
        </div>
    );
};

const ProductCartWrapper = () => {
    const [collapsed, setCollapsed] = useState(false);
    const [purchaseStatus, setPurchaseStatus] = useState(PURCHASE_STATUS.ORDER);

    const [products, setProducts] = useState([]);
    const [productsInPage, setProductsInPage] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [cart, setCart] = useState<ICart>({
        totalAmount: 0,
        totalItems: 0,
        items: [],
    });

    const collapToggle = (status: boolean) => {
        if (status !== collapsed) {
            handleChangePage(1, status);
            setCollapsed(status);
        }
    };

    const handleChangePage = (page: number, collapStatus = collapsed) => {
        const perPage = collapStatus == true ? 15 : 9;
        if (page < 1 || perPage * (page - 1) > products?.length) return;
        const items = products.slice((page - 1) * perPage, perPage * page);
        setProductsInPage(items);
        setCurrentPage(page);
    };

    const changePurchaseStatus = (status: string) => {
        window.ipc.send(IPC_MESSAGE.UPDATE_PURCHASE_STATUS, { status });
        setPurchaseStatus(status);
    };

    const statusMapping = {
        ORDER: <Cart setPurchaseStatus={changePurchaseStatus}></Cart>,
        CONFIRM_PURCHASE: (
            <ConfirmPurchase cart={cart} setPurchaseStatus={changePurchaseStatus}></ConfirmPurchase>
        ),
        PAYMENT: <Payment></Payment>,
    };
    const getStatusComponent = (key: string) => {
        return statusMapping?.[key] || <Cart setPurchaseStatus={changePurchaseStatus}></Cart>;
    };

    useEffect(() => {
        window.ipc.send(IPC_MESSAGE.GET_LIST_PRODUCTS, {});
        window.ipc.on(IPC_MESSAGE.GET_LIST_PRODUCTS_REPLY, (arg: any) => {
            const perPage = collapsed == true ? 15 : 9;
            const items = arg.slice((currentPage - 1) * perPage, perPage * currentPage);
            setProducts(arg);
            setProductsInPage(items);
        });
        window.ipc.on(IPC_MESSAGE.GET_CART_INFO_REPLY, (arg: any) => {
            setCart(arg);
        });
    }, [collapsed, currentPage]);

    return (
        <div className="py-6">
            <ProductCartHeader
                collapToggle={collapToggle}
                collapsed={collapsed}
                purchaseStatus={purchaseStatus}
                setPurchaseStatus={changePurchaseStatus}
                cart={cart}
            ></ProductCartHeader>

            <div className="grid h-[850px] grid-cols-5 bg-transparent">
                <div
                    className={`${collapsed ? 'col-span-5' : 'col-span-3'}  no-scrollbar h-full  overflow-x-scroll py-4`}
                >
                    <ProductCatalog
                        collapsed={collapsed}
                        products={productsInPage}
                    ></ProductCatalog>
                </div>

                <div className={`${collapsed ? 'cart-hide' : 'cart-show'} h-[850px] pb-4`}>
                    {getStatusComponent(purchaseStatus)}
                </div>
            </div>

            <div className="my-4">
                <div className="flex w-full items-center justify-center gap-x-4">
                    <button
                        className="flex h-12 w-12 items-center justify-center rounded-full border border-gray-300 bg-white shadow-md"
                        onClick={() => handleChangePage(currentPage - 1)}
                    >
                        <GrCaretPrevious className="text-gray-600" size={20}></GrCaretPrevious>
                    </button>
                    <Paging
                        amount={products.length}
                        currentPage={currentPage}
                        perPage={collapsed ? 15 : 9}
                        handleChangePage={handleChangePage}
                    ></Paging>
                    <button
                        className="flex h-12 w-12 items-center justify-center rounded-full border border-gray-300 bg-white shadow-md"
                        onClick={() => handleChangePage(currentPage + 1)}
                    >
                        <GrCaretNext className="text-gray-600" size={20}></GrCaretNext>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProductCartWrapper;
