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
    const merchantId = typeof router.query.merchantId === "string" ? router.query.merchantId : "";
    const [loading, setLoading] = useState<boolean>(false);
    const [merchantProductCategory, setMerchantProductCategory] = useState<
        CategoryType[]
        >([]);
    const checkActiveCategory = router.query.categoryId ? router.query.categoryId : null
    const checkActiveProduct = router.query.productId ? router.query.productId : null
    const [activeCategory, setActiveCategory] = useState<string>("");
    const [merchantMenu, setMerchantMenu] = useState<MerchantMenu>();
    const [cardData, setCardData] = useState<CardDataType[]>([]);
    const [merchant, setMerchant] = useState<Merchant>();
    const [accordionKey, setAccordionKey] = useState<any>(123);

    useEffect(() => {
        let number = Math.random()
        setAccordionKey(number)
    }, [activeCategory])

    const renderCard = async () => {
        let temp: CardDataType[] = [];
        setLoading(true);
        merchantMenu?.categories?.map((category: CategoryType) => {
            if (category.id === activeCategory) {
                category?.products?.map((product: Product) => {
                    let check = false
                    product.variants.map((variant)=>{
                        if(variant.id === checkActiveProduct){
                            check = true;
                        }
                    })
                    if (check){
                        temp = [{
                            place: merchant?.name!,
                            merchantId,
                            product: product,
                            placeState: merchant?.state,
                            merchant: merchant
                        }, ... temp]
                    } else{
                        temp.push({
                            place: merchant?.name!,
                            merchantId,
                            product: product,
                            placeState: merchant?.state,
                            merchant: merchant
                        });
                    }
                });
                console.log(temp)

            } else {
                category.children?.map((child: CategoryType) => {
                    if (child.id === activeCategory) {
                        child?.products?.map((product: Product) => {
                            temp.push({
                                place: merchant?.name!,
                                product: product,
                                merchantId,
                                placeState: merchant?.state,
                                merchant: merchant
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
        console.log(merchantId)
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
                        category.products?.concat(children.products ? children.products : []);
                    });
                });
                if (checkActiveCategory !== null) {
                    let categories = state.categories
                    categories.map((category: any) => {
                        category.children.map((sub_category: any) => {
                            if (checkActiveCategory === sub_category.id) {
                                console.log("TRUE EXISTS", category.id)
                                setActiveCategory(category.id)
                            }
                        })
                    })
                } else {
                    setActiveCategory(tempCat[0]?.id);
                }
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
                            setOnFirstLoad={undefined}
                        />
                    </div>
                    <div className="relative w-full h-full py-5 -my-5 overflow-y-scroll scrollbar-hide">
                        <Accordion allowZeroExpanded className="my-col-10" key={accordionKey} preExpanded={[typeof checkActiveProduct === 'string' ? checkActiveProduct : cardData[0]?.product?.variants[0]?.id]}>
                            {cardData?.map((item: CardDataType) => {
                                return (
                                    <ProductCard
                                        merchantData={merchant}
                                        data={item}
                                        key={item.product.name}
                                        page={true}
                                        checkActiveProduct={checkActiveProduct}
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
