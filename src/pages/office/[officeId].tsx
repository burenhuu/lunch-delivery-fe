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
import { recommendedDummyData } from "lib/types/dummy-data";
import { Merchant } from "lib/types/office.type";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useDebounce } from "lib/hooks/useDebounce";
import { toast } from "react-toastify";
import { Category } from "lib/types/merchant-menu-category.type";
import TokiAPI from "lib/api/toki";
import { Product } from "lib/types/merchant-product.type";

export default function Office() {
    const [state, dispatch]: any = useAppState();
    const router = useRouter();
    const officeId = router.query.officeId;
    const [loading, setLoading] = useState<boolean>(false);
    const [searchValue, setSearchValue] = useState<string>("");
    const [searchProducts, setSearchProducts] = useState<Product[]>([]);
    const [showFilters, setShowFilters] = useState<boolean>(false);
    const { merchants, categories, products } = state;
    const debouncedValue = useDebounce(searchValue);

    const filterNames = [
        "Үнэлгээгээр",
        "Үнээр",
        "Хүргэлтээр",
        "Урамшуулалтай",
        "Шинэ",
    ];
    const [activeFilter, setActiveFilter] = useState<string>(filterNames[0]);

    const getMerchants = async () => {
        try {
            setLoading(true);
            const { data } = await TokiAPI.getMerchantsByOffice(
                officeId?.toString()!
            );
            if (data) {
                dispatch({ type: "merchants", merchants: data });
            }
        } finally {
            setLoading(false);
        }
    };

    const getCategories = async () => {
        try {
            setLoading(true);
            const { data } = await TokiAPI.getCategories();
            if (data) {
                dispatch({ type: "categories", categories: data });
            }
        } finally {
            setLoading(false);
        }
    };

    const getProducts = async () => {
        try {
            setLoading(true);
            const { data } = await TokiAPI.getProductsByOffice(
                officeId?.toString()!
            );
            if (data) {
                dispatch({ type: "products", products: data });
            }
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        toast("Таны хаяг зөв эсэхийг шалгаарай", {
            className: "location-toast",
            position: "top-left",
            closeButton: <CloseButton />,
        });
    }, []);

    useEffect(() => {
        if (officeId) {
            getMerchants();
            getCategories();
            getProducts();
        }
    }, [officeId]);

    useEffect(() => {
        const onSearch = async () => {
            if (officeId) {
                const { data } = await TokiAPI.getProductsByOffice(
                    officeId?.toString(),
                    "keyword",
                    debouncedValue
                );
                setSearchProducts(data);
            }
        };
        if (searchValue !== "") {
            onSearch();
        }
    }, [searchValue]);

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
                        <div className="bg-white rounded-md pt-3.75 px-5 text-sm font-light -mt-2.5 my-col-15">
                            {searchProducts?.slice(0, 3).map((product) => {
                                return (
                                    <div
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
                                {categories?.map((category: Category) => {
                                    return (
                                        <CategoryCard
                                            category={category}
                                            key={category.name}
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
                                    <div className="overflow-x-scroll scrollbar-hide -mx-5 px-5 flex items-start gap-x-2.5">
                                        {recommendedDummyData?.map(
                                            (product: any) => {
                                                return (
                                                    <Recommended
                                                        key={product.name}
                                                        data={product}
                                                    />
                                                );
                                            }
                                        )}
                                    </div>
                                    {merchants
                                        ?.slice(3)
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
