import { ArrowDown } from "components/icons";
import { useAppState } from "lib/context/app";
import { useModal } from "lib/context/modal";
import { forwardRef } from "react";

// eslint-disable-next-line react/display-name
const DeliveryAddress = forwardRef(
    ({
        selectedFloor,
        setSelectedFloor,
        errors,
        setValue,
    }: {
        selectedFloor: string;
        setSelectedFloor: any;
        errors: any;
        setValue: any;
    }) => {
        const [show, setShow, content, setContent] = useModal();
        const [state]: any = useAppState();
        const { numberOfStorey } = state;

        const onSelectFloor = () => {
            setShow(true);
            setContent(
                <div className="fixed z-50 w-full px-5 text-center center-modal">
                    <div id="effect" data-aos="fade-up">
                        <div className=" shadow-delivery rounded-2xl">
                            <div
                                id="effect"
                                data-aos="fade-up"
                                className="flex flex-wrap"
                            >
                                {[...Array(numberOfStorey)].map(
                                    (floor, index: number) => {
                                        return (
                                            <div
                                                className="p-[5px]"
                                                key={index}
                                            >
                                                <div
                                                    key={floor}
                                                    onClick={() => {
                                                        setSelectedFloor(
                                                            index + 1
                                                        );
                                                        setValue(
                                                            "floor",
                                                            index + 1
                                                        );
                                                        document
                                                            .getElementById(
                                                                "effect"
                                                            )
                                                            ?.classList.remove(
                                                                "aos-animate"
                                                            );
                                                        setTimeout(() => {
                                                            setShow(false);
                                                        }, 400);
                                                    }}
                                                    className="bg-white rounded-md flex shadow-delivery w-[50px] h-[50px] text-center justify-center items-center"
                                                >
                                                    {index + 1}
                                                </div>
                                            </div>
                                        );
                                    }
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            );
        };
        return (
            <div className="col-span-1">
                <div
                    onClick={onSelectFloor}
                    className="flex justify-center items-center gap-x-2.5 bg-white rounded-md px-5 py-[9px]"
                >
                    <div className="font-light text-gray">{selectedFloor}</div>
                    <div>
                        <ArrowDown />
                    </div>
                </div>
                <p className="mt-1 text-xs italic text-left text-red-500 ">
                    {errors.floor?.message}
                </p>
            </div>
        );
    }
);

export default DeliveryAddress;
