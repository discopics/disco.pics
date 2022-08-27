import React from "react";

interface Modal {
    id: string;
    content: React.FC;
}

interface Props {
    openedModals: Modal[];
    open: (id: string, props?: unknown) => void;
    close: (id: string) => void;
}

const ModalContext = React.createContext<Props>({
    openedModals: [],
    open: () => null,
    close: () => null,
});

interface OpenedModal extends Modal {
    props?: unknown;
}

export const ModalProvider = ({ children, modals }: { children: React.ReactNode, modals: Modal[] }) => {


    const [openedModals, setOpenedModals] = React.useState<OpenedModal[]>([]);

    function open(id: string, props?: unknown) {
        setOpenedModals(
            prev => {
                const modal: OpenedModal | null | undefined = modals.find((m) => m.id === id);
                if (modal) {
                    modal.props = props;
                }
                return (modal ? [...prev, modal] : prev);
            }
        )
    }

    function close(id: string) {
        setOpenedModals(
            prev => {
                const mdls: OpenedModal[] = [];
                prev.forEach(m => {
                    if (m.id !== id) {
                        mdls.push(m);
                    }
                });
                return mdls;
            }
        )
    }

    return (
        <ModalContext.Provider
            value={{
                openedModals,
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