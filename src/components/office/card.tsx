import { useContext } from "react";
import CoffeeShopCard from "components/coffee-shop/card";
import Office, { Merchant } from "lib/types/office.type";
import { useAppState } from "lib/context/app";
import { useRouter } from "next/router";

interface OfficeCardProps {
    office: Office;
}

const OfficeCard: React.FC<OfficeCardProps> = ({ office }) => {
    const [state, dispatch]: any = useAppState();
    const router = useRouter();
    return (
        <div
            id={office.id}
            className="p-[15px] mb-3 bg-white  cursor-pointer rounded-3xl "
            style={{ boxShadow: "0 -5px 10px 0 rgba(30, 35, 53, 0.05)" }}
        >
            <div
                onClick={() => {
                    dispatch({
                        type: "merchants",
                        merchants: office.merchants,
                    });
                    dispatch({ type: "officeId", officeId: office.id });
                    dispatch({ type: "officeName", officeName: office.name });

                    dispatch({
                        type: "numberOfStorey",
                        numberOfStorey: office.floor,
                    });
                    dispatch({
                        type: "notThroughLink",
                        notThroughLink: true,
                    });
                    router.push(`/office/${office.id}`);
                }}
                className="flex items-center gap-x-[15px]"
            >
                <div className="w-12 shrink-0">
                    <img
                        src={office.photo ? office.photo : "sda"}
                        alt={office.name}
                        className="w-[50px] h-[50px] object-cover rounded-[15px]"
                    />
                </div>
                <div className="flex-grow text-left">
                    <p className="text-base font-medium text-[#1E2335]">
                        {office.name}
                    </p>
                    <p className="text-xs font-light break-normal text-[#647382]">
                        {office.merchants.length} зоогийн газар
                    </p>
                </div>
            </div>
        </div>
    );
};

export default OfficeCard;
