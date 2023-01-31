import ProductCard from "components/product/product-card";
import FloatButton from "components/cart/float-button";
import { Oops } from "components/icons";
import { useAppState } from "lib/context/app";

import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Accordion } from "react-accessible-accordion";

import CenteredSpin from "components/common/centered-spin";
import TokiAPI from "lib/api/toki";
import { CategoryComponent } from "components/category/category";
import ProductTab from "components/category/product-tab";
import { CardDataType, Product } from "lib/types/product.type";
import { Merchant } from "lib/types/merchant.type";


export default function Category() {
    const router = useRouter();
    const [state, dispatch]: any = useAppState();
    const [productFilters, setProductFilters] = useState([
        {
            'sort': 'rating',
            'name': "Үнэлгээ"
        }, {
            'sort': 'price',
            'name': "Үнэ"
        }, {
            'sort': 'delivery',
            'name': "Хүргэлт"
        }, {
            'sort': 'bonus',
            'name': "Урамшуулал"
        }
    ])
    const { merchants, products, categories, categoryId, officeId } = state;
    const [productTab, setProductTab] = useState<any>(productFilters[0]);
    const [loading, setLoading] = useState<boolean>(false);
    const [cardData, setCardData] = useState<CardDataType[]>([]);
    const [accordionKey, setAccordionKey] = useState<any>(123);

    useEffect(() => {
        let number = Math.random()
        setAccordionKey(number)
    }, [cardData])

    useEffect(() => {
        const renderCard = async () => {
            const temp: CardDataType[] = [];
            setLoading(true);
            await products?.map((merchant: Merchant) =>{
                if (merchant.state !== "TEMPORARY_CLOSED"){
                    const d = new Date();
                    let day = d.getDay();
                    if (day === 0){
                        day = 6
                    } else{
                        day = day - 1
                    }
                    let currentTime = d.getHours() * 60 + d.getMinutes()
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
                            }
                        });
                    }
                    if (merchant.timetableDelivery) {
                        merchant.timetableDelivery?.map((schedule) => {
                            if (schedule.day === day && schedule.active) {
                                openTimeDelivery = schedule.open !== null ? schedule.open.split(":") : undefined;
                                closeTimeDelivery = schedule.close !== null ? schedule.close.split(":") : undefined;
                                merchant.dayIsActive = true
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
                        if (openSchedule < currentTime && currentTime < openScheduleDelivery) {
                            merchant.state = "preDelivery"

                            open = openSchedule
                            merchant.startDate = `${openTime[0]}:${openTime[1]}`;

                        } else if (openSchedule > openScheduleDelivery) {
                            open = openScheduleDelivery
                            merchant.startDate = `${openTimeDelivery[0]}:${openTimeDelivery[1]}`;

                        } else {
                            open = openScheduleDelivery
                            merchant.startDate = `${openTimeDelivery[0]}:${openTimeDelivery[1]}`;

                        }
                        if (closeSchedule > closeScheduleDelivery) {
                            close = closeSchedule
                            merchant.endDate = `${closeTime[0]}:${closeTime[1]}`;
                        } else if (closeSchedule < closeScheduleDelivery) {
                            close = closeScheduleDelivery
                            merchant.endDate = `${closeTimeDelivery[0]}:${closeTimeDelivery[1]}`;
                        } else {
                            close = closeScheduleDelivery
                            merchant.endDate = `${closeTimeDelivery[0]}:${closeTimeDelivery[1]}`;
                        }
                        if (currentTime < open || currentTime > close) {
                            merchant.state = "CLOSED"
                        }
                        if (openScheduleDelivery < currentTime && currentTime < closeScheduleDelivery){
                            merchant.cartState = "Delivery"
                        } else{
                            merchant.cartState = "TakeAway"
                        }
                    }
                    else if (openTimeDelivery && closeTimeDelivery) {
                        let openScheduleDelivery = parseInt(openTimeDelivery[0]) * 60 + parseInt(openTimeDelivery[1])
                        let closeScheduleDelivery = parseInt(closeTimeDelivery[0]) * 60 + parseInt(closeTimeDelivery[1])
                        merchant.startDate = `${openTimeDelivery[0]}:${openTimeDelivery[1]}`;
                        merchant.endDate = `${closeTimeDelivery[0]}:${closeTimeDelivery[1]}`;
                        if (currentTime < openScheduleDelivery) {
                            merchant.state = "CLOSED"
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
                            merchant.state = "CLOSED"
                        } else if (currentTime > closeSchedule) {
                            merchant.state = "CLOSED"
                        }
                    }
                    merchant?.products?.map((product: Product) =>
                        temp.push({
                            place: merchant.name,
                            merchantId: merchant.id,
                            rating: merchant.rating,
                            product: product,
                            placeState: merchant.state,
                            placeReason: merchant.reason,
                            placeStartDate: merchant.startDate,
                            placeEndDate: merchant.endDate,
                            dayIsActive: merchant.dayIsActive,
                            merchant: merchant
                        })
                    )
                }

        });
            setCardData(temp);
            setLoading(false);
        };
        renderCard();
    }, [products]);

    console.log(cardData[0]?.product?.variants[0]?.id)

    return !products && loading ? (
        <CenteredSpin />
    ) : (
        <>
            <div className="my-col-10 w-full h-[calc(100vh-50px)] overflow-hidden">
                <CategoryComponent setLoading={setLoading} productTab={productTab} />
                <ProductTab
                    activeTab={productTab}
                    setActiveTab={setProductTab}
                    productFilters={productFilters}
                />
                <div className="relative w-full h-full overflow-y-scroll scrollbar-hide py-5 -mt-2.5">
                    {products.length > 0 ? (
                        <Accordion
                            // allowMultipleExpanded
                            key={accordionKey}
                            allowZeroExpanded
                            className="my-col-10 px-5"
                            preExpanded={[cardData[0]?.product.variants[0]?.id]}
                        >
                            {cardData?.map((item: CardDataType) => {
                                return (
                                    <ProductCard key={item.product.variants[0]?.id} data={item} merchantData={item.merchant} />
                                );
                            })}
                        </Accordion>
                    ) : productTab.name === "Урамшуулал" ? (
                        <div className="absolute items-center text-center left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 my-col-20">
                            <Oops />
                            <div className="font-light">
                                Одоогоор урамшуулал зарласан хоолны газар байхгүй байна
                            </div>
                        </div>
                    ) : (
                        <div className="absolute items-center text-center left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 my-col-20">
                            <Oops />
                            <div className="font-light">Хоосон байна</div>
                        </div>
                    )}
                </div>
            </div>
            {<FloatButton />}
        </>
    );
}
