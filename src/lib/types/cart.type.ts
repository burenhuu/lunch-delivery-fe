export interface CartData {
    merchant: string;
    type: string;
    variantId: string;
    quantity: number;
    comment?:  string;
    options:  Option[];
}

export interface Option {
    id:    string;
    value: string;
}
