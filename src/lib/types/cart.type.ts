export interface CartData {
    office: string;
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
