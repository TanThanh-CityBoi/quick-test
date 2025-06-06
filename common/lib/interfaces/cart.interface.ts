export interface ICart {
    totalAmount: number;
    totalItems: number;
    items: Array<{
        id: number;
        name_en: string;
        name_vi: string;
        price: number;
        amount: number;
        thumbnail: string;
    }>;
}
