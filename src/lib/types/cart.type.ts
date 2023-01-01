export interface CartData {
    office:   string;
    merchant: string;
    items:    Item[];
}

export interface Item {
    id:       string;
    quantity: number;
    comment:  string;
    options:  Option[];
}

export interface Option {
    id:    string;
    value: string;
}
