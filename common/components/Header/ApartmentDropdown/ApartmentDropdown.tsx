"use client"

import {createContext, FC, useContext, useState} from 'react';
import Select, {components, GroupBase} from 'react-select';
import type {SingleValueProps, PlaceholderProps, ControlProps} from 'react-select';
import {useRouter} from 'next/navigation';
import styles from './ApartmentDropdown.module.scss';

interface OptionType {
    label: string;
    value: string;
}

const apartmentOptions = [
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

const HoverCtx = createContext<{ setHovered: (v: boolean) => void }>({ setHovered: () => {} });

const CustomControl = (props: ControlProps<OptionType, false, GroupBase<OptionType>>) => {
    const { setHovered } = useContext(HoverCtx);
    return (
        <components.Control
            {...props}
            innerProps={{
                ...props.innerProps,
                onMouseEnter: () => setHovered(true),
                onMouseLeave: () => setHovered(false),
            }}
        />
    );
};

const AnimatedLabel = ({children}: {children: React.ReactNode}) => (
    <div className={styles.animatedLabel}>
        <span>{children}</span>
        <span>{children}</span>
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

// Стабильный объект — не пересоздаётся при каждом рендере
const customComponents = {
    SingleValue: CustomSingleValue,
    Placeholder: CustomPlaceholder,
    Control: CustomControl,
};

export const ApartmentDropdown: FC<ApartmentDropdownProps> = ({isOpen, onOpenChange, isActive}) => {
    const [hovered, setHovered] = useState(false);
    const router = useRouter();

    const currentOption = apartmentOptions.find(opt => isActive(opt.value)) ?? null;

    const handleChange = (option: OptionType | null) => {
        if (option && !isActive(option.value)) {
            router.push(option.value);
        }
    };

    return (
        <div className={hovered ? styles.aptDropdownHovered : ''}>
            <HoverCtx.Provider value={{ setHovered }}>
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
                        dropdownIndicator: (state) =>
                            state.selectProps.menuIsOpen ? styles.indicatorOpen : styles.indicator,
                        indicatorSeparator: () => styles.indicatorSeparator,
                        menu: () => styles.menu,
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
                    onMenuOpen={() => onOpenChange(true)}
                    onMenuClose={() => onOpenChange(false)}
                />
            </HoverCtx.Provider>
        </div>
    );
};