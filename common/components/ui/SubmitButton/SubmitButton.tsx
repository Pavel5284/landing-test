'use client';

import styles from './SubmitButton.module.scss';

interface SubmitButtonProps {
    isSubmitting: boolean;
}

export const SubmitButton = ({isSubmitting}: SubmitButtonProps) => (
    <div className={styles.wrap}>
        <button
            type="submit"
            className={styles.btn}
            disabled={isSubmitting}
        >
            {isSubmitting ? 'ОТПРАВЛЯЕМ...' : 'ОТПРАВИТЬ'}
        </button>
    </div>
);
