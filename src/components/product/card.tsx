import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { Collapse } from "react-collapse";
import { mutate } from "swr";

import SmallButton from "components/common/small-button";
import { ApplicableOption, Product } from "lib/types/merchant-product.type";
import TokiAPI from "lib/api/toki";
import { formatPrice } from "lib/utils/helpers";
import { useAppState } from "lib/context/app";
import { cartAnimation } from "lib/utils/cart-animation";
import { toast } from "react-toastify";

let addToCartEvent: any;

function findVariant(options: any, product: any) {
    let optionDict: any = {};

    options.forEach((option: any) => {
        optionDict[option.option_id.toString()] = option.value;
    });

    for (let variant of product.variants) {
        if (variant.options.length === options.length) {
            let variantMatch = true;

            for (let option of variant.options) {
                if (
                    !(option.option.toString() in optionDict) ||
                    optionDict[option.option.toString()] !== option.value
                ) {
                    variantMatch = false;
                    break;
                }
            }

            if (variantMatch) {
                return variant;
            }
        }
    }

    return null;
}

interface ProductCardProps {
    collapseId: string;
    productId: string;
    merchantId: string;
    categoryId: string;
    product: Product;
    isAlreadyOpened: boolean;
    alreadyOpened: boolean;
    toggle(productId: string): void;
}

