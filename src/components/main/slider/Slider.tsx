
/*
"use client";
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.css';
import styles from './slider.module.css';
import { Navigation, Pagination, Scrollbar, Autoplay, A11y } from 'swiper/modules';

import Image, { StaticImageData } from 'next/image';

interface ISlider {
  images: StaticImageData[];
}

const Slider: React.FC<ISlider> = ({ images }) => {
  return (
    <Swiper
      className={styles.swiper}
      loop={true}
      spaceBetween={0}
      slidesPerView={1}
      modules={[Navigation, Pagination, Scrollbar, Autoplay, A11y]}
     /* navigation={{
        prevEl: '.swiper-button-prev',
        nextEl: '.swiper-button-next',
      }}
      autoplay={{
        delay: 2500,
        disableOnInteraction: false, 
      }}
      speed={1500}
      pagination={{ clickable: true }}
    >
      {images.map((image, index) => (
        <SwiperSlide key={index} className={styles.swiper__slide}>
          <Image className={styles.swiper__slide_img} src={image} alt="маникюр севастополь, педикюр севастополь, маникюр шевченко" />
        </SwiperSlide>
      ))}
      <div className={`swiper-button-prev ${styles.customPrev}`}></div>
      <div className={`swiper-button-next ${styles.customNext}`}></div>
    </Swiper>
  );
};

export default Slider;*/

"use client";
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.css';
import styles from './slider.module.css';
import { Navigation, Pagination, Scrollbar, Autoplay, A11y } from 'swiper/modules';
import Image, { StaticImageData } from 'next/image';
import { useEffect, useRef, useState } from 'react';

interface ISlider {
  images: StaticImageData[];
}

const Slider: React.FC<ISlider> = ({ images }) => {
  const sliderRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            observer.unobserve(entry.target); // Отключаем наблюдение после появления
          }
        });
      },
      { threshold: 0.2 } // Анимация срабатывает, когда 20% элемента видны
    );

    if (sliderRef.current) {
      observer.observe(sliderRef.current);
    }

    return () => {
      observer.disconnect(); // Чистим наблюдатель
    };
  }, []);

  return (
    <div
      ref={sliderRef}
      className={`${styles.sliderWrapper} ${isVisible ? styles.animate : ''}`}
    >
      <Swiper
        className={styles.swiper}
        loop={true}
        spaceBetween={0}
        slidesPerView={1}
        modules={[Navigation, Pagination, Scrollbar, Autoplay, A11y]}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        speed={1500}
        pagination={{ clickable: true }}
      >
        {images.map((image, index) => (
          <SwiperSlide key={index} className={styles.swiper__slide}>
            <Image
              className={styles.swiper__slide_img}
              src={image}
              alt="маникюр севастополь, педикюр севастополь, маникюр шевченко"
            />
          </SwiperSlide>
        ))}
        <div className={`swiper-button-prev ${styles.customPrev}`}></div>
        <div className={`swiper-button-next ${styles.customNext}`}></div>
      </Swiper>
    </div>
  );
};

export default Slider;
