import { LocationIcon } from "components/icons";
import { formatPrice } from "lib/utils/helpers";
import { useRouter } from "next/router";
import { useAppState } from "../../lib/context/app";

export default function Recommended({ data }: { data: any }) {
    const { image, name, rating, price, salePrice, place } = data;
    const router = useRouter();
    const [state, dispatch]: any = useAppState();

    const onContinueClick = () => {
        dispatch({
            type: "merchantId",
            merchantId: data.placeId,
        });
        dispatch({
            type: "merchantName",
            merchantName: data.place,
        });
        // dispatch({
        //     type: "categoryActive",
        //     categoryActive: null,
        // });

        router.push(`/merchant/${data.placeId}?productId=${data.id}&categoryId=${data.categoryMain}`);
    };

    return (
        <div className="rounded-2xl overflow-hidden  h-full min-w-[150px] bg-white" onClick={onContinueClick}>
            <img src={image} alt={name} className="w-[150px] h-[100px]" />
            <div className="p-2.5 my-col-10">
                <div className="my-col-5">
                    <div className="text-xs truncate">{name}</div>
                    {
                        formatPrice(price) === formatPrice(salePrice) ?
                            <div className="font-light flex justify-start gap-x-0.5 items-center">
                                <div className="text-xs">{formatPrice(price)}₮</div>
                            </div>
                            :
                            <div className="font-light flex justify-start gap-x-0.5 items-center">
                                <div className="text-smaller line-through text-gray">
                                    {formatPrice(price)}₮
                                </div>
                                <div className="text-xs">{formatPrice(salePrice)}₮</div>
                            </div>
                    }

                </div>
                <div className="border-b border-gray"></div>
                <div className="my-col-5 text-xs font-light">
                    <div className="flex justify-start items-center gap-x-1.25">
                        <LocationIcon />
                        <div>{place}</div>
                    </div>
                    <div>👍{rating}%</div>
                </div>
            </div>
        </div>
    );
}
