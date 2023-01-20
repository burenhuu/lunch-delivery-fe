import { formatPrice } from "lib/utils/helpers";

interface OrderCardProps {
    item: any;
}

const OrderCard: React.FC<OrderCardProps> = ({ item }) => (
    <>
        <div className="bg-white rounded-2xl flex justify-start gap-x-3.75 items-start">
            <img
                src={item.image}
                alt={item.name}
                className="rounded-2xl w-[120px] h-[120px]"
            />
            <div className="my-col-5 py-3.75 pr-5 w-full">
                <div className="flex items-center justify-between font-medium">
                    <div className="w-[155px] line-clamp-2">
                        {item.name}
                    </div>
                    <div>x{item.quantity}</div>
                </div>
                <div className="flex items-center justify-start gap-x-1">
                    {item.presale_price && (
                        <div className="text-xs font-light line-through text-gray">
                            {formatPrice(item.presale_price)} ₮
                        </div>
                    )}
                    <div className="text-sm">{formatPrice(item.price)} ₮</div>
                </div>
                <div className="flex flex-col text-xs font-light text-gray gap-x-0.5">
                    {item.name !== item.variantName && <div>{item.variantName}</div>}
                    {item.options &&
                        item.options.map((option: any, index: number) => {
                            if (option.value === null) {
                                return(
                                    <div key={index}>{option.name}</div>
                                )
                            } else {
                                return(
                                    <div key={index}>{option.name} {option.value}</div>
                                )
                            }

                        })}
                    <span className="">
                        {item.comment && ` (${item.comment})`}
                    </span>
                </div>
            </div>
        </div>
    </>
);

export default OrderCard;
