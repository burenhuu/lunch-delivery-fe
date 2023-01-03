import { useContext, useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";

import TokiAPI from "lib/api/toki";
import { useAppState } from "lib/context/app";
import CountBadge from "components/common/count-badge";
import { CartData } from "lib/types/cart.type";

interface FloatButtonProps {
    merchantId?: string;
    categoryId?: string;
}

const FloatButton: React.FC<FloatButtonProps> = ({
    merchantId,
    categoryId,
}) => {
    // const [loading, setLoading] = useState(false);
    const [data, setData] = useState<CartData>();
    const [state, dispatch]: any = useAppState();
    const { officeId, cartCount } = state;
    const router = useRouter();
    const [loading, setLoading] = useState<boolean>(false);

    const onCartClick = () => {
        router.push(`/order`);
    };

    useEffect(() => {
        if (officeId) {
            setLoading(true);
            const fetchDatas = async () => {
                try {
                    const { data } = await TokiAPI.getCart(officeId);
                    if (data) {
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
                } catch (err) {
                    dispatch({ type: "cartCount", cartCount: 0 });
                } finally {
                    setLoading(false);
                }
            };

            fetchDatas();
        }
    }, [merchantId, officeId, cartCount]);

    return cartCount > 0 && !loading ? (
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
                {<CountBadge count={cartCount} />}
            </div>
        </div>
    ) : null;
};

export default FloatButton;
