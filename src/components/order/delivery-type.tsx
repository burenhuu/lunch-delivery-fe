import { useEffect, useState } from "react";
import useSWR from "swr";

export default function DeliveryType({
    setDeliveryType,
    setValue,
    isDeliveryClosed,
}: {
    setDeliveryType: any;
    setValue: any;
    isDeliveryClosed: any;
}) {
    const [isDeliveryShow, setIsDeliveryShow] = useState(true);
    const apiUrl = `/v1/cart/times`;
    const response = useSWR(`${apiUrl}`);

    useEffect(()=>{
        if (response.data?.times?.length === 0){
            setValue("floor", 1)
            setValue("address", "")
            setValue("type", "TakeAway")
            setDeliveryType("TakeAway")
        }
    },[])

    useEffect(() => {
        if (isDeliveryClosed) {
            setIsDeliveryShow(isDeliveryClosed);
        }
    }, [isDeliveryClosed]);

    return (
        <div
            onChange={(event: any) => (
                setDeliveryType(event.target.value),
                setValue("type", event.target.value),
                event.target.value == "TakeAway" &&
                    (setValue("floor", 1), setValue("address", ""))
            )}
            className="flex items-center justify-start text-sm gap-x-5"
        >
            {isDeliveryShow == true && (
                <label
                    className="flex items-center gap-x-2.5 relative"
                    htmlFor="Delivery"
                >
                    <input
                        defaultChecked={isDeliveryClosed ? false : true}
                        type="radio"
                        name="typeofdelivery"
                        id="Delivery"
                        value="Delivery"
                    />
                    <div className="checkmark"></div>
                    <div>Хүргүүлэх</div>
                </label>
            )}
            <label
                className="flex items-center gap-x-2.5 relative"
                htmlFor="TakeAway"
            >
                <input
                    defaultChecked={isDeliveryClosed ? true : false}
                    type="radio"
                    name="typeofdelivery"
                    id="TakeAway"
                    value="TakeAway"
                />
                <div className="checkmark"></div>
                <div>Очиж авах</div>
            </label>
        </div>
    );
}
