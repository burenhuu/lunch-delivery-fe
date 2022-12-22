import { PermissionBox } from "components/common/permission-box";
import { ClockIcon, LongArrow } from "components/icons";
import { useAppState } from "lib/context/app";
import { useModal } from "lib/context/modal";
import { Merchant, Timetable } from "lib/types/office.type";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function GreadientMerchantCard({
    merchant,
    page = false,
}: {
    merchant: Merchant;
    page?: boolean;
}) {
    const router = useRouter();
    const [show, setShow, content, setContent] = useModal();
    const [state, dispatch]: any = useAppState();
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");

    useEffect(() => {
        merchant.timetable.map((timetable: Timetable, index: number) =>
            new Date().getDay() === timetable.day
                ? (setStartDate(timetable.start_hour),
                  setEndDate(timetable.end_hour))
                : null
        );
    }, [merchant]);

    const onContinueClick = () => {
        dispatch({
            type: "merchantId",
            merchantId: merchant._id,
        });
        dispatch({
            type: "merchantName",
            merchantName: merchant.name,
        });

        dispatch({
            type: "header",
            header: merchant.header,
        });

        dispatch({
            type: "isDelivery",
            isDelivery: merchant.is_delivery,
        });

        dispatch({
            type: "cancelDeliveryTimetable",
            cancelDeliveryTimetable: merchant.cancel_delivery_timetable,
        });

        dispatch({
            type: "temporaryClosed",
            temporaryClosed: merchant.temporary_closed,
        });

        dispatch({
            type: "banner",
            banner: false,
        });
        if (!page) {
            router.push(`/merchant/${merchant._id}`);
        } else {
            router.push(`/merchant/details/${merchant._id}`);
        }
    };

    const onMerchantClick = () => {
        if (!merchant.is_open || !merchant.is_active) {
            setShow(true);
            setContent(
                <PermissionBox
                    text={
                        <>
                            <div className="my-col-20">
                                Зоогийн газар хаалттай байна. Та бусад зоогийн
                                газраас сонголтоо хийнэ үү
                                <div>
                                    Ажиллах цагийн хуваарь:
                                    <p className="font-medium">
                                        {startDate}-{endDate}
                                    </p>
                                </div>
                            </div>
                        </>
                    }
                />
            );
        } else if (merchant.temporary_closed) {
            setShow(true);
            setContent(
                <PermissionBox
                    text={
                        <>
                            <div className="my-col-20">
                                <div>
                                    Зоогийн газар дотоод ажилтай байгаа тул
                                    захиалга авахгүй
                                </div>
                                <div>Нээх цаг: 10/21, 12:00</div>
                            </div>
                        </>
                    }
                />
            );
        } else {
            onContinueClick();
        }
    };
    return (
        merchant && (
            <div
                onClick={onMerchantClick}
                className="rounded-2xl min-h-[160px] overflow-hidden shadow-delivery relative"
            >
                <img
                    src={merchant.logo}
                    className="h-40 min-w-full"
                    alt={merchant.name}
                />
                <div className="absolute z-20 left-3.75 bottom-3.75 text-white my-col-5 items-start">
                    <div className="text-sm">{`${merchant.name} (${merchant.temporary_closed}) 👍 ${merchant.avg_review}`}</div>
                    <div className="text-xs font-light flex justify-start gap-x-1.25 items-center">
                        <ClockIcon />
                        {merchant.toki_merchant_id}
                    </div>
                </div>
                <div className="absolute h-1/2 w-full bg-gradient-to-b bottom-0 left-0 from-main/0 to-main "></div>
                <div className="absolute text-white z-20 text-smaller top-5 right-0 bg-main/50 backdrop-blur-sm py-1.25 px-2.5 rounded-l-md">
                    {merchant?.temporary_closed && "Дотоод ажилтай"}
                    {(!merchant?.is_open || !merchant?.is_active) && "Хаалттай"}
                </div>
                {page && (
                    <div className="absolute right-3.75 bottom-3.75 flex gap-x-2.5 justify-end items-center">
                        <div className="text-xs font-light text-white">
                            Дэлгэрэнгүй
                        </div>
                        <LongArrow />
                    </div>
                )}
            </div>
        )
    );
}
