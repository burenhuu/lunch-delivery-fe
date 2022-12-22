import FloatButton from "components/cart/float-button";
import MerchantIntroduction from "components/merchant/merchant-introduction";
import MerchantReview from "components/merchant/review";
import MerchantTimetable from "components/merchant/timetable";
import { useAppState } from "lib/context/app";
import { Merchant } from "lib/types/office.type";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function MerchantDetailPage() {
    const router = useRouter();
    const merchantId = router.query.merchantId;
    const [state]: any = useAppState();
    const { merchants } = state;
    const [merchant, setMerchant] = useState<Merchant>();
    useEffect(() => {
        const merchant = merchants?.find(
            (merchant: Merchant) => merchant._id === merchantId
        );
        setMerchant(merchant);
    }, []);

    return (
        <>
            {merchant && (
                <div className="p-5 my-col-20">
                    <MerchantIntroduction merchant={merchant} />
                    <MerchantTimetable timetable={merchant.timetable} />
                    <MerchantReview />
                </div>
            )}
        </>
    );
}
