import {Merchant} from "./merchant.type";

export interface Product {
    name: string;
    description: string;
    specification: string;
    category?: string;
    image: string;
    variants: Variant[];
    active: boolean;
    withNote: boolean;
    state: string;
}
export interface Variant {
    id: string;
    name: string;
    price: number;
    salePrice: number;
    options: Option[];
}

export interface Option {
    id: string;
    name: string;
    type: string;
    price: number;
    values: string[];
}



export interface RecommendedType extends Variant {
    image: string;
    place: string;
    placeState?: string;
    placeId: string;
    placeReason: string;
    placeStartDate: string;
    placeEndDate: string;
    categoryMain?: string;
    rating: number;
    productName: string;
    dayIsActive: boolean
}

export interface CardDataType {
    place: string;
    placeState?: string;
    placeReason?: string;
    placeStartDate?: string;
    placeEndDate?: string;
    placeCartType?: string
    rating?: number;
    product: Product;
    merchantId: string;
    categoryId?: string;
    dayIsActive?: boolean;
    merchant?: Merchant;
    productSortPrice?: any;
}
