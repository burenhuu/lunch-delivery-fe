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
import { useState } from "react";
import { Accordion } from "react-accessible-accordion";

export default function Category() {
    const router = useRouter();
    const [state, dispatch]: any = useAppState();
    const { categoryId } = router.query;
    const [activeTab, setActiveTab] = useState<string>(categoryId as string);
    const [productTab, setProductTab] = useState<string>(productFilters[0]);
    const { merchants, products, categories } = state;

    return (
        <>
            <div className="my-col-10 w-full h-[calc(100vh-50px)] overflow-hidden">
                <div className="bg-white rounded-2.5xl shadow-delivery my-col-20 py-5">
                    <CategoryTab
                        tabs={categories}
                        activeTab={activeTab}
                        setActiveTab={setActiveTab}
                    />

                    <CategoryProduct />
                </div>
                <ProductTab
                    activeTab={productTab}
                    setActiveTab={setProductTab}
                />
                <div className="relative w-full h-full overflow-y-scroll scrollbar-hide py-5 -mt-2.5">
                    {dummyProducts ? (
                        <Accordion
                            // allowMultipleExpanded
                            allowZeroExpanded
                            className="my-col-10 px-5"
                        >
                            {dummyProducts?.map((product) => {
                                return (
                                    <ProductCard
                                        key={product.title}
                                        product={product}
                                    />
                                );
                            })}
                        </Accordion>
                    ) : (
                        <div className="absolute items-center text-center left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 my-col-20">
                            <Oops />
                            <div className="font-light">
                                Урамшуулалтай газар байхгүй байна
                            </div>
                        </div>
                    )}
                </div>
            </div>
            {<FloatButton />}
        </>
    );
}
