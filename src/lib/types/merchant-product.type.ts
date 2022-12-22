import { Category } from "./merchant-menu-category.type";

export default interface MerchantProducts {
    products: Product[];
    categories: Category[];
    cart: {
        total: number;
        total_qty: number;
    };
}

export interface Product {
    _id: string;
    name: string;
    image: string;
    merchant: {
        _id: string;
        name: string;
        logo: string;
    };
    category: {
        _id: string;
        name: string;
        logo: string;
    };
    applicable_options: ApplicableOption[];
    price: number;
    presale_price: number;
    variants: Variant[];
}

export interface ApplicableOption {
    _id: string;
    option: {
        _id: string;
        name: string;
        value_type: string;
        value: string;
        created_by: string;
        created_at: string;
        updated_at: string;
    };
    applicable_choices: [];
}

export interface Variant {
    _id: string;
    price: number;
    presale_price: number;
    stock: number;
    options: Option[];
}

export interface Option {
    _id: string;
    name: string;
    value: string;
}
