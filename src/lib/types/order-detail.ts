import { Product, Variant } from "./merchant-product.type";
import { Merchant } from "./office.type";

export interface OrderDetail {
    _id: string;
    customer: {
        delivery_options: {
            company_reg_number: string;
            delivery_address: string;
            delivery_floor: number;
            ebarimt_type: string;
        };
        _id: string;
        profile_pic_url: string;
        phone_no: string;
        country_code: string;
        name: string;
        created_at: string;
        updated_at: string;
    };
    merchant: Merchant;
    state: string;
    items: Item[];
    is_reviewed: boolean;
    total: number;
    presale_total: number;
    created_at: string;
    delivery_estimate: string;
    delivery_address: string;
    delivery_floor: number;
    paid_at: string;
    delivered_at: string;
    order_no: string;
    prepare_estimate: string;
    order_type: string;
    penalty: number;
    upoint_response: UpointResponse;
}

export interface UpointResponse {
    point_balance: number;
    total_point: number;
}

export interface Item {
    product: Product;
    product_variant: Variant;
    qty: number;
    price: number;
    presale_price: number;
    total_price: number;
    presale_total_price: number;
    is_cancelled: boolean;
}
