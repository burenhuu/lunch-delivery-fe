export default function DeliveryType({
    setDeliveryType,
    setValue,
}: {
    setDeliveryType: any;
    setValue: any;
}) {
    return (
        <div
            onChange={(event: any) => (
                setDeliveryType(event.target.value),
                setValue("type", event.target.value)
            )}
            className="flex items-center justify-start text-sm gap-x-5"
        >
            <label
                className="flex items-center gap-x-2.5 relative"
                htmlFor="Delivery"
            >
                <input
                    defaultChecked
                    type="radio"
                    name="typeofdelivery"
                    id="Delivery"
                    value="Delivery"
                />
                <div className="checkmark"></div>
                <div>Хүргүүлэх</div>
            </label>
            <label
                className="flex items-center gap-x-2.5 relative"
                htmlFor="TakeAway"
            >
                <input
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
