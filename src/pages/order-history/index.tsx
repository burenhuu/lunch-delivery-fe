import type { NextPage } from "next";
import { useEffect, useContext, useRef, useState } from "react";
import { useRouter } from "next/router";
import { mutate } from "swr";
import PullToRefresh from "react-simple-pull-to-refresh";

import FinishedList from "components/history/finished-list";
import OngoingList from "components/history/ongoing-list";
import { useAppState } from "lib/context/app";
import { toast } from "react-toastify";

const OrderHistory: NextPage = () => {
    const [state, dispatch]: any = useAppState();
    const router = useRouter();
    const { paymentStatusCode }: any = router.query;
    const { upoint }: any = router.query;
    const executeScroll = () => scrollRef?.current?.scrollIntoView();

    const statusTabs = ["Идэвхтэй", "Дууссан"];
    const [activeTab, setActiveTab] = useState<string>(statusTabs[0]);

    const scrollRef = useRef<null | HTMLDivElement>(null);

    const goToViolation = (id: any) => {
        const violation = document.getElementById(id);
        violation &&
            window.scrollTo({
                top: violation.offsetTop,
                behavior: "smooth",
            });
    };

    // useEffect(() => {
    //     mutate(
    //         "/app/order/merchant/${state.merchantId}?status=ongoing&page_size=10&page=1"
    //     );
    //     mutate(
    //         "/app/order/merchant/${state.merchantId}?status=completed&page_size=10&page=1"
    //     );
    // }, [5000]);

    useEffect(() => {
        // if (state.navId) {
        //     executeScroll();
        // }
        if (state.activeTab) {
            setActiveTab(state.activeTab);
        }
        if (paymentStatusCode) {
            if (paymentStatusCode == 200) {
                // handleModal(
                //     true,
                //     "",
                //     upoint
                //         ? `Таны захиалга амжилттай хийгдэж U-Point дансанд ${upoint} оноо нэмэгдлээ`
                //         : `Таны захиалга амжилттай хийгдлээ`,
                //     true,
                //     <div className="flex">
                //         <LargeWhiteButton
                //             text="Ok"
                //             // onClick={() => handleModal()}
                //         />
                //     </div>
                // );
                dispatch({
                    type: "cartCount",
                    cartCount: 0,
                });
                dispatch({
                    type: "star",
                    star: 0,
                });
            } else {
                toast("Уучлаарай, Таны захиалга амжилтгүй боллоо");
            }
        }
    }, [router]); // eslint-disable-line react-hooks/exhaustive-deps

    const handleRefresh = async () => {
        mutate(
            "/app/order/merchant/${state.merchantId}?status=ongoing&page_size=10&page=1"
        );
        mutate(
            "/app/order/merchant/${state.merchantId}?status=completed&page_size=10&page=1"
        );
    };

    return (
        // <div className="w-full h-full ">
        //     <PullToRefresh
        //         className="w-full h-full"
        //         onRefresh={handleRefresh}
        //         pullingContent=" "
        //     >
        //         <div className="m-5">
        //             <OngoingList scrollRef={scrollRef} />
        //             <FinishedList scrollRef={scrollRef} />
        //         </div>
        //     </PullToRefresh>
        // </div>
        <div className="p-5 my-col-20">
            {/* Status tab */}
            <div className="bg-white rounded-md grid grid-cols-2 items-center text-center">
                {statusTabs?.map((tab) => {
                    return (
                        <div
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={
                                "py-[10.5px] rounded-md transition ease-in-out duration-200 " +
                                (activeTab === tab
                                    ? "text-white font-medium bg-gradient-to-r from-gradient-start to-gradient-end"
                                    : "text-gray")
                            }
                        >
                            {tab}
                        </div>
                    );
                })}
            </div>
            <div className="my-col-10">
                {activeTab === "Идэвхтэй" && (
                    <OngoingList scrollRef={scrollRef} />
                )}
                {activeTab === "Дууссан" && (
                    <FinishedList scrollRef={scrollRef} />
                )}
            </div>
        </div>
    );
};

export default OrderHistory;
