"use client";

import React, { useEffect, useRef, useCallback, useState } from 'react';
import ReactDOM from 'react-dom';
import styles from './modal.module.css';
import FormItemCreate from '../formItemCreate/FormItemCreate';
import CloseBtnModal from './closeBtn/CloseBtn';
import PasswordForm from '../smsPasswordForm/PasswordForm';
import { useSelector } from 'react-redux';
import { RootState } from '@/app/GlobalRedux/store';


interface ModalProps {
  text: string;
  masterMarker: boolean;
  onClose: () => void;
  onReserv: () => void;
}


const Modal: React.FC<ModalProps> = ({ text, masterMarker, onClose, onReserv }) => {

  const modalRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);
  const smsMarker = useSelector((state: RootState) => state.smsToken.value);
  const createBtnMarker = useSelector((state: RootState) => state.createBtn.value);
  const itemId = useSelector((state: RootState) => state.itemId.value);
  
  const handleClickOutside = useCallback((event: MouseEvent) => {
    if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
      onClose();
    }
  }, [onClose]);

  const itemDelete = async () => {
    const res = await fetch(`https://${process.env.NEXT_PUBLIC_PROXY_IP}/api/item/delete`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ _id: itemId }),
    })
  }

  useEffect(() => {
    setMounted(true);
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      setMounted(false);
    };
  }, [handleClickOutside]);

  if (!mounted) {
    return null;
  }

  return ReactDOM.createPortal(
    <div className={styles.modalOverlay}>
      <div className={styles.modal} ref={modalRef}>
        <h4>{masterMarker || text === 'Введите код из смс' ? text : ''}</h4>
        {masterMarker && createBtnMarker ? <FormItemCreate /> : ''}
        <p>{masterMarker ? '' : text}</p>
        {smsMarker && <PasswordForm />}
        {!createBtnMarker && masterMarker ? <button onClick={itemDelete}>удалить запись</button> : ''}
        {createBtnMarker ? '' : <button onClick={onReserv} className={styles.modal__reserv_btn}> {masterMarker ? 'забронировать окошко' : 'записаться'}</button>}
        {createBtnMarker ? '' : <CloseBtnModal />}
      </div>
    </div>,
    document.body
  );
};

export default Modal;