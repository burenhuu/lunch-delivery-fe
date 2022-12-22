// export default interface Office {
//     _id: string;
//     name: string;
//     logo: string;
//     location: {
//         type: string;
//         coordinates: [];
//     };
//     merchants: Merchant[];
//     distance: number;
//     lat: string;
//     lon: string;
//     products: any[];
//     number_of_storey: number;
//     pin_icon: string;
// }

export default interface Office {
    id:        string;
    name:      string;
    address:   string;
    floor:     number;
    latitude:  number;
    longitude: number;
    photo:     null;
    distance:  number;
    merchants: any[];
}

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
        open:        boolean;
        reason:      string;
        rating:      number;
}
    


export interface Timetable {
    mon:      boolean;
    monOpen:  string;
    monClose: string;
    tue:      boolean;
    tueOpen:  string;
    tueClose: string;
    wed:      boolean;
    wedOpen:  string;
    wedClose: string;
    thu:      boolean;
    thuOpen:  string;
    thuClose: string;
    fri:      boolean;
    friOpen:  string;
    friClose: string;
    sat:      boolean;
    satOpen:  string;
    satClose: string;
    sun:      boolean;
    sunOpen:  string;
    sunClose: string;
}


// export interface Merchant {
//     _id: string;
//     name: string;
//     brand_color: string;
//     is_approved: boolean;
//     avg_review: number;
//     logo: string;
//     toki_merchant_id: string;
//     is_open: boolean;
//     is_delivery: boolean;
//     header: string;
//     contact_number: number;
//     cancel_delivery_timetable: CancelDeliveryTimetable;
//     timetable: Timetable[];
//     temporary_closed: boolean;
//     is_active: boolean;
// }

// export interface CancelDeliveryTimetable {
//     closed: boolean;
//     day: number;
//     start_hour: string;
//     end_hour: string;
// }

// export interface Timetable {
//     closed: boolean;
//     day: number;
//     start_hour: string;
//     end_hour: string;
// }
