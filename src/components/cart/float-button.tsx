import { useContext, useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";

import TokiAPI from "lib/api/toki";
import Cart from "lib/types/cart.type";
import { useAppState } from "lib/context/app";
import CountBadge from "components/common/count-badge";

interface FloatButtonProps {
    merchantId?: string;
    categoryId?: string;
}

const FloatButton: React.FC<FloatButtonProps> = ({
    merchantId,
    categoryId,
}) => {
    // const [loading, setLoading] = useState(false);
    const [data, setData] = useState<Cart>();
    const [state, dispatch]: any = useAppState();
    const router = useRouter();

    const onCartClick = () => {
        router.push(`/order`);
    };

    useEffect(() => {
        if (merchantId && state.officeId) {
            // setLoading(true);

            const fetchDatas = async () => {
                try {
                    const { data } = await TokiAPI.viewCart({
                        merchant_id: merchantId,
                        office_id: state.officeId,
                    });

                    if (data.status_code === 0) {
                        setData(data.data);
                        dispatch({
                            type: "cartCount",
                            cartCount: data?.data?.total_qty,
                        });
                        dispatch({
                            type: "categoryId",
                            categoryId: categoryId,
                        });
                    }
                } finally {
                    // setLoading(false);
                }
            };

            fetchDatas();
        }
    }, [merchantId, state.officeId, state.cartCount]);

    // return state.cartCount > 0 && !loading ? (
    // return !loading ? (
    return (
        <div
            onClick={onCartClick}
            id="cart"
            className="w-[50px] h-[50px] flex justify-center items-center rounded-full fixed bottom-5 right-5"
        >
            <div className="relative text-2xl">
                <span
                    className="text-[20px]  my-cart icon-Shop---Bold-icon-1"
                    style={{ color: "white" }}
                ></span>
                {
                    <CountBadge
                        state={state}
                        count={state.cartCount}
                        isMenu={true}
                    />
                }
            </div>
        </div>
    );
};

export default FloatButton;
