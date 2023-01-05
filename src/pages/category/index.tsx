import ProductCard from "components/product/product-card";
import FloatButton from "components/cart/float-button";
import { Oops } from "components/icons";
import { useAppState } from "lib/context/app";

import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Accordion } from "react-accessible-accordion";

import CenteredSpin from "components/common/centered-spin";
import TokiAPI from "lib/api/toki";
import { CategoryComponent } from "components/category/category";
import ProductTab from "components/category/product-tab";
import { CardDataType, Product } from "lib/types/product.type";
import { Merchant } from "lib/types/merchant.type";

export const productFilters = [
    {
        'sort': 'rating',
        'name': "Үнэлгээ"
    }, {
        'sort': 'price',
        'name': "Үнэ"
    }, {
        'sort': 'delivery',
        'name': "Хүргэлт"
    }, {
        'sort': 'bonus',
        'name': "Урамшуулал"
    }
];

export default function Category() {
    const router = useRouter();
    const [state, dispatch]: any = useAppState();
    const { merchants, products, categories, categoryId, officeId } = state;
    const [productTab, setProductTab] = useState<any>(productFilters[0]);
    const [loading, setLoading] = useState<boolean>(false);
    const [cardData, setCardData] = useState<CardDataType[]>();

    useEffect(() => {
        const renderCard = async () => {
            const temp: CardDataType[] = [];
            setLoading(true);
            await products?.map((merchant: Merchant) =>
                merchant?.products?.map((product: Product) =>
                    temp.push({
                        place: merchant.name,
                        merchantId: merchant.id,
                        rating: merchant.rating,
                        product: product,
                    })
                )
            );
            setCardData(temp);
            setLoading(false);
        };
        renderCard();
    }, [products]);

    return !products ? (
        <CenteredSpin />
    ) : (
        <>
            <div className="my-col-10 w-full h-[calc(100vh-50px)] overflow-hidden">
                <CategoryComponent setLoading={setLoading} productTab={productTab} />
                <ProductTab
                    activeTab={productTab}
                    setActiveTab={setProductTab}
                />
                <div className="relative w-full h-full overflow-y-scroll scrollbar-hide py-5 -mt-2.5">
                    {products.length > 0 ? (
                        <Accordion
                            // allowMultipleExpanded
                            allowZeroExpanded
                            className="my-col-10 px-5"
                        >
                            {cardData?.map((item: CardDataType) => {
                                return (
                                    <ProductCard key={item.place} data={item} />
                                );
                            })}
                        </Accordion>
                    ) : productTab === "Урамшуулал" ? (
                        <div className="absolute items-center text-center left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 my-col-20">
                            <Oops />
                            <div className="font-light">
                                Урамшуулалтай газар байхгүй байна
                            </div>
                        </div>
                    ) : (
                        <div className="absolute items-center text-center left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 my-col-20">
                            <Oops />
                            <div className="font-light">Хоосон байна</div>
                        </div>
                    )}
                </div>
            </div>
            {<FloatButton />}
        </>
    );
}
