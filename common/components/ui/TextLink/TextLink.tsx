import Link from 'next/link';
import { FC, ReactNode } from 'react';
import styles from './TextLink.module.scss';

interface TextLinkProps {
    href: string;
    children: ReactNode;
    className?: string;
    target?: string;
    rel?: string;
}

export const TextLink: FC<TextLinkProps> = ({
    href,
    children,
    className,
    target,
    rel,
}) => {
    return (
        <Link href={href} className={`${styles.textLink} ${className || ''}`} target={target} rel={rel}>
            {children}
        </Link>
    );
};