import { ICart, IProduct } from '@nextron-app/common';
import Store from 'electron-store';

class StoreHelper extends Store {
    constructor(name: string) {
        super({
            name: name || 'local-storage',
        });
    }

    public getCart(): ICart {
        return (this.get('cart') || {
            totalAmount: 0,
            totalItems: 0,
            items: [],
        }) as ICart;
    }

    public setCart(data: ICart) {
        return this.set('cart', data);
    }

    public getProducts(): Array<IProduct> {
        return this.get('products') as Array<IProduct>;
    }

    public setProducts(data: Array<IProduct>) {
        return this.set('products', data);
    }
}

const STORAGE_KEYS = {
    CART: 'cart',
    PRODUCTS: 'products',
    LAST_ACTION: 'last_action',
    PURCHASE_STATUS: 'purchase_status',
    FILTER_PRODUCT_CATEGORIES: 'filter_product_categories',
};

const LocalStorage = new StoreHelper('local-storage');

export { LocalStorage, STORAGE_KEYS };
