import {FC, ReactNode } from 'react';
import styles from './Badge.module.scss';

interface BadgeProps {
  children: ReactNode;
  className?: string;
  dot: boolean;
  type: "accent" | "gray";
}

export const Badge: FC<BadgeProps> = ({ children, className, dot, type }) => {
  return (
    <div className={`${type === "accent" ? styles.badge : styles.badge_gray} ${className || ''}`}>
        {dot && <span className={styles.dot} />}
      {children}
    </div>
  );
};