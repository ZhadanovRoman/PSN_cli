"use client";

import React, { useMemo, useState, useEffect, useCallback } from "react";
import useGetData from "@/hooks/useGetData";
import styles from './free-time.module.css';
import jwt from 'jsonwebtoken';
import itemReserv from "@/hooks/useItemReserv";
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

interface Client {
  clientName: string;
  clientId: string;
}

const FreeTime: React.FC = () => {
  const dataArr = useGetData();
  const [correctArr, setCorrectArr] = useState<DataItem[]>([]);
  const [selectedItemId, setSelectedItemId] = useState<string | null>(null);
  const [client, setClient] = useState<Client | null>(null);
  const [master, setMaster] = useState<boolean>(false);
  const [masterCrypt, setMasterCrypt] = useState<string | null>(null);

  const createBtnMarker = useSelector((state: RootState) => state.createBtn.value);
  const isItemId = useSelector((state: RootState) => state.itemId.value);
  const modalChange = useSelector((state: RootState) => state.modalChange.value);
  const [reservedItem, setReservedItem] = useState<DataItem | null>(null);
  const masterKey: string | undefined = process.env.NEXT_PUBLIC_MASTER_KEY;
  const dispatch = useDispatch();


  const openModal = useCallback(() => {
    dispatch(stateModalChange());
  }, [dispatch]);

  const closeModal = useCallback(() => {
    dispatch(stateBtnRemove());
    dispatch(stateModalRemove());
  }, [dispatch]);

  const btnCreateChange = useCallback(() => {
    dispatch(stateBtnChange());
  }, [dispatch]);

  const handleItemReserv = useCallback(
    async (id: string, clientName: string, clientId: string) => {
      try {
        await itemReserv(id, clientName, clientId);
        setSelectedItemId(id);

        setCorrectArr(prevArr =>
          prevArr.map(item =>
            item._id === id ? { ...item, reserv: 'занято', clientName } : item
          )
        );

        dispatch(stateWindowChange());
      } catch (error) {
        console.error("Error reserving item:", error);
      }
    },
    [dispatch]
  );

  const token: IToken | null | undefined = useMemo(() => {
    if (typeof window !== "undefined") {
      setMasterCrypt(localStorage.getItem('masterCrypt'));
      const clientData: string | null = localStorage.getItem('clientData');
      if (clientData) {
        return jwt.decode(clientData) as IToken;
      }
    }
  }, []);

  useEffect(() => {
    if (token?.clientName) {
      setClient({ clientName: token.clientName, clientId: token._id });
    }

    if (masterCrypt && masterKey) {
      bcrypt.compare(masterKey, masterCrypt, (err, isMatch) => {
        if (err) {
          console.error(err);
        } else if (isMatch) {
          setMaster(true);
        } else {
          console.log('Пароль не совпадает!');
        }
      });
    }

    if (Array.isArray(dataArr)) {
      const freeItems = dataArr.filter((el) => el.reserv !== 'занято');
      const reservedItemArr = dataArr.filter((el) => el.clientId === token?._id);
      setReservedItem(reservedItemArr[0])
      setCorrectArr(master ? dataArr : freeItems);
    }
  }, [token, masterCrypt, masterKey, dataArr, master]);


  const items = useMemo<React.ReactNode[]>(() => {

    if (!Array.isArray(correctArr)) {
      return [<div key="loading">Loading...</div>];
    }
    return correctArr.map((el: DataItem) => (
      <li
        className={styles.freeTime__item}
        style={el.reserv === 'занято' && !selectedItemId
          ? { marginBottom: '30px', backgroundColor: 'red', cursor: 'pointer' }
          : { marginBottom: '30px', backgroundColor: selectedItemId === el._id ? 'green' : 'transparent', cursor: 'pointer' }}
        key={el._id}
        onClick={() => {
          dispatch(setitemId(el._id));
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
  }, [correctArr, selectedItemId, openModal, dispatch]);

  return (
    <div className={styles.freeTime__container} onClick={() => setSelectedItemId(null)}>
      <div className={styles.freeTime__block}>
        <p className={styles.freeTime__title}>Свободные окошки</p>

        <ul className={styles.freeTime__list}>{items}</ul>
        {master && (
          <button onClick={() => { openModal(); btnCreateChange(); }} className={styles.freeTime__create_btn}>
            Добавить окошко
          </button>
        )}
        {!master && ( // если мастеру нужно видить окна которые он забронировал то нужно убрать !master
          <strong className={styles.freeTime__reserv}>Вы записаны на прием ! <br></br>
            {reservedItem ? [`дата  ${reservedItem.date}`, ' ', `время ${reservedItem.time}`] : ''}
          </strong>
        )
        }
      </div>


      {modalChange && (
        <Modal
          text={!master || !createBtnMarker ? "Выберите действие" : "Создать запись"}
          masterMarker={master}
          onReserv={() => {
            if (client) handleItemReserv(isItemId, client.clientName, client.clientId)
          }}
          onClose={closeModal}
        />
      )}
    </div>
  );
};

export default FreeTime;