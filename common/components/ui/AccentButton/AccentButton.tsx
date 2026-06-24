import Link from 'next/link';
import { FC } from 'react';
import Image from 'next/image';
import styles from './AccentButton.module.scss';
import arrowUpBlack from '../../../../public/images/commonIcons/arrow-up-black.svg';

type IconType = 'arrow';

interface PrimaryButtonProps {
    href?: string;
    title?: string;
    className?: string;
    ariaLabel?: string;
    onClick?: () => void;
    children?: React.ReactNode;
    icon?: IconType;
}

const iconMap: Record<IconType, string> = {
    arrow: arrowUpBlack,
};

export const AccentButton: FC<PrimaryButtonProps> = ({
    href,
    children,
    className,
    ariaLabel = "",
    onClick,
    icon,
}) => {
    return href ? (
        <Link
            href={href}
            className={`${styles.button} ${className || ''}`}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={ariaLabel}
            onClick={onClick}
        >
            {children}
            {icon && <Image src={iconMap[icon]} alt="icon" width={35} height={35} />}
        </Link>
    ) : (
        <button
            className={`${styles.button} ${className || ''}`}
            onClick={onClick}
        >
            {children}
            {icon && <Image src={iconMap[icon]} alt="icon" width={35} height={35} />}
        </button>
    );
};
