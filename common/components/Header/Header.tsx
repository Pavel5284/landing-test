"use client"

import Link from 'next/link';
import Image from 'next/image';
import {FC, useState} from 'react';
import {usePathname} from 'next/navigation';
import styles from './Header.module.scss';
import {ApartmentDropdown} from './ApartmentDropdown/ApartmentDropdown';
import type {DropdownItemData} from './Header.types';
import defaultLogoSvg from '@/public/logo.svg'

const menuItems: DropdownItemData[] = [
    { label: 'Главная', href: '/' },
    { label: 'О проекте', href: '/about' },
    { label: 'Генплан', href: '/genplan' },
    { label: 'Ход строительства', href: '/progress' },
    { label: 'Контакты', href: '/contacts' },
];

const phoneNumber = "tel:+74955272121";
const phoneDisplay = "+7 495 527 21 21";
const callbackHref = "/callback";

export const Header: FC<{ className?: string }> = ({className}) => {
    const [menuOpen, setMenuOpen] = useState(false);
    const [apartmentOpen, setApartmentOpen] = useState(false);
    const pathname = usePathname();

    const closeAll = () => {
        setMenuOpen(false);
        setApartmentOpen(false);
    };

    const isActive = (href: string) =>
        pathname === href || (href !== '/' && pathname.startsWith(href));

    return (
        <>
            <header className={`${styles.header} ${className || ''}`}>
                <div className={styles.headerContainer}>

                    {/* Left: burger menu + apartment dropdown */}
                    <div className={styles.leftActions}>
                        {/* Burger + МЕНЮ */}
                        <button
                            className={`${styles.burgerBtn} ${menuOpen ? styles.burgerBtnOpen : ''}`}
                            onClick={() => { setMenuOpen(prev => !prev); setApartmentOpen(false); }}
                            aria-label="Открыть меню"
                            aria-expanded={menuOpen}
                        >
                            <span className={styles.burgerIcon}>
                                <span/><span/><span/>
                            </span>
                            <span className={styles.burgerLabel}>МЕНЮ</span>
                        </button>

                        <ApartmentDropdown
                            isOpen={apartmentOpen}
                            onOpenChange={(open) => { setApartmentOpen(open); if (open) setMenuOpen(false); }}
                            isActive={isActive}
                        />
                    </div>

                    {/* Center: Logo */}
                    <Link href="/" className={styles.logo} onClick={closeAll}>
                        <Image
                            src={defaultLogoSvg}
                            alt="logo"
                            width={160}
                            height={32}
                            loading="lazy"
                        />
                    </Link>

                    {/* Right: phone + callback */}
                    <div className={styles.rightActions}>
                        <a href={phoneNumber} className={styles.phoneLink}>
                            {phoneDisplay}
                        </a>
                        <Link href={callbackHref} className={styles.callbackLink}>
                            ЗАКАЗАТЬ ЗВОНОК
                        </Link>
                    </div>

                    {/* Mobile toggle (only phone visible on mobile) */}
                    <div className={styles.mobileRight}>
                        <a href={phoneNumber} className={styles.phoneLinkMobile}>
                            {phoneDisplay}
                        </a>
                    </div>
                </div>

                {/* Full-screen nav menu overlay */}
                {menuOpen && (
                    <nav className={styles.fullMenu} aria-label="Основная навигация">
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
                        </div>
                    </nav>
                )}
            </header>

            <div
                className={`${styles.overlay} ${menuOpen || apartmentOpen ? styles.overlayVisible : ''}`}
                onClick={closeAll}
                aria-hidden="true"
            />
        </>
    );
};