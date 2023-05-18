import { CartData } from "lib/types/cart.type";
import axios from "lib/utils/axios";

// const urlPrefix = "/coffee/app";
const urlPrefix = "/v1";
const API_ENTRYPOINT = process.env.NEXT_PUBLIC_ENTRYPOINT;
let params: string;
if (API_ENTRYPOINT === "https://toki-api.qrms.mn"){
    params = "?grant_type=client_credentials&client_id=Ma95V2Cd3fjAWA4r&client_secret=CxjMCBpPMJZKqsTHL3qKA9MKZ&"
} else {
    params = "?grant_type=client_credentials&client_id=toki&client_secret=toki&"
}

const TokiAPI = {
    getUser: (token: string) =>
        axios.post(
            `${urlPrefix}/token${params}code=${token}`
        ),

    getAllOffices: () => axios.get(`${urlPrefix}/offices`),

    getOfficesByNearby: (lat: number, lon: number) =>
        axios.get(`${urlPrefix}/offices?lat=${lat}&lon=${lon}&from=0&size=20`),

    getOfficesByName: (name: string) =>
        axios.get(`${urlPrefix}/offices?keyword=${name}&from=0&size=10`),

    getCategories: (officeId: string) => axios.get(`${urlPrefix}/offices/${officeId}/categories`),

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

    getTimes: () => axios.get(`${urlPrefix}/cart/times`),

    getTime: () => axios.get(`${urlPrefix}/time`),

    checkout: (data: any) => axios.post(`${urlPrefix}/cart/checkout`, data),

    paid: (officeId: string, data: any) =>
        axios.post(`${urlPrefix}/offices/${officeId}/cart/paid`, data),

    orderReview: (orderId: string, data: any) =>
        axios.post(`${urlPrefix}/orders/${orderId}/review`, data),

    lastCancelledOrder: () =>
        axios.get(`${urlPrefix}/orders?state=CANCELLED&from=0&size=1`),

    lastLateOrder: () =>
        axios.get(`${urlPrefix}/orders?state=DELAYED&from=0&size=1`),

    lastDeliveredOrder: () =>
        axios.get(`${urlPrefix}/orders?state=DELIVERED&from=0&size=1`),

    lastCompletedOrder: () =>
        axios.get(`${urlPrefix}/orders?state=COMPLETED&from=0&size=1`),

    lastCompletedOrderWithOffice: (officeId: any) =>
        axios.get(
            `${urlPrefix}/orders?office=${officeId}&state=COMPLETED&from=0&size=1`
        ),

    cancel: (orderId: string) =>
        axios.post(`${urlPrefix}/orders/${orderId}/cancel`),

    delivered: (orderId: string) =>
        axios.post(`${urlPrefix}/orders/${orderId}/delivered`),

    completed: (orderId: string) =>
        axios.post(`${urlPrefix}/orders/${orderId}/completed`),

    delay: (orderId: string, data: any) =>
        axios.post(`${urlPrefix}/orders/${orderId}/delay`, data),

    getCartTimes: (type: string) =>
        axios.get(
            `${urlPrefix}/cart/times?type=${type}`
        ),

    getLateTimes: (merchantId: string, type: string) =>
        axios.get(
            `${urlPrefix}/merchants/${merchantId}/times?type=${type}`
        ),

    uploadReviewPhoto: (url: string, body: any, type: string) =>
        fetch(url, { method: 'PUT', headers: { 'Content-Type': type}, body: body}),

    getPromo: () =>
        axios.get(
            `${urlPrefix}/promo`
        ),
};

export default TokiAPI;
