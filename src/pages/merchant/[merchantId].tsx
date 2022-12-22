import GreadientMerchantCard from "components/merchant/gradient-merchant-card";
import ProductCard from "components/product/product-card";
import FloatButton from "components/cart/float-button";
import CategoryTab from "components/category/tab";
import CenteredSpin from "components/common/centered-spin";
import { useAppState } from "lib/context/app";
import { dummyProducts } from "lib/types/dummy-data";
import { Merchant } from "lib/types/office.type";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Accordion } from "react-accessible-accordion";

export default function MerchantProductPage() {
    const router = useRouter();
    const merchantId = router.query.merchantId;
    const [state]: any = useAppState();
    const { merchants } = state;
    const [merchant, setMerchant] = useState<Merchant>();
    const merchantProductCategory = [
        { title: "Онцлох" },
        { title: "Хуурга" },
        { title: "Шөл" },
        { title: "Ланч сэт" },
        { title: "Нэмэлт" },
    ];
    const [activeCategory, setActiveCategory] = useState<string>(
        merchantProductCategory[0].title
    );
    useEffect(() => {
        const merchant = merchants?.find(
            (merchant: Merchant) => merchant._id === merchantId
        );
        setMerchant(merchant);
    }, []);

    return (
        <>
            {merchant && (
                <div className="h-[calc(100vh-50px)] w-full overflow-hidden p-5 my-col-20">
                    <GreadientMerchantCard page={true} merchant={merchant!} />
                    <div className="-mx-5">
                        <CategoryTab
                            activeTab={activeCategory}
                            setActiveTab={setActiveCategory}
                            tabs={merchantProductCategory}
                            merchant={true}
                        />
                    </div>
                    <div className="relative w-full h-full overflow-y-scroll scrollbar-hide  -my-5 py-5">
                        <Accordion allowZeroExpanded className="my-col-10">
                            {dummyProducts?.map((product) => {
                                return (
                                    <ProductCard
                                        product={product}
                                        key={product.title}
                                        page={true}
                                    />
                                );
                            })}
                        </Accordion>
                    </div>
                </div>
            )}
            <FloatButton />
        </>
    );
}
