"use client"

import {FC} from 'react';
import styles from './BurgerBtn.module.scss';

interface BurgerBtnProps {
  isOpen: boolean;
  onToggle: () => void;
}

export const BurgerBtn: FC<BurgerBtnProps> = ({isOpen, onToggle}) => (
  <button
    className={`${styles.burgerBtn} ${isOpen ? styles.burgerBtnOpen : ''}`}
    onClick={onToggle}
    aria-label="Открыть меню"
    aria-expanded={isOpen}
  >
    <span className={styles.burgerIcon}>
      <span/><span/><span/>
    </span>
    <span className={styles.burgerLabel}>МЕНЮ</span>
  </button>
);
