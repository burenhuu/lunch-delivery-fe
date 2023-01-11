import useSWR from "swr";
import { useEffect } from "react";

import { ArrowDown } from "components/icons";
import { useModal } from "lib/context/modal";
import { useAppState } from "lib/context/app";
import Spin from "components/common/spin";

export function DeliveryTime({
    selectedTime,
    setSelectedTime,
    setValue,
    setisDeliveryClosed,
}: {
    selectedTime: string;
    setSelectedTime: any;
    setValue: any;
    setisDeliveryClosed: any;
}) {
    const [state]: any = useAppState();

    const [show, setShow, content, setContent] = useModal();
    const apiUrl = `/v1/cart/times`;
    const { data, error } = useSWR(`${apiUrl}`);
    useEffect(() => {
        if (data && data.data && data.data.times) {
            data.data.times.length > 0
                ? (data.data.times[0] && setSelectedTime(data.data.times[0]),
                  data.data.times[0] && setValue("time", data.data.times[0]))
                : setisDeliveryClosed(true);
        } else {
            setisDeliveryClosed(true);
        }
    }, [data]);

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
                            data.data &&
                            data.data.times?.map((time: any) => {
                                return (
                                    <div
                                        key={time}
                                        onClick={() => {
                                            setSelectedTime(time);
                                            setValue("time", time);
                                            onClose();
                                        }}
                                        className="pb-2.5 border-b border-[#647382] last:border-none last:pb-0"
                                    >
                                        {time}
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
                {!data && !error && <Spin />}
                {data && data.data && selectedTime === data.data.times[0]
                    ? `${selectedTime} (Аль болох эрт)`
                    : selectedTime}
            </div>
            <ArrowDown />
        </div>
    );
}
