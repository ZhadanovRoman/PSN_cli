"use client";

import { SubmitHandler, useForm } from 'react-hook-form';
import styles from './form-item-create.module.css';

type Inputs = {
    date: string;
    time: string;
    reserv: string
  };

const FormItemCreate: React.FC = () => {

    const { register, handleSubmit, formState: { errors }, reset } = useForm<Inputs>();
    const onSubmit: SubmitHandler<Inputs> = async (data) => {
      
      try {
  
        const response = await fetch("http://localhost:5000/item/create", {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        });
        
  
        if (response.ok) {
          reset();
        } else {
          console.error('Ошибка при отправке формы');
        }
      } catch (error) {
        console.error('There was an error submitting the form:', error);
      }
    };

    return(
        <form className={styles.registr__form} onSubmit={handleSubmit(onSubmit)}>
          <label className={styles.registr__form_label}>Дата*:
            <input className={styles.registr__form_input}
              type="date"
              {...register('date', {
                required: 'Date is required',
                pattern: {
                  value: /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])$/,
                  message: 'Введите дату в формате : ГОД-МЕСЯЦ-ДЕНЬ'
                }
              })}
            />
            {errors.date && <p className={styles.error}>{errors.date.message}</p>}
          </label>

          <label className={styles.registr__form_label}>Время*:
            <input className={styles.registr__form_input}
              type="time"
              {...register('time', {
                required: 'time is required',
                pattern: {
                  value: /^([01]\d|2[0-3]):([0-5]\d)(:[0-5]\d)?$/,
                  message: 'Введите время в формате : ЧАСЫ-МИНУТЫ'
                }
              })}
            />
            {errors.time && <p className={styles.error}>{errors.time.message}</p>}
          </label>

          <label className={styles.registr__form_label}>Статус резервации*:
            <input className={styles.registr__form_input}
              type="text"
              {...register('reserv', {
                required: 'reserv is required',
              })}
            />
            {errors.reserv && <p className={styles.error}>{errors.reserv.message}</p>}
          </label>

          <button type="submit" className={styles.registr__form_btn}>добавить</button>
        </form>
    )
}

export default FormItemCreate;