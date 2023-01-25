import useSWR from "swr";
import {useEffect, useState} from "react";

import { ArrowDown } from "components/icons";
import { useModal } from "lib/context/modal";
import { useAppState } from "lib/context/app";
import Spin from "components/common/spin";
import TokiAPI from "../../lib/api/toki";

export function DeliveryTime({
    selectedTime,
    setSelectedTime,
    setValue,
    setDeliveryType,
    deliveryType
}: {
    selectedTime: string;
    setSelectedTime: any;
    setValue: any;
    setDeliveryType: any;
    deliveryType: any
}) {
    const [state]: any = useAppState();

    const [show, setShow, content, setContent] = useModal();
    const [data, setData] = useState<any>({})

    const fetchTimes = async () => {
        if (deliveryType === "TakeAway") {
            await TokiAPI.getCartTimes("TakeAway").then((res) => {
                setData(res.data)
            })
        } else {
            await TokiAPI.getCartTimes("Delivery").then((res) => {
                setData(res.data)
            })
        }
    }

    useEffect(()=>{
        fetchTimes()
    },[deliveryType])

    useEffect(()=>{
        if (data && data.times && data.times[0]) {
            setValue("time", data.times[0][1])
            setSelectedTime(`${data.times[0][0]} - ${data.times[0][1]}`)
        }
    }, [data])

    // useEffect(() => {
    //     if (data && data && data.times) {
    //         data.times.length > 0
    //             ? (data.times[0] &&
    //                   setSelectedTime(
    //                       `${data.times[0][0]} - ${data.times[0][1]}`
    //                   ),
    //               data.times[0] && setValue("time", data.times[0][1]),
    //               data.times[0] && setValue("type", "Delivery"),
    //               setDeliveryType("Delivery"))
    //             : (setDeliveryType("TakeAway"));
    //     } else {
    //         setDeliveryType("TakeAway");
    //     }
    // }, [data]);

    const onClose = () => {
        document.getElementById("effect")?.classList.remove("aos-animate");
        setTimeout(() => {
            setShow(false);
        }, 400);
    };

    const onSelectTime = () => {
        setShow(true);
        setContent(
            <div className="fixed z-50 w-full px-5 text-center -translate-x-1/2 left-1/2 bottom-5">
                <div id="effect" data-aos="fade-up" className="my-col-10">
                    <div className="p-5 bg-white shadow-delivery rounded-2xl my-col-10">
                        {data &&
                            data.times?.map((time: any) => {
                                return (
                                    <div
                                        key={time}
                                        onClick={() => {
                                            setSelectedTime(
                                                `${time[0]} - ${time[1]}`
                                            );
                                            setValue("time", time[1]);
                                            onClose();
                                        }}
                                        className="pb-2.5 border-b border-[#647382] last:border-none last:pb-0"
                                    >
                                        {`${time[0] && time[0]}${
                                            time[1] && ` - ${time[1]}`
                                        }`}
                                    </div>
                                );
                            })}
                    </div>
                    <div
                        onClick={onClose}
                        className="bg-white shadow-delivery px-5 py-[10.5px] rounded-2xl"
                    >
                        Хаах
                    </div>
                </div>
            </div>
        );
    };

    return (
        <div
            onClick={onSelectTime}
            className="bg-white rounded-md px-5 py-[9px] flex justify-between items-center text-sm h-[35px]"
        >
            <div className="font-light">
                {!data && <Spin />}
                {data &&
                data.times &&
                selectedTime ===
                    `${data.times[0] ? data.times[0][0] : ''} - ${data.times[0] ? data.times[0][1] : ''}`
                    ? `${selectedTime} (Аль болох эрт)`
                    : selectedTime}
            </div>
            <ArrowDown />
        </div>
    );
}
