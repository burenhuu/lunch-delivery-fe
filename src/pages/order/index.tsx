import type { NextPage } from "next";
import Link from "next/link";
import { useContext, useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";
import Countdown from "react-countdown";

import { formatPrice, calcTimeDiff } from "lib/utils/helpers";
// import Cart, { Item } from "lib/types/cart.type";
import { useAppState } from "lib/context/app";
import { toast } from "react-toastify";
import { CartItems } from "components/order/cart-items";
import DeliveryType from "components/order/delivery-type";
import DeliveryAddress from "components/order/delivery-address";
import { DeliveryTime } from "components/order/delivery-time";
import { Vat } from "components/order/vat";
import { useModal } from "lib/context/modal";
import { PermissionBox } from "components/common/permission-box";
import ButtonComponent from "components/common/button";

function toDate(dStr: any, format: any) {
    var now = new Date();
    if (format == "h:m") {
        now.setHours(dStr.substr(0, dStr.indexOf(":")));
        now.setMinutes(dStr.substr(dStr.indexOf(":") + 1));
        now.setSeconds(0);
        return now;
    } else return "Invalid Format";
}

let orderId: string = "";
const renderer = ({ hours, minutes, seconds }: any) => {
    let calcSeconds = hours * 360 + minutes * 60 + seconds;

    return <span>{calcSeconds}</span>;
};

const Cart: NextPage = () => {
    const router = useRouter();
    const [state, dispatch]: any = useAppState();
    const { officeName } = state;
    const [deliveryType, setDeliveryType] = useState<string>("deliver");
    const [vat, setVat] = useState<string>("individual");
    const addressRef = useRef<HTMLInputElement>(null);
    const commentRef = useRef<HTMLInputElement>(null);
    const [selectedFloor, setSelectedFloor] = useState<string>("Давхар");
    const dummyTimes = ["12:20 - 12:30", "12:50 - 13:00", "13:20 - 13:30"];
    const [selectedTime, setSelectedTime] = useState<string>(dummyTimes[0]);
    const [show, setShow, content, setContent] = useModal();

    const modalText =
        deliveryType === "deliver" ? (
            <>
                Та <span className="font-medium">{officeName}</span>
                -н{" "}
                {addressRef.current?.value ? (
                    <>
                        <span className="font-medium">
                            {`${selectedFloor} давхар, ${addressRef.current.value}`}
                        </span>
                        -д
                    </>
                ) : (
                    <>
                        <span className="font-medium">{selectedFloor}</span>{" "}
                        давхарт
                    </>
                )}{" "}
                <span className="font-medium">{selectedTime}</span> цагт
                захиалгаа хүргүүлэх гэж байна. Төлбөр төлсний дараа захиалгыг
                цуцлах болон өөрчлөх боломжгүй
            </>
        ) : (
            <>
                Та <span className="font-medium">Мандах</span>
                -с <span className="font-medium">{selectedTime}</span> цагт очиж
                авахаар захиалга өгөх гэж байна. Төлбөр төлсний дараа захиалгыг
                цуцлах болон өөрчлөх боломжгүй
            </>
        );

    const dummyData = [
        {
            place: "Мандах",
            items: [
                {
                    name: "Гуляш",
                    portion: "Хагас",
                    comment: "Хоолоо ид",
                    qty: 1,
                    price: "6900",
                },
                {
                    name: "Халуун ногоотой хоол",
                    portion: "Бүтэн",
                    qty: 2,
                    price: "6900",
                },
            ],
        },
        {
            place: "Тусгаар тогтнолын ордон",
            items: [
                {
                    name: "Гуляш",
                    portion: "Хагас",
                    comment: "Гоё хоол",
                    qty: 1,
                    price: "6900",
                },
                {
                    name: "Халуун ногоотой хоол",
                    portion: "Бүтэн",
                    qty: 2,
                    price: "6900",
                },
            ],
        },
    ];

    const onSubmit = () => {};

    const onOrderClick = () => {
        setShow(true);
        setContent(
            <PermissionBox
                text={modalText}
                button2="Төлөх"
                onClick={onSubmit}
            />
        );
    };

    return (
        <div className="p-5 my-col-20">
            <div className="my-col-15">
                <div className="font-medium">Захиалга</div>
                <CartItems items={dummyData} />
            </div>
            <div className="my-col-15">
                <div className="font-medium">Захиалгын хэлбэр</div>
                <DeliveryType setDeliveryType={setDeliveryType} />
            </div>
            {deliveryType === "deliver" && (
                <div className="my-col-15">
                    <div className="font-medium">Хүргэлтийн хаяг</div>
                    <DeliveryAddress
                        ref={addressRef}
                        selectedFloor={selectedFloor}
                        setSelectedFloor={setSelectedFloor}
                    />
                </div>
            )}
            <div className="my-col-15">
                <div className="font-medium">Захиалга авах хугацаа</div>
                <DeliveryTime
                    times={dummyTimes}
                    selectedTime={selectedTime}
                    setSelectedTime={setSelectedTime}
                />
            </div>
            <div className="my-col-15">
                <div className="font-medium">Нэмэлт мэдээлэл</div>
                <input
                    ref={commentRef}
                    type="text"
                    placeholder="Нэмэлт тайлбар оруулах"
                    className="bg-white text-sm font-light rounded-md px-5 py-[9px]"
                />
            </div>
            <div className="my-col-15">
                <div className="font-medium">eBarimt</div>
                <Vat setVat={setVat} />
                {vat === "organization" && (
                    <input
                        type="text"
                        className="-mt-[5px] rounded-md bg-white font-light text-sm px-5 py-[9px] text-gray"
                        placeholder="Байгууллагын РД"
                    />
                )}
            </div>
            <div onClick={onOrderClick}>
                <ButtonComponent text="Захиалах" />
            </div>
        </div>
    );
};

export default Cart;
