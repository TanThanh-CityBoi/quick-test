import ProductCard from './ProductCard';
import { IProduct } from '@nextron-app/common';

const ProductCatalog = (props: { products: IProduct[]; collapsed: Boolean }) => {
    //

    return (
        <>
            <div
                className={`${props.collapsed ? 'grid-cols-5' : 'grid-cols-3'} grid h-full grid-rows-3 gap-x-4 gap-y-4 px-4`}
            >
                {props.products.map((item, id) => {
                    return (
                        <div className="" key={id}>
                            <ProductCard
                                id={item.id}
                                thumbnail={item.thumbnail}
                                price={item.price}
                                name_en={item.name_en}
                                name_vi={item.name_vi}
                                sellPrice={item.sellPrice}
                                amount={item.amount}
                                discount={item.discount}
                            ></ProductCard>
                        </div>
                    );
                })}
            </div>
        </>
    );
};

export default ProductCatalog;
