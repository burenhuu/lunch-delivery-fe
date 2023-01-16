import FloatButton from "components/cart/float-button";
import MerchantIntroduction from "components/merchant/merchant-introduction";
import MerchantReview from "components/merchant/review";
import MerchantTimetable from "components/merchant/timetable";
import { useAppState } from "lib/context/app";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import CenteredSpin from "components/common/centered-spin";
import TokiAPI from "lib/api/toki";
import { Merchant, Review } from "lib/types/merchant.type";
import { intervalToDuration } from "date-fns";

export default function MerchantDetailPage() {
    const [state]: any = useAppState();
    const { merchantId, merchants } = state;
    const [merchant, setMerchant] = useState<Merchant>();
    const [loading, setLoading] = useState<boolean>(false);
    const [merchantReview, setMerchantReview] = useState<Review>();

    useEffect(() => {
        const getMerchant = async () => {
            setLoading(true);
            const tempMerch = await merchants?.find(
                (merchant: Merchant) => merchant.id === merchantId
            );
            setMerchant(tempMerch);

            // const { data } = await TokiAPI.getMerchantDetail(merchantId);
            // if (data) {
            //     console.log(data);
            // }
            // setMerchant(merchant);
        };
        const getReviews = async () => {
            setLoading(true);
            const { data } = await TokiAPI.getMerchantReviews(merchantId);
            if (data) {
                setMerchantReview(data);
                setLoading(false);
            }
        };
        if (merchantId) {
            getMerchant();
            getReviews();
        }
    }, []);

    useEffect(() => {
        // Formatting comment created date

        merchantReview?.reviews?.map(async (review) => {
            const duration = intervalToDuration({
                start: new Date(review?.createdAt),
                end: new Date(),
            });
            if (duration.years) {
                review.date = `${duration.years} жилийн өмнө`;
            } else if (duration.months) {
                review.date = `${duration.years} сарын өмнө`;
            } else if (duration.days) {
                review.date = `${duration.days} өдрийн өмнө`;
            } else if (duration.hours) {
                review.date = `${duration.hours} цагийн өмнө`;
            } else if (duration.minutes) {
                review.date = `${duration.minutes} минутын өмнө`;
            } else if (duration.seconds) {
                review.date = `${duration.seconds} секундын өмнө`;
            }
        });
    }, [merchantReview]);

    return loading ? (
        <CenteredSpin />
    ) : (
        <>
            {merchant && (
                <div className="p-5 my-col-20">
                    <MerchantIntroduction merchant={merchant} />
                    {merchant?.timetable && (
                        <MerchantTimetable timetable={merchant.timetable} timeTableDelivery={merchant.timetableDelivery} />
                    )}
                    {merchantReview && <MerchantReview merchantId={merchantId} />}
                </div>
            )}
        </>
    );
}
