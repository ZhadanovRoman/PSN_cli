"use client";

import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import styles from './registr-form.module.css';
import { useEffect, useRef, useState } from 'react';
import Modal from '../modal/modal';
import { useDispatch, useSelector } from 'react-redux';
import { stateModalChange } from '@/app/GlobalRedux/modalOpenSlice';
import { RootState } from '@/app/GlobalRedux/store';
import { setToken } from '@/app/GlobalRedux/smsTokenSlice';
import { MaskedInput } from 'react-hook-mask';

type Inputs = {
    phone: string;
    fullName: string;
    password: string;
    master: boolean;
    avatarUrl: string;
};

const MY_RULES = new Map([
    ['C', /[A-Za-z]/],
    ['N', /\d/],
]);

const createMaskGenerator = (mask: string) => ({
    rules: MY_RULES,
    generateMask: () => mask,
});

const maskGenerator = createMaskGenerator('+7 (NNN) NNN-NN-NN'); // Маска для телефона

const RegistrationForm: React.FC = () => {
    const { register, handleSubmit, formState: { errors }, reset, control } = useForm<Inputs>();
    const [marker, setMarker] = useState<boolean>(false);
    const modalChange = useSelector((state: RootState) => state.modalChange.value);
    const smsPass = useSelector((state: RootState) => state.smsPassChange.value);
    const dispatch = useDispatch();
    const dataRef = useRef<Inputs | null>(null);

    const openModal = () => {
        dispatch(stateModalChange());
    };

    const onSubmit: SubmitHandler<Inputs> = async (data) => {
        console.log('Submitted Data:', data);
        dataRef.current = data;

        try {
            const response = await fetch("http://localhost:5000/generateSmsPass", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            if (!response.ok) {
                throw new Error('Failed to generate SMS pass');
            }

            const result = await response.json();
            console.log('SMS Token Response:', result);
            dispatch(setToken(result.token));
            openModal();
        } catch (error) {
            console.error('Error in SMS generation:', error);
        }
    };

    useEffect(() => {
        if (smsPass) {
            const handleSmsPass = async () => {
                console.log('SMS Pass received, submitting registration...');

                try {
                    const response = await fetch("http://localhost:5000/auth/registr", {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify(dataRef.current),
                    });

                    if (response.ok) {
                        const result = await response.json();
                        console.log('Registration Response:', result);
                        setMarker(true);
                        reset();
                    } else {
                        console.error('Response not ok during registration:', response.status);
                    }
                } catch (error) {
                    console.error('Error in registration submission:', error);
                }
            };

            handleSmsPass();
        }
    }, [smsPass, reset]);

    return (
        <>
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
                                //console.log('Текущее значение инпута при изменении:', maskedValue);
                            }}
                            className={styles.registr__form_input}
                            placeholder="+7 (___) ___-__-__"
                        />
                    )}
                />
                    {errors.phone && <p className={styles.error}>{errors.phone.message}</p>}
                </label>

                <label className={styles.registr__form_label}>Имя*:
                    <input
                        className={styles.registr__form_input}
                        type="text"
                        {...register('fullName', { required: 'Введите ваше имя' })}
                    />
                    {errors.fullName && <p className={styles.error}>{errors.fullName.message}</p>}
                </label>

                <label className={styles.registr__form_label}>Пароль*:
                    <input
                        className={styles.registr__form_input}
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

                <label className={styles.registr__form_label}>Master:
                    <input
                        className={styles.registr__form_input}
                        type="text"
                        {...register('master')}
                    />
                </label>

                <label className={styles.registr__form_label}>Avatar URL:
                    <input
                        className={styles.registr__form_input}
                        type="text"
                        {...register('avatarUrl')}
                    />
                </label>

                <button type="submit" disabled={marker} className={styles.registr__form_btn}>
                    {marker ? 'Успешно' : 'Register'}
                </button>
            </form>
            {modalChange && <Modal
                text={'Введите код из смс'}
                masterMarker={false}
                onClose={() => { }}
                onReserv={() => { }}
            />}
        </>
    );
};

export default RegistrationForm;
