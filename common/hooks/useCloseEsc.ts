import {useEffect, useRef} from 'react';

interface UseDropdownKeyboardOptions {
    isOpen: boolean;
    onClose: () => void;
    btnRef?: React.RefObject<HTMLElement | null>;
}

export function useCloseEsc({
    isOpen,
    onClose,
    btnRef,
}: UseDropdownKeyboardOptions) {
    const onCloseRef = useRef(onClose);
    useEffect(() => { onCloseRef.current = onClose; });

    useEffect(() => {
        if (!isOpen) return;

        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') {
                e.preventDefault();
                onCloseRef.current();
                btnRef?.current?.focus();
            }
        };

        document.addEventListener('keydown', handleKeyDown);
        return () => document.removeEventListener('keydown', handleKeyDown);
    }, [isOpen]);
}
