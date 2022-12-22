import { useModal } from "lib/context/modal";

const Modal = () => {
    const [show, setShow, content, setContent] = useModal();
    return show ? (
        <>
            {content}
            <div
                onClick={() => {
                    document
                        .getElementById("effect")
                        ?.classList.remove("aos-animate");
                    setTimeout(() => {
                        setShow(false);
                    }, 400);
                }}
                className="fixed bg-black/50 inset-0 z-50 overflow-hidden"
            ></div>
        </>
    ) : null;
};

export default Modal;
