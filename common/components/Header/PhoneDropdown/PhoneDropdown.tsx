"use client"

import {FC, useRef} from 'react';
import styles from './PhoneDropdown.module.scss';
import {TextLink} from "@/common/components/ui/TextLink/TextLink";
import {TextButton} from "@/common/components/ui/TextButton/TextButton";
import {appRoutes} from "@/common/routes/routes";
import {useCloseEsc} from '@/common/hooks/useCloseEsc';

interface PhoneDropdownProps {
    isOpen: boolean;
    onOpenChange: (open: boolean) => void;
}

export const PhoneDropdown: FC<PhoneDropdownProps> = ({isOpen, onOpenChange}) => {
    const btnRef = useRef<HTMLButtonElement>(null);

    useCloseEsc({
        isOpen,
        onClose: () => onOpenChange(false),
        btnRef,
    });

    return (
        <div className={styles.phoneWrap}>
            <button
                ref={btnRef}
                className={`${styles.phoneIconBtn} ${isOpen ? styles.phoneIconBtnActive : ''}`}
                onClick={() => onOpenChange(!isOpen)}
                aria-label="Контакты"
            >
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M16.5 12.69C15.375 12.69 14.2875 12.5025 13.2825 12.165C12.9675 12.06 12.615 12.1425 12.375 12.3825L10.8825 14.2575C8.265 13.02 5.8725 10.74 4.575 8.025L6.435 6.4425C6.675 6.195 6.75 5.8425 6.6525 5.5275C6.3075 4.5225 6.12 3.435 6.12 2.31C6.12 1.815 5.805 1.5 5.31 1.5H2.3175C1.8225 1.5 1.5 1.815 1.5 2.31C1.5 10.1625 7.8525 16.5 15.69 16.5C16.185 16.5 16.5 16.1775 16.5 15.6825V12.69Z" fill="currentColor"/>
                </svg>
            </button>

            {isOpen && (
                <div className={styles.phoneDropdown}>
                    <TextLink href={appRoutes.phone.phoneLink} className={styles.phoneDropdownItem}>
                        {appRoutes.phone.phoneDisplay}
                    </TextLink>
                    <TextButton
                        className={styles.phoneDropdownItem}
                        onClick={() => onOpenChange(false)}
                    >
                        ЗАКАЗАТЬ ЗВОНОК
                    </TextButton>
                </div>
            )}
        </div>
    );
};
