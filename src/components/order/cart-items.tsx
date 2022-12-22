import { Add, HomeIcon, Remove } from "components/icons";
import { formatPrice } from "lib/utils/helpers";

export function CartItems({ items }: { items?: any }) {
    return (
        <div className="bg-white rounded-2xl p-5 shadow-delivery my-col-20 text-sm">
            <div className="my-col-20">
                {items?.map((place: any) => {
                    return (
                        <div
                            key={place.place}
                            className="my-col-10 pb-5 border-gray border-dashed border-b last:border-solid"
                        >
                            <div className="flex items-center gap-x-2.5">
                                <HomeIcon />
                                <div className="font-medium">{place.place}</div>
                            </div>
                            {place.items.map((product: any) => {
                                return (
                                    <div
                                        key={product.name}
                                        className="flex justify-between items-start"
                                    >
                                        <div className="my-col-5">
                                            <div>{product.name}</div>
                                            <div className="text-gray font-light line-clamp-1">
                                                {product.comment
                                                    ? `${product.portion} (${product.comment})`
                                                    : product.portion}
                                            </div>
                                        </div>
                                        <div className="flex flex-col items-end gap-y-1.25">
                                            <div>
                                                {formatPrice(
                                                    product.qty * product.price
                                                )}{" "}
                                                ₮
                                            </div>
                                            <div className="flex bg-[#F5F5FA] rounded-md px-0.5 py-[1px] text-sm font-light gap-x-2.5">
                                                <Remove />
                                                {product.qty}
                                                <Add />
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    );
                })}
            </div>
            <div className="flex justify-between items-center">
                <div className="my-col-10">
                    <div>Захиалгын дүн:</div>
                    <div>Хүргэлтийн төлбөр:</div>
                    <div className="font-medium">Нийт төлөх:</div>
                </div>
                <div className="flex flex-col items-end gap-y-2.5">
                    <div>{formatPrice(20500)} ₮</div>
                    <div>{formatPrice(1500)} ₮</div>
                    <div className="font-medium">{formatPrice(22000)} ₮</div>
                </div>
            </div>
        </div>
    );
}
