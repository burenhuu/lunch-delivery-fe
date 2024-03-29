import { Review } from "lib/types/merchant.type";
import { intervalToDuration } from "date-fns";
import { useEffect, useState } from "react";
import { DeleteIcon } from "components/icons";
import TokiAPI from "../../lib/api/toki";
import {ImageModal} from "../common/image-modal";
import {useModal} from "../../lib/context/modal";

export default function MerchantReview(props: { merchantId: string }) {
    const [merchantReview, setMerchantReview] = useState<Review>();

    const getReviews = async () => {
        const { data } = await TokiAPI.getMerchantReviews(props.merchantId);
        if (data) {
            setMerchantReview(data);
        }
    };

    useEffect(() => {
        getReviews();
    }, [])

    const deleteReview = async (id: string) => {
        TokiAPI.deleteReview(id).then((r) => {
            getReviews()
        })
    };
    const [show, setShow, content, setContent] = useModal();
    const onImageClick = (image: string) => {
        setShow(true);
        setContent(<ImageModal images={[image]} />);
    };

    return (
        <div className="my-col-15">
            <div className="font-medium">Үнэлгээ</div>
            <div className="bg-white rounded-2xl pb-2.5">
                {/* Average reviews */}
                <div className="grid items-center grid-cols-5">
                    <div className="flex flex-col items-center col-span-2 py-5 border-r gap-y-2 border-gray/10">
                        <div className="font-medium">
                            👍 {merchantReview?.percentage.toString().slice(0, 4)} %
                        </div>
                        <div className="text-sm">(Нийт {merchantReview?.total})</div>
                    </div>
                    <div className="items-end col-span-3 pr-5 text-sm my-col-10">
                        {merchantReview?.types.map((type) => {
                            return (
                                <div key={type.type} className="flex gap-x-2.5">
                                    <div>{type.type === 'D' ? "Хүргэлт" : "Амт,чанар"}</div>
                                    <div> 👍{type?.percentage.toString().slice(0, 4)} %</div>
                                </div>
                            );
                        })}
                    </div>
                </div>
                {/* All reviews */}
                <div className="flex flex-col gap-y-[1px]">
                    {merchantReview?.reviews?.map((review) => {
                        const duration = intervalToDuration({
                            start: new Date(review?.createdAt),
                            end: new Date(),
                        });
                        if (duration.years !== 0) {
                            review.date = `${duration.years} жилийн өмнө`;
                        } else if (duration.months !== 0) {
                            review.date = `${duration.months} сарын өмнө`;
                        } else if (duration.days !== 0) {
                            review.date = `${duration.days} өдрийн өмнө`;
                        } else if (duration.hours !== 0) {
                            review.date = `${duration.hours} цагийн өмнө`;
                        } else if (duration.minutes !== 0) {
                            review.date = `${duration.minutes} минутын өмнө`;
                        } else if (duration.seconds !== 0) {
                            review.date = `${duration.seconds} секундын өмнө`;
                        }

                        if (review.additional !== "" || (review.pictures && review?.pictures?.length > 0)){
                            return (
                                <div
                                    key={review.id}
                                    className="py-2.5 border-t my-col-10 border-gray/10 px-5 min-h-[110px]"
                                >
                                    <div className="flex items-center justify-between">
                                        <div className="font-medium">
                                            {review.name}
                                        </div>
                                        {review.removeable && (
                                            <div
                                                onClick={() =>
                                                    deleteReview(review.id)
                                                }
                                            >
                                                <DeleteIcon />
                                            </div>
                                        )}
                                    </div>
                                    <div className="flex items-center gap-x-5">
                                        {review?.pictures && review?.pictures?.length > 0 ? (
                                            <>
                                                <img
                                                    onClick={()=>{onImageClick(review?.pictures ? review?.pictures[0] : "")}}
                                                    src={`${review.pictures[0]}`}
                                                    alt={review.id}
                                                    className="w-[60px] h-[60px] rounded-md"
                                                />
                                                <div className="font-light text-xs my-col-5 h-[60px]">
                                                    <div>{review.additional}</div>
                                                    <div className="text-smaller text-gray">
                                                        {review.date}
                                                    </div>
                                                </div>
                                            </>
                                        ) : (
                                            <>
                                                <div className="text-xs font-light my-col-5">
                                                    <div>{review.additional}</div>
                                                    <div className="text-smaller text-gray">
                                                        {review.date}
                                                    </div>
                                                </div>
                                            </>
                                        )}
                                    </div>
                                </div>
                            );
                        }

                    })}
                </div>
            </div>
        </div>
    );
}
