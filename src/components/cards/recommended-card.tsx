import { LocationIcon } from "components/icons";
import { formatPrice } from "lib/utils/helpers";

export default function Recommended({ data }: { data: any }) {
    const { image, name, rating, price, salePrice, place } = data;
    return (
        <div className="rounded-2xl overflow-hidden  h-full min-w-[150px] bg-white">
            <img src={image} alt={name} className="w-[150px] h-[100px]" />
            <div className="p-2.5 my-col-10">
                <div className="my-col-5">
                    <div className="text-xs">{name}</div>
                    <div className="font-light flex justify-start gap-x-0.5 items-center">
                        <div className="text-smaller line-through text-gray">
                            {formatPrice(price)}₮
                        </div>
                        <div className="text-xs">{formatPrice(salePrice)}₮</div>
                    </div>
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
