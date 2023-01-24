import { useEffect, useState } from "react";
import useSWR from "swr";
import TokiAPI from "../../lib/api/toki";

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
    const [response, setResponse] = useState<any>({})

    const fetchTimes = async () => {
        if (!isDeliveryClosed) {
            await TokiAPI.getCartTimes("TakeAway").then((res) => {
                setResponse(res)
            })
        } else {
            await TokiAPI.getCartTimes("Delivery").then((res) => {
                setResponse(res)
            })
        }
    }

    useEffect(()=>{
        fetchTimes()
    },[isDeliveryClosed])

    useEffect(()=>{
        if (response.times?.length === 0){
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
