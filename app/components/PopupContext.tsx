'use client';

import { createContext, useContext, useMemo, useState, type ReactNode } from 'react';

type PopupContextValue = {
    popupIsOpen: boolean;
    popupType: 'personal' | 'edo' | null;
    popupOpen: (type: 'personal' | 'edo') => void;
    popupClose: () => void;
    popupToggle: () => void;
};

const PopupContext = createContext<PopupContextValue | null>(null);

export function PopupProvider({ children }: { children: ReactNode }) {
    const [popupIsOpen, setIsOpen] = useState(false);
    const [popupType, setPopupType] = useState<'personal' | 'edo' | null>(null);

    const value = useMemo<PopupContextValue>(
        () => ({
            popupIsOpen,
            popupType,
            popupOpen: (type) => {
                setIsOpen(true);
                setPopupType(type);
            },
            popupClose: () => {
                setIsOpen(false);
                setPopupType(null);
            },
            popupToggle: () => setIsOpen((prev) => !prev),
        }),
        [popupIsOpen],
    );

    return (
        <PopupContext.Provider value={value}>
            {children}
        </PopupContext.Provider>
    );
}

export function usePopup() {
    const ctx = useContext(PopupContext);
    if (!ctx) {
        throw new Error('usePopup must be used within <PopupProvider>');
    }
    return ctx;
}