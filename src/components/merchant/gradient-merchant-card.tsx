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
    // const [startDate, setStartDate] = useState("");
    // const [endDate, setEndDate] = useState("");

    // useEffect(() => {
    //     merchant.timetable.map((timetable: Timetable, index: number) =>
    //         new Date().getDay() === timetable.day
    //             ? (setStartDate(timetable.start_hour),
    //               setEndDate(timetable.end_hour))
    //             : null
    //     );
    // }, [merchant]);

    // useEffect(() => {
    //     const d = new Date();
    //     let day = d.getDay();
    //     let currentTime = d.getHours() * 60 + d.getMinutes()
    //     let openTime: any;
    //     let closeTime: any;
    //     let openTimeDelivery: any;
    //     let closeTimeDelivery: any;
    //     if (merchant.timetable) {
    //         merchant.timetable?.map((schedule) => {
    //             if (schedule.day === day && schedule.active) {
    //                 openTime = schedule.open.split(":").map(Number);
    //                 closeTime = schedule.close.split(":").map(Number);
    //             }
    //         });
    //     }
    //     if (merchant.timetableDelivery) {
    //         merchant.timetableDelivery?.map((schedule) => {
    //             if (schedule.day === day && schedule.active) {
    //                 openTimeDelivery = schedule.open !== null ? schedule.open.split(":").map(Number) : undefined;
    //                 closeTimeDelivery = schedule.close !== null ? schedule.close.split(":").map(Number) : undefined;
    //             }
    //         });
    //     }

    //     if (openTime && closeTime && openTimeDelivery && closeTimeDelivery) {
    //         let openSchedule = openTime[0] * 60 + openTime[1]
    //         let closeSchedule = closeTime[0] * 60 + closeTime[1]
    //         let openScheduleDelivery = openTimeDelivery[0] * 60 + openTimeDelivery[1]
    //         let closeScheduleDelivery = closeTimeDelivery[0] * 60 + closeTimeDelivery[1]
    //         let open: any
    //         let close: any
    //         if (openSchedule < openScheduleDelivery) {
    //             open = openSchedule
    //             setStartDate(`${openTime[0]}:${openTime[1]}`);
    //         } else if (openSchedule > openScheduleDelivery) {
    //             open = openScheduleDelivery
    //             setStartDate(`${openTimeDelivery[0]}:${openTimeDelivery[1]}`);
    //         } else {
    //             open = openScheduleDelivery
    //             setStartDate(`${openTimeDelivery[0]}:${openTimeDelivery[1]}`);
    //         }
    //         if (closeSchedule < closeScheduleDelivery) {
    //             close = closeSchedule
    //             setEndDate(`${closeTime[0]}:${closeTime[1]}`);
    //         } else if (closeSchedule > closeScheduleDelivery) {
    //             close = closeScheduleDelivery
    //             setEndDate(`${closeTimeDelivery[0]}:${closeTimeDelivery[1]}`);
    //         } else {
    //             close = closeScheduleDelivery
    //             setEndDate(`${closeTimeDelivery[0]}:${closeTimeDelivery[1]}`);
    //         }
    //         if (currentTime < open) {
    //             merchant.state = "preDelivery"
    //         } else if (currentTime > close) {
    //             merchant.state = "CLOSED"
    //         }
    //     }
    //     else if (openTimeDelivery && closeTimeDelivery) {
    //         let openScheduleDelivery = openTimeDelivery[0] * 60 + openTimeDelivery[1]
    //         let closeScheduleDelivery = closeTimeDelivery[0] * 60 + closeTimeDelivery[1]
    //         setStartDate(`${openTimeDelivery[0]}:${openTimeDelivery[1]}`);
    //         setEndDate(`${closeTimeDelivery[0]}:${closeTimeDelivery[1]}`);
    //         if (currentTime < openScheduleDelivery) {
    //             merchant.state = "preDelivery"
    //         } else if (currentTime > closeScheduleDelivery) {
    //             merchant.state = "CLOSED"
    //         }
    //     }
    //     else if (openTime && closeTime) {
    //         let openSchedule = openTime[0] * 60 + openTime[1]
    //         let closeSchedule = closeTime[0] * 60 + closeTime[1]
    //         setStartDate(`${openTime[0]}:${openTime[1]}`);
    //         setEndDate(`${closeTime[0]}:${closeTime[1]}`);
    //         if (currentTime < openSchedule) {
    //             merchant.state = "preDelivery"
    //         } else if (currentTime > closeSchedule) {
    //             merchant.state = "CLOSED"
    //         }
    //     }
    // }, [])

    const onContinueClick = () => {
        console.log("test")
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
        console.log(merchant.state, page)
        if (merchant.state === "CLOSED") {
            setShow(true);
            setContent(
                <PermissionBox
                    text={` Зоогийн газар хаалттай байна. <br>
                            Та бусад зоогийн газраас сонголтоо хийнэ үү <br>
                            Ажиллах цагийн хуваарь: <br>
                            <b>
                              ${merchant.startDate} - ${merchant.endDate}
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
                    button2={<>Үргэлжлүүлэх</>}
                    onClick={() => {
                        setShow(false);
                        onContinueClick();
                    }}
                />
            );
        } else if (merchant.state === "preDelivery") {
            setShow(true);
            setContent(
                <PermissionBox
                    text={`Уг хоолны газрын нээх цаг болоогүй<br>байгаа тул та зөвхөн урьдчилсан<br>захиалга хийх боломжтой`}
                    button2={<>Үргэлжлүүлэх</>}
                    onClick={() => {
                        setShow(false);
                        onContinueClick();
                    }}
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
                                <>Дотоод ажилтай тул {merchant.reason}-с нээнэ</>
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
                    <div className="absolute right-3.75 bottom-3.75 flex gap-x-2.5 justify-end items-center" onClick={onContinueClick}>
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
