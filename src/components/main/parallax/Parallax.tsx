"use client";
import React from 'react';
import styles from './parallax.module.css';

export default function Parallax() {
    return (
        <>
            <div className={styles.parallax__top}>
                <div></div>
                <div></div>
                <div></div>
            </div>
            <div className={styles.parallax}>
                <strong>ProStudioNails</strong>
            </div>
            <div className={styles.parallax__bottom}>
                <div></div>
                <div></div>
                <div></div>
            </div>
        </>
    )

}