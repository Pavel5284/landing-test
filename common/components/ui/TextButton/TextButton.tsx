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
        <button
            onClick={onClick}
            className={`${styles.wrapper} ${className || ''}`}
            rel={rel}
        >
            <span className={styles.animatedLabel}>
                <span className={styles.animatedLabelSpan}>{children}</span>
                <span className={styles.animatedLabelSpan}>{children}</span>
            </span>
        </button>
    );
};