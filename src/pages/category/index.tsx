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


export default function Category() {
    const router = useRouter();
    const [state, dispatch]: any = useAppState();
    const [productFilters, setProductFilters] = useState([
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
    ])
    const { merchants, products, categories, categoryId, officeId } = state;
    const [productTab, setProductTab] = useState<any>(productFilters[0]);
    const [loading, setLoading] = useState<boolean>(false);
    const [cardData, setCardData] = useState<CardDataType[]>([]);
    const [accordionKey, setAccordionKey] = useState<any>(123);

    useEffect(() => {
        let number = Math.random()
        setAccordionKey(number)
    }, [cardData])

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
                        placeState: merchant.state
                    })
                )
            );
            setCardData(temp);
            setLoading(false);
        };
        renderCard();
    }, [products]);

    console.log(cardData[0]?.product?.variants[0]?.id)

    return !products && loading ? (
        <CenteredSpin />
    ) : (
        <>
            <div className="my-col-10 w-full h-[calc(100vh-50px)] overflow-hidden">
                <CategoryComponent setLoading={setLoading} productTab={productTab} />
                <ProductTab
                    activeTab={productTab}
                    setActiveTab={setProductTab}
                    productFilters={productFilters}
                />
                <div className="relative w-full h-full overflow-y-scroll scrollbar-hide py-5 -mt-2.5">
                    {products.length > 0 ? (
                        <Accordion
                            // allowMultipleExpanded
                            key={accordionKey}
                            allowZeroExpanded
                            className="my-col-10 px-5"
                            preExpanded={[cardData[0]?.product.variants[0].id]}
                        >
                            {cardData?.map((item: CardDataType) => {
                                return (
                                    <ProductCard key={item.product.variants[0].id} data={item} />
                                );
                            })}
                        </Accordion>
                    ) : productTab.name === "Урамшуулал" ? (
                        <div className="absolute items-center text-center left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 my-col-20">
                            <Oops />
                            <div className="font-light">
                                Одоогоор урамшуулал зарласан хоолны газар байхгүй байна
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
