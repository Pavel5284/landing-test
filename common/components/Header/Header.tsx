"use client"

import Link from 'next/link';
import Image from 'next/image';
import {FC, useState} from 'react';
import {usePathname} from 'next/navigation';
import styles from './Header.module.scss';
import {ApartmentDropdown, apartmentOptions} from './ApartmentDropdown/ApartmentDropdown';
import {BurgerBtn} from './BurgerBtn/BurgerBtn';
import type {DropdownItemData} from './Header.types';
import defaultLogoSvg from '@/public/logo.svg'
import {TextLink} from "@/common/components/ui/TextLink/TextLink";
import {TextButton} from "@/common/components/ui/TextButton/TextButton";
import {appRoutes} from "@/common/routes/routes";
import {PhoneDropdown} from './PhoneDropdown/PhoneDropdown';

const menuItems: DropdownItemData[] = [
    {label: 'Главная', href: '/'},
    {label: 'О проекте', href: '/about'},
    {label: 'Генплан', href: '/genplan'},
    {label: 'Ход строительства', href: '/progress'},
    {label: 'Контакты', href: '/contacts'},
];



export const Header: FC<{ className?: string }> = ({className}) => {
    const [menuOpen, setMenuOpen] = useState(false);
    const [apartmentOpen, setApartmentOpen] = useState(false);
    const [phoneOpen, setPhoneOpen] = useState(false);
    const [aptAccordionOpen, setAptAccordionOpen] = useState(false);
    const pathname = usePathname();

    const closeAll = () => {
        setMenuOpen(false);
        setApartmentOpen(false);
        setPhoneOpen(false);
    };

    const isActive = (href: string) =>
        pathname === href || (href !== '/' && pathname.startsWith(href));

    return (
        <>
            <header className={`${styles.header} ${className || ''}`}>
                <div className="header__container">
                    <div className={styles.headerContent}>

                        {/* Desktop left: burger + apartment dropdown */}
                        <div className={styles.leftActions}>
                            <BurgerBtn
                                isOpen={menuOpen}
                                onToggle={() => {
                                    setMenuOpen(prev => !prev);
                                    setApartmentOpen(false);
                                    setPhoneOpen(false);
                                }}
                            />

                            <ApartmentDropdown
                                isOpen={apartmentOpen}
                                onOpenChange={(open) => {
                                    setApartmentOpen(open);
                                    if (open) { setMenuOpen(false); setPhoneOpen(false); }
                                }}
                                isActive={isActive}
                            />
                        </div>

                        {/* Mobile left: burger only */}
                        <div className={styles.mobileLeft}>
                            <BurgerBtn
                                isOpen={menuOpen}
                                onToggle={() => {
                                    setMenuOpen(prev => !prev);
                                    setApartmentOpen(false);
                                    setPhoneOpen(false);
                                }}
                            />
                        </div>

                        <div className={styles.phoneRight}>
                            <PhoneDropdown
                                isOpen={phoneOpen}
                                onOpenChange={(open) => {
                                    setPhoneOpen(open);
                                    if (open) { setMenuOpen(false); setApartmentOpen(false); }
                                }}
                            />
                        </div>

                        {/* Center: Logo */}
                        <Link href="/" className={styles.logo}>
                            <Image
                                src={defaultLogoSvg}
                                alt="logo"
                                width={160}
                                height={32}
                                loading="lazy"
                            />
                        </Link>

                        {/* Desktop right: phone + callback */}
                        <div className={styles.rightActions}>
                            <TextLink href={appRoutes.phone.phoneLink}>{appRoutes.phone.phoneDisplay}</TextLink>
                            <TextButton onClick={() => true}>ЗАКАЗАТЬ ЗВОНОК</TextButton>
                        </div>

                        {/* Mobile right: apartment dropdown */}
                        <div className={styles.mobileRight}>
                            <ApartmentDropdown
                                isOpen={apartmentOpen}
                                onOpenChange={(open) => {
                                    setApartmentOpen(open);
                                    if (open) { setMenuOpen(false); setPhoneOpen(false); }
                                }}
                                isActive={isActive}
                            />
                        </div>
                    </div>
                </div>
            </header>

            {/* Full-screen nav menu overlay */}
            {menuOpen && (
                <nav className={styles.fullMenu} aria-label="Основная навигация">
                    <div className="header__container">
                    <div className={styles.fullMenuInner}>
                        {menuItems.map(item => (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={`${styles.fullMenuItem} ${isActive(item.href) ? styles.fullMenuItemActive : ''}`}
                                onClick={closeAll}
                            >
                                {item.label}
                            </Link>
                        ))}

                        <div className={styles.mobileApartmentLinks}>
                            <button
                                className={`${styles.mobileApartmentTitle} ${aptAccordionOpen ? styles.mobileApartmentTitleOpen : ''}`}
                                onClick={() => setAptAccordionOpen(prev => !prev)}
                                aria-expanded={aptAccordionOpen}
                            >
                                КВАРТИРЫ
                                <svg width="12" height="7" viewBox="0 0 12 7" fill="none" className={styles.accordionChevron}>
                                    <path d="M1 1L6 6L11 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                                </svg>
                            </button>
                            <div className={`${styles.accordionBody} ${aptAccordionOpen ? styles.accordionBodyOpen : ''}`}>
                                <div className={styles.accordionInner}>
                                    {apartmentOptions.map(item => (
                                        <Link
                                            key={item.value}
                                            href={item.value}
                                            className={`${styles.fullMenuItem} ${styles.accordionItem} ${isActive(item.value) ? styles.fullMenuItemActive : ''}`}
                                            onClick={closeAll}
                                        >
                                            {item.label}
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                    </div>
                </nav>
            )}

            <div
                className={`${styles.overlay} ${menuOpen || apartmentOpen || phoneOpen ? styles.overlayVisible : ''}`}
                onClick={closeAll}
                aria-hidden="true"
            />
        </>
    );
};