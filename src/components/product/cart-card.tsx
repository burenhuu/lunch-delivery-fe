import { useState } from "react";

import { Item } from "lib/types/cart.type";
import { formatPrice, calcTimeDiff } from "lib/utils/helpers";
import TokiAPI from "lib/api/toki";
import { useAppState } from "lib/context/app";

interface OrderCardProps {
    item: Item;
    orderId: string;
    setLoadingEstimate: any;
    setPrepareEstimate: any;
    setDeliveryEstimate: any;
}

const CartCard: React.FC<OrderCardProps> = ({
    item,
    orderId,
    setLoadingEstimate,
    setPrepareEstimate,
    setDeliveryEstimate,
}) => {
    const [loading, setLoading] = useState(false);
    const [state, dispatch]: any = useAppState();
    const [itemQty, setItemQty] = useState(item.qty);

    const fetchEstimateData = async () => {
        setLoadingEstimate(true);

        try {
            const { data } = await TokiAPI.refreshEstimate(orderId);

            if (data.status_code === 0) {
                setPrepareEstimate(
                    calcTimeDiff("", data.data.prepare_estimate, false)
                );
                setDeliveryEstimate(
                    calcTimeDiff("", data.data.delivery_estimate, false)
                );
            } else {
                toast(data.message);
            }
        } finally {
            setLoadingEstimate(false);
        }
    };

    const itemIncrement = async () => {
        const productData = {
            order_id: orderId,
            variant_id: item.product_variant._id,
        };

        setLoading(true);

        try {
            const { data } = await TokiAPI.orderCurrentIncrement(productData);

            if (data?.status_code === 0) {
                dispatch({ type: "cartCount", cartCount: data.data.total_qty });
                dispatch({ type: "cartPrice", cartPrice: data.data.total });
                setItemQty(itemQty + 1);
            } else {
                toast(data?.message);
            }
        } finally {
            setLoading(false);
        }
    };

    const itemDecrement = async () => {
        const productData = {
            order_id: orderId,
            variant_id: item.product_variant._id,
        };

        setLoading(true);

        try {
            const { data } = await TokiAPI.orderCurrentDecrement(productData);

            if (data?.status_code === 0) {
                dispatch({ type: "cartCount", cartCount: data.data.total_qty });
                dispatch({ type: "cartPrice", cartPrice: data.data.total });
                setItemQty(itemQty - 1);
            } else {
                toast(data?.message);
            }
        } finally {
            setLoading(false);
        }
    };

    return itemQty > 0 ? (
        <div className="flex items-center py-[15px]">
            <div className="flex-initial w-[50px] h-[50px]  shrink-0">
                <img
                    src={item.product.image}
                    alt={item.product.name}
                    className="object-cover w-full h-full rounded-2xl"
                />
            </div>
            <div className="flex flex-col flex-grow ml-5 ">
                <div className="flex justify-between flex-grow">
                    <span className="break-all text-md text-slate-700">
                        {item.product.name}
                    </span>
                    <span className="text-right text-md text-slate-700 shrink-0">
                        {formatPrice(item.price)} ₮
                    </span>
                </div>

                <div className="flex justify-between flex-grow">
                    <span className="text-sm font-light text-right break-normal text-[#647382] flex">
                        {item.product_variant.options &&
                            item.product_variant.options.map(
                                (option: any, index: number) => (
                                    <span
                                        key={index}
                                        className="mr-2 leading-loose "
                                    >
                                        {index > 0 && " / "} {option.value}
                                    </span>
                                )
                            )}
                    </span>

                    <div className="flex shrink-0">
                        <button
                            className="cursor-pointer "
                            onClick={() => (
                                itemDecrement(), fetchEstimateData()
                            )}
                            disabled={loading}
                        >
                            <span className="flex items-center justify-center text-[24px] text-center icon-Remove-1 ">
                                <span className="path1"></span>
                                <span className="path2"></span>
                                <span className="path3"></span>
                            </span>
                        </button>

                        <div className="mx-2 leading-loose">{itemQty}</div>

                        <button
                            className="cursor-pointer"
                            onClick={() => (
                                itemIncrement(), fetchEstimateData()
                            )}
                            disabled={loading}
                        >
                            <span className="flex items-center justify-center text-[24px] text-center icon-Add-1">
                                <span className="path1"></span>
                                <span className="path3"></span>
                                <span className="path4"></span>
                            </span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    ) : null;
};

export default CartCard;
