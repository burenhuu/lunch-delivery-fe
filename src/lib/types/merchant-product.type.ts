import { Category } from "./merchant-menu-category.type";


export interface Product {
    name:          string;
    description:   string;
    specification: string;
    image:         string;
    variants:      Variant[];
}
export interface Variant {
    id:        string;
    name:      string;
    price:     number;
    salePrice: number;
    options:   Option[];
}

export interface Option {
    id:     string;
    name:   string;
    type:   string;
    price:  number;
    values: string[];
}

export interface MerchantMenu {
    name:       string;
    categories: Category[];
}
// export default interface MerchantProducts {
//     products: Product[];
//     categories: Category[];
//     cart: {
//         total: number;
//         total_qty: number;
//     };
// }

// export interface Product {
//     _id: string;
//     name: string;
//     image: string;
//     merchant: {
//         _id: string;
//         name: string;
//         logo: string;
//     };
//     category: {
//         _id: string;
//         name: string;
//         logo: string;
//     };
//     applicable_options: ApplicableOption[];
//     price: number;
//     presale_price: number;
//     variants: Variant[];
// }

// export interface ApplicableOption {
//     _id: string;
//     option: {
//         _id: string;
//         name: string;
//         value_type: string;
//         value: string;
//         created_by: string;
//         created_at: string;
//         updated_at: string;
//     };
//     applicable_choices: [];
// }

// export interface Variant {
//     _id: string;
//     price: number;
//     presale_price: number;
//     stock: number;
//     options: Option[];
// }

// export interface Option {
//     _id: string;
//     name: string;
//     value: string;
// }
