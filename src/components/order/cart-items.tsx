import {useAppState} from "lib/context/app";
import {Add, HomeIcon, Remove} from "components/icons";
import {formatPrice} from "lib/utils/helpers";
import TokiAPI from "lib/api/toki";


const CartItemComponent = (props: { items: any; itemIncDecHandler: any; loading: any; deliveryType: any }) => {
    const {items, itemIncDecHandler, loading, deliveryType} = props
    return (
        <>
            {items?.map((place: any) => {
                return (
                    <div
                        key={place.merchant.id}
                        className="p-[15px] my-col-10 bg-white rounded-2xl"
                    >
                        <div className="flex items-center">
                            <div className="text-[#647382] text-sm truncate text-ellipsis">
                                {place.merchant.name}
                            </div>
                        </div>
                        {place.items.map((product: any, index: any) => {
                            return (
                                <div
                                    key={product.id}
                                    className={`flex justify-between ${place.items.length === index+1 ? "" : "border-b border-dashed border-solid pb-5 border-[#B3BFC6]"}`}
                                >
                                    <div className="overflow-hidden grow-1 w-full rounded-2xl">
                                        <div className="flex items-center justify-between">
                                            <img src={product.image}
                                                 className={"w-[56px] h-[56px] object-cover rounded-[10px] mr-2"}/>
                                            <div className="w-[167px] max-w-[167px] py-[10px]">
                                                <div className="flex justify-between">
                                                    <div className="truncate max-w-[132px] text-[14px] text-[#1E2335]">
                                                        {product.name}
                                                    </div>

                                                </div>


                                                <div className="flex font-light truncate text-gray max-w-[197px] text-[12px]">
                                                    {product.variantName !== product.name && <>{product.variantName}, </>}
                                                    {product.options &&
                                                    Object.keys(product.options)
                                                        .length > 0 ? (
                                                        product.options.map(
                                                            (
                                                                option: any,
                                                                index: number
                                                            ) => {
                                                                return (
                                                                    <div
                                                                        key={
                                                                            option.id
                                                                        }
                                                                    >
                                                                        {option.value ? `${option.name} ${option.value}` : `${option.name}`}
                                                                        {
                                                                            index + 1 == Object.keys(product.options).length ? "" : ", "
                                                                        }
                                                                        {index + 1 == Object.keys(product.options).length &&
                                                                        product.comment
                                                                            ? ` (${product.comment})`
                                                                            : null}
                                                                        </div>
                                                                );
                                                            }
                                                        )
                                                    ) : product.comment ? (
                                                        <div className="font-light truncate text-gray line-clamp-1">
                                                            {`(${product.comment})`}
                                                        </div>
                                                    ) : null}
                                                </div>
                                            </div>
                                            <div>
                                                <div className={"text-right mb-[5px]"}>
                                                    {formatPrice(
                                                        product.quantity *
                                                        product.price
                                                    )}{" "}
                                                    ₮
                                                </div>
                                                <div
                                                    className="w-[77px] flex items-center justify-between">
                                                    <button
                                                        className="cursor-pointer"
                                                        onClick={() =>
                                                            itemIncDecHandler(
                                                                place.id,
                                                                product.id,
                                                                product.quantity,
                                                                "decremment"
                                                            )
                                                        }
                                                        disabled={loading}
                                                    >
                                                        <Remove
                                                            disabled={
                                                                loading
                                                            }
                                                        />
                                                    </button>
                                                    {product.quantity}
                                                    <button
                                                        className="cursor-pointer"
                                                        onClick={() =>
                                                            itemIncDecHandler(
                                                                place.id,
                                                                product.id,
                                                                product.quantity,
                                                                "increment"
                                                            )
                                                        }
                                                        disabled={loading}
                                                    >
                                                        <Add
                                                            disabled={
                                                                loading
                                                            }
                                                        />
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>


                                </div>
                            );
                        })}
                        <div className="font-light truncate text-gray text-[12px]">
                            {
                                place.charges.map((obj: any)=>{
                                    if (obj.name === "Савны мөнгө" && obj.amount > 0){
                                        return(
                                            <div className="flex justify-between">
                                                <div  className={"text-[#647382] text-[12px]"}>
                                                    Хоолны савны хураамж
                                                </div>
                                                <div className={"text-[#37384A] text-[14px] font-normal"}>
                                                    {formatPrice(
                                                        obj.amount
                                                    )}{" "}
                                                    ₮
                                                </div>
                                            </div>
                                        )
                                    }
                                })
                            }
                        </div>
                    </div>
                );
            })}
        </>
    )
}

