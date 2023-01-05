import { ArrowDown } from "components/icons";
import { useModal } from "lib/context/modal";

export function DeliveryTime({
    times,
    selectedTime,
    setSelectedTime,
}: {
    times: string[];
    selectedTime: string;
    setSelectedTime: any;
}) {
    const [show, setShow, content, setContent] = useModal();

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
                        {times?.map((time) => {
                            return (
                                <div
                                    key={time}
                                    onClick={() => {
                                        setSelectedTime(time);
                                        onClose();
                                    }}
                                    className="pb-2.5 border-b border-gray last:border-none last:pb-0"
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
            className="bg-white rounded-md px-5 py-[9px] flex justify-between items-center text-sm"
        >
            <div className="font-light">
                {selectedTime === times[0]
                    ? `${selectedTime} (Аль болох эрт)`
                    : selectedTime}
            </div>
            <ArrowDown />
        </div>
    );
}
