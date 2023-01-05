import { ArrowDown } from "components/icons";
import { useAppState } from "lib/context/app";
import { useModal } from "lib/context/modal";
import { forwardRef } from "react";

// eslint-disable-next-line react/display-name
const DeliveryAddress = forwardRef(
    (
        {
            selectedFloor,
            setSelectedFloor,
        }: {
            selectedFloor: string;
            setSelectedFloor: any;
        },
        ref: any
    ) => {
        const [show, setShow, content, setContent] = useModal();
        const [state]: any = useAppState();
        const { numberOfStorey } = state;

        const onSelectFloor = () => {
            setShow(true);
            setContent(
                <div className="fixed z-50 w-full px-5 text-center -translate-x-1/2 left-1/2 bottom-5">
                    <div id="effect" data-aos="fade-up" className="my-col-10">
                        <div className="p-5 bg-white shadow-delivery rounded-2xl my-col-10">
                            test
                        </div>
                        <div
                            // onClick={onClose}
                            className="bg-white shadow-delivery px-5 py-[10.5px] rounded-2xl"
                        >
                            Хаах
                        </div>
                    </div>
                </div>
                // <div>test</div>
                // <div className="center-modal px-[50px]">
                //     <div
                //         id="effect"
                //         data-aos="fade-up"
                //         className="grid grid-cols-5 gap-1.25 "
                //     >
                //         {[...Array(numberOfStorey)].map(
                //             (floor, index: number) => {
                //                 return (
                //                     <div
                //                         key={floor}
                //                         onClick={() => {
                //                             setSelectedFloor(index + 1);
                //                             document
                //                                 .getElementById("effect")
                //                                 ?.classList.remove(
                //                                     "aos-animate"
                //                                 );
                //                             setTimeout(() => {
                //                                 setShow(false);
                //                             }, 400);
                //                         }}
                //                         className="bg-white rounded-md shadow-delivery w-[50px] py-[15.5px] text-center"
                //                     >
                //                         {index + 1}
                //                     </div>
                //                 );
                //             }
                //         )}
                //     </div>
                // </div>
            );
        };
        return (
            <div className="grid grid-cols-3 items-center gap-x-2.5 text-sm">
                <div
                    onClick={onSelectFloor}
                    className="col-span-1 flex justify-center items-center gap-x-2.5 bg-white rounded-md px-5 py-[9px]"
                >
                    <div className="font-light text-gray">{selectedFloor}</div>
                    <div>
                        <ArrowDown />
                    </div>
                </div>
                <input
                    type="text"
                    ref={ref}
                    className="col-span-2 rounded-md bg-white px-5 py-[9px] font-light"
                    placeholder="Тоот / Байгууллагын нэр"
                />
            </div>
        );
    }
);

export default DeliveryAddress;
