import { dummyReviews } from "lib/types/dummy-data";

export default function MerchantReview() {
    return (
        <div className="my-col-15">
            <div className="font-medium">Үнэлгээ</div>
            <div className="bg-white rounded-2xl pb-2.5">
                {/* Average reviews */}
                <div className="grid grid-cols-5 items-center">
                    <div className="col-span-2 flex flex-col gap-y-2 items-center border-r py-5 border-gray/10">
                        <div className="font-medium">👍 89%</div>
                        <div className="text-sm">(Нийт 38)</div>
                    </div>
                    <div className="col-span-3 my-col-10 items-end text-sm pr-5">
                        <div className="flex gap-x-2.5">
                            <div>Амт, чанар</div>
                            <div>👍 93%</div>
                        </div>
                        <div className="flex gap-x-2.5">
                            <div>Хүргэлт</div>
                            <div>👍 85%</div>
                        </div>
                    </div>
                </div>
                {/* All reviews */}
                <div className="flex flex-col gap-y-[1px]">
                    {dummyReviews?.map((review) => {
                        return (
                            <div
                                key={review.name}
                                className="py-2.5 border-t my-col-10 border-gray/10 px-5 h-[110px]"
                            >
                                <div
                                    className="font-medium"
                                    title={review.name}
                                />
                                <div className="flex items-center gap-x-5">
                                    {review.image && (
                                        <img
                                            src={`/images/${review.image}`}
                                            alt={review.name}
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
