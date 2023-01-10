export default function DeliveryType({
    setDeliveryType,
    setValue,
    isDeliveryClosed,
}: {
    setDeliveryType: any;
    setValue: any;
    isDeliveryClosed: any;
}) {
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
            {isDeliveryClosed == false && (
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
