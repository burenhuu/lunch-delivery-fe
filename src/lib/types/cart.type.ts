export interface CartData {
    merchant: string;
    type: string;
    variantId: string;
    quantity: number;
    comment?:  string | null;
    options:  Option[];
}

export interface Option {
    id:    string;
    value: string;
}
