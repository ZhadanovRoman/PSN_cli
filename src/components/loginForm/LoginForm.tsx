"use client";

import styles from '../registrForm/registr-form.module.css';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import ReactInputMask from 'react-input-mask';
import { useDispatch } from 'react-redux';


type Inputs = {
    phone: string;
    password: string;
};

const LoginForm: React.FC = () => {
    const dispatch = useDispatch();
    const router = useRouter();
    const { register, handleSubmit, formState: { errors }, reset } = useForm<Inputs>();

    const onSubmit: SubmitHandler<Inputs> = async (data) => {
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
                
                localStorage.setItem('clientData', dataRes.token);
                localStorage.setItem('masterCrypt', dataRes.masterCrypt);
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
                <ReactInputMask
                    mask="+7 (999) 999-99-99"
                    className={styles.registr__form_input}
                    {...register('phone', {
                        required: 'Введите номер телефона',
                    })}
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