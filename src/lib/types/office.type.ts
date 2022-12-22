export default interface Office {
    _id: string;
    name: string;
    logo: string;
    location: {
        type: string;
        coordinates: [];
    };
    merchants: Merchant[];
    distance: number;
    lat: string;
    lon: string;
    products: any[];
    number_of_storey: number;
    pin_icon: string;
}

export interface Merchant {
    _id: string;
    name: string;
    brand_color: string;
    is_approved: boolean;
    avg_review: number;
    logo: string;
    toki_merchant_id: string;
    is_open: boolean;
    is_delivery: boolean;
    header: string;
    contact_number: number;
    cancel_delivery_timetable: CancelDeliveryTimetable;
    timetable: Timetable[];
    temporary_closed: boolean;
    is_active: boolean;
}

export interface CancelDeliveryTimetable {
    closed: boolean;
    day: number;
    start_hour: string;
    end_hour: string;
}

export interface Timetable {
    closed: boolean;
    day: number;
    start_hour: string;
    end_hour: string;
}
