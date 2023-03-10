import { useModal } from "lib/context/modal";

export function PermissionBox({
    text,
    button1 = "Буцах",
    button2,
    button3,
    onClick,
    onClick2,
    loading,
    textHtml = true,
}: {
    text: any;
    button1?: any;
    button2?: any;
    button3?: any;
    onClick?: any;
    onClick2?: any;
    loading?: any;
    textHtml?: any;
}) {
    const [show, setShow] = useModal();

    return (
        <div className="px-5 center-modal">
            <div
                id="effect"
                data-aos="fade-up"
                className="flex flex-col text-center gap-y-2.5"
            >
                <div className="p-5 bg-white shadow-delivery rounded-2xl">
                    {textHtml == true ? (
                        <div
                            dangerouslySetInnerHTML={{
                                __html: text,
                            }}
                        />
                    ) : (
                        text
                    )}
                </div>
                {button2 ? (
                    <div className="bg-white shadow-delivery py-1.25 px-5 rounded-2xl grid grid-cols-2 items-center">
                        {!button3 ? (
                            <button
                                onClick={() => {
                                    document
                                        .getElementById("effect")
                                        ?.classList.remove("aos-animate");
                                    setTimeout(() => {
                                        setShow(false);
                                    }, 400);
                                }}
                                className="border-r border-gray py-[5.5px]"
                                disabled={loading}
                            >
                                {button1}
                            </button>
                        ) : (
                            <button
                                onClick={onClick2}
                                className="border-r border-gray py-[5.5px]"
                                disabled={loading}
                            >
                                {button3}
                            </button>
                        )}
                        <button disabled={loading} onClick={onClick}>
                            {button2}
                        </button>
                    </div>
                ) : (
                    <button
                        onClick={() => {
                            document
                                .getElementById("effect")
                                ?.classList.remove("aos-animate");
                            setTimeout(() => {
                                setShow(false);
                            }, 400);
                        }}
                        disabled={loading}
                        className="bg-white shadow-delivery py-2.5 px-5 rounded-2xl"
                    >
                        Ок
                    </button>
                )}
            </div>
        </div>
    );
}
