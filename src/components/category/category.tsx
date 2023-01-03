import { useAppState } from "lib/context/app";
import CategoryTab from "./tab";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper";
import "swiper/css";
import "swiper/css/pagination";
import { useEffect, useState } from "react";
import CategoryCard from "components/product-category/card";
import TokiAPI from "lib/api/toki";
import { CategoryType } from "lib/types/category.type";

export function CategoryComponent({ setLoading }: { setLoading: any }) {
    const [state, dispatch]: any = useAppState();
    const { categories, categoryId, officeId } = state;
    const swiperLength = Math.ceil(categories?.length / 10);
    const [activeTab, setActiveTab] = useState<string>(categoryId as string);
    const [childrenCategories, setChildrenCategories] = useState<
        CategoryType[]
    >(categories[0].chidren || []);
    const [selectedChildren, setSelectedChildren] = useState<string>(
        childrenCategories ? childrenCategories[0]?.id : ""
    );

    const onProductClick = (id: string) => {
        setSelectedChildren(id);
    };

    useEffect(() => {
        const filterByCategories = async () => {
            setLoading(true);
            try {
                const { data } = await TokiAPI.getProductsByOffice(
                    officeId,
                    "category",
                    selectedChildren
                );
                if (data) {
                    dispatch({ type: "products", products: data });
                }
            } finally {
                setLoading(false);
            }
        };
        if (selectedChildren) {
            filterByCategories();
        }
    }, [selectedChildren]);

    useEffect(() => {
        if (activeTab === "Бүгд") {
            const temp: CategoryType[] = [];
            categories?.map(async (category: CategoryType) => {
                const { children } = category;
                if (children) {
                    children?.map((child) => {
                        temp.push(child);
                    });
                }
            });
            setChildrenCategories(temp);
        } else {
            const found = categories.find(
                (category: CategoryType) => category.id === activeTab
            );
            setChildrenCategories(found?.children);
        }
    }, [activeTab]);

    useEffect(() => {
        if (childrenCategories[0]) {
            setSelectedChildren(childrenCategories[0]?.id);
        }
    }, [childrenCategories]);

    return (
        <div className="bg-white rounded-2.5xl shadow-delivery my-col-20 py-5">
            <CategoryTab
                tabs={categories}
                activeTab={activeTab}
                setActiveTab={setActiveTab}
            />
            <Swiper
                modules={[Pagination]}
                pagination={{ clickable: true }}
                slidesPerView={1}
                className={"w-full " + (swiperLength > 1 ? "my-col-15" : "")}
                autoplay={false}
            >
                {[...Array(swiperLength)]?.map((n: any, index: number) => {
                    return (
                        <SwiperSlide
                            key={n}
                            className="grid grid-cols-5 gap-y-2.5 px-5 gap-x-3.75"
                        >
                            {childrenCategories
                                ?.slice(index * 10, (index + 1) * 10)
                                .map((category: CategoryType) => {
                                    return (
                                        <div
                                            key={category.name}
                                            onClick={() =>
                                                onProductClick(category.id)
                                            }
                                        >
                                            <CategoryCard
                                                category={category}
                                                key={category.id}
                                                small={true}
                                                active={
                                                    category.id ===
                                                    selectedChildren
                                                        ? true
                                                        : false
                                                }
                                            />
                                        </div>
                                    );
                                })}
                        </SwiperSlide>
                    );
                })}
            </Swiper>
        </div>
    );
}
