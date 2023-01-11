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

const Cancel: NextPage = () => {
    const [state, dispatch]: any = useAppState();
    const [loading, setLoading] = useState(false);
    const [show, setShow, content, setContent] = useModal();

    useEffect(() => {
        const fetchDatas = async () => {
            setLoading(true);

            try {
                const response: any = await TokiAPI.lastCancelledOrder();

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

                    setShow(true);

                    setContent(
                        <PermissionBox
                            text={`Уучлаарай таны захиалсан хоол гарах боломжгүй болсон тул цуцлагдаж <b>${formatPrice(
                                item.loyaltyAmount
                            )} U-Point</b> оноо олгож байна. <b>${formatPrice(
                                item.penaltyAmount
                            )}₮</b>-н төлбөр Toki хэтэвчинд буцаан олгогдлоо.`}
                            loading={loading}
                        />
                    );
                } else {
                    toast("Цуцлагдсан захиалга байхгүй байна.");
                }
            } finally {
                setLoading(false);
            }
        };

        fetchDatas();
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    return loading ? <CenteredSpin /> : <Render officeId={state.officeId} />;
};

export default Cancel;
