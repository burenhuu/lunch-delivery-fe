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

    getMerchantsByOffice: (officeId: string, params: any) =>
        axios.get(`${urlPrefix}/offices/${officeId}/merchants`, {
            params: params,
        }),

    //Get products by office and additional params, such as search keyword, merchantid or category

    getProductsByOffice: (
        officeId: string,
        type?: string,
        value?: string,
        productTab?: string
    ) => {
        let params: any = {};
        if (productTab) {
            params["sort"] = productTab;
        }
        if (type && value) {
            return axios.get(
                `${urlPrefix}/offices/${officeId}/products?${type}=${value}`,
                { params: params }
            );
        } else return axios.get(`${urlPrefix}/offices/${officeId}/products`);
    },

    getRecommendedProductsByOffice: (officeId: string) => {
        return axios.get(
            `${urlPrefix}/offices/${officeId}/products/promotional`
        );
    },

    getMerchantMenu: (merchantId: string) =>
        axios.get(`${urlPrefix}/merchants/${merchantId}/menu`),

    getMerchantDetail: (merchantId: string) =>
        axios.get(`${urlPrefix}/merchants/${merchantId}`),

    getMerchantReviews: (merchantId: string) =>
        axios.get(`${urlPrefix}/merchants/${merchantId}/review`),

    deleteReview: (reviewId: string) =>
        axios.delete(`${urlPrefix}/reviews/${reviewId}`),

    getCart: () => axios.get(`${urlPrefix}/cart`),

    addCart: (cartItem: CartData) => axios.post(`${urlPrefix}/cart`, cartItem),

    changeOffice: (values: any) =>
        axios.post(`${urlPrefix}/cart/office`, values),

    updateCard: (cartItem: any) => axios.put(`${urlPrefix}/cart`, cartItem),

    getTimes: (officeId: string) =>
        axios.get(`${urlPrefix}/offices/$${officeId}/cart/times`),

    getTime: () => axios.get(`${urlPrefix}/time`),

    checkout: (data: any) => axios.post(`${urlPrefix}/cart/checkout`, data),

    paid: (officeId: string, data: any) =>
        axios.post(`${urlPrefix}/offices/${officeId}/cart/paid`, data),
};

export default TokiAPI;
