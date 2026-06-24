import Link from 'next/link';
import { FC, ReactNode } from 'react';
import styles from './TextButton.module.scss';

interface TextButtonProps {
    onClick: ()=>void;
    children: ReactNode;
    className?: string;
    rel?: string;
}

export const TextButton: FC<TextButtonProps> = ({
    onClick,
    children,
    className,
    rel,
}) => {
    return (
        <button onClick={onClick} className={`${styles.textButton} ${className || ''}`}  rel={rel}>
            {children}
        </button>
    );
};