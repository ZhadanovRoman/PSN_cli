"use client";
import styles from './footer.module.css';

const Footer = ()=>{
    return (
        <footer className={styles.footer}>
            <div className={`${styles.footer__container} container`}>
               <address className={styles.footer__address}>
                 <span className={styles.footer__address_txt} itemProp="streetAddress">Севастополь, ул.Шевченко 8г. </span>
                 <a className={styles.footer__address_link} href="https://t.me/Katyaatyaaaa" target="_blank" rel="noopener noreferrer"> Телефон: +7 (978) 650-40-10</a>
                 <a className={styles.footer__address_link} href="mailto:info@example.com"> Email: sweetdreams.zh1@gmail.com</a>
               </address>
               <a className={styles.footer__dev_link} href="https://t.me/RZhadanov1" target="_blank" rel="noopener noreferrer">
               development by Zhadanov Roman</a>
            </div>
        </footer>
    )
}

export default Footer;