import { useContext, useState } from "react";

import { useAppState } from "lib/context/app";
import { useRouter } from "next/router";
import { Office } from "lib/types/office.type";
import { useModal } from "../../lib/context/modal";
import { PermissionBox } from "../common/permission-box";
import TokiAPI from "../../lib/api/toki";
import Toki from "../../lib/utils/toki-payment";
import { toast } from "react-toastify";

interface OfficeCardProps {
    office: Office;
}

const OfficeCard: React.FC<OfficeCardProps> = ({ office }) => {
    const [state, dispatch]: any = useAppState();
    const router = useRouter();
    const [show, setShow, content, setContent] = useModal();
    const [loading, setLoading] = useState(false);

    return (
        <div
            id={office.id}
            className="p-[10px] h-[80px] mb-3 bg-white  cursor-pointer rounded-3xl "
            style={{ boxShadow: "0 -5px 10px 0 rgba(30, 35, 53, 0.05)" }}
        >
            <div
                onClick={() => {
                    if (office.count === 0) {
                        setShow(true);

                        setContent(
                            <PermissionBox
                                text={
                                    "Таны хайсан байршилд хоол захиалах үйлчилгээ хараахан нэвтрээгүй байна."
                                }
                                loading={false}
                            />
                        );
                    } else {
                        if (
                            state.officeId &&
                            state.cartCount > 0 &&
                            state.officeId != office.id
                        ) {
                            TokiAPI.changeOffice({
                                office: office.id,
                                force: false,
                            }).then((res: any) => {
                                if (res?.data.changed == false) {
                                    setShow(true);

                                    setContent(
                                        <PermissionBox
                                            text={
                                                <>
                                                    Таны сагсалсан дараах
                                                    хоолнууд{" "}
                                                    <span className="font-medium">
                                                        "{office.name}"
                                                    </span>
                                                    -т хүргэгдэх боломжгүй
                                                    хасагдах тул та хаягаа
                                                    солихдоо итгэлтэй байна уу ?
                                                    <div className="w-full mt-3 ml-5 text-left">
                                                        <ul
                                                            style={{
                                                                listStyle:
                                                                    "initial",
                                                            }}
                                                        >
                                                            {res.data.orders.map(
                                                                (
                                                                    order: any
                                                                ) => {
                                                                    return order.items.map(
                                                                        (
                                                                            item: any
                                                                        ) => {
                                                                            return (
                                                                                <li
                                                                                    className="font-medium"
                                                                                    key={
                                                                                        item.id
                                                                                    }
                                                                                >
                                                                                    {order.branch &&
                                                                                        order
                                                                                            .branch
                                                                                            .name +
                                                                                            " - "}{" "}
                                                                                    {
                                                                                        item.name
                                                                                    }
                                                                                </li>
                                                                            );
                                                                        }
                                                                    );
                                                                }
                                                            )}
                                                        </ul>
                                                    </div>
                                                </>
                                            }
                                            button2="Тийм"
                                            button1="Үгүй"
                                            onClick={async () => {
                                                setLoading(true);
                                                TokiAPI.changeOffice({
                                                    office: office.id,
                                                    force: true,
                                                }).then((res: any) => {
                                                    dispatch({
                                                        type: "officeId",
                                                        officeId: office.id,
                                                    });
                                                    dispatch({
                                                        type: "officeName",
                                                        officeName: office.name,
                                                    });
                                                    dispatch({
                                                        type: "officeLat",
                                                        officeLat:
                                                            office.latitude,
                                                    });
                                                    dispatch({
                                                        type: "officeLng",
                                                        officeLng:
                                                            office.longitude,
                                                    });
                                                    dispatch({
                                                        type: "toastCheck",
                                                        toastCheck: false,
                                                    });

                                                    dispatch({
                                                        type: "numberOfStorey",
                                                        numberOfStorey:
                                                            office.floor,
                                                    });
                                                    dispatch({
                                                        type: "notThroughLink",
                                                        notThroughLink: true,
                                                    });
                                                    res?.data.quantity &&
                                                    res?.data.quantity > 0
                                                        ? router.push(`/order`)
                                                        : router.push(
                                                              `/office/${office.id}`
                                                          );
                                                });
                                                setShow(false);
                                                setLoading(false);
                                            }}
                                            loading={loading}
                                        />
                                    );
                                } else {
                                    dispatch({
                                        type: "officeId",
                                        officeId: office.id,
                                    });
                                    dispatch({
                                        type: "officeName",
                                        officeName: office.name,
                                    });
                                    dispatch({
                                        type: "officeLat",
                                        officeLat: office.latitude,
                                    });
                                    dispatch({
                                        type: "officeLng",
                                        officeLng: office.longitude,
                                    });
                                    dispatch({
                                        type: "toastCheck",
                                        toastCheck: false,
                                    });

                                    dispatch({
                                        type: "numberOfStorey",
                                        numberOfStorey: office.floor,
                                    });
                                    dispatch({
                                        type: "notThroughLink",
                                        notThroughLink: true,
                                    });
                                    res?.data.quantity && res?.data.quantity > 0
                                        ? router.push(`/order`)
                                        : router.push(`/office/${office.id}`);
                                }
                            });
                        } else {
                            dispatch({ type: "officeId", officeId: office.id });
                            dispatch({
                                type: "officeName",
                                officeName: office.name,
                            });
                            dispatch({
                                type: "officeLat",
                                officeLat: office.latitude,
                            });
                            dispatch({
                                type: "officeLng",
                                officeLng: office.longitude,
                            });
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
