'use client';

import {UseFormRegisterReturn} from 'react-hook-form';
import styles from './Field.module.scss';

interface NameFieldProps {
    registration: UseFormRegisterReturn<'name'>;
    error?: {message?: string};
}

export const NameField = ({registration, error}: NameFieldProps) => (
    <div className={styles.field_wrap}>
        <input
            {...registration}
            className={`${styles.input} ${error ? styles.input_error : ''}`}
            placeholder=" "
            autoComplete="given-name"
        />
        <label className={styles.floating_label}>ВАШЕ ИМЯ</label>
        {error && <span className={styles.error_msg}>{error.message}</span>}
    </div>
);
