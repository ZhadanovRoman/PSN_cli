import { useForm, SubmitHandler } from 'react-hook-form';
import styles from './sms-password-form.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import { stateSmsPassChange, stateSmsPassRemove } from '@/app/GlobalRedux/smsPassSlice';
import { RootState } from '@/app/GlobalRedux/store';
import { stateModalRemove } from '@/app/GlobalRedux/modalOpenSlice';
import { setToken } from '@/app/GlobalRedux/smsTokenSlice';

type Inputs = {
    pass: string;
};

const PasswordForm: React.FC = () => {
    const router = useRouter();
    const dispatch = useDispatch();
    const { register, handleSubmit, formState: { errors }, reset } = useForm<Inputs>();
    const smsToken = useSelector((state: RootState) => state.smsToken.value);
    const smsTrue = useSelector((state: RootState) => state.smsPassChange.value);

    const onSubmit: SubmitHandler<Inputs> = async (data) => {
        try {
            const res = await fetch(`https://${process.env.NEXT_PUBLIC_PROXY_IP}/api/validateSmsPass`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ pass: data.pass, token: smsToken }),
            });


            if (res.ok) {
                dispatch(stateSmsPassChange());//этот стэйт дает сигнал на отпраку данных из регформы в бд
                reset();
                setTimeout(() => {
                    dispatch(stateModalRemove());
                    dispatch(stateSmsPassRemove());
                    dispatch(setToken(null));
                    router.push('/');
                }, 2000)
            } else {
                //нужен стэйт для написания в лэйбл при неверном пароле
                console.log('Failed to validate SMS pass');
            }
        } catch (error) {
            console.error('Error during SMS pass validation:', error);
        }
    }

    return (
        <form className={styles.sms__form} onSubmit={handleSubmit(onSubmit)}>
            <label className={styles.sms__form_label}>
                <input className={styles.sms__form_input}
                    placeholder={smsTrue ? 'код верный' : ''}
                    type="text"
                    {...register('pass', { required: 'введите пароль из смс' })}
                />
                {errors.pass && <p className={styles.error}>{errors.pass.message}</p>}
            </label>
            <button type="submit" className={styles.sms__form_btn}>
                отправить код
            </button>
        </form>
    )
}
export default PasswordForm;