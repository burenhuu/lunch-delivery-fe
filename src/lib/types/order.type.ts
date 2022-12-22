import { Product, Variant } from "./merchant-product.type";

export interface Order {
    items: OrderItem[];
    pagination: {
        page: number;
        page_size: number;
        total_count: number;
    };
}

export interface OrderItem {
    _id: string;
    state: string;
    is_reviewed: boolean;
    total: number;
    presale_total: number;
    upoint_collect_amount: number;
    penalty: number;
    is_penalty_issued: boolean;
    created_at: string;
    delivery_estimate: string;
    delivery_address: string;
    delivery_floor: number;
    paid_at: string;
    delivered_at: string;
    order_no: string;
    delivery_duration?: string;
    review_star: number;
    items: OrderProduct[];
    prepare_estimate: string;
    order_type: string;
    upoint_response?: UpointResponse;
    merchant?: merchant;
}

export interface OrderProduct {
    product: Product;
    product_variant: Variant;
    qty: number;
    price: number;
    presale_price: number;
    total_price: number;
    presale_total_price: number;
    is_cancelled: boolean;
    cancel_reason?: string;
}

export interface UpointResponse {
    point_balance: number;
}
export interface merchant {
    _id: string;
    contact_number: string;
}

export enum Status {
    CART = "cart",
    PAID = "paid",
    PREPARING = "preparing",
    PREPARED = "prepared",
    DELIVERING = "delivering",
    COMPLETED = "completed",
    PAYMENT_PENDING = "payment_pending",
    CANCELLED = "cancelled",
}
