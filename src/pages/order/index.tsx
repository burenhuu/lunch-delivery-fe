import type { NextPage } from "next";
import { useEffect, useState } from "react";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "next/router";

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
import CenteredSpin from "components/common/centered-spin";
import useSWR from "swr";

const Cart: NextPage = () => {
    const router = useRouter();
    const [state]: any = useAppState();
    const { officeName } = state;
    const [deliveryType, setDeliveryType] = useState<string>("Delivery");
    const [vat, setVat] = useState<any>(1);
    const [selectedFloor, setSelectedFloor] = useState<string>("Давхар");
    const [selectedTime, setSelectedTime] = useState<string>("");
    const [show, setShow, content, setContent] = useModal();
    const [loading, setLoading] = useState(false);
    const [totalAmount, setTotalAmount] = useState<any>(0);
    const [taxAmount, setTaxAmount] = useState<any>(0);
    const [grandTotal, setGrandTotal] = useState<any>(0);
    const [discountAmount, setDiscountAmount] = useState<any>(0);
    const [data, setData] = useState<any>(null);
    const [isDeliveryClosed, setisDeliveryClosed] = useState(false);

    const fetchDatas = async () => {
        setLoading(true);
        try {
            const { data } = await TokiAPI.getCart();
            setData(data);
            data.totalAmount && setTotalAmount(data.totalAmount);
            data.taxAmount && setTaxAmount(data.taxAmount);
            data.grandTotal && setGrandTotal(data.grandTotal);
            data.discountAmount && setDiscountAmount(data.discountAmount);
            await data.orders.forEach((order: any)=>{
                if (order.type === "TakeAway"){
                    setisDeliveryClosed(true)
                    setValue("type", "TakeAway")
                    setValue("floor", 1)
                    setDeliveryType("TakeAway")
                    return
                }
            })
        } finally {
            setLoading(false);
        }
    };

    const fetchLastOrder = async () => {
        setLoading(true);
        try {
            const { data } = await TokiAPI.lastCompletedOrderWithOffice(
                state.officeId
            );
            if (data && data[0]) {
                if (isDeliveryClosed){
                    data[0].type &&
                    (setDeliveryType("TakeAway"),
                        setValue("type", "TakeAway"));
                } else {
                    data[0].type &&
                    (setDeliveryType(data[0].type),
                        setValue("type", data[0].type));
                }

                data[0].floor &&
                (setValue("floor", data[0].floor),
                    setSelectedFloor(data[0].floor));
                data[0].address && setValue("address", data[0].address);
                data[0].comment && setValue("comment", data[0].comment);
                data[0].vat &&
                (setValue("vat", data[0].vat), setVat(data[0].vat));
                data[0].register &&
                setValue("register", data[0].register);
            }
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (state.officeId) {
            fetchDatas();
            fetchLastOrder();
        }
    }, [state.officeId]);

    useEffect(()=>{
        fetchLastOrder();
    }, [isDeliveryClosed])

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
        register: yup.string().when("vat", {
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
        getValues,
    } = useForm({
        defaultValues:
            deliveryType === "Delivery"
                ? {
                      type: "Delivery",
                      address: "",
                      floor: 0,
                      comment: "",
                      vat: 1,
                      register: "",
                      time: "",
                  }
                : {
                      type: "Delivery",
                      comment: "",
                      vat: 1,
                      register: "",
                      time: "",
                  },
        resolver: yupResolver(validationSchema),
    });


    const modalText =
        deliveryType === "Delivery" ? (
            <>
                {loading && <CenteredSpin />}
                Та <span className="font-medium break-words">{officeName}</span>
                -н{" "}
                {getValues("address") ? (
                    <>
                        <span className="font-medium break-words">
                            {`${selectedFloor} давхар, ${getValues("address")}`}
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
                цуцлах болон өөрчлөх боломжгүйг анхаарна уу.
            </>
        ) : (
            <>
                {loading && <CenteredSpin />}
                Та <span className="font-medium break-words">{officeName}</span>
                -с <span className="font-medium">{selectedTime}</span> цагт очиж
                авахаар захиалга өгөх гэж байна. Төлбөр төлсний дараа захиалгыг
                цуцлах болон өөрчлөх боломжгүйг анхаарна уу.
            </>
        );

    const onSubmitHandler = async (values: any) => {
        setShow(true);

        setContent(
            <PermissionBox
                text={modalText}
                button2="Төлөх"
                onClick={async () => {
                    setLoading(true);
                    values["office"] = state.officeId;

                    try {
                        const placeOrderResponse = await TokiAPI.checkout(
                            values
                        );
                        if (placeOrderResponse?.status == 200) {
                            Toki.buy(
                                "6077c7514a70c11568436528",
                                placeOrderResponse.data.grandTotal,
                                placeOrderResponse.data.orderId,
                                `Hool_zahialah | ${localStorage.getItem(
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
                                    router.push(
                                        `/order-history?tokenid=${router.query.tokenid}&paymentStatusCode=200`
                                    );
                                },
                                `${process.env.NEXT_PUBLIC_ENTRYPOINT}/v1/cart/paid`
                            );
                        } else {
                            toast("Уучлаарай, Таны захиалга амжилтгүй боллоо");
                        }
                    } finally {
                        setLoading(false);
                        setShow(false);
                    }
                }}
                loading={loading}
                textHtml={false}
            />
        );
    };

    // if (loading) return <CenteredSpin />;

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
                    discountAmount={discountAmount}
                    setDiscountAmount={setDiscountAmount}
                    setData={setData}
                    loading={loading}
                    setLoading={setLoading}
                    deliveryType={deliveryType}
                    setisDeliveryClosed={setisDeliveryClosed}
                    setValue={setValue}
                    setDeliveryType={setDeliveryType}
                />
            </div>

            <form onSubmit={handleSubmit(onSubmitHandler)} className="w-full">
                <div className="mb-5 my-col-15">
                    <div className="font-medium">Захиалгын хэлбэр</div>
                    {
                        !isDeliveryClosed ?
                        <>
                            <DeliveryType
                                setDeliveryType={setDeliveryType}
                                setValue={setValue}
                                isDeliveryClosed={isDeliveryClosed}
                            />
                            {errors.type && (
                                <p className="mt-1 text-xs italic text-left text-red-500 ">
                                    {errors.type?.message}
                                </p>
                            )}
                        </>
                            :
                            <>
                                <label
                                    className="flex items-center gap-x-2.5 relative"
                                    htmlFor="TakeAway"
                                >
                                    <input
                                        defaultChecked={isDeliveryClosed}
                                        type="radio"
                                        name="typeofdelivery"
                                        id="TakeAway"
                                        value="TakeAway"
                                    />
                                    <div className="checkmark"></div>
                                    <div>Очиж авах</div>
                                </label>
                            </>
                    }

                </div>

                {deliveryType === "Delivery" && !isDeliveryClosed && (
                    <div className="mb-5 my-col-15">
                        <div className="font-medium">Хүргэлтийн хаяг</div>

                        <div className="grid grid-cols-3 gap-x-2.5 text-sm">
                            <DeliveryAddress
                                selectedFloor={selectedFloor}
                                setSelectedFloor={setSelectedFloor}
                                errors={errors}
                                setValue={setValue}
                            />

                            <div className="col-span-2">
                                <input
                                    type="text"
                                    className=" w-full rounded-md bg-white px-5 py-[9px] font-light"
                                    placeholder="Тоот / Байгууллагын нэр"
                                    {...register("address")}
                                />
                                {errors.address && (
                                    <p className="mt-1 text-xs italic text-left text-red-500 ">
                                        {errors.address?.message}
                                    </p>
                                )}
                            </div>
                        </div>
                    </div>
                )}

                <div className="mb-5 my-col-15">
                    <div className="font-medium">Захиалга авах хугацаа</div>
                    {
                        loading ? <></>:
                            <DeliveryTime
                                selectedTime={selectedTime}
                                deliveryType={deliveryType}
                                setSelectedTime={setSelectedTime}
                                setValue={setValue}
                                setDeliveryType={setDeliveryType}
                                isDeliveryClosed={isDeliveryClosed}
                            />

                    }

                    {errors.time && (
                        <p className="mt-1 text-xs italic text-left text-red-500 ">
                            {errors.time?.message}
                        </p>
                    )}
                </div>

                <div className="mb-5 my-col-15">
                    <div className="font-medium">Нэмэлт мэдээлэл</div>

                    <input
                        type="text"
                        placeholder="Нэмэлт тайлбар оруулах"
                        className="bg-white text-sm font-light rounded-md px-5 py-[9px]"
                        {...register("comment")}
                    />
                    {errors.comment && (
                        <p className="mt-1 text-xs italic text-left text-red-500 ">
                            {errors.comment?.message}
                        </p>
                    )}
                </div>

                <div className="mb-5 my-col-15">
                    <div className="font-medium">eBarimt</div>

                    <Vat setVat={setVat} setValue={setValue} />
                    {errors.vat && (
                        <p className="mt-1 text-xs italic text-left text-red-500 ">
                            {errors.vat?.message}
                        </p>
                    )}

                    {vat == 3 && (
                        <div>
                            <input
                                type="text"
                                className="-mt-[5px] rounded-md w-full bg-white font-light text-sm px-5 py-[9px] text-gray"
                                placeholder="Байгууллагын РД"
                                maxLength={7}
                                {...register("register")}
                            />
                            {errors.register && (
                                <p className="mt-1 text-xs italic text-left text-red-500 ">
                                    {errors.register?.message}
                                </p>
                            )}
                        </div>
                    )}
                </div>

                <div className="flex justify-center w-full">
                    <ButtonComponent
                        text="Захиалах"
                        loading={
                            loading ||
                            (data && Object.keys(data.orders).length == 0)
                                ? true
                                : false
                        }
                        additionalClass="max-w-[270px]  w-full"
                    />
                </div>
            </form>
        </div>
    );
};

export default Cart;
