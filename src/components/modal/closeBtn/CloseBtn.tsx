'use client';

import React from "react";
import styles from './close-btn.module.css';
import { useDispatch } from "react-redux";

import { stateModalRemove } from "@/app/GlobalRedux/modalOpenSlice";

const CloseBtnModal = ()=>{
   
    const dispatch = useDispatch();

    const onClose = () => {
dispatch(stateModalRemove())
    }
    return(
        <button className={styles.close_btn_modal} onClick={onClose}>закрыть</button>
    )
}
export default CloseBtnModal;