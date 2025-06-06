export interface IProduct {
    id: number;
    name_en: string;
    name_vi: string;
    price: number;
    sellPrice: number;
    amount: number;
    thumbnail: string;
    discount?: number;
    categories?: Array<number>;
}
