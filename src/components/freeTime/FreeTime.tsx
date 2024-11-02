"use client";
import React, { useMemo, useState, useEffect } from "react";
import useGetData from "@/hooks/useGetData";
import styles from './free-time.module.css';
import jwt from 'jsonwebtoken';
import useItemReserv from "@/hooks/useItemReserv";
import Modal from "../modal/modal";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/app/GlobalRedux/store";
import { stateModalChange, stateModalRemove } from "@/app/GlobalRedux/modalOpenSlice";
import bcrypt from 'bcryptjs';
import { stateBtnChange, stateBtnRemove } from "@/app/GlobalRedux/createBtnSlice";
import { setitemId } from "@/app/GlobalRedux/itemIdSlice";
import { stateWindowChange } from '@/app/GlobalRedux/windowsChanges';

interface DataItem {
  _id: string;
  date: string;
  time: string;
  procedure: string;
  reserv: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
  clientName: string;
}

interface IToken {
  _id: string;
  clientName: string;
  master: string;
}

const FreeTime: React.FC = () => {
  const dataArr = useGetData();
  const [correctArr, setCorrectArr] = useState<DataItem[]>([]);
  const [selectedItemId, setSelectedItemId] = useState<string | null>(null);
  //const [isItemId, setIsItemId] = useState<string>('');
  const clientData: string | null = localStorage.getItem('clientData');
  const [client, setClient] = useState<string>('');
  const [master, setMaster] = useState<boolean>(false);
  const createBtnMarker = useSelector((state: RootState) => state.createBtn.value);
  const isItemId = useSelector((state: RootState) => state.itemId.value);
  const modalChange = useSelector((state: RootState) => state.modalChange.value);
  const masterCrypt: string | null = localStorage.getItem('masterCrypt');
  const windowChange = useSelector((state: RootState) => state.windowChange.value)


  const dispatch = useDispatch();

  const openModal = () => {
    dispatch(stateModalChange())
  };
  const closeModal = () => {
    dispatch(stateBtnRemove())
    dispatch(stateModalRemove()) //для закрытия по нажатию вне модалки(ДЛЯ КНОПКИ ЗАКРЫТИЯ - closeModal есть в самом компоненте closeBtnModal)
  };

  const handleContainerClick = () => {
    setSelectedItemId(null);
  };
  const btnCreateChange = () => {
    dispatch(stateBtnChange())
  }
  const handleItemReserv = async (id: string, clientName: string) => {

    try {
      await useItemReserv(id, clientName);
      setSelectedItemId(id);

       const selectItem =

       setCorrectArr(prevArr =>
        prevArr.map(item =>
          item._id === id ? { ...item, reserv: 'занято', clientName: clientName } : item
        )
      );

       dispatch(stateWindowChange())
    } catch (error) {
      console.error("Error reserving item:", error);
    }

  };

  const token: IToken | null | undefined = useMemo(() => {
    if (clientData) {
      return jwt.decode(clientData) as IToken;
    }


  }, []);

  useEffect(() => {
    if (token?.clientName) {
      setClient(token.clientName);
    }
    if (masterCrypt) {
      bcrypt.compare('true', masterCrypt, (err, isMatch) => {
        if (err) {
          console.error(err);
        } else if (isMatch) {
          
          setMaster(true);
        } else {
          console.log('Пароль не совпадает!');
        }
      }
      )
    }

  }, [token, masterCrypt]);

  useEffect(() => {
    if (Array.isArray(dataArr)) {
      const freeItems = dataArr.filter((el) => el.reserv !== 'занято');
      if (master) {
        setCorrectArr(dataArr);
      } else {
        setCorrectArr(freeItems);
      }
    }
  }, [dataArr, master]);

  const items = useMemo<React.ReactNode[]>(() => {
    if (!Array.isArray(correctArr)) {
      return [<div key="loading">Loading...</div>];
    }
console.log(windowChange)
    return correctArr.map((el: DataItem) => (
      <li
        className={styles.freeTime__item}
        style={el.reserv === 'занято' && !selectedItemId
          ? { marginBottom: '30px', backgroundColor: 'red', cursor: 'pointer' }
          : { marginBottom: '30px', backgroundColor: selectedItemId === el._id ? 'green' : 'transparent', cursor: 'pointer' }}
        key={el._id}
        onClick={() => {
          dispatch(setitemId(el._id))
          //setIsItemId(el._id);
          openModal();
        }}
      >
        <p className={styles.freeTime__item_text}>
          {el.date.slice(8)}.{el.date.slice(5, 7)}
        </p>
        <p className={styles.freeTime__item_text}>
          <span className={styles.freeTime__item_span}>Время:</span> {el.time}
        </p>
        {el.clientName ? (
          <p className={styles.freeTime__item_text}>
            <span className={styles.freeTime__item_span}>Клиент:</span> {el.clientName}
          </p>
        ) : ''}
      </li>
    ));
  }, [correctArr, selectedItemId, windowChange]);

  return (
    <div className={styles.freeTime__container} onClick={handleContainerClick}>
      <div className={styles.freeTime__block}>
        <p className={styles.freeTime__title}>Свободные окошки</p>
        <ul className={styles.freeTime__list}>{items}</ul>
        {master ? <button onClick={() => { openModal(); btnCreateChange(); }} className={styles.freeTime__create_btn}>Добавить окошко</button> : ''}
      </div>
      {modalChange && (
        <Modal
          text={!master || !createBtnMarker ? "Выберите действие" : "Создать запись"}
          masterMarker={master}
          onReserv={() => handleItemReserv(isItemId, client)}
          onClose={closeModal}
        />
      )}
    </div>
  );
};

export default FreeTime;