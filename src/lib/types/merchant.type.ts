import { BooleanLocale } from "yup/lib/locale";
import { CategoryType } from "./category.type";
import { Product } from "./product.type";

export interface Merchant {

    id:          string;
    name:        string;
    description: string;
    address:     string;
    logo:        string;
    images:      string[];
    phone:       string;
    email:       null;
    facebook:    null;
    instagram:   null;
    website:     null;
    latitude:    number;
    longitude:   number;
    state:        string;
    bonus: string;
    reason:      string;
    rating:      number;
    distance: number;
    delivery: string[];
    products: Product[]
    timetable: Timetable[];
    timetableDelivery: Timetable[];
    startDate: string;
    endDate: string;
    dayIsActive?: boolean
}



export interface Timetable {
    day:   number;
    active: boolean;
    open:  string;
    close: string;
}


export interface MerchantMenu {
    name: string;
    categories: CategoryType[] & Product[];
}

export interface Review {
    total:      number;
    percentage: number;
    liked:      number;
    types:      ReviewType[];
    reviews:    Reviews[];
}

export interface Reviews {
    id:         string;
    liked:      number;
    comment:    string;
    additional: string;
    createdAt:  string;
    removeable: boolean;
    date?: string;
    picture? :string;
    name: string;
}

export interface ReviewType {
    type:       string;
    percentage: number;
}
