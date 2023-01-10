import { useContext } from "react";
import { useAppState } from "lib/context/app";
import { useRouter } from "next/router";
import { Office } from "lib/types/office.type";
import {useModal} from "../../lib/context/modal";
import {PermissionBox} from "../common/permission-box";
import TokiAPI from "../../lib/api/toki";
import Toki from "../../lib/utils/toki-payment";
import {toast} from "react-toastify";

interface OfficeCardProps {
    office: Office;
}

const OfficeCard: React.FC<OfficeCardProps> = ({ office }) => {
    const [state, dispatch]: any = useAppState();
    const [show, setShow, content, setContent] = useModal();
    const router = useRouter();
    return (
        <div
            id={office.id}
            className="p-[10px] h-[80px] mb-3 bg-white  cursor-pointer rounded-3xl "
            style={{ boxShadow: "0 -5px 10px 0 rgba(30, 35, 53, 0.05)" }}
        >
            <div
                onClick={() => {
                    if(office.count === 0){
                        setShow(true);

                        setContent(
                            <PermissionBox
                                text={"Таны хайсан байршилд хоол захиалах үйлчилгээ хараахан нэвтрээгүй байна."}
                                loading={false}
                            />
                        );
                    } else{
                        // dispatch({
                        //     type: "merchants",
                        //     merchants: office.merchants,
                        // });
                        dispatch({ type: "officeId", officeId: office.id });
                        dispatch({ type: "officeName", officeName: office.name });
                        dispatch({ type: "officeLat", officeLat: office.latitude });
                        dispatch({ type: "officeLng", officeLng: office.longitude });
                        dispatch({ type: "toastCheck", toastCheck: false });

                        dispatch({
                            type: "numberOfStorey",
                            numberOfStorey: office.floor,
                        });
                        dispatch({
                            type: "notThroughLink",
                            notThroughLink: true,
                        });
                        router.push(`/office/${office.id}`);
                    }

                }}
                className="flex items-center gap-x-[15px]"
            >
                <div className="w-15 shrink-0">
                    <img
                        src={office.photo ? office.photo : "pic"}
                        alt={office.name}
                        className="w-[60px] h-[60px] object-cover rounded-[10px]"
                    />
                </div>
                <div className="flex-grow text-left">
                    <p className="text-base font-medium text-[#1E2335] mb-[7px]">
                        {office.name}
                    </p>
                    <p className="text-xs font-light break-normal text-[#647382]">
                        {office.count} зоогийн газар
                    </p>
                </div>
            </div>
        </div>
    );
};

export default OfficeCard;
