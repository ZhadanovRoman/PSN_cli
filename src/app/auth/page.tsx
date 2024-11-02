'use client';

import RegistrForm from '@/components/registrForm/RegistrForm';
import styles from './auth.module.css';
import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/app/GlobalRedux/store';
import LoginForm from '@/components/loginForm/LoginForm';


const Authentification = () => {
  const loginState = useSelector((state: RootState) => state.login.value)
    
  return (
    <div className={styles.auth__container}>
      <h2 className={styles.auth__title}>{loginState ? 'Регистрация клиента' : 'Авторизация клиента'}</h2>
    {loginState ? <RegistrForm /> : <LoginForm />}
  </div>
    
  );
};

export default Authentification;