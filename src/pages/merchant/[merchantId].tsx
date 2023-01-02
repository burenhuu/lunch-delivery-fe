import GreadientMerchantCard from "components/merchant/gradient-merchant-card";
import ProductCard from "components/product/product-card";
import FloatButton from "components/cart/float-button";
import CategoryTab from "components/category/tab";
import CenteredSpin from "components/common/centered-spin";
import { useAppState } from "lib/context/app";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Accordion } from "react-accessible-accordion";
import TokiAPI from "lib/api/toki";
import { Merchant, MerchantMenu } from "lib/types/merchant.type";
import { CardDataType, Product } from "lib/types/product.type";
import { CategoryType } from "lib/types/category.type";

export default function MerchantProductPage() {
    const router = useRouter();
    const [state]: any = useAppState();
    const { merchants } = state;
    const merchantId = state.merchantId || router.query.merchantId;
    const [loading, setLoading] = useState<boolean>(false);
    const [merchantProductCategory, setMerchantProductCategory] = useState<
        CategoryType[]
    >([]);

    const [activeCategory, setActiveCategory] = useState<string>("");
    const [merchantMenu, setMerchantMenu] = useState<MerchantMenu>();
    const [cardData, setCardData] = useState<CardDataType[]>([]);
    const [merchant, setMerchant] = useState<Merchant>();

    const renderCard = async () => {
        const temp: CardDataType[] = [];
        setLoading(true);
        merchantMenu?.categories?.map((category: CategoryType) => {
            if (category.id === activeCategory) {
                category?.products?.map((product: Product) => {
                    temp.push({
                        place: merchant?.name!,
                        merchantId,
                        product: product,
                    });
                });
            } else {
                category.children?.map((child: CategoryType) => {
                    if (child.id === activeCategory) {
                        child?.products?.map((product: Product) => {
                            temp.push({
                                place: merchant?.name!,
                                product: product,
                                merchantId,
                            });
                        });
                    }
                });
            }
        });
        setCardData(temp);
        setLoading(false);
    };

    useEffect(() => {
        const getMerchantMenu = async () => {
            setLoading(true);
            const tempMerch = merchants?.find(
                (merchant: Merchant) => merchant.id === merchantId
            );
            setMerchant(tempMerch);

            const { data } = await TokiAPI.getMerchantMenu(merchantId);

            if (data) {
                setMerchantMenu(data);
                const { categories } = data;
                const tempCat: CategoryType[] = [];
                categories?.map((category: CategoryType) => {
                    tempCat.push(category);
                    category?.children?.map((children: CategoryType) => {
                        tempCat.push(children);
                    });
                });
                setActiveCategory(tempCat[0].id);
                setMerchantProductCategory(tempCat);
                setLoading(false);
            }
        };

        if (merchantId) {
            getMerchantMenu();
        }
    }, []);

    useEffect(() => {
        renderCard();
    }, [activeCategory]);

    return loading ? (
        <CenteredSpin />
    ) : (
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
                            {cardData?.map((item: CardDataType) => {
                                return (
                                    <ProductCard
                                        data={item}
                                        key={item.place}
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
