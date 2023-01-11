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

const Card: React.FC<CardProps> = ({ item }) => {
    const [showDrawer, setShowDrawer] = useState(false);

    const toggleDrawer = () => {
        setShowDrawer((prevState) => !prevState);
    };

    const onCallClick = () => {
        window.open(`tel://${item.merchant.phone}`);
    };

    return (
        <>
            <div className="z-10 px-5 py-4 bg-white rounded-2xl shadow-delivery my-col-15">
                <div className="flex items-stretch justify-between">
                    <div className="text-xs font-light my-col-5 text-gray">
                        <div className="text-sm font-medium text-main">
                            Захиалга #{item.number}
                        </div>
                        <div>Зоогийн газар</div>
                        <div>
                            {item.state === Status.COMPLETED
                                ? "Хүргэгдсэн хугацаа"
                                : item.state === Status.CANCELLED
                                ? "Цуцлагдсан"
                                : "Хүргэгдэх хугацаа"}
                        </div>
                        {item.reviews.length > 0 && <div>Миний үнэлгээ</div>}
                    </div>
                    <div className="items-end text-xs font-light my-col-5 text-gray">
                        {item.completedAt ? (
                            format(
                                new Date(item.completedAt),
                                "yyyy.MM.dd HH:mm"
                            )
                        ) : (
                            <OrderStatus
                                status={item.state}
                                alignRight={true}
                            />
                        )}
                        <div>{item.merchant.name}</div>
                        <div>
                            {item.state === Status.COMPLETED &&
                            item.orderedAt &&
                            item.completedAt
                                ? calcTimeDiff(item.orderedAt, item.completedAt)
                                : item.deliveredAt && (
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
                                  )}
                        </div>
                        {item.reviews.length > 0 &&
                            item.reviews.map((element: any) => {
                                return `${element.liked ? "👍 " : "👎 "} ${
                                    element.type === "S"
                                        ? "(Амт, чанар)"
                                        : "(Хүргэлт)"
                                }`;
                            })}
                    </div>
                </div>

                {item.state === Status.NEW ? (
                    <div className="w-[150px] self-center z-30">
                        <Link href={`/order`}>
                            <a>
                                <ButtonComponent text="Төлбөр төлөх" />
                            </a>
                        </Link>
                    </div>
                ) : item.state === Status.COMPLETED &&
                  item.reviews.length < 2 ? (
                    <div
                        className="w-[150px] self-center z-30"
                        onClick={toggleDrawer}
                    >
                        <ButtonComponent text="Үнэлгээ өгөх" />
                    </div>
                ) : (
                    <div className="self-center flex items-center gap-x-1.25 justify-center">
                        <Link href={`/order-detail/${item.id}`}>
                            <a>
                                <div className="bg-[#F5F5FA] rounded-md px-9 py-[10.5px]">
                                    Явц харах
                                </div>
                            </a>
                        </Link>
                        {item.merchant?.phone && (
                            <div onClick={onCallClick} className="z-max">
                                <CallIcon />
                            </div>
                        )}
                    </div>
                )}
            </div>

            {showDrawer && (
                <Review
                    item={item}
                    showDrawer={showDrawer}
                    setShowDrawer={setShowDrawer}
                />
            )}
        </>
    );
};

export default Card;
