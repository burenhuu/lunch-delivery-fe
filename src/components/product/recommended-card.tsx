import { useRouter } from "next/router";
import { useState } from "react";

import SmallButton from "components/common/small-button";
import { Option, Recommended } from "lib/types/merchant-menu-category.type";
import { toast, formatPrice } from "lib/utils/helpers";
import { useAppState } from "lib/context/app";
import TokiAPI from "lib/api/toki";

interface RecommendedCardProps {
    merchantId: string;
    recommended: Recommended;
}

const RecommendedCard: React.FC<RecommendedCardProps> = ({
    merchantId,
    recommended,
}) => {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [state, dispatch]: any = useAppState();

    const addToCart = async (variantId: string) => {
        const productData = {
            merchant_id: merchantId,
            office_id: state.officeId,
            variant_id: variantId,
            qty: 1,
        };

        setLoading(true);

        try {
            const { data } = await TokiAPI.addToCart(productData);

            if (data.status_code === 0) {
                dispatch({
                    type: "cartCount",
                    cartCount: data.data.total_qty,
                });
                dispatch({ type: "cartPrice", cartPrice: data.data.total });
                router.push(
                    `/cart/${merchantId}?tokenid=${router.query.tokenid}`
                );
            } else {
                toast(data.message);
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <a
            className="flex flex-col bg-white rounded-[15px] cursor-pointer"
            onClick={() => {
                if (recommended.button_type === "order") {
                    dispatch({
                        type: "categoryId",
                        categoryId: recommended.category_id,
                    });
                    addToCart(recommended.variant.id);
                } else {
                    dispatch({
                        type: "categoryId",
                        categoryId: recommended.category_id,
                    });
                    router.push(
                        `/product-list/${merchantId}/${recommended.category_id}?tokenid=${router.query.tokenid}&productId=${recommended.product_id}`
                    );
                }
            }}
        >
            <div className="flex justify-center w-full">
                <img
                    src={recommended.product_image}
                    alt={recommended.product_name}
                    className="product-image object-cover w-[105px] mb-2 rounded-t-[15px] h-[105px]"
                />
            </div>
            <div className="flex flex-col  justify-between h-full w-[105px] p-3 pt-0 overflow-hidden">
                <div>
                    <p className="mb-1 text-xs font-normal truncate text-slate-700 shrink-0">
                        {recommended.product_name}
                    </p>
                    <div className="mb-2 ">
                        {recommended.button_type === "order" ? (
                            recommended.variant &&
                            recommended.variant.options &&
                            recommended.variant.options.map(
                                (option: Option, index: number) => (
                                    <p
                                        key={index}
                                        className="mb-1 text-xs font-light text-slate-500 text-ellipsis"
                                    >
                                        {option.name} : {option.value}
                                    </p>
                                )
                            )
                        ) : (
                            <p className="mb-1 text-[10px] font-light break-normal text-slate-500">
                                {recommended.presale_price !==
                                    recommended.price && (
                                    <span className="mr-2 line-through">
                                        {formatPrice(recommended.presale_price)}{" "}
                                        ₮
                                    </span>
                                )}
                                {formatPrice(recommended.price)} ₮
                            </p>
                        )}
                    </div>
                </div>

                <SmallButton
                    isFull={true}
                    loading={loading}
                    text={`${
                        recommended.button_type === "order"
                            ? "Захиалах"
                            : "Сагслах"
                    }`}
                />
            </div>
        </a>
    );
};

export default RecommendedCard;
