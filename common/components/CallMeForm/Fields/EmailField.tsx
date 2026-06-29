'use client';

import {UseFormRegisterReturn} from 'react-hook-form';
import styles from './Field.module.scss';

interface EmailFieldProps {
    registration: UseFormRegisterReturn<'email'>;
    error?: {message?: string};
}

export const EmailField = ({registration, error}: EmailFieldProps) => (
    <div className={styles.field_wrap}>
        <input
            {...registration}
            className={`${styles.input} ${error ? styles.input_error : ''}`}
            type="email"
            placeholder=" "
            autoComplete="email"
        />
        <label className={styles.floating_label}>E-MAIL</label>
        {error && <span className={styles.error_msg}>{error.message}</span>}
    </div>
);
