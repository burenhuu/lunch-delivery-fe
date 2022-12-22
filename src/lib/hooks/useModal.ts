import { useState } from "react";

const useModal = () => {
    const [visible, setVisible] = useState(false);
    const [modalTitle, setModalTitle] = useState("");
    const [modalContent, setModalContent] = useState("");
    const [isCenter, setIsCenter] = useState(false);
    const [footer, setFooter] = useState("");
    const [banner, setBanner] = useState(false);

    const handleModal = (
        visible: boolean = false,
        title: string = "",
        content: any = "",
        isCenter: boolean = false,
        footer: any = "",
        banner: any = false
    ) => {
        setVisible(visible);
        setModalTitle(title);
        setModalContent(content);
        setIsCenter(isCenter);
        setFooter(footer);
        setBanner(banner);
    };

    return {
        visible,
        modalTitle,
        modalContent,
        isCenter,
        footer,
        banner,
        handleModal,
    };
};

export default useModal;
