// export interface ReviewType {
//     _id: string;
//     star: number;
//     choices: [];
// }

export default interface Review {
    id:         string;
    rating:     number;
    comment:    string;
    additional: string;
    pictures:   string[];
    uploads:    string[];
    createdAt:  string;
    updatedAt:  string;
}
