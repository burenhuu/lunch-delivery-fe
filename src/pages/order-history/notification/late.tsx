import type { NextPage } from "next";
import { useState, useEffect } from "react";

import { useAppState } from "lib/context/app";
import TokiAPI from "lib/api/toki";
import CenteredSpin from "components/common/centered-spin";
import { PermissionBox } from "components/common/permission-box";
import { toast } from "react-toastify";
import Render from "components/history/render";
import { useModal } from "lib/context/modal";
import { formatPrice } from "lib/utils/helpers";

const Review: NextPage = () => {
    const [state, dispatch]: any = useAppState();
    const [loading, setLoading] = useState(false);
    const [loading2, setLoading2] = useState(false);
    const [show, setShow, content, setContent] = useModal();

    useEffect(() => {
        const fetchDatas = async () => {
            setLoading(true);

            try {
                const response = await TokiAPI.lastLateOrder();

                if (response.data.length > 0) {
                    const item = response.data[0];

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

                    const timesResponse = await TokiAPI.getTimes();

                    setShow(true);

                    let myLoading = false;

                    setContent(
                        <PermissionBox
                            text={`Уучлаарай, таны захиалга хоцорч танд <b>${formatPrice(
                                item.penaltyAmount
                            )} U-Point</b> оноо олголоо.
                        Та захиалгаа <b>${
                            timesResponse.data.times[0][1]
                        }</b>-д авах эсвэл цуцлах боломжтой.`}
                            button2={`${timesResponse.data.times[0][1]}-д авах`}
                            button3="Цуцлах"
                            onClick={async () => {
                                if (!myLoading) {
                                    myLoading = true;
                                    setLoading2(myLoading);

                                    try {
                                        await TokiAPI.delay(item.id, {
                                            time: timesResponse.data.times[0][1],
                                        });

                                        setShow(false);
                                    } finally {
                                        myLoading = false;
                                        setLoading2(myLoading);
                                    }
                                }
                            }}
                            onClick2={async () => {
                                if (!myLoading) {
                                    myLoading = true;
                                    setLoading2(myLoading);

                                    try {
                                        await TokiAPI.cancel(item.id);

                                        setShow(false);
                                    } finally {
                                        myLoading = false;
                                        setLoading2(myLoading);
                                    }
                                }
                            }}
                            loading={loading2}
                        />
                    );
                } else {
                    toast("Хоцорсон захиалга байхгүй байна.");
                }
            } finally {
                setLoading(false);
            }
        };

        fetchDatas();
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    return loading ? <CenteredSpin /> : <Render officeId={state.officeId} />;
};

export default Review;
