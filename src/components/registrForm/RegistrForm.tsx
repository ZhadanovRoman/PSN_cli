"use client";

import { useForm, SubmitHandler } from 'react-hook-form';
import styles from './registr-form.module.css';
import { useEffect, useRef, useState } from 'react';
import ReactInputMask from 'react-input-mask';
import Modal from '../modal/modal';
import { useDispatch, useSelector } from 'react-redux';

import { stateModalChange } from '@/app/GlobalRedux/modalOpenSlice';
import { RootState } from '@/app/GlobalRedux/store';
import { setToken } from '@/app/GlobalRedux/smsTokenSlice';



type Inputs = {
    phone: string;
    fullName: string;
    password: string;
    master: boolean;
    avatarUrl: string;
};

const RegistrationForm: React.FC = () => {
    const { register, handleSubmit, formState: { errors }, reset } = useForm<Inputs>();
    const [marker, setMarker] = useState<boolean>(false);
    const modalChange = useSelector((state: RootState) => state.modalChange.value);
    const smsPass = useSelector((state: RootState) => state.smsPassChange.value);
    const dispatch = useDispatch();
    const openModal = () => {
        dispatch(stateModalChange())
    }
    const dataRef = useRef<Inputs | null>(null);

    const onSubmit: SubmitHandler<Inputs> = async (data) => {
        dataRef.current = data;
        try {
            const response = await fetch("http://localhost:5000/generateSmsPass", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });
    
            const result = await response.json();
           dispatch(setToken(result.token)) ;
            
        } catch (er) {
            console.log(er)
        }
        openModal();
    };

        useEffect(() => {
            if (smsPass) {
                
                const handleSmsPass = async () => {
                    try {
                        const response = await fetch("http://localhost:5000/auth/registr", {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json',
                            },
                            body: JSON.stringify( dataRef.current ),
                        });
            
                        if (response.ok) {
                            setMarker(true);
                            reset();
                        } else {
                            console.log('response not ok');
                        }
            
                        const result = await response.json();
                        reset();
                    } catch (error) {
                        console.log('There was an error submitting the form:', error);
                    }
                };
    
                handleSmsPass(); 
            }
        }, [smsPass, reset]);
       
    

    return (
        <>
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

                <label className={styles.registr__form_label}>Имя*:
                    <input className={styles.registr__form_input}
                        type="text"
                        {...register('fullName', { required: 'Введите ваше имя' })}
                    />
                    {errors.fullName && <p className={styles.error}>{errors.fullName.message}</p>}
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

                <label className={styles.registr__form_label}>Master:
                    <input className={styles.registr__form_input}
                        type="text"
                        {...register('master')}
                    />
                </label>

                <label className={styles.registr__form_label}>Avatar URL:
                    <input className={styles.registr__form_input}
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


