import { PermissionBox } from "components/common/permission-box";
import { ClockIcon, LongArrow } from "components/icons";
import { useAppState } from "lib/context/app";
import { useModal } from "lib/context/modal";
import { Merchant } from "lib/types/merchant.type";
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

    // useEffect(() => {
    //     merchant.timetable.map((timetable: Timetable, index: number) =>
    //         new Date().getDay() === timetable.day
    //             ? (setStartDate(timetable.start_hour),
    //               setEndDate(timetable.end_hour))
    //             : null
    //     );
    // }, [merchant]);

    const onContinueClick = () => {
        dispatch({
            type: "merchantId",
            merchantId: merchant.id,
        });
        dispatch({
            type: "merchantName",
            merchantName: merchant.name,
        });

        if (!page) {
            router.push(`/merchant/${merchant.id}`);
        } else {
            router.push(`/merchant/details/${merchant.id}`);
        }
    };

    const onMerchantClick = () => {
        if (merchant.state === "CLOSED") {
            setShow(true);
            const d = new Date();
            let day = d.getDay();
            let startDate = "";
            let endDate = "";
            merchant.timetable?.map((schedule) => {
                if (schedule.day === day) {
                    startDate = schedule.open;
                    endDate = schedule.close;
                }
            });
            setContent(
                <PermissionBox
                    text={` Зоогийн газар хаалттай байна. <br>
                            Та бусад зоогийн газраас сонголтоо хийнэ үү <br>
                            Ажиллах цагийн хуваарь: <br>
                            <b>
                              ${startDate} - ${endDate}
                            </b>`}
                    button2={<>Үргэлжлүүлэх</>}
                    onClick={() => {
                        setShow(false);
                        onContinueClick();
                    }}
                />
            );
        } else if (merchant.state === "TEMPORARY_CLOSED") {
            setShow(true);
            setContent(
                <PermissionBox
                    text={` Зоогийн газар дотоод ажилтай байгаа тул <br>
                    захиалга авахгүй <br>
                    <b>
                        Нээх цаг: ${merchant.reason}
                    </b>`}
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
                {merchant.state === "CLOSED" ||
                    merchant.state === "TEMPORARY_CLOSED" ? (
                    <div className="h-[22px] absolute z-20 right-0 top-3 my-col-5 items-start bg-gray/50 rounded-l-[11px]  text-white">
                        <div className="text-[10px] font-normal flex justify-start gap-x-1.25 items-center py-[5px] px-[10px] leading-[11.85px]">
                            {merchant.state === "CLOSED" ? (
                                <>Хаалттай</>
                            ) : (
                                <>{merchant.reason}</>
                            )}
                        </div>
                    </div>
                ) : (
                    <>
                        {merchant.bonus === "" ? (
                            <></>
                        ) : (
                            <div className="h-[22px] absolute z-20 right-0 top-3 my-col-5 items-start bg-gray/50 rounded-l-[11px]  text-white">
                                <div className="text-[10px] font-normal flex justify-start gap-x-1.25 items-center py-[5px] px-[10px] leading-[11.85px]">
                                    {merchant.bonus}
                                </div>
                            </div>
                        )}
                    </>
                )}
                <img
                    src={merchant.logo}
                    className="h-40 min-w-full"
                    alt={merchant.name}
                />
                <div className="absolute z-20 left-3.75 bottom-3.75 text-white my-col-5 items-start">
                    <div className="text-sm">{`${merchant.name} ( ${merchant.distance} км ) 👍 ${merchant.rating}%`}</div>
                    <div className="text-xs font-light flex justify-start gap-x-1.25 items-center">
                        <ClockIcon />
                        {merchant.delivery[0]}-{merchant.delivery[1]} минут
                    </div>
                </div>
                <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-b from-main/0 to-main "></div>

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
