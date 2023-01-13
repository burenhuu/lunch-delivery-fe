export interface Product {
    name: string;
    description: string;
    specification: string;
    category?: string;
    image: string;
    variants: Variant[];
    active: boolean;
    withNote: boolean;
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
    placeId: string;
    categoryMain?: string;
    rating: number;
    productName: string;
}

export interface CardDataType {
    place: string;
    placeState?: string;
    rating?: number;
    product: Product;
    merchantId: string;
    categoryId?: string;
}
