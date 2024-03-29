import { createContext, useContext, useEffect, useReducer } from "react";

const Context = createContext(null);
const { Provider }: any = Context;

const saveToLocal = (state: any) => {
    localStorage.setItem("settings", JSON.stringify(state));
};

const initialState = {
    header: "",
    merchantId: "",
    merchants: [],
    officeId: "",
    officeName: "",
    products: [],
    numberOfStorey: 0,
    cartCount: 0,
    cartPrice: 0,
    cancelDeliveryTimetable: [],
    temporaryClosed: 0,
    star: 0,
    banner: false,
    navId: "",
    notThroughLink: false,
};

const reducer = (state: any, action: any) => {
    switch (action.type) {
        case "officeId": {
            const newState = { ...state, officeId: action.officeId };
            saveToLocal(newState);

            return newState;
        }
        case "officeName": {
            const newState = { ...state, officeName: action.officeName };
            saveToLocal(newState);

            return newState;
        }
        case "merchants": {
            const newState = { ...state, merchants: action.merchants };
            saveToLocal(newState);

            return newState;
        }
        case "categories": {
            const newState = { ...state, categories: action.categories };
            saveToLocal(newState);

            return newState;
        }

        case "categoryId": {
            const newState = { ...state, categoryId: action.categoryId };
            saveToLocal(newState);

            return newState;
        }

        case "products": {
            const newState = { ...state, products: action.products };
            saveToLocal(newState);

            return newState;
        }

        case "product": {
            const newState = { ...state, product: action.product };
            saveToLocal(newState);

            return newState;
        }

        case "merchantId": {
            const newState = { ...state, merchantId: action.merchantId };
            saveToLocal(newState);

            return newState;
        }

        case "merchantName": {
            const newState = { ...state, merchantName: action.merchantName };
            saveToLocal(newState);

            return newState;
        }

        case "temporaryClosed": {
            const newState = {
                ...state,
                temporaryClosed: action.temporaryClosed,
            };
            saveToLocal(newState);

            return newState;
        }

        case "cancelDeliveryTimetable": {
            const newState = {
                ...state,
                cancelDeliveryTimetable: action.cancelDeliveryTimetable,
            };
            saveToLocal(newState);

            return newState;
        }

        case "numberOfStorey": {
            const newState = {
                ...state,
                numberOfStorey: action.numberOfStorey,
            };
            saveToLocal(newState);

            return newState;
        }
        case "cartCount": {
            const newState = { ...state, cartCount: action.cartCount };
            saveToLocal(newState);

            return newState;
        }
        case "isDelivery": {
            const newState = { ...state, isDelivery: action.isDelivery };
            saveToLocal(newState);

            return newState;
        }
        case "star": {
            const newState = { ...state, star: action.star };
            saveToLocal(newState);

            return newState;
        }
        case "banner": {
            const newState = { ...state, banner: action.banner };
            saveToLocal(newState);

            return newState;
        }
        case "notThroughLink": {
            const newState = {
                ...state,
                notThroughLink: action.notThroughLink,
            };
            saveToLocal(newState);

            return newState;
        }
        case "cartPrice": {
            const newState = { ...state, cartPrice: action.cartPrice };
            saveToLocal(newState);

            return newState;
        }
        case "setup": {
            const settings = JSON.parse(
                localStorage.getItem("settings") || "{}"
            );

            return { ...state, ...settings };
        }
        case "init": {
            localStorage.removeItem("settings");

            return { ...state, ...initialState };
        }
        case "userLat": {
            const newState = { ...state, userLat: action.userLat };
            saveToLocal(newState);
            return newState;
        }
        case "userLng": {
            const newState = { ...state, userLng: action.userLng };
            saveToLocal(newState);
            return newState;
        }
        case "officeLat": {
            const newState = { ...state, officeLat: action.officeLat };
            saveToLocal(newState);
            return newState;
        }
        case "officeLng": {
            const newState = { ...state, officeLng: action.officeLng };
            saveToLocal(newState);
            return newState;
        }
        case "toastCheck": {
            const newState = { ...state, toastCheck: action.toastCheck };
            saveToLocal(newState);
            return newState;
        }
        case "footerShow": {
            const newState = { ...state, footerShow: action.footerShow };
            saveToLocal(newState);
            return newState;
        }
        case "promotionCheck": {
            const newState = { ...state, promotionCheck: action.promotionCheck };
            saveToLocal(newState);
            return newState;
        }
        case "promotionCode": {
            const newState = { ...state, promotionCode: action.promotionCode };
            saveToLocal(newState);
            return newState;
        }
        case "promotionAmount": {
            const newState = { ...state, promotionAmount: action.promotionAmount };
            saveToLocal(newState);
            return newState;
        }
        case "usePromotion": {
            const newState = { ...state, usePromotion: action.usePromotion };
            saveToLocal(newState);
            return newState;
        }
        case "promotionViewed": {
            const newState = { ...state, promotionViewed: action.promotionViewed };
            saveToLocal(newState);
            return newState;
        }
        default:
            return state;
    }
};

const AppProvider = ({ children }: any) => {
    const [state, dispatch] = useReducer(reducer, initialState);

    useEffect(() => {
        dispatch({ type: "setup" });
    }, []);

    return <Provider value={[state, dispatch]}>{children}</Provider>;
};

export default AppProvider;

export const useAppState = () => useContext(Context);
