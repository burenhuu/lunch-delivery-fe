import { Product } from "./product.type";

export interface CategoryType {
    id: string;
    name: string;
    icon: string;
    children?: CategoryType[];
    products?:Product[]
}