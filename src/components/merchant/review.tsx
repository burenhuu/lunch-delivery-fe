import { Review } from "lib/types/merchant.type";
import { intervalToDuration } from "date-fns/esm";
import { useEffect } from "react";
import { DeleteIcon } from "components/icons";

export default function MerchantReview({ data }: { data: Review }) {
    const { liked, percentage, reviews, total, types } = data;

    const deleteReview = async (id: string) => {
        console.log(id);
        // Gargaj ugsun api-in logikoor bol body ywuulah ystoi bolj baina,
        // gehdee anhnaasaa removable irj baival review ni hereglegchiinh gedgiig tanisan baih ystoi,
        // so zugeer review id ywuulahad hereglegch uuruu ustgah gj bnu shalgahad l bolno, no need for request body
    };

    return (
        <div className="my-col-15">
            <div className="font-medium">Үнэлгээ</div>
            <div className="bg-white rounded-2xl pb-2.5">
                {/* Average reviews */}
                <div className="grid grid-cols-5 items-center">
                    <div className="col-span-2 flex flex-col gap-y-2 items-center border-r py-5 border-gray/10">
                        <div className="font-medium">
                            👍 {percentage.toString().slice(0, 4)} %
                        </div>
                        <div className="text-sm">(Нийт {total})</div>
                    </div>
                    <div className="col-span-3 my-col-10 items-end text-sm pr-5">
                        {types.map((type) => {
                            return (
                                <div className="flex gap-x-2.5">
                                    <div>{type.type}</div>
                                    <div> 👍{type.percentage} %</div>
                                </div>
                            );
                        })}
                    </div>
                </div>
                {/* All reviews */}
                <div className="flex flex-col gap-y-[1px]">
                    {reviews?.map((review) => {
                        return (
                            <div
                                key={review.id}
                                className="py-2.5 border-t my-col-10 border-gray/10 px-5 h-[110px]"
                            >
                                <div className="flex justify-between items-center">
                                    <div className="font-medium">
                                        {review.id}
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
                                    {review?.image && (
                                        <img
                                            src={`/images/${review.image}`}
                                            alt={review.id}
                                            className="w-[60px] h-[60px] rounded-md"
                                        />
                                    )}
                                    <div className="font-light text-xs my-col-5">
                                        <div>{review.comment}</div>
                                        <div className="text-smaller text-gray">
                                            {review.date}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
