"use client";

import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { MaskedInput } from 'react-hook-mask';
import { useDispatch } from 'react-redux';
import styles from '../registrForm/registr-form.module.css';

type Inputs = {
    phone: string;
    password: string;
};

const MY_RULES = new Map([
    ['C', /[A-Za-z]/],
    ['N', /\d/],
]);

const createMaskGenerator = (mask: string) => ({
    rules: MY_RULES,
    generateMask: () => mask,
});

const maskGenerator = createMaskGenerator('+7 (NNN) NNN-NN-NN');

const LoginForm: React.FC = () => {
    const dispatch = useDispatch();
    const router = useRouter();
    const { register, handleSubmit, control, formState: { errors }, reset } = useForm<Inputs>();

    const onSubmit: SubmitHandler<Inputs> = async (data) => {
        console.log("Submitted data:", data);
        try {
            const response = await fetch("http://localhost:5000/auth/login", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            const dataRes = await response.json();

            if (response.ok) {
                await router.push('/grafic');
                if (typeof window !== "undefined") {
                    localStorage.setItem('clientData', dataRes.token);
                    localStorage.setItem('masterCrypt', dataRes.masterCrypt);
                }
                reset();
            } else {
                console.error('Ошибка при отправке формы');
            }
        } catch (error) {
            console.error('There was an error submitting the form:', error);
        }
    };

    return (
        <form className={styles.registr__form} onSubmit={handleSubmit(onSubmit)}>
            <label className={styles.registr__form_label}>Телефон*:
                <Controller
                    name="phone"
                    control={control}
                    defaultValue="+7"
                    rules={{
                        required: 'Введите номер телефона',
                        validate: (value) => {
                            
                            const digitsOnly = value.replace(/\D/g, '');
                            return digitsOnly.length === 11 || 'Введите полный номер телефона';
                        }
                    }}
                    render={({ field: { onChange, value } }) => (
                        <MaskedInput
                            maskGenerator={maskGenerator}
                            value={value || '+7'}
                           onChange={(maskedValue: string) => {
                                onChange(`7${maskedValue}`);
                            
                            }}
                            className={styles.registr__form_input}
                            placeholder="+7 (___) ___-__-__"
                        />
                    )}
                />
                {errors.phone && <p className={styles.error}>{errors.phone.message}</p>}
            </label>

            <label className={styles.registr__form_label}>Пароль*:
                <input className={styles.registr__form_input}
                    type="password"
                    {...register('password', {
                        required: 'Введите пароль',
                        minLength: {
                            value: 6,
                            message: 'Пароль должен содержать минимум 6 символов'
                        }
                    })}
                />
                {errors.password && <p className={styles.error}>{errors.password.message}</p>}
            </label>

            <button type="submit" className={styles.registr__form_btn}>Войти</button>
        </form>
    );
}

export default LoginForm;