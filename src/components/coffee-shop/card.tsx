import { useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";

import { Merchant, Timetable } from "lib/types/office.type";
import { useAppState } from "lib/context/app";
import { renderStars } from "lib/utils/helpers";

interface CoffeeShopCardProps {
    merchant: Merchant;
}

function toDate(dStr: any, format: any) {
    var now = new Date();
    if (format == "h:m") {
        now.setHours(dStr.substr(0, dStr.indexOf(":")));
        now.setMinutes(dStr.substr(dStr.indexOf(":") + 1));
        now.setSeconds(0);
        return now;
    } else return "Invalid Format";
}

const CoffeeShopCard: React.FC<CoffeeShopCardProps> = ({ merchant }) => {
    const router = useRouter();
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
    }, [merchant]); // eslint-disable-line react-hooks/exhaustive-deps

    return <h1>sda</h1>;
    //     <div
    //         className="cursor-pointer"
    //         onClick={() => {
    //             handleModal();

    //             if (!merchant.is_open || !merchant.is_active) {
    //                 handleModal(
    //                     true,
    //                     "",
    //                     <div>
    //                         Зоогийн газар хаалттай байна.
    //                         <br /> Та бусад зоогийн газраас сонголтоо хийнэ үү
    //                         <br />
    //                         Ажиллах цагийн хуваарь:
    //                         <br />
    //                         <p className="font-semibold">
    //                             {startDate}-{endDate}
    //                         </p>
    //                     </div>,
    //                     true,
    //                     <div className="flex">
    //                         <LargeWhiteButton
    //                             text="Ок"
    //                             onClick={() => handleModal()}
    //                         />
    //                     </div>
    //                 );
    //             } else if (merchant.temporary_closed) {
    //                 handleModal(
    //                     true,
    //                     "",
    //                     <div>
    //                         Зоогийн газар дотоод ажилтай байгаа тул захиалга
    //                         авахгүй
    //                     </div>,
    //                     true,
    //                     <div className="flex">
    //                         <LargeWhiteButton
    //                             text="Ок"
    //                             onClick={() => handleModal()}
    //                         />
    //                     </div>
    //                 );
    //             } else {
    //                 dispatch({
    //                     type: "merchantId",
    //                     merchantId: merchant._id,
    //                 });
    //                 dispatch({
    //                     type: "merchantName",
    //                     merchantName: merchant.name,
    //                 });

    //                 dispatch({
    //                     type: "header",
    //                     header: merchant.header,
    //                 });

    //                 dispatch({
    //                     type: "isDelivery",
    //                     isDelivery: merchant.is_delivery,
    //                 });

    //                 dispatch({
    //                     type: "cancelDeliveryTimetable",
    //                     cancelDeliveryTimetable:
    //                         merchant.cancel_delivery_timetable,
    //                 });

    //                 dispatch({
    //                     type: "temporaryClosed",
    //                     temporaryClosed: merchant.temporary_closed,
    //                 });

    //                 dispatch({
    //                     type: "banner",
    //                     banner: false,
    //                 });

    //                 router.push(
    //                     `/menu/${merchant._id}?tokenid=${router.query.tokenid}`
    //                 );
    //             }
    //         }}
    //     >
    //         <div className="flex flex-col w-full mb-1 justify-items-center shrink-0 max-w-[100px] h-full">
    //             <div className="flex flex-col justify-between h-full">
    //                 <div>
    //                     <div
    //                         style={{ position: "relative" }}
    //                         className=" mx-auto mb-2.5 rounded-[15px] w-[50px] h-[50px]"
    //                     >
    //                         <img
    //                             src={merchant.logo}
    //                             alt={merchant.name}
    //                             className="object-cover w-[50px] h-[50px] rounded-[15px]"
    //                         />
    //                         {!merchant.is_open ||
    //                         !merchant.is_active ||
    //                         merchant.temporary_closed ? (
    //                             <div
    //                                 className="absolute mt-[-50px] w-[50px] h-[50px] rounded-[15px] text-xs flex items-center justify-center"
    //                                 style={{
    //                                     backgroundColor:
    //                                         "rgba(244, 229, 187, 0.9)",
    //                                     color: "#91979B",
    //                                 }}
    //                             >
    //                                 Хаасан
    //                             </div>
    //                         ) : null}
    //                     </div>{" "}
    //                     <p className="mb-[5px] text-[12px] font-normal text-center  shrink-0 text-[#1E2335] w-[80px] break-words line-clamp-2">
    //                         {merchant.name}
    //                     </p>
    //                 </div>
    //                 <ul className="flex justify-center">
    //                     {renderStars(merchant.avg_review, "coffeeShop")}
    //                 </ul>
    //             </div>
    //         </div>
    //     </div>
    // );
};

export default CoffeeShopCard;
