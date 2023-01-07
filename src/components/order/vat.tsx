export function Vat({ setVat, setValue }: { setVat: any; setValue: any }) {
    return (
        <div
            onChange={(event: any) => (
                setVat(event.target.value),
                setValue("vat", event.target.value),
                event.target.value == 1 && setValue("register", "")
            )}
            className="flex items-center justify-start text-sm gap-x-5"
        >
            <label
                className="flex items-center gap-x-2.5 relative"
                htmlFor="individual"
            >
                <input
                    defaultChecked
                    type="radio"
                    name="vatType"
                    id="individual"
                    value={1}
                />
                <div className="checkmark"></div>
                <div>Хувь хүн</div>
            </label>
            <label
                className="flex items-center gap-x-2.5 relative"
                htmlFor="organization"
            >
                <input
                    type="radio"
                    name="vatType"
                    id="organization"
                    value={3}
                />
                <div className="checkmark"></div>
                <div>Байгууллага</div>
            </label>
        </div>
    );
}
