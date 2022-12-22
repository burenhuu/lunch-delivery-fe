import { Item } from "lib/types/order-detail";
import { formatPrice } from "lib/utils/helpers";

interface OrderCardProps {
    item: Item;
}

const OrderCard: React.FC<OrderCardProps> = ({ item }) => (
    <>
        <div className="bg-white rounded-2xl flex justify-start gap-x-3.75 items-start">
            <img
                src={item.product.image}
                alt={item.product.name}
                className="rounded-2xl w-[120px] h-[120px]"
            />
            <div className="my-col-5 py-3.75 pr-5 w-full">
                <div className="font-medium flex justify-between items-center">
                    <div>{item.product.name}</div>
                    <div>x{item.qty}</div>
                </div>
                <div className="flex justify-start gap-x-1 items-center">
                    {item.presale_price && (
                        <div className="line-through text-xs font-light text-gray">
                            {formatPrice(item.presale_price)} ₮
                        </div>
                    )}
                    <div className="text-sm">{formatPrice(item.price)} ₮</div>
                </div>
                <div className="text-xs font-light text-gray flex gap-x-0.5">
                    {item.product_variant.options &&
                        item.product_variant.options.map(
                            (option: any, index: number) => (
                                <div key={index}>{option.value}</div>
                            )
                        )}
                    {/* In case of comments
                    {item.comments && `(${item.comments})`} */}
                </div>
            </div>
        </div>
    </>
);

export default OrderCard;
