/* eslint-disable @typescript-eslint/ban-ts-comment */
import { AnimatePresence, motion } from "framer-motion";
import React from "react";

interface Modal {
    id: string;
    title: string;
    content: React.FC;
}

interface Props {
    openedModal: OpenedModal | null;
    open: (id: string, props?: unknown) => void;
    close: () => void;
}

interface OpenedModal extends Modal {
    props?: unknown;
}

const ModalContext = React.createContext<Props>({
    openedModal: null,
    open: () => null,
    close: () => null,
});


export const ModalProvider = ({ children, modals }: { children: React.ReactNode, modals: Modal[] }) => {


    const [openedModal, setOpenedModal] = React.useState<OpenedModal | null>(null);

    function open(id: string, props?: unknown) {
        const mdl: OpenedModal | undefined = modals.find(m => m.id === id);
        if (mdl) {
            mdl.props = props
            setOpenedModal(mdl);
        }
    }

    function close() {
        setOpenedModal(null);
    }

    return (
        <ModalContext.Provider
            value={{
                openedModal,
                open, close
            }}
        >
            {children}
        </ModalContext.Provider>
    )

}

export function useModals() {
    return React.useContext(ModalContext);
}

export function ModalManager() {

    const { openedModal, close } = useModals();

    return (
        <AnimatePresence>
            {openedModal && (
                <div className="absolute flex justify-center items-center w-screen h-screen bg-black/20 z-[100]">
                    <motion.div initial={{ scaleY: 0 }} exit={{ scaleY: 0, opacity: 0 }} animate={{ scaleY: 1 }} className="min-h-[70vh] min-w-[70vw] p-5 rounded-md text-white bg-gray-600">
                        <div className="w-full flex">
                            <h1 className="ml-2 font-bold text-xl">
                                {openedModal.title}
                            </h1>
                            <button className="ml-auto hover:bg-white/10 p-1 rounded" onClick={close}>
                                <svg className="w-5 h-5" viewBox="0 0 24 24">
                                    <path fill="white" d="M6.4 19L5 17.6l5.6-5.6L5 6.4L6.4 5l5.6 5.6L17.6 5L19 6.4L13.4 12l5.6 5.6l-1.4 1.4l-5.6-5.6Z" />
                                </svg>
                            </button>
                        </div>
                        <div className="w-full p-2 mt-2">
                            {/* @ts-ignores */}
                            <openedModal.content {...openedModal.props} />
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    )
}