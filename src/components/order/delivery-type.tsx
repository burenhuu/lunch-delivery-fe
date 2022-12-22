export default function DeliveryType({
    setDeliveryType,
}: {
    setDeliveryType: any;
}) {
    return (
        <div
            onChange={(event: any) => setDeliveryType(event.target.value)}
            className="flex justify-start gap-x-5 items-center text-sm"
        >
            <label
                className="flex items-center gap-x-2.5 relative"
                htmlFor="deliver"
            >
                <input
                    defaultChecked
                    type="radio"
                    name="typeofdelivery"
                    id="deliver"
                    value="deliver"
                />
                <div className="checkmark"></div>
                <div>Хүргүүлэх</div>
            </label>
            <label
                className="flex items-center gap-x-2.5 relative"
                htmlFor="takeout"
            >
                <input
                    type="radio"
                    name="typeofdelivery"
                    id="takeout"
                    value="takeout"
                />
                <div className="checkmark"></div>
                <div>Очиж авах</div>
            </label>
        </div>
    );
}
