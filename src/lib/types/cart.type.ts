export default interface Cart {
    _id: string;
    customer: string;
    merchant: {
        busy_set_at: string;
        is_busy: boolean;
        toki_merchant_id: string;
        _id: string;
    };
    state: string;
    total_qty: number;
    items: Item[];
    is_reviewed: boolean;
    penalty: number;
    states: [];
    total: number;
    presale_total: number;
    created_at: string;
    updated_at: string;
    prepare_estimate: string;
    delivery_estimate: string;
}

export interface Item {
    product: {
        is_active: boolean;
        deleted: boolean;
        _id: string;
        name: string;
        image: string;
        merchant: string;
        category: string;
        refresh_stock: string;
        applicable_options: ApplicableOption[];
        created_by: string;
        created_at: string;
        updated_at: string;
    };
    product_variant: ProductVariant;
    qty: number;
    price: number;
    presale_price: number;
    total_price: number;
    presale_total_price: number;
    is_cancelled: boolean;
}

export interface ProductVariant {
    _id: string;
    price: number;
    product: string;
    stock: number;
    options: VariantOption[];
    deleted: boolean;
    created_at: string;
    updated_at: string;
}

export interface VariantOption {
    option: string;
    name: string;
    value: string;
}

export interface ApplicableOption {
    option: string;
    applicable_choices: [];
    _id: string;
}
