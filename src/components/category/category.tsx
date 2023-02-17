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

    );

    const filterByCategories = async (selectedId: string) => {
        setLoading(true);
        try {
            const { data } = await TokiAPI.getProductsByOffice(
                officeId,
                "category",
                selectedId,
                props.productTab.sort
            );
            if (data) {
                await dispatch({ type: "products", products: data });
            }
        } finally {
            setLoading(false);
        }
    };

    const getAllProducts = async () => {
        setLoading(true);
        try {
            const { data } = await TokiAPI.getProductsByOffice(
                officeId,
            );
            if (data) {
                await dispatch({ type: "products", products: data });
            }
        } finally {
            setLoading(false);
        }
    };

    const getAllProductsWithFilter = async (sort: string) => {

        setLoading(true);
        try {
            const { data } = await TokiAPI.getProductsByOffice(
                officeId,
                'sort',
                sort
            );
            if (data) {
                await dispatch({ type: "products", products: data });
            }
        } finally {
            setLoading(false);
        }
    };


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
        if (selectedChildren) {
            filterByCategories(selectedChildren);
        } else {
            if (activeTab === "Бүгд"){
                getAllProductsWithFilter(props.productTab['sort'])
            } else {
                filterByCategories(activeTab);
            }
        }
    }, [selectedChildren, props.productTab]);

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
            getAllProducts()
            setChildrenCategories(temp);
        } else {
            const found = categories.find(
                (category: CategoryType) => category.id === activeTab
            );
            filterByCategories(activeTab);
            setChildrenCategories(found?.children);
        }
        setSelectedChildren('')
    }, [activeTab]);

    useEffect(() => {
        if (childrenCategories && checkActiveCategory && onFirstLoad) {
            setSwiperLength(Math.ceil(childrenCategories?.length / 10));
        } else{
            setSwiperLength(Math.ceil(childrenCategories?.length / 10));
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
