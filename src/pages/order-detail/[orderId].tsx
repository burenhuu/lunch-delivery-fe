import type { NextPage } from "next";
import { useEffect, useState, useContext } from "react";
import { useRouter } from "next/router";
import { format } from "date-fns";
import Countdown, { zeroPad } from "react-countdown";

import { calcTimeDiff, formatPrice } from "lib/utils/helpers";
import { Status } from "lib/types/order.type";
import OrderStatus from "components/order/order-status";
import OrderCard from "components/order/order-card";
import CenteredSpin from "components/common/centered-spin";
import TokiAPI from "lib/api/toki";
import { Item, OrderDetail } from "lib/types/order-detail";
import { useAppState } from "lib/context/app";
import { toast } from "react-toastify";
import { Upoint, UpointGreen } from "components/icons";
import { GoogleMap } from "@react-google-maps/api";
import OrderMap from "components/order/map";

const renderer = ({ hours, minutes, seconds, completed }: any) => {
    if (completed) {
        return (
            <span className="text-[#F45844]">
                -
                {hours > 0
                    ? `${zeroPad(hours)}:${zeroPad(minutes)}:${zeroPad(
                          seconds
                      )}`
                    : `${zeroPad(minutes)}:${zeroPad(seconds)}`}
            </span>
        );
    } else {
        return (
            <span>
                {hours > 0
                    ? `${zeroPad(hours)}:${zeroPad(minutes)}:${zeroPad(
                          seconds
                      )}`
                    : `${zeroPad(minutes)}:${zeroPad(seconds)}`}
            </span>
        );
    }
};

const openAppStore = (url: any) => {
    window.location.href = url;
};

const OrderDetail: NextPage = () => {
    const router = useRouter();
    const { orderId } = router.query;
    const { navid } = router.query;
    const { activeTab } = router.query;
    const [state, dispatch]: any = useAppState();
    const [data, setData] = useState<OrderDetail>();
    const [loading, setLoading] = useState(false);

    const statusBar = [
        {
            state: Status.PAID,
            text: `${data?.merchant?.name} зоогийн газар таны захиалгыг бэлдэж байна`,
        },
        {
            state: Status.PREPARED,
            text: "Таны захиалга хүргэлтэнд бэлэн болсон байна",
        },
        {
            state: Status.DELIVERING,
            text: "Таны захиалга хүргэлтэнд гарсан байна",
        },
        {
            state: Status.COMPLETED,
            text: "Захиалга дууссан",
        },
    ];

    const statusIndex = statusBar.findIndex(
        (status) => status.state === data?.state
    );

    const statusText = statusBar.find(
        (status) => status.state === data?.state
    )?.text;

    useEffect(() => {
        if (navid) {
            dispatch({
                type: "navId",
                navId: navid,
            });
        }
        dispatch({
            type: "activeTab",
            activeTab: activeTab,
        });

        if (orderId) {
            setLoading(true);

            const fetchDatas = async () => {
                try {
                    const { data } = await TokiAPI.getOrderById(
                        orderId.toString()
                    );

                    if (data?.status_code === 0) {
                        setData(data?.data);
                    } else {
                        toast(data?.message);
                    }
                } finally {
                    setLoading(false);
                }
            };

            fetchDatas();
        }
    }, [orderId]);

    return loading ? (
        <CenteredSpin />
    ) : data ? (
        <>
            <div className="p-5 my-col-20">
                <div className="my-col-10">
                    <div className="flex justify-between items-center text-sm">
                        <div>
                            {data.state === "completed"
                                ? "Хүргэгдсэн хугацаа"
                                : "Хүргэгдэх хугацаа"}
                        </div>
                        <div className="font-medium">
                            {data.state === Status.COMPLETED ? (
                                data.delivered_at &&
                                calcTimeDiff(data.paid_at, data.delivered_at)
                            ) : data.delivery_estimate ? (
                                <Countdown
                                    daysInHours={true}
                                    overtime={true}
                                    date={
                                        new Date(
                                            data.delivery_estimate.replace(
                                                / /g,
                                                "T"
                                            )
                                        )
                                    }
                                    renderer={renderer}
                                />
                            ) : (
                                ""
                            )}
                        </div>
                    </div>
                    {/* Status bar */}
                    <div className="my-col-20 text-sm">
                        <div className="grid grid-cols-4 gap-x-1.25">
                            {statusBar.map((status, index: number, array) => {
                                return (
                                    <div
                                        className={
                                            "rounded-[2.5px] h-[5px] w-full " +
                                            (index <= statusIndex
                                                ? // (status === "prepared"
                                                  "bg-gradient-end"
                                                : "bg-[#D9D9D9]")
                                        }
                                    ></div>
                                );
                            })}
                        </div>
                        <div className="font-light text-gray">{statusText}</div>
                    </div>
                </div>
                {/* Here comes map */}
                {statusIndex === 0 && <OrderMap />}
                <div className="my-col-15">
                    <div className="font-medium">Захиалгын мэдээлэл</div>
                    <div className="my-col-10">
                        {data.items.map((item, index) => {
                            return <OrderCard key={index} item={item} />;
                        })}
                    </div>
                </div>
                <div className="my-col-10 items-stretch text-sm">
                    <div className="flex justify-between items-center">
                        <div>Захиалгын дугаар</div>
                        <div>{data.order_no}</div>
                    </div>
                    <div className="flex justify-between items-center">
                        <div>Захиалсан:</div>
                        <div>
                            {data.created_at &&
                                format(
                                    new Date(data.created_at),
                                    "yyyy.MM.dd HH:mm"
                                )}
                        </div>
                    </div>
                    <div className="flex justify-between items-center">
                        <div>Нийт дүн:</div>
                        <div>{formatPrice(data.total)} ₮</div>
                    </div>
                </div>
                <div className="border-t border-dashed border-gray"></div>
                <div className="my-col-10 items-stretch text-sm font-medium">
                    <div className="flex justify-between items-center">
                        <div>Төлсөн дүн:</div>
                        <div>{formatPrice(data.total)} ₮</div>
                    </div>
                    {data.penalty > 0 && (
                        <div className="flex justify-between items-center">
                            <div>Нөхөн төлбөр:</div>
                            <div className="flex justify-start items-center gap-x-1.25 text-[#78C81E]">
                                <div>+{data.penalty}</div>
                                <UpointGreen />
                            </div>
                        </div>
                    )}
                    {data.upoint_response?.point_balance && (
                        <div className="flex justify-between items-center">
                            <div>Нийт U-Point:</div>
                            <div className="flex justify-start items-center gap-x-1.25 text-[#78C81E]">
                                <div>{data.upoint_response.point_balance}</div>
                                <Upoint />
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </>
    ) : null;
};

export default OrderDetail;
