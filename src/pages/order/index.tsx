import type { NextPage } from "next";
import { useEffect, useRef, useState } from "react";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

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
import TokiAPI from "lib/api/toki";
import Toki from "lib/utils/toki-payment";

const Cart: NextPage = () => {
    const [state]: any = useAppState();
    const { officeName } = state;
    const [deliveryType, setDeliveryType] = useState<string>("Delivery");
    const [vat, setVat] = useState<any>(1);
    const addressRef = useRef<HTMLInputElement>(null);
    const commentRef = useRef<HTMLInputElement>(null);
    const registerRef = useRef<HTMLInputElement>(null);
    const [selectedFloor, setSelectedFloor] = useState<string>("Давхар");
    const dummyTimes = ["12:20 - 12:30", "12:50 - 13:00", "13:20 - 13:30"];
    const [selectedTime, setSelectedTime] = useState<string>("");
    const [show, setShow, content, setContent] = useModal();
    const [loading, setLoading] = useState(false);
    const [totalAmount, setTotalAmount] = useState<any>(0);
    const [taxAmount, setTaxAmount] = useState<any>(0);
    const [grandTotal, setGrandTotal] = useState<any>(0);
    const [discountAmount, setDiscountAmount] = useState<any>(0);
    const [data, setData] = useState<any>(null);

    useEffect(() => {
        if (state.officeId) {
            setLoading(true);

            const fetchDatas = async () => {
                try {
                    const { data } = await TokiAPI.getCart(state.officeId);

                    setData(data);
                    data.totalAmount && setTotalAmount(data.totalAmount);
                    data.taxAmount && setTaxAmount(data.taxAmount);
                    data.grandTotal && setGrandTotal(data.grandTotal);
                    data.discountAmount &&
                        setDiscountAmount(data.discountAmount);
                } finally {
                    setLoading(false);
                }
            };

            fetchDatas();
        }
    }, [state.officeId]);

    const validationSchema = yup.object().shape({
        type: yup.string().required("Захиалгын хэлбэр сонгоно уу"),
        address: yup.string().when("type", {
            is: (type: string) => type === "Delivery",
            then: yup.string().required("Тоот/Байгууллагын нэр бөглөнө үү"),
        }),
        floor: yup.number().when("type", {
            is: (type: string) => type === "Delivery",
            then: yup
                .number()
                .min(1, "Хүргүүлэх давхараа сонгоно уу")
                .required("Хүргүүлэх давхараа сонгоно уу"),
        }),
        comment: yup.string().nullable(),
        vat: yup.number().required("eBarimt сонгоно уу"),
        register: yup.string().when("type", {
            is: (vat: number) => vat === 3,
            then: yup.string().required("Байгууллагын РД оруулна уу"),
        }),
        time: yup.string().required("Захиалга авах хугацаа оруулна уу"),
    });

    const {
        register,
        handleSubmit,
        control,
        formState: { errors },
        reset,
        setValue,
    } = useForm({
        defaultValues:
            deliveryType === "Delivery"
                ? {
                      type: "Delivery",
                      address: "",
                      floor: null,
                      comment: "",
                      vat: 1,
                      register: "",
                      orders: data ? data.orders : null,
                      time: "",
                      totalAmount: totalAmount,
                      discountAmount: discountAmount,
                      taxAmount: taxAmount,
                      grandTotal: grandTotal,
                  }
                : {
                      type: "Delivery",
                      comment: "",
                      vat: 1,
                      register: "",
                      orders: data ? data.orders : null,
                      time: "",
                      totalAmount: totalAmount,
                      discountAmount: discountAmount,
                      taxAmount: taxAmount,
                      grandTotal: grandTotal,
                  },
        resolver: yupResolver(validationSchema),
    });

    const modalText =
        deliveryType === "Delivery" ? (
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

    const onSubmitHandler = async (values: any) => {
        console.log(values);
        setShow(true);
        setContent(
            <PermissionBox
                text={modalText}
                button2="Төлөх"
                onClick={async () => {
                    setLoading(true);

                    try {
                        const placeOrderResponse = await TokiAPI.checkout(
                            state.officeId,
                            values
                        );
                        if (placeOrderResponse?.status === 200) {
                            Toki.buy(
                                state.officeId,
                                data.data.grandTotal,
                                data.data.orderId,
                                `Lunch_zahialah | ${localStorage.getItem(
                                    "phoneNumber"
                                )}`,
                                async (
                                    transactionID: any,
                                    orderID: any,
                                    status: any,
                                    statusCode: any,
                                    transRequestId: any
                                ) => {
                                    if (typeof window !== "undefined") {
                                        if (
                                            values &&
                                            values.delivery_instruction
                                        ) {
                                            delete values.delivery_instruction;
                                        }

                                        localStorage.setItem(
                                            "deliveryOptions",
                                            JSON.stringify(values)
                                        );
                                    }

                                    const paidResponse = await TokiAPI.paid(
                                        state.officeId,
                                        {
                                            orderID: data.data.orderId,
                                            transactionID: transactionID,
                                            status: status,
                                            statusCode: statusCode,
                                            transRequestId: transRequestId,
                                            token: state.token,
                                            amount: data.data.grandTotal,
                                        }
                                    );

                                    // const upointResponse =
                                    //     await TokiAPI.getUpoint(
                                    //         data._id
                                    //     );

                                    // if (
                                    //     upointResponse?.data
                                    //         ?.status_code ===
                                    //         0 &&
                                    //     upointResponse?.data
                                    //         ?.data
                                    //         ?.upoint_collect_amount
                                    // ) {
                                    //     router.push(
                                    //         `/order-history?tokenid=${router.query.tokenid}&paymentStatusCode=${statusCode}&upoint=${upointResponse?.data?.data?.upoint_collect_amount}`
                                    //     );
                                    // } else {
                                    //     router.push(
                                    //         `/order-history?tokenid=${router.query.tokenid}&paymentStatusCode=${statusCode}`
                                    //     );
                                    // }
                                },
                                `${process.env.NEXT_PUBLIC_ENTRYPOINT}/coffee/thirdparty/paid`
                            );
                        }

                        // } else {
                        //     toast(placeOrderResponse?.data?.message);
                        // }
                    } finally {
                        setLoading(false);
                        reset();
                    }
                }}
            />
        );
    };

    const onOrderClick = () => {
        setShow(true);
        setContent(
            <PermissionBox
                text={modalText}
                button2="Төлөх"
                // onClick={onSubmit}
            />
        );
    };

    return (
        <div className="p-5 my-col-20">
            <div className="my-col-15">
                <div className="font-medium">Захиалга</div>
                <CartItems
                    items={data ? data.orders : null}
                    totalAmount={totalAmount}
                    setTotalAmount={setTotalAmount}
                    taxAmount={taxAmount}
                    setTaxAmount={setTaxAmount}
                    grandTotal={grandTotal}
                    setGrandTotal={setGrandTotal}
                    setDiscountAmount={setDiscountAmount}
                    setData={setData}
                    loading={loading}
                    setLoading={setLoading}
                />
            </div>

            <form
                onSubmit={
                    (setValue("address", addressRef.current?.value),
                    setValue(
                        "comment",
                        commentRef.current?.value === undefined
                            ? ""
                            : commentRef.current?.value
                    ),
                    setValue(
                        "register",
                        registerRef.current?.value === undefined
                            ? ""
                            : registerRef.current?.value
                    ),
                    setValue("orders", data ? data.orders : null),
                    handleSubmit(onSubmitHandler))
                }
                className="w-full"
            >
                <div className="mb-3 my-col-15">
                    <div className="font-medium">Захиалгын хэлбэр</div>
                    <DeliveryType
                        setDeliveryType={setDeliveryType}
                        setValue={setValue}
                    />
                    <p className="mt-1 text-xs italic text-left text-red-500 ">
                        {errors.type?.message}
                    </p>
                </div>

                {deliveryType === "Delivery" && (
                    <div className="mb-3 my-col-15">
                        <div className="font-medium">Хүргэлтийн хаяг</div>
                        <DeliveryAddress
                            ref={addressRef}
                            selectedFloor={selectedFloor}
                            setSelectedFloor={setSelectedFloor}
                            errors={errors}
                            setValue={setValue}
                        />
                    </div>
                )}

                <div className="mb-3 my-col-15">
                    <div className="font-medium">Захиалга авах хугацаа</div>
                    <DeliveryTime
                        times={dummyTimes}
                        selectedTime={selectedTime}
                        setSelectedTime={setSelectedTime}
                        setValue={setValue}
                    />

                    <p className="mt-1 text-xs italic text-left text-red-500 ">
                        {errors.type?.message}
                    </p>
                </div>

                <div className="mb-3 my-col-15">
                    <div className="font-medium">Нэмэлт мэдээлэл</div>
                    <input
                        ref={commentRef}
                        type="text"
                        placeholder="Нэмэлт тайлбар оруулах"
                        className="bg-white text-sm font-light rounded-md px-5 py-[9px]"
                    />

                    <p className="mt-1 text-xs italic text-left text-red-500 ">
                        {errors.comment?.message}
                    </p>
                </div>
                <div className="my-col-15">
                    <div className="font-medium">eBarimt</div>
                    <Vat setVat={setVat} setValue={setValue} />
                    <p className="mt-1 text-xs italic text-left text-red-500 ">
                        {errors.vat?.message}
                    </p>

                    {vat == 3 && (
                        <div className="w-full mb-3">
                            <input
                                ref={registerRef}
                                type="text"
                                className="-mt-[5px] rounded-md w-full bg-white font-light text-sm px-5 py-[9px] text-gray"
                                placeholder="Байгууллагын РД"
                            />
                            <p className="mt-1 text-xs italic text-left text-red-500 ">
                                {errors.register?.message}
                            </p>
                        </div>
                    )}
                </div>
                {/* <div onClick={onOrderClick}> */}
                <ButtonComponent text="Захиалах" type="submit" />
                {/* </div> */}
            </form>
        </div>
    );
};

export default Cart;
