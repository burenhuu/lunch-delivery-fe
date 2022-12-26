import ProductCard from "components/product/product-card";
import FloatButton from "components/cart/float-button";
import CategoryProduct from "components/category/product-list";
import ProductTab from "components/category/product-tab";
import CategoryTab from "components/category/tab";
import { Oops } from "components/icons";
import { useAppState } from "lib/context/app";
import { dummyProducts, productFilters } from "lib/types/dummy-data";
import { Merchant } from "lib/types/office.type";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Accordion } from "react-accessible-accordion";
import {
    CardDataType,
    Product,
    Variant,
} from "lib/types/merchant-product.type";
import CenteredSpin from "components/common/centered-spin";
import TokiAPI from "lib/api/toki";

export default function Category() {
    const router = useRouter();
    const [state, dispatch]: any = useAppState();
    const { merchants, products, categories, categoryId, officeId } = state;
    const [activeTab, setActiveTab] = useState<string>(categoryId as string);
    const [productTab, setProductTab] = useState<string>(productFilters[0]);
    const [loading, setLoading] = useState<boolean>(false);
    const [selectedProducts, setSelectedProducts] =
        useState<Product[]>(products);
    const [cardData, setCardData] = useState<CardDataType[]>([]);

    useEffect(() => {
        const filterByCategories = async () => {
            setLoading(true);
            try {
                const { data } = await TokiAPI.getProductsByOffice(
                    officeId,
                    "category",
                    activeTab
                );
                if (data) {
                    const productArray: Product[] = [];
                    await data.map((product: Product) => {
                        if (!productArray.includes(product)) {
                            productArray.push(product);
                        }
                    });
                    setSelectedProducts(productArray);
                    dispatch({ type: "products", products: data });
                }
            } finally {
                setLoading(false);
            }
        };
        filterByCategories();
    }, [activeTab]);

    useEffect(() => {
        const renderCard = async () => {
            const temp: CardDataType[] = [];
            setLoading(true);
            await products?.map((merchant: Merchant) =>
                merchant?.products?.map((product: Product) =>
                    product?.variants?.map((variant: Variant) => {
                        temp.push({
                            image: product.image,
                            place: merchant.name,
                            rating: merchant.rating,
                            specification: product.specification,
                            ...variant,
                        });
                    })
                )
            );
            setCardData(temp);
            setLoading(false);
        };
        renderCard();
    }, [products]);

    return loading ? (
        <CenteredSpin />
    ) : (
        <>
            <div className="my-col-10 w-full h-[calc(100vh-50px)] overflow-hidden">
                <div className="bg-white rounded-2.5xl shadow-delivery my-col-20 py-5">
                    <CategoryTab
                        tabs={categories}
                        activeTab={activeTab}
                        setActiveTab={setActiveTab}
                    />
                    <CategoryProduct products={selectedProducts} />
                </div>
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
                            {cardData.map((item: CardDataType) => {
                                return (
                                    <ProductCard key={item.id} data={item} />
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
