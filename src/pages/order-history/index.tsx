import type { NextPage } from "next";
import { useEffect } from "react";
import { useRouter } from "next/router";
import { toast } from "react-toastify";

import { useAppState } from "lib/context/app";
import Render from "components/history/render";

const OrderHistory: NextPage = () => {
    const [state, dispatch]: any = useAppState();
    const router = useRouter();
    const { paymentStatusCode }: any = router.query;

    useEffect(() => {
        if (paymentStatusCode) {
            if (paymentStatusCode == 200) {
                dispatch({
                    type: "cartCount",
                    cartCount: 0,
                });
            } else {
                toast("Уучлаарай, Таны захиалга амжилтгүй боллоо");
            }
        }
    }, [router]); // eslint-disable-line react-hooks/exhaustive-deps

    return <Render officeId={state.officeId} />;
};

export default OrderHistory;
