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
import { utilsCalcCrow, utilsReduce } from "lib/utils/utils";
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";

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
    const [viewCategories, setViewCategories] = useState([])

    useEffect(() => {
        if (categories?.length > 0) {
            setViewCategories(utilsReduce(categories))
        }
    }, [categories])


    const filterNames = [
        {
            'sort': 'rating',
            'name': "Үнэлгээгээр",
        },
        {
            'sort': 'price',
            'name': "Үнээр",
        },
        {
            'sort': 'delivery',
            'name': "Хүргэлтээр",
        },
        {
            'sort': 'bonus',
            'name': "Урамшуулалтай",
        },
        {
            'sort': 'new',
            'name': "Шинэ",
        }
    ];
    const [filterParameter, setFilterParameter] = useState<any>({ sort: filterNames[0].sort });
    const [activeFilter, setActiveFilter] = useState<any>(filterNames[0]);

    useEffect(() => {
        const timer = setTimeout(() => setDebouncedValue(searchValue), 1000);

        return () => clearTimeout(timer);
    }, [searchValue]);

    useEffect(() => {
        // console.log(state.userLat, state.userLng)
        // console.log(state.officeLat, state.officeLng)
        // console.log(state.officeLat, state.officeLng)
        if (utilsCalcCrow(state.userLat, state.userLng, state.officeLat, state.officeLng) > 0.1 && state.toastCheck !== true) {
            toast("Таны хаяг зөв эсэхийг шалгаарай", {
                className: "location-toast",
                position: "top-left",
                closeButton: <CloseButton />,
                autoClose: false
            });
            dispatch({ type: "toastCheck", toastCheck: true });
        }
    }, []);
    const d = new Date();
    let day = d.getDay() + 1;
    let currentTime = d.getHours() * 60 + d.getMinutes()
    if (day === 7){
        day = 0
    }
    const getMerchants = async () => {
        try {
            const res = await TokiAPI.getMerchantsByOffice(
                officeId?.toString()!, filterParameter
            );
            if (res?.data) {
                res.data.map((merchant: Merchant) => {
                    let openTime: any;
                    let closeTime: any;
                    let openTimeDelivery: any;
                    let closeTimeDelivery: any;
                    if (merchant.timetable) {
                        merchant.timetable?.map((schedule) => {
                            if (schedule.day === day && schedule.active) {
                                openTime = schedule.open.split(":");
                                closeTime = schedule.close.split(":");
                                merchant.dayIsActive = true
                            } else {
                                merchant.dayIsActive = false
                            }
                        });
                    }
                    if (merchant.timetableDelivery) {
                        merchant.timetableDelivery?.map((schedule) => {
                            if (schedule.day === day+1 && schedule.active) {
                                openTimeDelivery = schedule.open !== null ? schedule.open.split(":") : undefined;
                                closeTimeDelivery = schedule.close !== null ? schedule.close.split(":") : undefined;
                                merchant.dayIsActive = true
                            } else {
                                merchant.dayIsActive = false
                            }
                        });
                    }

                    if (openTime && closeTime && openTimeDelivery && closeTimeDelivery) {
                        let openSchedule = parseInt(openTime[0]) * 60 + parseInt(openTime[1])
                        let closeSchedule = parseInt(closeTime[0]) * 60 + parseInt(closeTime[1])
                        let openScheduleDelivery = parseInt(openTimeDelivery[0]) * 60 + parseInt(openTimeDelivery[1])
                        let closeScheduleDelivery = parseInt(closeTimeDelivery[0]) * 60 + parseInt(closeTimeDelivery[1])
                        let open: any
                        let close: any
                        if (openSchedule < openScheduleDelivery) {
                            open = openSchedule
                            merchant.startDate = `${openTime[0]}:${openTime[1]}`;

                        } else if (openSchedule > openScheduleDelivery) {
                            open = openScheduleDelivery
                            merchant.startDate = `${openTimeDelivery[0]}:${openTimeDelivery[1]}`;

                        } else {
                            open = openScheduleDelivery
                            merchant.startDate = `${openTimeDelivery[0]}:${openTimeDelivery[1]}`;

                        }
                        if (closeSchedule < closeScheduleDelivery) {
                            close = closeSchedule
                            merchant.endDate = `${closeTime[0]}:${closeTime[1]}`;
                        } else if (closeSchedule > closeScheduleDelivery) {
                            close = closeScheduleDelivery
                            merchant.endDate = `${closeTimeDelivery[0]}:${closeTimeDelivery[1]}`;
                        } else {
                            close = closeScheduleDelivery
                            merchant.endDate = `${closeTimeDelivery[0]}:${closeTimeDelivery[1]}`;
                        }
                        if (currentTime < open) {
                            merchant.state = "preDelivery"
                        } else if (currentTime > close) {
                            merchant.state = "CLOSED"
                        }
                    }
                    else if (openTimeDelivery && closeTimeDelivery) {
                        let openScheduleDelivery = parseInt(openTimeDelivery[0]) * 60 + parseInt(openTimeDelivery[1])
                        let closeScheduleDelivery = parseInt(closeTimeDelivery[0]) * 60 + parseInt(closeTimeDelivery[1])
                        merchant.startDate = `${openTimeDelivery[0]}:${openTimeDelivery[1]}`;
                        merchant.endDate = `${closeTimeDelivery[0]}:${closeTimeDelivery[1]}`;
                        if (currentTime < openScheduleDelivery) {
                            merchant.state = "preDelivery"
                        } else if (currentTime > closeScheduleDelivery) {
                            merchant.state = "CLOSED"
                        }
                    }
                    else if (openTime && closeTime) {
                        let openSchedule = parseInt(openTime[0]) * 60 + parseInt(openTime[1])
                        let closeSchedule = parseInt(closeTime[0]) * 60 + parseInt(closeTime[1])
                        merchant.startDate = `${openTime[0]}:${openTime[1]}`;
                        merchant.endDate = `${closeTime[0]}:${closeTime[1]}`;
                        if (currentTime < openSchedule) {
                            merchant.state = "preDelivery"
                        } else if (currentTime > closeSchedule) {
                            merchant.state = "CLOSED"
                        }
                    }
                })
                await dispatch({ type: "merchants", merchants: res?.data });
            }
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
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
                    const products: RecommendedType[] = [];
                    await data.map(async (item: any) => {
                        let openTime: any;
                        let closeTime: any;
                        let openTimeDelivery: any;
                        let closeTimeDelivery: any;
                        if (item.timetable) {
                            item.timetable?.map((schedule: any) => {
                                if (schedule.day === day && schedule.active) {
                                    openTime = schedule.open.split(":");
                                    closeTime = schedule.close.split(":");
                                    item.dayIsActive = true
                                } else {
                                    item.dayIsActive = false
                                }
                            });
                        }
                        if (item.timetableDelivery) {
                            item.timetableDelivery?.map((schedule: any) => {
                                if (schedule.day === day && schedule.active) {
                                    openTimeDelivery = schedule.open !== null ? schedule.open.split(":") : undefined;
                                    closeTimeDelivery = schedule.close !== null ? schedule.close.split(":") : undefined;
                                    item.dayIsActive = true
                                } else {
                                    item.dayIsActive = false
                                }
                            });
                        }

                        if (openTime && closeTime && openTimeDelivery && closeTimeDelivery) {
                            let openSchedule = parseInt(openTime[0]) * 60 + parseInt(openTime[1])
                            let closeSchedule = parseInt(closeTime[0]) * 60 + parseInt(closeTime[1])
                            let openScheduleDelivery = parseInt(openTimeDelivery[0]) * 60 + parseInt(openTimeDelivery[1])
                            let closeScheduleDelivery = parseInt(closeTimeDelivery[0]) * 60 + parseInt(closeTimeDelivery[1])
                            let open: any
                            let close: any
                            if (openSchedule < openScheduleDelivery) {
                                open = openSchedule
                                item.startDate = `${openTime[0]}:${openTime[1]}`;

                            } else if (openSchedule > openScheduleDelivery) {
                                open = openScheduleDelivery
                                item.startDate = `${openTimeDelivery[0]}:${openTimeDelivery[1]}`;

                            } else {
                                open = openScheduleDelivery
                                item.startDate = `${openTimeDelivery[0]}:${openTimeDelivery[1]}`;

                            }
                            if (closeSchedule < closeScheduleDelivery) {
                                close = closeSchedule
                                item.endDate = `${closeTime[0]}:${closeTime[1]}`;
                            } else if (closeSchedule > closeScheduleDelivery) {
                                close = closeScheduleDelivery
                                item.endDate = `${closeTimeDelivery[0]}:${closeTimeDelivery[1]}`;
                            } else {
                                close = closeScheduleDelivery
                                item.endDate = `${closeTimeDelivery[0]}:${closeTimeDelivery[1]}`;
                            }
                            if (currentTime < open) {
                                item.state = "preDelivery"
                            } else if (currentTime > close) {
                                item.state = "CLOSED"
                            }
                        }
                        else if (openTimeDelivery && closeTimeDelivery) {
                            let openScheduleDelivery = parseInt(openTimeDelivery[0]) * 60 + parseInt(openTimeDelivery[1])
                            let closeScheduleDelivery = parseInt(closeTimeDelivery[0]) * 60 + parseInt(closeTimeDelivery[1])
                            item.startDate = `${openTimeDelivery[0]}:${openTimeDelivery[1]}`;
                            item.endDate = `${closeTimeDelivery[0]}:${closeTimeDelivery[1]}`;
                            if (currentTime < openScheduleDelivery) {
                                item.state = "preDelivery"
                            } else if (currentTime > closeScheduleDelivery) {
                                item.state = "CLOSED"
                            }
                        }
                        else if (openTime && closeTime) {
                            let openSchedule = parseInt(openTime[0]) * 60 + parseInt(openTime[1])
                            let closeSchedule = parseInt(closeTime[0]) * 60 + parseInt(closeTime[1])
                            item.startDate = `${openTime[0]}:${openTime[1]}`;
                            item.endDate = `${closeTime[0]}:${closeTime[1]}`;
                            if (currentTime < openSchedule) {
                                item.state = "preDelivery"
                            } else if (currentTime > closeSchedule) {
                                item.state = "CLOSED"
                            }
                        }
                        console.log(day, item.name, item.startDate, item.endDate, item.state, "item.endDate")
                        const chosenVariant = item.product?.variants[0];
                        if (chosenVariant) {
                            products.push({
                                ...chosenVariant,
                                place: item.name,
                                placeId: item.id,
                                placeState: item.state,
                                placeReason: item.reason,
                                placeStartDate: item.startDate,
                                placeEndDate: item.endDate,
                                image: item.product.image,
                                rating: item.rating,
                                categoryMain: item.product.category,
                                productName: item.product.name,
                                dayIsActive: item.dayIsActive
                            });
                        }

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
        if (officeId) {
            getMerchants();
        }
    }, [activeFilter])

    useEffect(() => {
        const onSearch = async () => {
            if (officeId) {
                const temp: Merchant[] & Product[] & { type: string }[] = [];
                const { data } = await TokiAPI.getProductsByOffice(
                    officeId?.toString(),
                    "keyword",
                    debouncedValue
                );
                const res = await TokiAPI.getMerchantsByOffice(
                    officeId?.toString()!, filterParameter
                );
                if (res?.data) {
                    res?.data?.map((merchant: Merchant) => {
                        if (
                            merchant.name
                                .toLowerCase()
                                .includes(debouncedValue.toLowerCase())
                        ) {
                            temp.push({ type: "merchant", ...merchant });
                        }
                    });
                }

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
            console.log(result)
            router.push(`/merchant/${result.id}`);
        } else {
            router.push(`/category?productCategory=${result?.category}`);
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
                        {categories?.length > 0 && (
                            <div className="h-[346px]">
                                <Carousel showArrows={false} showStatus={false} showIndicators={false}>
                                    {
                                        viewCategories.map((viewCategory: any, index: any) => (
                                            <div className="grid grid-cols-4 items-stretch text-center gap-3.75 w-auto" key={index}>
                                                {viewCategory?.map((category: CategoryType) => {
                                                    return (
                                                        <CategoryCard
                                                            category={category}
                                                            key={category.id}
                                                        />
                                                    );
                                                })}
                                            </div>
                                        ))
                                    }
                                </Carousel>
                            </div>

                        )}
                        <div>
                            <div className="flex justify-between pb-[15px] items-center">
                                <div className="font-medium">Бүгд</div>
                                <div
                                    onClick={() => setShowFilters(!showFilters)}
                                    className="flex gap-x-2.5 items-center relative"
                                >
                                    <div className="text-xs font-light text-gray">
                                        {activeFilter.name}
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
                                                            key={filter.name}
                                                            onClick={() => {
                                                                setActiveFilter(filter)
                                                                setFilterParameter({ sort: filter.sort })
                                                            }
                                                            }
                                                            className="border-b  border-dashed border-gray last:border-none pb-1"
                                                        >
                                                            {filter.name}
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
