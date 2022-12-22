import Modal from "components/common/modal";

import { createContext, useContext, useState } from "react";

export const modalContext = createContext<any>([]);

export function useModal() {
    return useContext(modalContext);
}

export function ModalProvider({ children }: any) {
    const [show, setShow] = useState<boolean>(false);
    const [content, setContent] = useState<any>();

    return (
        <modalContext.Provider value={[show, setShow, content, setContent]}>
            <Modal />
            {children}
        </modalContext.Provider>
    );
}
