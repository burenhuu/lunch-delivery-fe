import Link from "next/link";
import { useRouter } from "next/router";
import Countdown, { zeroPad } from "react-countdown";
import { useState } from "react";

import OrderStatus from "components/order/order-status";
import { OrderItem, Status } from "lib/types/order.type";
import SmallButton from "components/common/small-button";
import ButtonComponent from "components/common/button";
import { CallIcon } from "components/icons";

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

interface PendingCardProps {
    item: OrderItem;
    id: string;
    scrollRef: any;
}

const PendingCard: React.FC<PendingCardProps> = ({ item, id, scrollRef }) => {
    const router = useRouter();

    const [phoneVisible, setPhoneVisible] = useState(
        new Date(item.delivery_estimate) > new Date() ? false : true
    );
    const onViewDetail = (event: any) => {
        // if (event.target === event.currentTarget) {
        router.push(`/order-detail/${item._id}?activeTab=Идэвхтэй`);
        // }
    };

    const onPayClick = () => {};

    const onCallClick = () => {
        window.open(`tel://${item.merchant?.contact_number}`);
    };

    return (
        <>
            <div
                id={id}
                ref={scrollRef}
                className="bg-white z-10 rounded-2xl shadow-delivery py-4 px-5 my-col-15"
            >
                <div
                    onClick={onViewDetail}
                    className="flex justify-between items-stretch"
                >
                    <div className="my-col-5 text-xs font-light text-gray">
                        <div className="text-sm font-medium text-main">
                            Захиалга {item.order_no}
                        </div>
                        <div>Зоогийн газар</div>
                        <div>Хүргэгдэх хугацаа</div>
                    </div>
                    <div className="my-col-5 text-xs font-light text-gray items-end">
                        <OrderStatus status={item.state} />
                        <div>{item.merchant?._id}</div>
                        <div>
                            {item.delivery_estimate && (
                                <Countdown
                                    daysInHours={true}
                                    overtime={true}
                                    date={
                                        new Date(
                                            item.delivery_estimate.replace(
                                                / /g,
                                                "T"
                                            )
                                        )
                                    }
                                    renderer={renderer}
                                    onComplete={() => setPhoneVisible(true)}
                                />
                            )}
                        </div>
                    </div>
                </div>
                {item.state === Status.PAYMENT_PENDING ? (
                    <div
                        className="w-[150px] self-center z-30"
                        onClick={onPayClick}
                    >
                        <ButtonComponent text="Төлбөр төлөх" />
                    </div>
                ) : (
                    <div className="self-center flex items-center gap-x-1.25 justify-center">
                        <div
                            onClick={onViewDetail}
                            className="bg-[#F5F5FA] rounded-md px-9 py-[10.5px]"
                        >
                            Явц харах
                        </div>
                        <div onClick={onCallClick} className="z-max">
                            <CallIcon />
                        </div>
                    </div>
                )}
            </div>
        </>
    );
};

export default PendingCard;