export function CartItems({
                              items,
                              totalAmount,
                              setTotalAmount,
                              taxAmount,
                              setTaxAmount,
                              grandTotal,
                              setGrandTotal,
                              discountAmount,
                              setDiscountAmount,
                              setData,
                              loading,
                              setLoading,
                              deliveryType,
                              setisDeliveryClosed,
                              setValue,
                              setDeliveryType,
                              packageAmount
                          }: any) {
    const [state, dispatch]: any = useAppState();

    const itemIncDecHandler = async (
        orderId: any,
        id: any,
        quantity: any,
        type: any
    ) => {
        const productData = {
            orderId: orderId,
            itemId: id,
            quantity: type == "increment" ? quantity + 1 : quantity - 1,
        };

        setLoading(true);

        try {
            const {data} = await TokiAPI.updateCard(productData);

            setData(data);
            data.totalAmount && setTotalAmount(data.totalAmount);
            data.taxAmount && setTaxAmount(data.taxAmount);
            data.grandTotal && setGrandTotal(data.grandTotal);
            data.discountAmount
                ? setDiscountAmount(data.discountAmount)
                : setDiscountAmount(0);
            data.totalItems &&
            dispatch({type: "cartCount", cartCount: data.totalItems});
            let orderType = "Delivery"
            let check = false
            data.orders.forEach((order: any) => {
                if (order.type === "TakeAway") {
                    check = true
                    setisDeliveryClosed(true)
                    setValue("type", "TakeAway")
                    setValue("floor", 1)
                    orderType = "TakeAway"
                    return
                }
            })
            if (!check) {
                setisDeliveryClosed(false)
            }
            setDeliveryType(orderType)
        } finally {
            setLoading(false);
        }
    };

    return (
        <>


            <div className="my-col-20">
                {items && items.length > 0 ? (
                    <>
                        <CartItemComponent items={items} itemIncDecHandler={itemIncDecHandler} loading={loading}
                                           deliveryType={deliveryType}/>
                        {/*<div className="my-col-20">*/}
                        {/*    {items.map((place: any) => {*/}
                        {/*        return (*/}
                        {/*            <div*/}
                        {/*                key={place.merchant.id}*/}
                        {/*                className="pb-5 border-b border-dashed my-col-10 border-gray last:border-solid"*/}
                        {/*            >*/}
                        {/*                <div className="flex items-center gap-x-2.5">*/}
                        {/*                    <HomeIcon/>*/}
                        {/*                    <div className="font-medium truncate text-ellipsis">*/}
                        {/*                        {place.merchant.name}*/}
                        {/*                    </div>*/}
                        {/*                </div>*/}

                        {/*                {place.items.map((product: any) => {*/}
                        {/*                    return (*/}
                        {/*                        <div*/}
                        {/*                            key={product.id}*/}
                        {/*                            className="flex justify-between"*/}
                        {/*                        >*/}
                        {/*                            <div className="overflow-hidden grow-1 my-col-5">*/}
                        {/*                                <div className="truncate ">*/}
                        {/*                                    {product.name}*/}

                        {/*                                </div>*/}
                        {/*                                <div className="w-full font-light truncate text-gray">*/}
                        {/*                                    {product.variantName !== product.name && <>{product.variantName}</>}*/}
                        {/*                                </div>*/}

                        {/*                                {product.options &&*/}
                        {/*                                Object.keys(product.options)*/}
                        {/*                                    .length > 0 ? (*/}
                        {/*                                    product.options.map(*/}
                        {/*                                        (*/}
                        {/*                                            option: any,*/}
                        {/*                                            index: number*/}
                        {/*                                        ) => {*/}
                        {/*                                            return (*/}
                        {/*                                                <div*/}
                        {/*                                                    className="w-full font-light truncate text-gray "*/}
                        {/*                                                    key={*/}
                        {/*                                                        option.id*/}
                        {/*                                                    }*/}
                        {/*                                                >*/}
                        {/*                                                    {*/}
                        {/*                                                        option.name*/}
                        {/*                                                    }*/}
                        {/*                                                    {option.value &&*/}
                        {/*                                                        " " +*/}
                        {/*                                                        option.value}*/}
                        {/*                                                    {index +*/}
                        {/*                                                    1 ==*/}
                        {/*                                                    Object.keys(*/}
                        {/*                                                        product.options*/}
                        {/*                                                    )*/}
                        {/*                                                        .length &&*/}
                        {/*                                                    product.comment*/}
                        {/*                                                        ? ` (${product.comment})`*/}
                        {/*                                                        : null}*/}
                        {/*                                                </div>*/}
                        {/*                                            );*/}
                        {/*                                        }*/}
                        {/*                                    )*/}
                        {/*                                ) : product.comment ? (*/}
                        {/*                                    <div className="font-light truncate text-gray line-clamp-1">*/}
                        {/*                                        {`(${product.comment})`}*/}
                        {/*                                    </div>*/}
                        {/*                                ) : null}*/}
                        {/*                            </div>*/}

                        {/*                            <div className="flex flex-col grow-0 items-end gap-y-1.25">*/}
                        {/*                                <div>*/}
                        {/*                                    {formatPrice(*/}
                        {/*                                        product.quantity **/}
                        {/*                                        product.price*/}
                        {/*                                    )}{" "}*/}
                        {/*                                    ₮*/}
                        {/*                                </div>*/}

                        {/*                                <div*/}
                        {/*                                    className="flex bg-[#F5F5FA] rounded-md px-0.5 py-[1px] text-sm font-light gap-x-2.5">*/}
                        {/*                                    <button*/}
                        {/*                                        className="cursor-pointer"*/}
                        {/*                                        onClick={() =>*/}
                        {/*                                            itemIncDecHandler(*/}
                        {/*                                                place.id,*/}
                        {/*                                                product.id,*/}
                        {/*                                                product.quantity,*/}
                        {/*                                                "decremment"*/}
                        {/*                                            )*/}
                        {/*                                        }*/}
                        {/*                                        disabled={loading}*/}
                        {/*                                    >*/}
                        {/*                                        <Remove*/}
                        {/*                                            disabled={*/}
                        {/*                                                loading*/}
                        {/*                                            }*/}
                        {/*                                        />*/}
                        {/*                                    </button>*/}

                        {/*                                    {product.quantity}*/}

                        {/*                                    <button*/}
                        {/*                                        className="cursor-pointer"*/}
                        {/*                                        onClick={() =>*/}
                        {/*                                            itemIncDecHandler(*/}
                        {/*                                                place.id,*/}
                        {/*                                                product.id,*/}
                        {/*                                                product.quantity,*/}
                        {/*                                                "increment"*/}
                        {/*                                            )*/}
                        {/*                                        }*/}
                        {/*                                        disabled={loading}*/}
                        {/*                                    >*/}
                        {/*                                        <Add*/}
                        {/*                                            disabled={*/}
                        {/*                                                loading*/}
                        {/*                                            }*/}
                        {/*                                        />*/}
                        {/*                                    </button>*/}
                        {/*                                </div>*/}
                        {/*                            </div>*/}
                        {/*                        </div>*/}
                        {/*                    );*/}
                        {/*                })}*/}
                        {/*                {*/}
                        {/*                    place.charges.map((charge: any) => {*/}
                        {/*                        if (charge.amount > 0) {*/}
                        {/*                            if (charge.name === "Хүргэлт" && deliveryType !== "Delivery") {*/}
                        {/*                                return (*/}
                        {/*                                    <>*/}
                        {/*                                    </>*/}
                        {/*                                )*/}
                        {/*                            } else {*/}
                        {/*                                return (*/}
                        {/*                                    <div className="flex justify-between" key={charge.id}>*/}
                        {/*                                        <div className="overflow-hidden grow-1 my-col-5">*/}
                        {/*                                            <div className="truncate ">*/}
                        {/*                                                {charge.name}*/}
                        {/*                                            </div>*/}
                        {/*                                        </div>*/}
                        {/*                                        <div*/}
                        {/*                                            className="flex flex-col grow-0 items-end gap-y-1.25">*/}
                        {/*                                            <div>*/}
                        {/*                                                {formatPrice(*/}
                        {/*                                                    charge.amount*/}
                        {/*                                                )}{" "}*/}
                        {/*                                                ₮*/}
                        {/*                                            </div>*/}
                        {/*                                        </div>*/}
                        {/*                                    </div>*/}
                        {/*                                )*/}
                        {/*                            }*/}

                        {/*                        }*/}
                        {/*                    })*/}
                        {/*                }*/}
                        {/*            </div>*/}
                        {/*        );*/}
                        {/*    })}*/}
                        {/*</div>*/}

                        <div className="flex items-center justify-between">
                            <div className="my-col-10">
                                <div>Захиалгын дүн:</div>
                                {deliveryType == "Delivery" ? (
                                    <>
                                        <div>Хүргэлт <span className="text-[#647382]">(2 хоол тутамд 1’000 ₮)</span></div>
                                        {
                                            (packageAmount && packageAmount) !== 0 && (
                                                <div>Савны мөнгө:</div>
                                            )
                                        }
                                    </>
                                ) : null}
                                {discountAmount ? <div>Урамшуулал:</div> : null}
                                <div className="font-medium">Нийт төлөх:</div>
                            </div>

                            <div className="flex flex-col items-end gap-y-2.5">
                                <div>{formatPrice(totalAmount)} ₮</div>
                                {deliveryType == "Delivery" ? (
                                    <>
                                        <div>{formatPrice(taxAmount)} ₮</div>
                                        {
                                            (packageAmount && packageAmount) !== 0 && (
                                                <div>{formatPrice(packageAmount)} ₮</div>
                                            )
                                        }
                                    </>
                                ) : null}
                                {discountAmount ? (
                                    <div>-{formatPrice(discountAmount)} ₮</div>
                                ) : null}
                                {deliveryType == "Delivery" ? (
                                    <div className="font-medium">
                                        {formatPrice(grandTotal)} ₮
                                    </div>
                                ) : (
                                    <div className="font-medium">
                                        {formatPrice(grandTotal - taxAmount)} ₮
                                    </div>
                                )}
                            </div>
                        </div>
                    </>
                ) : (
                    "Сагс хоосон байна"
                )}
            </div>
        </>

    );
}
