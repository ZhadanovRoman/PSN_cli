import styles from './header.module.css';
import Link from 'next/link';
import Image from 'next/image'; 
import logo from '../../../public/icons/logo.png';

import { useDispatch } from 'react-redux';

import { stateChange, stateRemove } from '@/app/GlobalRedux/loginSlice';



const Header: React.FC = () => {
 
 const dispatch = useDispatch();

    const handleRegisterClick = () => {
       dispatch(stateChange())
    };

  const handleLoginClick = () => {
    dispatch(stateRemove())
    };

    return (
        <header className={styles.header}>
           
            <div className={`${styles.header__container} container`}>
                   
            <div className={styles.header__logo_block}>
                <Image className={styles.header__logo} src={logo.src} alt="logo" width={100} 
                            height={100} aria-label="ProStudioNails"/>
                            <a className={styles.header__phone} href="https://t.me/Katyaatyaaaa" target="_blank" rel="noopener noreferrer">+7 (978) 650-40-10</a>
                </div>
                
                <nav className={styles.header__nav} aria-label="Main navigation">
                    <ul className={styles.header__nav_list}>
                        <li className={styles.header__nav_item}>
                            <Link href='#' className={styles.header__nav_link}>о нас</Link>
                        </li>
                        <li className={styles.header__nav_item}>
                            <Link href='#mapSection' className={styles.header__nav_link}>где мы находимся</Link>
                        </li>
                        <li className={styles.header__nav_item}>
                            <Link href='#' className={styles.header__nav_link}>наши работы</Link>
                        </li>
                        <li className={styles.header__nav_item}>
                            <Link href='#' className={styles.header__nav_link}>контакты</Link>
                        </li>
                    </ul>
                </nav>
               
                
                <nav aria-label="User actions" className={styles.header__auth_block}>
                    <ul className={styles.header__auth_list}>
                        <li className={styles.header__auth_item}><Link className={styles.header__auth_link} href="/auth" onClick={handleLoginClick}>войти</Link></li>
                        <li className={styles.header__auth_item}><Link className={styles.header__auth_link} href="/auth" onClick={handleRegisterClick}>зарегистрироваться</Link></li>
                    </ul>
                </nav>
            </div>
        </header>
    )
}

export default Header;

