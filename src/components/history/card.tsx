/* eslint-disable jsx-a11y/alt-text */
import Link from "next/link";
import Countdown, { zeroPad } from "react-countdown";
import { format } from "date-fns";
import OrderStatus from "components/order/order-status";
import ButtonComponent from "components/common/button";
import { CallIcon } from "components/icons";
import { Status } from "lib/types/order.type";
import { calcTimeDiff } from "lib/utils/helpers";
import { useState } from "react";
import Review from "./review";
import { useRouter } from "next/router";
import { useAppState } from "../../lib/context/app";

const renderer = ({ hours, minutes, seconds, completed }: any) => {
    if (completed) {
        return (
            <span className="text-red-500">
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

interface CardProps {
    item: any;
}

const finishedStatuses = [Status.COMPLETED, Status.CANCELLED, Status.DELIVERED];

const Card: React.FC<CardProps> = ({ item }) => {
    const [state, dispatch]: any = useAppState();
    const router = useRouter();
    const [showDrawer, setShowDrawer] = useState(false);
    const [showDeliveryDrawer, setShowDeliveryDrawer] = useState(true);
    const [showDelivery, setShowDelivery] = useState(false);
    const [firstClick, setFirstClick] = useState(false);
    const now = new Date();

    const toggleDrawer = async () => {
        let footerCheck = showDrawer;
        setShowDrawer((prevState) => !prevState);
        await dispatch({ type: "footerShow", footerShow: false });
    };

    return (
        <div className="relative">
            <div
                className="z-10 px-5 py-[15px] bg-white rounded-2xl shadow-delivery my-col-15"
                onClick={() => {
                    finishedStatuses.includes(item.state) &&
                        router.push(`/order-detail/${item.id}`);
                }}
            >
                <div className="flex items-stretch justify-between">
                    <div className="text-xs font-light my-col-5 text-gray">
                        <div className="text-sm font-medium text-main">
                            Захиалга #
                            {item.number.substring(item.number.length - 4)}
                        </div>
                        <div>Зоогийн газар</div>
                        {item.state !== Status.CANCELLED && (
                            <div>
                                {(item.state === Status.COMPLETED ||
                                    item.state === Status.DELIVERED) &&
                                item.type.toLowerCase() === "delivery"
                                    ? "Хүргэгдсэн хугацаа"
                                    : (item.state === Status.COMPLETED ||
                                            item.state === Status.DELIVERED) &&
                                        item.type.toLowerCase() === "takeaway"
                                    ? "Дууссан хугацаа"
                                    : item.type.toLowerCase() === "delivery"
                                    ? "Захиалга авах хугацаа"
                                    : item.type.toLowerCase() === "takeaway"
                                    ? "Бэлтгэгдэх хугацаа"
                                    : ""}
                            </div>
                        )}
                        {item.reviews.length > 0 && <div>Миний үнэлгээ</div>}
                    </div>
                    <div className="items-end text-xs font-light my-col-5 text-gray">
                        {item.state === Status.COMPLETED ||
                        item.state === Status.DELIVERED ? (
                            format(
                                new Date(item.deliveredAt), 
                                "yyyy.MM.dd HH:mm"
                            )
                        ) : (
                            <OrderStatus
                                status={item.state}
                                alignRight={true}
                            />
                        )}
                        <div>{item.merchant.name}</div>
                        {item.state !== Status.CANCELLED && (
                            <div>
                                {item.state === Status.COMPLETED ||
                                item.state === Status.DELIVERED ? (
                                    calcTimeDiff(
                                        item.deliveringAt,
                                        item.deliveredAt
                                    )
                                ) : (
                                    <>
                                        {now > item.deliveredAt && ( <p className="text-red-600">
                                            {calcTimeDiff(
                                                item.deliveredAt,
                                                item.now
                                            )}
                                        </p>)}
                                        <Countdown
                                            daysInHours={true}
                                            overtime={true}
                                            date={
                                                new Date(
                                                    item.deliveredAt.replace(
                                                        / /g,
                                                        "T"
                                                    )
                                                )
                                            }
                                            renderer={renderer}
                                        />
                                    </>
                                )}
                            </div>
                        )}
                        {item.reviews.length > 0 &&
                            item.reviews
                                .sort((a: any, b: any) =>
                                    a.type < b.type ? 1 : -1
                                )
                                .map((element: any) => {
                                    return `${element.liked ? "👍 " : "👎 "} ${
                                        element.type === "S"
                                            ? "(Амт, чанар) "
                                            : "(Хүргэлт) "
                                    }`;
                                })}
                    </div>
                </div>

                {item.state === Status.PENDING ? (
                    <div className="w-full h-[40px]"></div>
                ) : (item.state === Status.COMPLETED ||
                        item.state === Status.DELIVERED) &&
                    item.reviews.length < 2 ? (
                    <div className="w-full h-[40px]"></div>
                ) : (
                    item.state !== Status.COMPLETED &&
                    item.state !== Status.DELIVERED &&
                    item.state !== Status.CANCELLED &&(
                        <div className="w-full h-[40px]"></div>
                    )
                )}
            </div>

            <div className="absolute z-30 grid w-full  mt-[-55px] justify-items-center">
                {item.state === Status.PENDING ? (
                    <div className="w-[150px] self-center z-30">
                        <Link href={`/order`}>
                            <a>
                                <ButtonComponent text="Төлбөр төлөх" />
                            </a>
                        </Link>
                    </div>
                ) : (item.state === Status.COMPLETED ||
                        item.state === Status.DELIVERED) &&
                    item.reviews.length < 2 ? (
                    <div
                        className="w-[150px] self-center z-30"
                        onClick={toggleDrawer}
                    >
                        <ButtonComponent text="Үнэлгээ өгөх" />
                    </div>
                ) : (
                    item.state !== Status.COMPLETED &&
                    item.state !== Status.DELIVERED &&
                    item.state !== Status.CANCELLED && (
                        <div className="self-center flex items-center gap-x-1.25 justify-center">
                            <Link href={`/order-detail/${item.id}`}>
                                <a>
                                    <div className="bg-[#F5F5FA] rounded-md px-9 py-[10.5px]">
                                        Явц харах
                                    </div>
                                </a>
                            </Link>
                            {item.merchant?.phone && (
                                <a
                                    className="z-max"
                                    href={`tel://${item.merchant?.phone}`}
                                    target="_blank"
                                    rel="noreferrer"
                                    // onClick={() => {
                                    //
                                    //     let isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
                                    //     if (isIOS) {
                                    //         window.open(
                                    //             `tel://${item.merchant?.phone}`,
                                    //             "_self"
                                    //         )
                                    //     } else {
                                    //         window.open(
                                    //             `tel://${item.merchant?.phone}`,
                                    //             "_blank",
                                    //         )
                                    //     }
                                    // }
                                    // }
                                >
                                    <CallIcon />
                                </a>
                            )}
                        </div>
                    )
                )}
            </div>

            {showDrawer && (
                <Review
                    item={item}
                    showDrawer={showDrawer}
                    setShowDrawer={setShowDrawer}
                    type={item.reviews.length === 0 ? "S" : "D"}
                    setShowDelivery={setShowDelivery}
                    firstClick={firstClick}
                />
            )}

            {showDelivery && (
                <Review
                    item={item}
                    showDrawer={showDeliveryDrawer}
                    setShowDrawer={setShowDeliveryDrawer}
                    type="D"
                    firstClick={firstClick}
                />
            )}
        </div>
    );
};

export default Card;
