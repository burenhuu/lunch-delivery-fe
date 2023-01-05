import Recommended from "components/cards/recommended-card";
import GradientMerchantCard from "components/merchant/gradient-merchant-card";
import CenteredSpin from "components/common/centered-spin";
import {
    CloseButton,
    FilterIcon,
    NavigateArrow,
    Oops,
    SearchXIcon,
} from "components/icons";
import CategoryCard from "components/product-category/card";
import { useAppState } from "lib/context/app";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import TokiAPI from "lib/api/toki";
import { Product, RecommendedType } from "lib/types/product.type";
import { Merchant } from "lib/types/merchant.type";
import { CategoryType } from "lib/types/category.type";

export default function Office() {
    const [state, dispatch]: any = useAppState();
    const router = useRouter();
    const officeId = router.query.officeId;
    const [loading, setLoading] = useState<boolean>(true);
    const [searchValue, setSearchValue] = useState<string>("");
    const [debouncedValue, setDebouncedValue] = useState<string>(searchValue);
    const [searchProducts, setSearchProducts] = useState<
        Product[] & { type: string }[]
    >([]);
    const [showFilters, setShowFilters] = useState<boolean>(false);
    const [recommended, setRecommended] = useState<RecommendedType[]>([]);
    const { merchants, categories, products } = state;
    const [filterParameter, setFilterParameter] = useState<any>({});

    const filterNames = [
        "Үнэлгээгээр",
        "Үнээр",
        "Хүргэлтээр",
        "Урамшуулалтай",
        "Шинэ",
    ];
    const [activeFilter, setActiveFilter] = useState<string>(filterNames[0]);

    useEffect(() => {
        const timer = setTimeout(() => setDebouncedValue(searchValue), 1000);

        return () => clearTimeout(timer);
    }, [searchValue]);

    useEffect(() => {
        toast("Таны хаяг зөв эсэхийг шалгаарай", {
            className: "location-toast",
            position: "top-left",
            closeButton: <CloseButton />,
        });
    }, []);

    useEffect(() => {
        const getMerchants = async () => {
            setLoading(true);
            try {
                const { data } = await TokiAPI.getMerchantsByOffice(
                    officeId?.toString()!, filterParameter
                );
                if (data) {
                    await dispatch({ type: "merchants", merchants: data });
                }
            } finally {
                setLoading(false);
            }
        };

        const getCategories = async () => {
            const { data } = await TokiAPI.getCategories();
            if (data) {
                await dispatch({ type: "categories", categories: data });
            }
        };

        const getProducts = async () => {
            try {
                const { data } = await TokiAPI.getRecommendedProductsByOffice(
                    officeId?.toString()!
                );
                if (data) {
                    console.log('recommend', data)
                    const products: RecommendedType[] = [];
                    await data.map(async (item: any) => {
                        item?.products?.map((product: Product) => {
                            const chosenVariant = product?.variants[0];
                            console.log(product?.variants[0], 'chosenVariant')
                            if (chosenVariant) {
                                products.push({
                                    ...chosenVariant,
                                    place: item.name,
                                    placeId: item.id,
                                    image: product.image,
                                    rating: item.rating,
                                });
                            }
                        });
                    });
                    setRecommended(products);
                    // await dispatch({ type: "products", products: data });
                }
            } finally {
                setLoading(false);
            }
        };
        if (officeId) {
            getMerchants();
            getCategories();
            getProducts();
        }
    }, [officeId]);

    useEffect(() => {
        const onSearch = async () => {
            if (officeId) {
                const temp: Merchant[] & Product[] & { type: string }[] = [];
                const { data } = await TokiAPI.getProductsByOffice(
                    officeId?.toString(),
                    "keyword",
                    debouncedValue
                );
                merchants?.map((merchant: Merchant) => {
                    if (
                        merchant.name
                            .toLowerCase()
                            .includes(debouncedValue.toLowerCase())
                    ) {
                        temp.push({ type: "merchant", ...merchant });
                    }
                });
                if (data) {
                    await data.map((merchant: Merchant) => {
                        merchant?.products?.map((product: Product) => {
                            if (
                                !temp.find((item) => item.name === product.name)
                            ) {
                                temp.push({ type: "product", ...product });
                            }
                        });
                    });
                    setSearchProducts(temp);
                }
            }
        };
        if (debouncedValue !== "") {
            onSearch();
        }
    }, [debouncedValue]);

    const onSearchClick = (result: any) => {
        if (result?.type === "merchant") {
            router.push(`/merchant/${result.id}`);
        } else {
            router.push("/category");
        }
    };

    return loading ? (
        <CenteredSpin />
    ) : (
        <>
            <div className="p-5 my-col-20 relative">
                {/* Search Input  */}
                <>
                    <input
                        onChange={(event) => setSearchValue(event.target.value)}
                        type="text"
                        autoComplete="off"
                        value={searchValue}
                        className="bg-white caret-[#FF7A1F] font-light relative rounded-md py-[9px] px-8  placeholder:font-light placeholder:text-sm text-sm"
                        placeholder="Хайх"
                    />
                    <div className="absolute left-[30px] icon-Search---Light-icon-2 top-[28px]"></div>
                    {searchValue?.length > 0 && (
                        <div
                            onClick={() => setSearchValue("")}
                            className="absolute right-5 top-5"
                        >
                            <SearchXIcon />
                        </div>
                    )}
                </>
                {searchValue !== "" ? (
                    searchProducts?.length > 0 ? (
                        <div className="bg-white max-h-[calc(100vh-199px)] overflow-scroll scrollbar-hide rounded-md pt-3.75 px-5 text-sm font-light -mt-2.5 my-col-15">
                            {searchProducts?.map((product) => {
                                return (
                                    <div
                                        onClick={() => onSearchClick(product)}
                                        key={product.name}
                                        className="flex items-center justify-between pb-3.75 border-b border-main border-dashed last:border-none "
                                    >
                                        <div>{product?.name}</div>
                                        <NavigateArrow />
                                    </div>
                                );
                            })}
                        </div>
                    ) : (
                        <>
                            <div className="fixed top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 my-col-20 items-center">
                                <Oops />
                                <div className="font-light text-center">
                                    Хайлтад тохирох илэрц олдсонгүй
                                </div>
                            </div>
                        </>
                    )
                ) : (
                    <>
                        {categories?.length > 0 ? (
                            <div className="grid grid-cols-4 items-stretch text-center gap-3.75">
                                {categories?.map((category: CategoryType) => {
                                    return (
                                        <CategoryCard
                                            category={category}
                                            key={category.id}
                                        />
                                    );
                                })}
                            </div>
                        ) : null}
                        <div>
                            <div className="flex justify-between pb-[15px] items-center">
                                <div className="font-medium">Бүгд</div>
                                <div
                                    onClick={() => setShowFilters(!showFilters)}
                                    className="flex gap-x-2.5 items-center relative"
                                >
                                    <div className="text-xs font-light text-gray">
                                        {activeFilter}
                                    </div>
                                    <FilterIcon />
                                    {showFilters && (
                                        <div className="absolute z-40 right-0 top-6 rounded-b-md px-1.5 my-col-5 bg-[#f5f5f5] text-xs font-light text-gray">
                                            {filterNames
                                                ?.filter(
                                                    (item) =>
                                                        item !== activeFilter
                                                )
                                                ?.map((filter) => {
                                                    return (
                                                        <div
                                                            key={filter}
                                                            onClick={() =>
                                                                setActiveFilter(
                                                                    filter
                                                                )
                                                            }
                                                            className="border-b  border-dashed border-gray last:border-none pb-1"
                                                        >
                                                            {filter}
                                                        </div>
                                                    );
                                                })}
                                        </div>
                                    )}
                                </div>
                            </div>
                            {merchants?.length > 0 ? (
                                <div className="my-col-10">
                                    {merchants
                                        ?.slice(0, 2)
                                        .map((merchant: Merchant) => {
                                            return (
                                                <GradientMerchantCard
                                                    key={merchant.id}
                                                    merchant={merchant}
                                                />
                                            );
                                        })}
                                    {recommended?.length > 0 && (
                                        <div className="overflow-x-scroll scrollbar-hide -mx-5 px-5 flex items-start gap-x-2.5">
                                            {recommended?.map(
                                                (product: RecommendedType) => {
                                                    return (
                                                        <Recommended
                                                            key={product.id}
                                                            data={product}
                                                        />
                                                    );
                                                }
                                            )}
                                        </div>
                                    )}
                                    {merchants
                                        ?.slice(2)
                                        .map((merchant: Merchant) => {
                                            return (
                                                <GradientMerchantCard
                                                    key={merchant.id}
                                                    merchant={merchant}
                                                />
                                            );
                                        })}
                                </div>
                            ) : null}
                        </div>
                    </>
                )}
            </div>
        </>
    );
}
