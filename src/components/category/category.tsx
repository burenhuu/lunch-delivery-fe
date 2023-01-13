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
import {useRouter} from "next/router";

export function CategoryComponent(props: { setLoading: any, productTab: any }) {
    const [state, dispatch]: any = useAppState();
    const router = useRouter();
    const { setLoading } = props;
    const { categories, categoryId, officeId } = state;
    const [swiperLength, setSwiperLength] = useState(1);
    const [onFirstLoad, setOnFirstLoad] = useState(true)
    const checkActiveCategory = router.query.productCategory ? router.query.productCategory : ""
    const [activeTab, setActiveTab] = useState<string>(categoryId as string);
    const [childrenCategories, setChildrenCategories] = useState<
        CategoryType[]
    >(categories[0]?.chidren || []);
    const [selectedChildren, setSelectedChildren] = useState<string>(
        childrenCategories ? childrenCategories[0]?.id : ""
    );

    const onProductClick = (id: string) => {
        setSelectedChildren(id);
    };

    useEffect(()=>{
        if (checkActiveCategory){
            categories.map((category: any)=>{
                category.children.map((sub_category:any)=>{
                    if(sub_category.id === checkActiveCategory){
                        setActiveTab(category.id)
                    }
                })
            })
        }
    },[])

    useEffect(() => {
        const filterByCategories = async () => {
            setLoading(true);
            try {
                const { data } = await TokiAPI.getProductsByOffice(
                    officeId,
                    "category",
                    selectedChildren,
                    props.productTab.sort
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
        const filterByCategories = async () => {
            setLoading(true);
            try {
                const { data } = await TokiAPI.getProductsByOffice(
                    officeId,
                    "category",
                    selectedChildren,
                    props.productTab.sort
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
    }, [props.productTab]);

    useEffect(() => {
        if (activeTab === "Бүгд") {
            const temp: CategoryType[] = [];
            categories?.map(async (category: CategoryType) => {
                const {children} = category;
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
        if (childrenCategories && checkActiveCategory && onFirstLoad) {
            console.log("123---------------")
            setSwiperLength(Math.ceil(childrenCategories?.length / 10));
            setSelectedChildren(typeof checkActiveCategory === 'string' ? checkActiveCategory : "")
        } else{
            console.log("123---------------456")
            setSwiperLength(Math.ceil(childrenCategories?.length / 10));
            setSelectedChildren(childrenCategories ? childrenCategories[0]?.id : "");
        }
    }, [childrenCategories]);

    return (
        <div className="bg-white rounded-2.5xl shadow-delivery my-col-20 py-5">
            <CategoryTab
                tabs={categories}
                activeTab={activeTab}
                setActiveTab={setActiveTab}
                setOnFirstLoad={setOnFirstLoad}
            />
            <Swiper
                modules={[Pagination]}
                pagination={{ clickable: true }}
                slidesPerView={1}
                className={"w-full " + (swiperLength > 1 ? "my-col-15" : "")}
                autoplay={false}
            >
                {[...Array(swiperLength ? swiperLength : 1)]?.map((n: any, index: number) => {
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
