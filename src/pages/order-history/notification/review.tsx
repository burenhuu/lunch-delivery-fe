import type { NextPage } from "next";
import { useState, useEffect, useContext } from "react";
import { useRouter } from "next/router";
import { mutate } from "swr";

import { useAppState } from "lib/context/app";
import LargeWhiteButton from "components/common/large-white-button";
import { toast } from "lib/utils/helpers";
import TokiAPI from "lib/api/toki";
import { ModalContext } from "lib/context/modal";
import FinishedList from "components/history/finished-list";
import OngoingList from "components/history/ongoing-list";
import SubmitReview from "components/history/submit-review";
import CenteredSpin from "components/common/centered-spin";

const OrderHistoryReview: NextPage = () => {
    const router = useRouter();
    const [state, dispatch]: any = useAppState();
    const [loading, setLoading] = useState(false);
    const { handleModal }: any = useContext(ModalContext);
    const { paymentStatusCode }: any = router.query;
    const { upoint }: any = router.query;

    useEffect(() => {
        mutate(
            `/app/order/merchant/${state.merchantId}?status=ongoing&page_size=10&page=1`
        );
        mutate(
            `/app/order/merchant/${state.merchantId}?status=completed&page_size=10&page=1`
        );
    }, []);

    useEffect(() => {
        const fetchDatas = async () => {
            setLoading(true);

            try {
                const notificationResponse = await TokiAPI.jump();

                if (notificationResponse?.data.status_code === 0) {
                    dispatch({
                        type: "merchantId",
                        merchantId: notificationResponse.data.data.merchant._id,
                    });
                    dispatch({
                        type: "merchantName",
                        merchantName:
                            notificationResponse.data.data.merchant.name,
                    });
                    dispatch({
                        type: "merchants",
                        merchants: notificationResponse.data.data.merchants,
                    });
                    dispatch({
                        type: "officeId",
                        officeId: notificationResponse.data.data.office?._id,
                    });
                    dispatch({
                        type: "officeName",
                        officeName: notificationResponse.data.data.office?.name,
                    });
                    dispatch({
                        type: "numberOfStorey",
                        numberOfStorey:
                            notificationResponse.data.data.office
                                ?.number_of_storey,
                    });
                    dispatch({
                        type: "numberOfStorey",
                        numberOfStorey:
                            notificationResponse.data.data.office
                                ?.number_of_storey,
                    });
                    dispatch({
                        type: "header",
                        header: notificationResponse.data.data.merchant.header,
                    });
                    dispatch({
                        type: "isDelivery",
                        isDelivery:
                            notificationResponse.data.data.merchant.is_delivery,
                    });

                    dispatch({
                        type: "cancelDeliveryTimetable",
                        cancelDeliveryTimetable:
                            notificationResponse.data.data.merchant
                                .cancel_delivery_timetable,
                    });
                    dispatch({
                        type: "temporaryClosed",
                        temporaryClosed:
                            notificationResponse.data.data.merchant
                                .temporary_closed,
                    });

                    if (!notificationResponse.data.data.order.is_reviewed) {
                        handleModal(
                            true,
                            "",
                            <a
                                className="cursor-pointer"
                                onClick={() => (
                                    handleModal(),
                                    handleModal(
                                        true,
                                        "Үнэлгээ өгөх",
                                        <SubmitReview
                                            orderId={
                                                notificationResponse.data.data
                                                    .order._id
                                                    ? notificationResponse.data
                                                          .data.order._id
                                                    : ""
                                            }
                                        />,
                                        true,
                                        <div className="flex">
                                            <LargeWhiteButton
                                                type="submit"
                                                text="Илгээх"
                                                formId="submit-review-form"
                                                loading={loading}
                                            />
                                        </div>
                                    )
                                )}
                            >
                                {notificationResponse.data.data.order && (
                                    <div className="flex flex-col items-center text-center">
                                        <div className="mb-[20px] text-base font-normal">
                                            {notificationResponse.data.data
                                                .order.order_type ===
                                            "take_away"
                                                ? `Таны захиалга амжилттай биеллээ. Та бидэнд өөрсдийн үйлчилгээг сайжруулахад үнэлгээ өгч туслаарай`
                                                : `  Таны захиалга амжилттай хүргэгдлээ.
                                            Та бидэнд өөрсдийн үйлчилгээг
                                            сайжруулахад үнэлгээ өгч туслаарай`}
                                        </div>
                                        {!notificationResponse.data.data.order
                                            .is_reviewed && (
                                            <ul className="flex">
                                                <span
                                                    onClick={() =>
                                                        dispatch({
                                                            type: "star",
                                                            star: 1,
                                                        })
                                                    }
                                                    className="text-lg icon-Star---Gray-icon"
                                                />
                                                <span
                                                    onClick={() =>
                                                        dispatch({
                                                            type: "star",
                                                            star: 2,
                                                        })
                                                    }
                                                    className="ml-[10px] text-lg icon-Star---Gray-icon"
                                                />
                                                <span
                                                    onClick={() =>
                                                        dispatch({
                                                            type: "star",
                                                            star: 3,
                                                        })
                                                    }
                                                    className="ml-[10px] text-lg icon-Star---Gray-icon"
                                                />
                                                <span
                                                    onClick={() =>
                                                        dispatch({
                                                            type: "star",
                                                            star: 4,
                                                        })
                                                    }
                                                    className="ml-[10px] text-lg icon-Star---Gray-icon"
                                                />
                                                <span
                                                    onClick={() =>
                                                        dispatch({
                                                            type: "star",
                                                            star: 5,
                                                        })
                                                    }
                                                    className="ml-[10px] text-lg icon-Star---Gray-icon"
                                                />
                                            </ul>
                                        )}
                                    </div>
                                )}
                            </a>,
                            true
                        );
                    }
                } else {
                    toast(notificationResponse?.data?.message);
                }
            } finally {
                setLoading(false);
            }
        };
        fetchDatas();
    }, [router]); // eslint-disable-line react-hooks/exhaustive-deps

    useEffect(() => {
        if (paymentStatusCode) {
            if (paymentStatusCode == 200) {
                handleModal(
                    true,
                    "",
                    upoint
                        ? `Таны захиалга амжилттай хийгдэж U-Point дансанд ${upoint} оноо нэмэгдлээ`
                        : `Таны захиалга амжилттай хийгдлээ`,
                    true,
                    <div className="flex">
                        <LargeWhiteButton
                            text="Ok"
                            onClick={() => handleModal()}
                        />
                    </div>
                );
            } else {
                toast("Уучлаарай, Таны захиалга амжилтгүй боллоо");
            }
        }
    }, [router]); // eslint-disable-line react-hooks/exhaustive-deps

    return loading ? (
        <CenteredSpin />
    ) : (
        <div className="w-full p-5">
            <OngoingList />
            <FinishedList />
        </div>
    );
};

export default OrderHistoryReview;
