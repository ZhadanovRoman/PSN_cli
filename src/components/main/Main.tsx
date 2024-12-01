import React from 'react';
import styles from './main.module.css';
import firstImg from '../../../public/Images/blueHN.jpg';
import secondImg from '../../../public/Images/greenLightHN.jpg';
import thirdImg from '../../../public/Images/redFN.jpg';
import Link from 'next/link';
import Image from 'next/image';
import Map from '../map/Map';
import Slider from './slider/Slider';
import Parallax from './parallax/Parallax';

import slider1pic1 from '../../../public/Images/pinkHN.jpg';
import slider1pic2 from '../../../public/Images/redFenchHN.jpg';
import slider1pic3 from '../../../public/Images/greenHN.jpg';
import slider1pic4 from '../../../public/Images/greenLightHN.jpg';
import slider1pic5 from '../../../public/Images/greyHN.jpg';
import slider1pic6 from '../../../public/Images/lightHN.jpg';

import slider2pic1 from '../../../public/Images/pinkFN.jpg';
import slider2pic2 from '../../../public/Images/red2FN.jpg';
import slider2pic3 from '../../../public/Images/redFN.jpg';
import Firefly from '../firefly/FireFly';
export default function Main() {
    // Массивы для картинок слайдеров
    const slider1Images = [slider1pic1, slider1pic2, slider1pic3, slider1pic4, slider1pic5, slider1pic6];
    const slider2Images = [slider2pic1, slider2pic2, slider2pic3];

    return (
        <main className={styles.main}>
            
            <section className={styles.hero}>
            <Firefly/>
                <div className={`${styles.hero__container} container`}>
                    
                    <h1 className={styles.hero__seo}>маникюр педикюр севастополь ул.Шевченко наращивание ногтей гельлак</h1>
                    <div className={styles.hero__descr}>
                        <strong className={styles.hero__descr_title}>
                            Счастье нельзя купить, но можно прийти на маникюр!
                        </strong>
                        <span className={styles.hero__descr_line}></span>
                        <p className={styles.hero__descr_txt}>
                            зарегистрируйся и получи скидку 10% на свою первую процедуру
                        </p>
                        <Link href="/personalRegistr" className={styles.hero__descr_btn}>
                            скидка 10%
                        </Link>
                    </div>
                    <div className={styles.hero__images}>
                       <Image src={firstImg.src} alt="маникюр Севастополь" className={styles.hero__img} width={300} height={300} /> 
                        <Image src={secondImg.src} alt="маникюр ул.Шевченко" className={styles.hero__img} width={300} height={300} />
                        <Image src={thirdImg.src} alt="педикюр шевченко" className={styles.hero__img} width={300} height={300} />
                    </div>
                </div>
            </section>

            <section className={styles.gallery}>
            
                <div className={styles.gallery__container}>
                    <h3 className={`${styles.gallery__container_title} container `}>
                        наши работы
                    </h3>
                    <div className={styles.gallery__top}>
                    <Firefly/>
                        <div className={styles.gallery__top_block}>
                            <h2 className={`${styles.gallery__top_title} container`}>маникюр</h2>
                            <p className={`${styles.gallery__top_descr} container`}>- Гигиенический маникюр (без покрытия) -900₽</p>
                            <p className={`${styles.gallery__top_descr} container`}>- Маникюр с покрытием (гигиенический маникюр + покрытие гель-лаком) -1500₽</p>
                            <p className={`${styles.gallery__top_descr} container`}>- Маникюр с покрытием обычным лаком -1000₽</p>
                        </div>


                        <Slider images={slider1Images} />
                    </div>
                    <Parallax />
                  
                    <div className={styles.gallery__bottom}>
                    
                        <div className={styles.gallery__top_block}>
                            <h2 className={`${styles.gallery__bottom_title} container`}>педикюр</h2>
                            <p className={`${styles.gallery__top_descr} container`}>- педикюр гигиенический (обработка пальчиков или стоп) -900₽</p>
                            <p className={`${styles.gallery__top_descr} container`}>- педикюр гигиенический (обработка пальчиков и стоп) -1600₽</p>
                            <p className={`${styles.gallery__top_descr} container`}>- педикюр с покрытием гель-лаком (обработка пальчиков + покрытие гель-лаком+ обработка стоп) -2000₽</p>
                            <p className={`${styles.gallery__top_descr} container`}>- педикюр с покрытием обычным лаком (обработка пальчиков + покрытие обычный лаком + стопы) -1700₽</p>
                            <p className={`${styles.gallery__top_descr} container`}>- педикюр с покрытием обычным лаком (обработка пальчиков + покрытие обычным лаком) -1000₽</p>
                        </div>


                        <Slider images={slider2Images} />
                    </div>
                </div>
            </section>

            <section className={styles.map} id='mapSection'>
            
                <div className={styles.map__container}>
                    <div className={styles.map__address}>
                        <h3 className={styles.map__title}>Мастер ведет прием<br></br> по адресу :</h3>
                        <p className={styles.map__paragraph}>Севастополь, Шевченко 8Г</p>
                        <h3 className={styles.map__title}> Часы приема: </h3>
                        <p className={styles.map__paragraph}>с 8:00 до 21:00</p>
                        <span>*записаться на прием можно через личный кабинет после регистрации на сайте*</span>
                    </div>
                    <Map />
                </div>
            </section>
        </main>
    );
}