import type { NextPage } from "next";
import { useRouter } from "next/router";
import { format } from "date-fns";
import Countdown, { zeroPad } from "react-countdown";
import useSWR from "swr";
import QRCode from "react-qr-code";
import Drawer from "react-modern-drawer";

import { calcTimeDiff, formatPrice } from "lib/utils/helpers";
import { Status } from "lib/types/order.type";
import OrderCard from "components/order/order-card";
import CenteredSpin from "components/common/centered-spin";
import { Upoint, UpointGreen } from "components/icons";
import { useEffect, useState } from "react";
import ButtonComponent from "components/common/button";
import TokiAPI from "lib/api/toki";
import { useAppState } from "../../lib/context/app";

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

const apiUrl = `/v1/orders`;

const OrderDetail: NextPage = () => {
    const router = useRouter();
    const { orderId }: any = router.query;
    const { data, error } = useSWR(orderId ? `${apiUrl}/${orderId}` : null, {
        refreshInterval: 1000,
    });
    const [loading, setLoading] = useState(false);
    const [showDrawer, setShowDrawer] = useState(false);
    const [initOpen, setInitOpen] = useState(false);
    const [countDown, setCountDown] = useState<any>()

    useEffect(()=>{
        let timeData = new Date(
            data?.data?.deliveredAt?.replace(
                / /g,
                "T"
            ))
        setCountDown(timeData)
    },[data])
    const [countDownChecker, setCountDownChecker] = useState(false)

    useEffect(()=>{
        if(countDown > new Date()){
            setCountDownChecker(true)
        }
    })

    useEffect(() => {
        if (data && !initOpen) {
            if (
                data.data.type.toLowerCase() !== "takeaway" &&
                data.data.state === Status.DELIVERED
            ) {
                setInitOpen(true);
                setShowDrawer(true);
            }
        }
    }, [data]);

    const statusBar = [
        {
            state: Status.NEW,
            text: `Таны захиалга амжилттай хийгдлээ.`,
            step: 1,
        },
        {
            state: Status.ACCEPTED,
            text: `${data?.data?.merchant.name} зоогийн газар таны захиалгыг хүлээн авсан байна.`,
            step: 2,
        },
        {
            state: Status.PREPARING,
            text: `${data?.data?.merchant.name} зоогийн газар таны захиалгыг бэлдэж байна.`,
            step: 3,
        },
        {
            state: Status.PREPARED,
            text: "Таны захиалга хүргэлтэнд гарахад бэлэн болсон байна",
            step: 4,
        },
        {
            state: Status.DELIVERING,
            text: "Таны захиалга хүргэлтэнд гарсан байна",
            step: 5,
        },
        {
            state: Status.DELIVERED,
            text: "Захиалга хүргэгдсэн",
            step: 6,
        },
        {
            state: Status.COMPLETED,
            text: "Захиалга дууссан",
            step: 6,
        },
    ];

    const statusBarTakeaway = [
        {
            state: Status.NEW,
            text: `Таны захиалга амжилттай хийгдлээ.`,
            step: 1,
        },
        {
            state: Status.ACCEPTED,
            text: `${data?.data?.merchant.name} зоогийн газар таны захиалгыг хүлээн авсан байна.`,
            step: 2,
        },
        {
            state: Status.PREPARING,
            text: `${data?.data?.merchant.name} зоогийн газар таны захиалгыг бэлдэж байна.`,
            step: 3,
        },
        {
            state: Status.PREPARED,
            text: "Таны захиалга хүргэлтэнд бэлэн болсон байна",
            step: 4,
        },
        {
            state: Status.DELIVERED,
            text: "Захиалга дууссан",
            step: 5,
        },
    ];

    async function handleFinish() {
        setLoading(true);

        try {
            // await TokiAPI.delivered(orderId);
            await TokiAPI.completed(orderId);

            toggleDrawer();
        } finally {
            setLoading(false);
        }
    }

    const toggleDrawer = () => {
        setShowDrawer((prevState) => !prevState);
    };

    const statusText = statusBar.find(
        (status) => status.state === data?.data?.state
    )?.text;

    if (error) return null;

    if (!error && !data) return <CenteredSpin />;

    return (
        <>
            <div className="p-5 my-col-20">
                <div className="my-col-10">
                    <div className="flex items-center justify-between text-sm">
                        <div>
                            {data.data.state !== Status.CANCELLED && (
                                <div>
                                    {(data.data.state === Status.COMPLETED ||
                                        data.data.state === Status.DELIVERED) &&
                                        data.data.type.toLowerCase() === "delivery"
                                        ? "Хүргэгдсэн хугацаа"
                                        : (data.data.state ===
                                            Status.COMPLETED ||
                                            data.data.state ===
                                            Status.DELIVERED) &&
                                            data.data.type.toLowerCase() ===
                                            "takeaway"
                                            ? "Дууссан хугацаа"
                                            : data.data.type.toLowerCase() ===
                                                "delivery"
                                                ? "Захиалга авах хугацаа"
                                                : data.data.type.toLowerCase() ===
                                                    "takeaway"
                                                    ? "Бэлтгэгдэх хугацаа"
                                                    : ""}
                                </div>
                            )}
                        </div>
                        <div className="font-medium">
                            {data.data.state !== Status.CANCELLED && (
                                <div>
                                    {data.data.state === Status.COMPLETED ||
                                        data.data.state === Status.DELIVERED ? (
                                        calcTimeDiff(
                                            data.data.deliveringAt,
                                            data.data.deliveredAt
                                        )
                                    ) : (
                                        <>
                                        {
                                            countDownChecker ? 
                                                <>
                                                    {data.data.deliveryDate}
                                                </> 
                                                :
                                                <Countdown
                                                    daysInHours={true}
                                                    overtime={true}
                                                    date={countDown}
                                                    renderer={renderer}
                                                />
                                        }
                                    </>
                                    )}
                                </div>
                            )}
                        </div>
                    </div>
                    {/* Status bar */}
                    <div className="text-sm my-col-20">
                        {data.data.type.toLowerCase() === "takeaway" ? (
                            <div
                                className={`grid gap-x-1.25`}
                                style={{
                                    gridTemplateColumns:
                                        "repeat(5, minmax(0, 1fr))",
                                }}
                            >
                                {statusBarTakeaway.map(
                                    (status: any, index: any) => {
                                        const step: any =
                                            statusBarTakeaway.find((x: any) => {
                                                return (
                                                    x.state === data.data.state
                                                );
                                            })?.step;

                                        return (
                                            <div
                                                key={status.state}
                                                className={`rounded-[2.5px] h-[5px] w-full ${step > index
                                                        ? "bg-gradient-end"
                                                        : "bg-[#D9D9D9]"
                                                    }`}
                                            ></div>
                                        );
                                    }
                                )}
                            </div>
                        ) : (
                            <div
                                className={`grid gap-x-1.25`}
                                style={{
                                    gridTemplateColumns:
                                        "repeat(6, minmax(0, 1fr))",
                                }}
                            >
                                {statusBar.map((status: any, index: any) => {
                                    const step: any = statusBar.find(
                                        (x: any) => {
                                            return x.state === data.data.state;
                                        }
                                    )?.step;

                                    return (
                                        statusBar.length > index + 1 && (
                                            <div
                                                key={status.state}
                                                className={`rounded-[2.5px] h-[5px] w-full ${step > index
                                                        ? "bg-gradient-end"
                                                        : "bg-[#D9D9D9]"
                                                    }`}
                                            ></div>
                                        )
                                    );
                                })}
                            </div>
                        )}

                        <div className="font-light text-gray">{statusText}</div>
                    </div>
                </div>

                <div className="my-col-15">
                    <div className="font-medium">Захиалгын мэдээлэл</div>
                    <div className="my-col-10">
                        {data.data.items.map((item: any, index: number) => {
                            return <OrderCard key={index} item={item} />;
                        })}
                    </div>
                </div>
                <div className="items-stretch text-sm my-col-10">
                    <div className="flex items-center justify-between">
                        <div>Захиалгын дугаар:</div>
                        <div>
                            #
                            {data.data.number.substring(
                                data.data.number.length - 4
                            )}
                        </div>
                    </div>
                    <div className="flex items-center justify-between">
                        <div>Захиалсан:</div>
                        <div>
                            {data.data.orderedAt &&
                                format(
                                    new Date(data.data.orderedAt),
                                    "yyyy.MM.dd HH:mm"
                                )}
                        </div>
                    </div>
                    <div className="flex items-center justify-between">
                        <div>Нийт дүн:</div>
                        <div>{formatPrice(data.data.grandTotal)} ₮</div>
                    </div>
                </div>
                <div className="border-t border-dashed border-gray"></div>
                <div className="items-stretch text-sm font-medium my-col-10">
                    <div className="flex items-center justify-between">
                        <div>Төлсөн дүн:</div>
                        <div>{formatPrice(data.data.grandTotal)} ₮</div>
                    </div>
                    {data.data.penaltyAmount > 0 && (
                        <div className="flex items-center justify-between">
                            <div>Нөхөн төлбөр:</div>
                            <div className="flex justify-start items-center gap-x-1.25 text-[#78C81E]">
                                <div>+{data.data.penaltyAmount}</div>
                                <UpointGreen />
                            </div>
                        </div>
                    )}
                    {data.data.loyaltyAmount > 0 && (
                        <div className="flex items-center justify-between">
                            <div>Цуглуулсан U-POINT оноо:</div>
                            <div className="flex justify-start items-center gap-x-1.25 text-[#78C81E]">
                                <div>+{data.data.penaltyAmount}</div>
                                <UpointGreen />
                            </div>
                        </div>
                    )}
                    {data.data.loyaltyBalance > 0 && (
                        <div className="flex items-center justify-between">
                            <div>Нийт U-Point:</div>
                            <div className="flex justify-start items-center gap-x-1.25 text-[#78C81E]">
                                <div>
                                    {data.data.loyaltyBalance}
                                </div>
                                <Upoint />
                            </div>
                        </div>
                    )}
                </div>
            </div>

            <Drawer
                open={showDrawer}
                onClose={toggleDrawer}
                direction="bottom"
                enableOverlay={true}
                style={{
                    background: "#FFFFFF",
                    height: "428px",
                }}
                overlayOpacity={0.5}
                overlayColor="#1e2335"
                className={`p-5 rounded-t-[20px] relative`}
            >
                <div className="drag-indicator" onTouchEnd={toggleDrawer}></div>
                <div className="font-medium text-center mb-[20px]">
                    Захиалга хүргэгдлээ
                </div>

                <div className="mb-[20px] text-center">
                    Та захиалгаа шалган хүргэлтийн ажилтанд уг QR кодыг уншуулан
                    баталгаажуулна уу
                </div>

                <div className="mx-auto text-center">
                    <QRCode
                        className="mx-auto"
                        value={data?.data?.id}
                        size={195}
                    />

                    {/* <div className="mx-auto bg-[#F5F5FA] w-[195px] h-[40px] leading-[40px] rounded-[10px] my-[20px]"> */}
                    {/* {data?.data?.id} */}
                    {/* </div> */}
                </div>

                <div className="flex justify-center w-full pb-[50px] mt-[20px]">
                    <ButtonComponent
                        onClick={handleFinish}
                        text="Захиалгыг хүлээн авсан"
                        loading={loading}
                        additionalClass="max-w-[270px] w-full"
                    />
                </div>
            </Drawer>
        </>
    );
};

export default OrderDetail;
