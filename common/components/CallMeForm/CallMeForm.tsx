'use client';

import {useForm} from 'react-hook-form';
import {zodResolver} from '@hookform/resolvers/zod';
import {z} from 'zod';
import {useHookFormMask} from 'use-mask-input';
import {SubmitButton} from '../ui/SubmitButton/SubmitButton';
import styles from './CallMeForm.module.scss';

const baseSchema = z.object({
    name: z.string().min(2, 'Введите имя'),
    phone: z
        .string()
        .refine(
            val => val.replace(/\D/g, '').length === 11,
            'Введите полный номер телефона'
        ),
    email: z.string().optional(),
});

type FormValues = z.infer<typeof baseSchema>;

export type PilotProjectFormValues = FormValues;

const makeSchema = (short: boolean) =>
    baseSchema.superRefine((data, ctx) => {
        if (!short) {
            const parsed = z.string().email('Введите корректный email').safeParse(data.email);
            if (!parsed.success) {
                ctx.addIssue({
                    code: z.ZodIssueCode.custom,
                    message: 'Введите корректный email',
                    path: ['email'],
                });
            }
        }
    });

interface PilotProjectFormProps {
    short?: boolean;
    onSubmit?: (data: PilotProjectFormValues) => void;
    className?: string;
    title?: string;
}

export const CallMeForm = ({
                               short = false,
                               onSubmit,
                               className,
                               title = 'ЗАКАЗАТЬ ЗВОНОК',
                           }: PilotProjectFormProps) => {
    const {
        register,
        handleSubmit,
        formState: {errors, isSubmitting},
    } = useForm<FormValues>({
        resolver: zodResolver(makeSchema(short)),
        defaultValues: {name: '', phone: '', email: ''},
    });

    const registerWithMask = useHookFormMask(register);

    const handleFormSubmit = async (data: FormValues) => {
        if (onSubmit) {
            await onSubmit(data);
        } else {
            console.log('Form data:', data);
        }
    };

    return (
        <div className={`${styles.wrapper} ${className || ''}`}>
            {title && <h2 className={styles.title}>{title}</h2>}

            <form
                className={styles.form}
                onSubmit={handleSubmit(handleFormSubmit)}
                noValidate
            >
                {/* Name */}
                <div className={styles.field_wrap}>
                    <input
                        {...register('name')}
                        className={`${styles.input} ${errors.name ? styles.input_error : ''}`}
                        placeholder=" "
                        autoComplete="given-name"
                    />
                    <label className={styles.floating_label}>ВАШЕ ИМЯ</label>
                    {errors.name && (
                        <span className={styles.error_msg}>{errors.name.message}</span>
                    )}
                </div>

                {/* Phone */}
                <div className={styles.field_wrap}>
                    <input
                        {...registerWithMask('phone', '+7 (999) 999-99-99', {
                            placeholder: ' ',
                            autoUnmask: false,
                        })}
                        placeholder=" "
                        className={`${styles.input} ${errors.phone ? styles.input_error : ''}`}
                        type="tel"
                        autoComplete="tel"
                    />
                    <label className={styles.floating_label}>ТЕЛЕФОН</label>
                    {errors.phone && (
                        <span className={styles.error_msg}>{errors.phone.message}</span>
                    )}
                </div>

                {/* Email */}
                {!short && (
                    <div className={styles.field_wrap}>
                        <input
                            {...register('email')}
                            className={`${styles.input} ${errors.email ? styles.input_error : ''}`}
                            type="email"
                            placeholder=" "
                            autoComplete="email"
                        />
                        <label className={styles.floating_label}>E-MAIL</label>
                        {errors.email && (
                            <span className={styles.error_msg}>{errors.email.message}</span>
                        )}
                    </div>
                )}

                {/* Consent note */}
                <p className={styles.consent_text}>
                    Нажимая на кнопку «Отправить», вы соглашаетесь<br />
                    с политикой обработки персональных данных
                </p>

                <SubmitButton isSubmitting={isSubmitting} />
            </form>
        </div>
    );
};