const ProductCard: React.FC<ProductCardProps> = ({
    collapseId,
    productId,
    merchantId,
    categoryId,
    product,
    isAlreadyOpened = false,
    alreadyOpened,
    toggle,
}) => {
    const [state, dispatch]: any = useAppState();
    const { register, handleSubmit, watch } = useForm();
    const [loading, setLoading] = useState(false);
    const apiUrl = `/coffee/app/merchant/${merchantId}/product/${categoryId}/office/${state.officeId}`;
    const [presalePrice, setPresalePrice] = useState(
        product.variants && product.variants[0]
            ? product.variants[0].presale_price
            : 0
    );
    const [price, setPrice] = useState(
        product.variants && product.variants[0] ? product.variants[0].price : 0
    );

    // Callback version of watch.  It's your responsibility to unsubscribe when done.
    useEffect(() => {
        const subscription = watch((val) => {
            const productOptions = [];

            for (const [key, value] of Object.entries(val)) {
                if (key && value)
                    productOptions.push({ option_id: key, value: value });
            }
            const variant = findVariant(productOptions, product);

            if (variant) {
                setPresalePrice(variant.presale_price);
                setPrice(variant.price);
            } else {
                toast("Уучлаарай, бүтээгдэхүүн олдсонгүй.");
            }
        });

        return () => subscription.unsubscribe();
    }, [watch]); // eslint-disable-line react-hooks/exhaustive-deps

    const onSubmit = async (data: {}) => {
        const productOptions = [];

        for (const [key, value] of Object.entries(data)) {
            if (key && value)
                productOptions.push({ option_id: key, value: value });
        }

        const variant = findVariant(productOptions, product);

        if (variant) {
            const productData = {
                merchant_id: merchantId,
                office_id: state.officeId,
                variant_id: variant._id,
                qty: 1,
            };

            setLoading(true);

            try {
                const { data } = await TokiAPI.addToCart(productData);

                if (data?.status_code === 0) {
                    cartAnimation(addToCartEvent);
                    dispatch({
                        type: "cartCount",
                        cartCount: data.data.total_qty,
                    });
                    dispatch({ type: "cartPrice", cartPrice: data.data.total });
                } else {
                    toast(data?.message);
                }
            } finally {
                await mutate(apiUrl);

                setLoading(false);
            }
        } else {
            toast("Уучлаарай, бүтээгдэхүүн олдсонгүй.");
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div
                className="w-full mb-3 bg-white product-cart rounded-3xl"
                style={{ boxShadow: "5px 5px 10px 0 rgba(30, 35, 53, 0.05)" }}
            >
                <div
                    onClick={() => toggle(productId)}
                    className="cursor-pointer"
                >
                    <div className="flex items-center w-full h-full p-[15px]">
                        <div className="w-16 shrink-0">
                            <img
                                src={product.image}
                                alt={product.name}
                                className="product-image w-[50px] h-[50px] object-cover rounded-2xl"
                            />
                        </div>
                        <div className="flex-grow mx-1">
                            <p className="text-base font-normal text-slate-700">
                                {product.name}
                            </p>
                            <p className="text-base font-light break-normal text-slate-500">
                                {(presalePrice !== price ||
                                    product.presale_price !==
                                        product.price) && (
                                    <span className="mr-2 line-through">
                                        {formatPrice(
                                            presalePrice
                                                ? presalePrice
                                                : product.presale_price
                                        )}{" "}
                                        ₮
                                    </span>
                                )}
                                {formatPrice(price ? price : product.price)} ₮
                            </p>
                        </div>
                        <div className=" shrink-0">
                            {collapseId === productId ||
                            (isAlreadyOpened && alreadyOpened) ? (
                                <span
                                    className=" icon-Up-Arrow-1"
                                    style={{ color: "#647382" }}
                                />
                            ) : (
                                <span
                                    className=" icon-Arrow---Down"
                                    style={{ color: "#647382" }}
                                />
                            )}
                        </div>
                    </div>
                </div>

                <Collapse
                    isOpened={
                        collapseId === productId ||
                        (isAlreadyOpened && alreadyOpened)
                    }
                    className="border-t border-gray-300 border-dashed text-md"
                >
                    <div className="px-5">
                        <div
                            className="pb-5 pt-3  border-[#B3BFC6]  border-t-[1px]"
                            style={{ borderTopStyle: "dashed" }}
                        >
                            {product.applicable_options &&
                                product.applicable_options.map(
                                    (
                                        applicableOption: ApplicableOption,
                                        index: number
                                    ) => (
                                        <div
                                            key={product._id + index}
                                            className="mb-[5px]"
                                        >
                                            {applicableOption.option && (
                                                <p className="text-sm font-normal truncate">
                                                    {
                                                        applicableOption.option
                                                            .name
                                                    }
                                                </p>
                                            )}

                                            <div className="flex mx-3 overflow-auto scrollbar-hide">
                                                <div
                                                    key={product._id + index}
                                                    className="mt-2 mb-1"
                                                >
                                                    <ul className="flex">
                                                        {applicableOption.applicable_choices.map(
                                                            (
                                                                applicableChoice: string,
                                                                index: number
                                                            ) => (
                                                                <li
                                                                    key={
                                                                        product._id +
                                                                        index
                                                                    }
                                                                    className="px-1 mr-[20px] w-fit"
                                                                >
                                                                    <input
                                                                        className="sr-only peer"
                                                                        type="radio"
                                                                        defaultChecked={
                                                                            index ===
                                                                            0
                                                                        }
                                                                        value={
                                                                            applicableChoice
                                                                        }
                                                                        {...register(
                                                                            `${applicableOption.option._id}`
                                                                        )}
                                                                        id={`${product._id}_${applicableOption.option._id}_${applicableChoice}`}
                                                                    />
                                                                    <label
                                                                        className="flex px-3 text-sm font-normalt bg-white border border-[#a5aeb8] rounded-[10px] cursor-pointer text-[#a5aeb8]  hover:bg-gray-50 peer-checked:ring-[#1E2335]  peer-checked:text-[#1E2335] peer-checked:ring-2 peer-checked:font-md  peer-checked:border-transparent capitalize"
                                                                        htmlFor={`${product._id}_${applicableOption.option._id}_${applicableChoice}`}
                                                                    >
                                                                        {
                                                                            applicableChoice
                                                                        }
                                                                    </label>
                                                                </li>
                                                            )
                                                        )}
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                )}

                            <div className="grid w-full mt-3 justify-items-center">
                                <SmallButton
                                    onClick={(e: any) => (addToCartEvent = e)}
                                    text="Сагсанд нэмэх"
                                    type="submit"
                                    loading={loading}
                                />
                            </div>
                        </div>
                    </div>
                </Collapse>
            </div>
        </form>
    );
};

export default ProductCard;
