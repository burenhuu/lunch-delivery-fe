import type { NextPage } from "next";
import { useState, useEffect } from "react";

import { useAppState } from "lib/context/app";
import TokiAPI from "lib/api/toki";
import CenteredSpin from "components/common/centered-spin";
import { toast } from "react-toastify";
import Render from "components/history/render";
import ReviewComponent from "components/history/review";

const Review: NextPage = () => {
    const [item, setItem] = useState<any>(null);
    const [state, dispatch]: any = useAppState();
    const [loading, setLoading] = useState(false);
    const [showDrawer, setShowDrawer] = useState(false);
    const [showDelivery, setShowDelivery] = useState(false);
    const [showDeliveryDrawer, setShowDeliveryDrawer] = useState(true);

    const toggleDrawer = () => {
        setShowDrawer((prevState) => !prevState);
    };

    useEffect(() => {
        const fetchDatas = async () => {
            setLoading(true);

            try {
                const response = await TokiAPI.lastCompletedOrder();

                if (response.data.length > 0) {
                    const item = response.data[0];
                    setItem(item);
                    toggleDrawer();

                    dispatch({
                        type: "officeId",
                        officeId: item.office?.id,
                    });
                    dispatch({
                        type: "officeName",
                        officeName: item.office?.name,
                    });
                    dispatch({
                        type: "officeLat",
                        officeLat: item.office?.latitude,
                    });
                    dispatch({
                        type: "officeLng",
                        officeLng: item.office?.longitude,
                    });
                    dispatch({
                        type: "numberOfStorey",
                        numberOfStorey: item.office?.floor,
                    });
                    dispatch({ type: "toastCheck", toastCheck: false });
                    dispatch({
                        type: "notThroughLink",
                        notThroughLink: true,
                    });
                } else {
                    toast("Дууссан захиалга байхгүй байна.");
                }
            } finally {
                setLoading(false);
            }
        };

        fetchDatas();
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    return loading ? (
        <CenteredSpin />
    ) : (
        <>
            <Render officeId={state.officeId} />

            {item && (
                <ReviewComponent
                    item={item}
                    showDrawer={showDrawer}
                    setShowDrawer={setShowDrawer}
                    type={item.reviews.length === 0 ? "S" : "D"}
                    setShowDelivery={setShowDelivery}
                />
            )}

            {showDelivery && (
                <ReviewComponent
                    item={item}
                    showDrawer={showDeliveryDrawer}
                    setShowDrawer={setShowDeliveryDrawer}
                    type="D"
                />
            )}
        </>
    );
};

export default Review;
