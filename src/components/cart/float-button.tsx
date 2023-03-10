import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { toast } from "react-toastify";

import TokiAPI from "lib/api/toki";
import { useAppState } from "lib/context/app";
import CountBadge from "components/common/count-badge";

const FloatButton: React.FC<any> = () => {
    const [state, dispatch]: any = useAppState();
    const { officeId, cartCount } = state;
    const router = useRouter();
    const [loading, setLoading] = useState<boolean>(false);
    const [data, setData] = useState<any>();

    const onCartClick = () => {
        cartCount
            ? router.push(`/order`)
            : toast("Та захиалах бүтээгдэхүүнээ сонгоно уу");
    };

    useEffect(() => {
        if (officeId) {
            setLoading(true);
            const fetchDatas = async () => {
                try {
                    const { data } = await TokiAPI.getCart();
                    setData(data);

                    if (data) {
                        dispatch({
                            type: "cartCount",
                            cartCount: data?.totalItems ? data?.totalItems : 0,
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
    }, [officeId, cartCount]);

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
                {<CountBadge count={cartCount ? cartCount : 0} />}
            </div>
        </div>
    );
};

export default FloatButton;
