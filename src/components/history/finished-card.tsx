import React, { useContext } from "react";
import { useRouter } from "next/router";

import Link from "next/link";
// import { ModalContext } from "lib/context/modal";
import { OrderItem, Status } from "lib/types/order.type";
import { renderStars, formatPrice } from "lib/utils/helpers";
import SmallButton from "components/common/small-button";
import LargeWhiteButton from "components/common/large-white-button";
import SubmitReview from "components/history/submit-review";
import { calcTimeDiff } from "lib/utils/helpers";
import { useAppState } from "lib/context/app";
import { format } from "date-fns";
import ButtonComponent from "components/common/button";
import { useModal } from "lib/context/modal";
import { Merchant } from "lib/types/office.type";

const calcIsCancelled = (item: OrderItem) => {
    let isCancelled = false;
    let cancelledCount = 0;

    item?.items &&
        item?.items.map(
            (itemEntity: any) =>
                itemEntity.is_cancelled == true &&
                (cancelledCount = cancelledCount + 1),

            cancelledCount === item.items.length && (isCancelled = true)
        );

    return isCancelled;
};

interface FinishedCardProps {
    item: OrderItem;
    id: string;
    scrollRef: any;
}

const FinishedCard: React.FC<FinishedCardProps> = ({ item, id, scrollRef }) => {
    const router = useRouter();
    // const { handleModal }: any = useContext(ModalContext);
    const [state, dispatch]: any = useAppState();
    const [show, setShow, content, setContent] = useModal();
    const { merchants } = state;

    const onGiveReview = () => {
        const merchant = merchants.find(
            (merch: Merchant) => merch._id === item.merchant?._id
        );
        setShow(true);
        setContent(<SubmitReview merchant={merchant} />);
    };

    const onCardClick = () => {
        router.push(`/order-detail/${item._id}?activeTab=Дууссан`);
    };

    return (
        <>
            <div
                className="my-col-15 bg-white rounded-2xl py-4 px-5"
                id={id}
                ref={scrollRef}
            >
                <div
                    onClick={onCardClick}
                    className="flex justify-between items-stretch"
                >
                    <div className="my-col-5 text-xs font-light text-gray">
                        <div className="text-sm font-medium text-main">
                            Захиалга {item.order_no}
                        </div>
                        <div>Зоогийн газар</div>
                        <div>Хүргэгдсэн хугацаа</div>
                        {item.is_reviewed && <div>Миний үнэлгээ</div>}
                    </div>
                    <div className="my-col-5 text-xs font-light text-gray items-end">
                        <div>
                            {format(
                                new Date(item.created_at),
                                "yyyy.MM.dd HH:mm"
                            )}
                        </div>
                        <div>Мандах</div>
                        <div>
                            {calcIsCancelled(item) == true
                                ? item?.items?.map(
                                      (itemEntity: any) =>
                                          itemEntity?.cancel_reason
                                  )
                                : item.delivered_at
                                ? calcTimeDiff(item.paid_at, item.delivered_at)
                                : "-"}
                        </div>
                        {item.is_reviewed && (
                            <div>{renderStars(item.review_star)}</div>
                        )}
                    </div>
                </div>
                {!item.is_reviewed && (
                    <div onClick={onGiveReview} className="self-center">
                        <ButtonComponent text="Үнэлгээ өгөх" />
                    </div>
                )}
            </div>
        </>
    );
};

export default FinishedCard;
