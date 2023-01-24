import ButtonComponent from "components/common/button";
import { ImageModal } from "components/common/image-modal";
import { ArrowDown, EditIcon } from "components/icons";
import TokiAPI from "lib/api/toki";
import { useAppState } from "lib/context/app";
import { useModal } from "lib/context/modal";
import { CartData } from "lib/types/cart.type";
import { CardDataType, Option, Variant } from "lib/types/product.type";

import { formatPrice } from "lib/utils/helpers";
import { useContext, useEffect, useRef, useState } from "react";
import {
    AccordionItem,
    AccordionItemHeading,
    AccordionItemButton,
    AccordionItemPanel,
    AccordionItemState,
} from "react-accessible-accordion";
import { FatalError } from "next/dist/lib/fatal-error";
import { useRouter } from "next/router";
import { cartAnimation } from "../../lib/utils/cart-animation";
import {PermissionBox} from "../common/permission-box";
import {Merchant} from "../../lib/types/merchant.type";

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
export default function ProductCard({
    merchantData,
    data,
    page = false,
    checkActiveProduct,
}: {
    merchantData?: Merchant;
    data: CardDataType;
    page?: boolean;
    checkActiveProduct?: any;
}) {
    const [state, dispatch]: any = useAppState();
    const { officeId, cartCount } = state;
    const [isOpen, setOpen] = useState<boolean>(false);
    const { rating, place, product, merchantId, placeState, placeReason, placeStartDate, placeEndDate, dayIsActive } = data;
    const { description, image, name, variants } = product;
    const [applicableOptions, setApplicableOptions] = useState<Option[]>(
        variants[0] ? variants[0].options : []
    );
    const [applicableOptionsTypeV, setApplicableOptionsTypeV] = useState<
        Option[]
    >(variants[0] ? variants[0].options : []);
    const [selectedOptions, setSelectedOptions] = useState<
        { id: string; value: string }[]
    >([]);
    const [selectedVariant, setSelectedVariant] = useState<Variant>(
        variants[0]
    );
    const [presalePrice, setPresalePrice] = useState(0);
    const [price, setPrice] = useState(0);
    const [comment, setComment] = useState("");
    const router = useRouter();

    useEffect(() => {
        if (checkActiveProduct !== undefined) {
            if (checkActiveProduct === product.variants[0]?.id) {
                setOpen(true);
            }
        }
    }, []);

    useEffect(() => {
        setPresalePrice(
            product.variants && product.variants[0]
                ? product.variants[0].price
                : 0
        );
        setPrice(
            product.variants && product.variants[0]
                ? product.variants[0].price
                : 0
        );
        let optionTypeA: Option[] = [];
        let optionTypeV: Option[] = [];
        variants[0]?.options.map((option) => {
            if (option.type === "A") {
                optionTypeA.push(option);
            } else {
                optionTypeV.push(option);
            }
        });
        setApplicableOptions(variants[0] ? optionTypeA : []);
        setApplicableOptionsTypeV(variants[0] ? optionTypeV : []);
        setSelectedVariant(variants[0]);
    }, [product]);

    const [show, setShow, content, setContent] = useModal();

    const onMerchantClick = () => {
        if (placeState === "CLOSED") {
            let text: string
            setShow(true);
            if (dayIsActive){
                text = ` Зоогийн газар хаалттай байна. <br>
                            Та бусад зоогийн газраас сонголтоо хийнэ үү <br>
                            Ажиллах цагийн хуваарь: <br>
                            <b>
                              ${placeStartDate} - ${placeEndDate}
                            </b>`
            } else {
                text = ` Зоогийн газар хаалттай байна. <br>
                            Та бусад зоогийн газраас сонголтоо хийнэ үү <br>
                            Ажиллах цагийн хуваарь: <br>
                            <b>
                              Амарна
                            </b>`
            }
            setContent(
                <PermissionBox
                    text={text}
                    button2={<>Үргэлжлүүлэх</>}
                    onClick={() => {
                        setShow(false);
                        onContinueClick();
                    }}
                />
            );
        } else if (placeState === "TEMPORARY_CLOSED") {
            setShow(true);
            setContent(
                <PermissionBox
                    text={` Зоогийн газар дотоод ажилтай байгаа тул <br>
                    захиалга авахгүй <br>
                    <b>
                        Нээх цаг: ${placeReason}
                    </b>`}
                />
            );
        } else if (placeState === "preDelivery") {
            let text: string
            setShow(true);
            if (dayIsActive){
                text = `Уг хоолны газрын нээх цаг болоогүй<br>байгаа тул та зөвхөн урьдчилсан<br>захиалга хийх боломжтой`
            } else {
                text = ` Зоогийн газар хаалттай байна. <br>
                            Та бусад зоогийн газраас сонголтоо хийнэ үү <br>
                            Ажиллах цагийн хуваарь: <br>
                            <b>
                              Амарна
                            </b>`
            }
            setContent(
                <PermissionBox
                    text={text}
                    button2={<>Үргэлжлүүлэх</>}
                    onClick={() => {
                        setShow(false);
                        onContinueClick();
                    }}
                />
            );
        } else {
            onContinueClick();
        }
    };

    const onContinueClick = () => {
        dispatch({
            type: "merchantId",
            merchantId: merchantId,
        });
        dispatch({
            type: "merchantName",
            merchantName: place,
        });

        if (!page) {
            router.push(`/merchant/${merchantId}`);
        } else {
            router.push(`/merchant/details/${merchantId}`);
        }
    };

    const onAddClick = async (e: any) => {
        const productData: CartData = {
            type: merchantData?.cartState ? merchantData.cartState : "Delivery",
            merchant: merchantId,
            office: officeId,
            variantId: selectedVariant.id,
            quantity: 1,
            comment: comment,
            options: [...selectedOptions],
        };
        try {
            const { data } = await TokiAPI.addCart(productData);
            cartAnimation(e)
            dispatch({
                type: "cartCount",
                cartCount: data.totalItems,
            });
        } catch (err) {
        } finally {
        }
    };

    const onImageClick = () => {
        setShow(true);
        setContent(<ImageModal images={[image]} />);
    };

    // useEffect(() => {
    //     const tempOption: Option[] = [];
    //     const tempSelectedOption: any[] = [];
    //     variants?.map((variant) => {
    //         variant.options?.map((option) => {
    //             if (
    //                 !tempOption.find(
    //                     (item: Option) => item.name === option.name
    //                 )
    //             ) {
    //                 tempSelectedOption.push({
    //                     id: option.id,
    //                     value: option.values[0],
    //                 });
    //                 tempOption.push(option);
    //             }
    //         });
    //     });

    //     setSelectedOptions(tempSelectedOption);
    //     setApplicableOptions(tempOption);
    // }, []);

    const onSelectOption = (option: Option, value: string) => {
        let check = false;
        let options: any = [];
        selectedOptions.map((selectedOption) => {
            console.log(selectedOption);
            if (selectedOption?.id === option.id) {
                selectedOption.value = value;
                check = true;
                options.push({
                    id: option.id,
                    value: value,
                });
            } else if (selectedOption?.value === null) {
                options.push({
                    id: selectedOption.id,
                    value: null,
                });
            } else if (selectedOption?.id !== option.id) {
                options.push(selectedOption);
            }
        });
        if (!check) {
            options.push({
                id: option.id,
                value: value,
            });
            setPrice(Number(option.price) + Number(price));
            setPresalePrice(Number(option.price) + Number(presalePrice));
        }
        setSelectedOptions(options);
    };

    const onSelectOptionTypeV = (option: Option) => {
        let tempSelectedOptions: any = selectedOptions;
        let check = false;
        let check_index = 0;
        let options = tempSelectedOptions.map(
            (tempSelectedOption: any, index: number) => {
                if (tempSelectedOption?.id === option.id) {
                    check = true;
                    check_index = index;
                }
                return tempSelectedOption;
            }
        );
        if (check) {
            options.splice(check_index, 1);
            setPrice(Number(price) - Number(option.price));
            setPresalePrice(Number(presalePrice) - Number(option.price));
        } else {
            options.push({
                id: option.id,
                value: null,
            });
            setPrice(Number(option.price) + Number(price));
            setPresalePrice(Number(option.price) + Number(presalePrice));
        }

        setSelectedOptions(options);
    };

    const onSelectVariant = (variant: Variant) => {
        setPrice(variant.price);
        setPresalePrice(variant.salePrice);
        setSelectedVariant(variant);
        setApplicableOptions(variant.options);
        setSelectedOptions([]);
    };
    return (
        data && (
            <AccordionItem
                className="overflow-hidden bg-white rounded-2xl shadow-delivery product-cart"
                uuid={product.variants[0]?.id}
            >
                <AccordionItemHeading>
                    <AccordionItemState>
                        {({ expanded }) => {
                            setOpen(expanded!);
                            return null;
                        }}
                    </AccordionItemState>

                    <AccordionItemButton className="flex justify-start gap-x-3.75 ">
                        <div className="relative min-w-[120px] max-w-[120px] min-h-[120px]">
                            {product.active ? (
                                <>
                                    <img
                                        onClick={onImageClick}
                                        src={image}
                                        className={
                                            "w-full h-[120px] rounded-2xl product-image"
                                        }
                                        alt={place}
                                    />
                                    {!page && (
                                        <div className="absolute top-0 left-0 w-full h-9 bg-gradient-to-b from-main/75 text-xs text-white to-main/0 rounded-t-2xl p-2.5">
                                            👍 {rating}%
                                        </div>
                                    )}
                                </>
                            ) : (
                                <>
                                    <img
                                        onClick={onImageClick}
                                        src={image}
                                        className={
                                            "w-full h-full rounded-2xl opacity-50"
                                        }
                                        alt={place}
                                    />
                                    {!page && (
                                        <div className="absolute top-0 left-0 w-full h-9 bg-gradient-to-b from-main/75 text-xs text-white to-main/0 rounded-t-2xl p-2.5">
                                            👍 {rating}%
                                        </div>
                                    )}
                                    <div className="absolute text-base font-medium text-white -translate-x-1/2 -translate-y-1/2 text-shadow top-1/2 left-1/2">
                                        Дууссан
                                    </div>
                                </>
                            )}
                        </div>
                        <div className="py-3.75 pr-5 flex justify-between w-full">
                            <div
                                className={
                                    "flex flex-col items-start " +
                                    (page
                                        ? "justify-center gap-y-1.25"
                                        : "justify-between")
                                }
                            >
                                <div className="flex flex-col gap-y-1.5">
                                    {!page && (
                                        <div
                                            className="font-medium"
                                            onClick={onMerchantClick}
                                        >
                                            {place}
                                        </div>
                                    )}
                                    <div
                                        className={
                                            page
                                                ? "font-medium text-sm"
                                                : "text-xs "
                                        }
                                    >
                                        {name}
                                    </div>
                                </div>
                                <div className="flex items-center gap-x-1">
                                    {formatPrice(price) !== formatPrice(presalePrice) ? (
                                        <>
                                            <div className="text-xs font-light line-through text-gray">
                                                {formatPrice(presalePrice)}₮
                                            </div>
                                            <div className="text-sm">
                                                {formatPrice(price)}₮
                                            </div>
                                        </>
                                    ) : (
                                        <div className="text-sm">
                                            {formatPrice(price)}₮
                                        </div>
                                    )}
                                </div>
                            </div>
                            <div
                                className={
                                    "self-center transition ease-in-out duration-300 " +
                                    (isOpen && "rotate-180")
                                }
                            >
                                <ArrowDown />
                            </div>
                        </div>
                    </AccordionItemButton>
                </AccordionItemHeading>
                <AccordionItemPanel>
                    <div className="pt-2.5 px-5 pb-5 my-col-10 text-sm">
                        <div className="my-col-5">
                            <div>Орц:</div>
                            <div className="text-xs font-light text-gray">
                                {description}
                            </div>
                        </div>
                        <>
                            {product.active && (placeState === "OPEN" || placeState === "preDelivery") && (
                                <>
                                    {
                                        variants.length === 1 ?
                                            <></>
                                            :
                                            <div className="my-col-5">
                                                <div>Порц:</div>
                                                <div className="flex gap-x-1.25">
                                                    {variants.map(
                                                        (variant: Variant) => {
                                                            return (
                                                                <div
                                                                    onClick={() =>
                                                                        onSelectVariant(
                                                                            variant
                                                                        )
                                                                    }
                                                                    key={variant.id}
                                                                    className={
                                                                        "py-2.5 rounded-md w-[75px] text-center relative " +
                                                                        (selectedVariant ===
                                                                            variant
                                                                            ? "gradient-border text-main"
                                                                            : "border border-gray text-gray")
                                                                    }
                                                                >
                                                                    {variant.name}
                                                                </div>
                                                            );
                                                        }
                                                    )}
                                                </div>
                                            </div>
                                    }

                                    {applicableOptionsTypeV.length > 0 && (
                                        <>
                                            <div className="my-col-5">
                                                <div>Хачир:</div>
                                                <div className="flex gap-x-1.25">
                                                    {applicableOptionsTypeV?.map(
                                                        (option: Option) => {
                                                            return (
                                                                <div
                                                                    onClick={() =>
                                                                        onSelectOptionTypeV(
                                                                            option
                                                                        )
                                                                    }
                                                                    key={
                                                                        option.id
                                                                    }
                                                                    className={
                                                                        "py-2.5 px-1 rounded-md w-[75px] text-center relative " +
                                                                        (selectedOptions.find(
                                                                            (
                                                                                item
                                                                            ) =>
                                                                                item?.id ===
                                                                                option.id
                                                                        )
                                                                            ? "gradient-border text-main"
                                                                            : "border border-gray text-gray")
                                                                    }
                                                                >
                                                                    {
                                                                        option.name
                                                                    }
                                                                </div>
                                                            );
                                                        }
                                                    )}
                                                </div>
                                            </div>
                                        </>
                                    )}
                                    {applicableOptions.map((option: Option) => {
                                        const { id, name, values } = option;

                                        return (
                                            <>
                                                {values?.length > 0 && (
                                                    <div
                                                        key={id}
                                                        className="my-col-5"
                                                    >
                                                        <div>{name}</div>
                                                        <div className="flex gap-x-1.25">
                                                            {values?.map(
                                                                (
                                                                    value: string
                                                                ) => {
                                                                    return (
                                                                        <div
                                                                            onClick={() =>
                                                                                onSelectOption(
                                                                                    option,
                                                                                    value
                                                                                )
                                                                            }
                                                                            key={
                                                                                value
                                                                            }
                                                                            className={
                                                                                "py-2.5 rounded-md w-[75px] text-center relative " +
                                                                                (selectedOptions.find(
                                                                                    (
                                                                                        item
                                                                                    ) =>
                                                                                        item?.id ===
                                                                                        option.id &&
                                                                                        item?.value ===
                                                                                        value
                                                                                )
                                                                                    ? "gradient-border text-main"
                                                                                    : "border border-gray text-gray")
                                                                            }
                                                                        >
                                                                            {
                                                                                value
                                                                            }
                                                                        </div>
                                                                    );
                                                                }
                                                            )}
                                                        </div>
                                                    </div>
                                                )}
                                            </>
                                        );
                                    })}
                                    {product.withNote && (
                                        <div className="my-col-5">
                                            <div>Нэмэлт тайлбар:</div>
                                            <div className="relative">
                                                <input
                                                    onChange={(e) => {
                                                        setComment(
                                                            e.target.value
                                                        );
                                                    }}
                                                    type="text"
                                                    placeholder="Нэмэлт тайлбар оруулах"
                                                    className="bg-[#F5F5FA] rounded-md w-full  py-[7px] pl-10 pr-5 placeholder:text-gray placeholder:font-light"
                                                />
                                                <div className="absolute left-2.5 top-1.5">
                                                    <EditIcon />
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                    <div
                                        onClick={onAddClick}
                                        className="pt-2.5"
                                    >
                                        <ButtonComponent text="Сагсанд нэмэх" onClick={(e: any) => (addToCartEvent = e)} />
                                    </div>
                                </>
                            )}
                        </>
                    </div>
                </AccordionItemPanel>
            </AccordionItem>
        )
    );
}
