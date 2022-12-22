import axios from "lib/utils/axios";

const urlPrefix = "/coffee/app";

const TokiAPI = {
    getUser: (token: string) => axios.get(`${urlPrefix}/user/${token}`),

    getAllOffices: () => axios.get(`${urlPrefix}/office/all`),

    getOfficesByNearby: (lat: number, lon: number) =>
        axios.get(`${urlPrefix}/office?type=nearby&lat=${lat}&lon=${lon}`),

    getOfficesByName: (name: string) =>
        axios.get(`${urlPrefix}/office?type=by_name&name=${name}`),

    getMerchantMenuCategories: (merchantId: string) =>
        axios.get(`${urlPrefix}/merchant/${merchantId}`),

    getBanner: (merchantId: string) =>
        axios.get(`${urlPrefix}/merchant/${merchantId}/banner`),

    getMerchantProductsByCategory: (merchantId: string, categoryId: string) =>
        axios.get(`${urlPrefix}/merchant/${merchantId}/product/${categoryId}`),

    addToCart: async (values: any) => {
        const { data, status } = await axios.post(
            `${urlPrefix}/order/cart`,
            values
        );

        return {
            data,
            status,
        };
    },

    orderCurrentIncrement: async (values: any) => {
        const { data, status } = await axios.post(
            `${urlPrefix}/order/current/increment`,
            values
        );

        return {
            data,
            status,
        };
    },

    orderCurrentDecrement: async (values: any) => {
        const { data, status } = await axios.post(
            `${urlPrefix}/order/current/decrement`,
            values
        );

        return {
            data,
            status,
        };
    },

    viewCart: async (values: any) => {
        const { data, status } = await axios.post(
            `${urlPrefix}/order/current`,
            values
        );

        return {
            data,
            status,
        };
    },

    placeOrder: async (values: any) => {
        const { data, status } = await axios.post(`${urlPrefix}/order`, values);

        return {
            data,
            status,
        };
    },

    getOrder: (
        status: string = "ongoing",
        pageSize: number = 10,
        page: number = 1,
        merchantId: string
    ) =>
        axios.get(
            `${urlPrefix}/order/${merchantId}?status=${status}&page_size=${pageSize}&page=${page}`
        ),

    getOrderById: (orderId: string) =>
        axios.get(`${urlPrefix}/order/${orderId}`),

    submitReview: async (values: any) => {
        const { data, status } = await axios.post(
            `${urlPrefix}/review`,
            values
        );

        return {
            data,
            status,
        };
    },

    refreshEstimate: (orderId: string) =>
        axios.get(`${urlPrefix}/order/${orderId}/estimate`),

    getReviewTypes: () => axios.get(`${urlPrefix}/review/type`),

    jump: () => axios.get(`${urlPrefix}/jump`),

    jumpMerchant: (merchantId: string) =>
        axios.get(`${urlPrefix}/jump/merchant/${merchantId}`),

    getUpoint: (orderId: string) =>
        axios.get(`${urlPrefix}/order/${orderId}/upoint`),
};

export default TokiAPI;
