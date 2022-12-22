import { LocationIcon } from "components/icons";
import { formatPrice } from "lib/utils/helpers";
import Image from "next/image";

export default function Recommended({ data }: { data: any }) {
    const { img, name, avgReview, oldPrice, newPrice, place } = data;
    return (
        <div className="rounded-2xl overflow-hidden  h-full min-w-[150px] bg-white">
            <Image src={`/images/${img}`} width={150} height={100} alt={name} />
            <div className="p-2.5 my-col-10">
                <div className="my-col-5">
                    <div className="text-xs">{name}</div>
                    <div className="font-light flex justify-start gap-x-0.5 items-center">
                        <div className="text-smaller line-through">
                            {formatPrice(oldPrice)}₮
                        </div>
                        <div className="text-xs">{formatPrice(newPrice)}₮</div>
                    </div>
                </div>
                <div className="border-b border-gray"></div>
                <div className="my-col-5 text-xs font-light">
                    <div className="flex justify-start items-center gap-x-1.25">
                        <LocationIcon />
                        <div>{place}</div>
                    </div>
                    <div>👍{avgReview}%</div>
                </div>
            </div>
        </div>
    );
}
