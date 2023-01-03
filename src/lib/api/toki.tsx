import { CartData } from "lib/types/cart.type";
import axios from "lib/utils/axios";

// const urlPrefix = "/coffee/app";
const urlPrefix = "/v1";

const TokiAPI = {
    getUser: (token: string) =>
        axios.post(
            `${urlPrefix}/token?grant_type=client_credentials&client_id=toki&client_secret=toki&code=${token}`
        ),

    getAllOffices: () => axios.get(`${urlPrefix}/offices`),

    getOfficesByNearby: (lat: number, lon: number) =>
        axios.get(`${urlPrefix}/offices?lat=${lat}&lon=${lon}&from=0&size=20`),

    getOfficesByName: (name: string) =>
        axios.get(`${urlPrefix}/offices?keyword=${name}&from=0&size=10`),

    getCategories: () => axios.get(`${urlPrefix}/categories`),

    getMerchantsByOffice: (officeId: string) =>
        axios.get(`${urlPrefix}/offices/${officeId}/merchants`),

    //Get products by office and additional params, such as search keyword, merchantid or category

    getProductsByOffice: (officeId: string, type?: string, value?: string) => {
        if (type && value) {
            return axios.get(
                `${urlPrefix}/offices/${officeId}/products?${type}=${value}`
            );
        } else return axios.get(`${urlPrefix}/offices/${officeId}/products`);
    },

    getMerchantMenu: (merchantId: string) =>
        axios.get(`${urlPrefix}/merchants/${merchantId}/menu`),

    getMerchantDetail: (merchantId: string) =>
        axios.get(`${urlPrefix}/merchants/${merchantId}`),

    getMerchantReviews: (merchantId: string) =>
        axios.get(`${urlPrefix}/merchants/${merchantId}/review`),

    getCart: (officeId: string) =>
        axios.get(`${urlPrefix}/offices/${officeId}/cart`),

    addCart: (officeId: string, cartItem: CartData) =>
        axios.post(`${urlPrefix}/offices/${officeId}/cart`, cartItem),

    updateCard: (officeId: string, cartItem: CartData) =>
        axios.put(`${urlPrefix}/offices/${officeId}/cart`, cartItem),

    getTimes: (officeId: string) =>
        axios.get(`${urlPrefix}/offices/$${officeId}/cart/times`),
};

export default TokiAPI;
