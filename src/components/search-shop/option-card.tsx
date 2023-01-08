import { useContext } from "react";

import { useAppState } from "lib/context/app";
import { useRouter } from "next/router";
import { Office } from "lib/types/office.type";

interface OptionCardProps {
    office: Office;
}

const OptionCard: React.FC<OptionCardProps> = ({ office }) => {
    const [state, dispatch]: any = useAppState();
    const router = useRouter();

    return (
        <button
            className="flex flex-wrap px-[15px] py-[15px] h-[46px]"
            onClick={() => {
                // dispatch({
                //     type: "merchants",
                //     merchants: office.merchants,
                // });
                dispatch({ type: "officeId", officeId: office.id });
                dispatch({
                    type: "officeName",
                    officeName: office.name,
                });

                dispatch({
                    type: "numberOfStorey",
                    numberOfStorey: office.floor,
                });
                router.push(`/office/${office.id}`);
            }}
        >
            <p className="mr-1 text-sm text-normal truncate">{office.name}</p>
            {/* <p className="text-sm font-light">
                ( {office.merchants.length} зоогийн газар )
            </p> */}
        </button>
    );
};

export default OptionCard;
