"use client"

import React, {FC, useRef, useState} from 'react';
import Select, {components, GroupBase} from 'react-select';
import type {SingleValueProps, PlaceholderProps, DropdownIndicatorProps} from 'react-select';
import {useRouter} from 'next/navigation';
import Image from 'next/image';
import styles from './ApartmentDropdown.module.scss';
import chevronDown from '@/public/images/commonIcons/chevron-down.svg';

export interface OptionType {
    label: string;
    value: string;
}

export const apartmentOptions = [
    { label: 'Студии', value: '/apartments/studio' },
    { label: '1-комнатные', value: '/apartments/1room' },
    { label: '2-комнатные', value: '/apartments/2room' },
    { label: '3-комнатные', value: '/apartments/3room' },
] as const satisfies OptionType[];

interface ApartmentDropdownProps {
    isOpen: boolean;
    onOpenChange: (open: boolean) => void;
    isActive: (href: string) => boolean;
}

const AnimatedLabel = ({children}: {children: React.ReactNode}) => (
    <div className={styles.animatedLabel}>
        <span className={styles.animatedLabelSpan}>{children}</span>
        <span className={styles.animatedLabelSpan}>{children}</span>
    </div>
);

const CustomSingleValue = (props: SingleValueProps<OptionType, false, GroupBase<OptionType>>) => (
    <components.SingleValue {...props}>
        <AnimatedLabel>{props.children}</AnimatedLabel>
    </components.SingleValue>
);

const CustomPlaceholder = (props: PlaceholderProps<OptionType, false, GroupBase<OptionType>>) => (
    <components.Placeholder {...props}>
        <AnimatedLabel>{props.children}</AnimatedLabel>
    </components.Placeholder>
);

const CustomDropdownIndicator = (props: DropdownIndicatorProps<OptionType, false, GroupBase<OptionType>>) => {
    const isOpen = props.selectProps.menuIsOpen;
    return (
        <components.DropdownIndicator {...props}>
            <Image
                src={chevronDown}
                alt=""
                width={12}
                height={7}
                style={{
                    transition: 'transform 0.25s ease',
                    transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                }}
            />
        </components.DropdownIndicator>
    );
};

// Стабильный объект — не пересоздаётся при каждом рендере
const customComponents = {
    SingleValue: CustomSingleValue,
    Placeholder: CustomPlaceholder,
    DropdownIndicator: CustomDropdownIndicator,
};

const ANIMATION_DURATION = 200;

export const ApartmentDropdown: FC<ApartmentDropdownProps> = ({isOpen, onOpenChange, isActive}) => {
    const [closing, setClosing] = useState(false);
    const closeTimerRef = useRef<ReturnType<typeof setTimeout>>(undefined);
    const router = useRouter();

    const currentOption = apartmentOptions.find(opt => isActive(opt.value)) ?? null;

    const handleChange = (option: OptionType | null) => {
        if (option && !isActive(option.value)) {
            router.push(option.value);
        }
    };

    const handleMenuOpen = () => {
        if (closeTimerRef.current) clearTimeout(closeTimerRef.current);
        setClosing(false);
        onOpenChange(true);
    };

    const handleMenuClose = () => {
        setClosing(true);
        closeTimerRef.current = setTimeout(() => {
            setClosing(false);
            onOpenChange(false);
        }, ANIMATION_DURATION);
    };

    return (
        <div className={styles.wrapper}>
            <Select<OptionType, false>
                    options={apartmentOptions}
                    unstyled
                    instanceId="apartment-select"
                    classNames={{
                        container: () => styles.container,
                        control: () => styles.control,
                        valueContainer: () => styles.valueContainer,
                        singleValue: () => styles.singleValue,
                        placeholder: () => styles.placeholder,
                        indicatorSeparator: () => styles.indicatorSeparator,
                        menu: () => `${styles.menu} ${closing ? styles.menuClosing : ''}`,
                        menuList: () => styles.menuList,
                        option: ({ isSelected, isFocused }) =>
                            [styles.option, isSelected && styles.optionSelected, isFocused && styles.optionFocused]
                                .filter(Boolean).join(' '),
                    }}
                    components={customComponents}
                    value={currentOption}
                    onChange={handleChange}
                    placeholder="ВЫБРАТЬ КВАРТИРУ"
                    isSearchable={false}
                    menuIsOpen={isOpen}
                    onMenuOpen={handleMenuOpen}
                    onMenuClose={handleMenuClose}
                />
        </div>
    );
};