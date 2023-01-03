export interface Product {
    name: string;
    description: string;
    specification: string;
    image: string;
    variants: Variant[];
    active: boolean;
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
    rating: number;
}

export interface CardDataType {
    place: string;
    rating?: number;
    product: Product;
    merchantId: string;
}
