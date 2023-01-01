export interface Menu {
    name: string;
    categories: CategoryType[];
}

export interface Recommended {
    promotions: Promotion[];
    product_name: string;
    presale_price: number;
    product_image: string;
    product_id: string;
    category_id: string;
    variant: {
        id: string;
        options: Option[];
    };
    button_type: string;
    price: number;
}

// export interface Category {
//     _id: string;
//     name: string;
//     logo: string;
//     cart_items_count: number;
// }

export interface CategoryType {
    id: string;
    name: string;
    icon: string;
    children?: CategoryType[];
}

export interface Option {
    option: string;
    value: string;
    name: string;
}

export interface Promotion {}
