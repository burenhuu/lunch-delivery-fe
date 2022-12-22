export function Vat({ setVat }: { setVat: any }) {
    return (
        <div
            onChange={(event: any) => setVat(event.target.value)}
            className="flex justify-start gap-x-5 items-center text-sm"
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
                    value="individual"
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
                    value="organization"
                />
                <div className="checkmark"></div>
                <div>Байгууллага</div>
            </label>
        </div>
    );
}
