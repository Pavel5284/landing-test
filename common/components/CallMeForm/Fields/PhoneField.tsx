'use client';

import {UseFormRegisterReturn} from 'react-hook-form';
import styles from './Field.module.scss';

interface PhoneFieldProps {
    registration: UseFormRegisterReturn;
    error?: {message?: string};
}

export const PhoneField = ({registration, error}: PhoneFieldProps) => (
    <div className={styles.field_wrap}>
        <input
            {...registration}
            placeholder=" "
            className={`${styles.input} ${error ? styles.input_error : ''}`}
            type="tel"
            autoComplete="tel"
        />
        <label className={styles.floating_label}>ТЕЛЕФОН</label>
        {error && <span className={styles.error_msg}>{error.message}</span>}
    </div>
);
