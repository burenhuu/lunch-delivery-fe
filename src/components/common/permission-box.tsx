import { useModal } from "lib/context/modal";

export function PermissionBox({
    text,
    button2,
    onClick,
}: {
    text: any;
    button2?: any;
    onClick?: any;
}) {
    const [show, setShow] = useModal();
    return (
        <div className="center-modal px-5">
            <div
                id="effect"
                data-aos="fade-up"
                className="flex flex-col text-center gap-y-2.5"
            >
                <div className="bg-white shadow-delivery p-5 rounded-2xl">
                    {text}
                </div>
                {button2 ? (
                    <div className="bg-white shadow-delivery py-1.25 px-5 rounded-2xl grid grid-cols-2 items-center">
                        <div
                            onClick={() => {
                                document
                                    .getElementById("effect")
                                    ?.classList.remove("aos-animate");
                                setTimeout(() => {
                                    setShow(false);
                                }, 400);
                            }}
                            className="border-r border-gray py-[5.5px]"
                        >
                            Буцах
                        </div>
                        <div onClick={onClick}>{button2}</div>
                    </div>
                ) : (
                    <div
                        onClick={() => {
                            document
                                .getElementById("effect")
                                ?.classList.remove("aos-animate");
                            setTimeout(() => {
                                setShow(false);
                            }, 400);
                        }}
                        className="bg-white shadow-delivery py-2.5 px-5 rounded-2xl"
                    >
                        Ок
                    </div>
                )}
            </div>
        </div>
    );
}
