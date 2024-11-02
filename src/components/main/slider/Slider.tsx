/*"use client";
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.css';
import styles from './slider.module.css';
import { Navigation, Pagination, Scrollbar, A11y} from 'swiper/modules';

import Image, { StaticImageData } from 'next/image';
import { inherits } from 'util';


interface ISlider {
  firstPic: StaticImageData;
  secondPic: StaticImageData;
  thirdPic: StaticImageData;
  fourthPic: StaticImageData;
  fifthPic: StaticImageData;
  sixthPic: StaticImageData;
}

const Slider: React.FC<ISlider> = ({ firstPic, secondPic, thirdPic, fourthPic, fifthPic, sixthPic }) => {
  return (
    <Swiper
      className={styles.swiper}
      loop={true}
      spaceBetween={0}
      slidesPerView={1}
      modules={[Navigation, Pagination, Scrollbar, A11y]}
      navigation={{
        prevEl: '.swiper-button-prev',
        nextEl: '.swiper-button-next',
      }}
      speed={600}
      pagination={{ clickable: true }}
    >
      <SwiperSlide className={styles.swiper__slide}>
        <Image className={styles.swiper__slide_img} src={firstPic} alt="слайд 1"  />
      </SwiperSlide>
      <SwiperSlide className={styles.swiper__slide}>
        <Image className={styles.swiper__slide_img} src={secondPic} alt="слайд 2"  />
      </SwiperSlide>
      <SwiperSlide className={styles.swiper__slide}>
        <Image className={styles.swiper__slide_img} src={thirdPic} alt="слайд 3"  />
      </SwiperSlide>
      <SwiperSlide className={styles.swiper__slide}>
        <Image className={styles.swiper__slide_img} src={fourthPic} alt="слайд 4"  />
      </SwiperSlide>
      <SwiperSlide className={styles.swiper__slide}>
        <Image className={styles.swiper__slide_img} src={fifthPic} alt="слайд 5"  />
      </SwiperSlide>
      <SwiperSlide className={styles.swiper__slide}>
        <Image className={styles.swiper__slide_img} src={sixthPic} alt="слайд 6"  />
      </SwiperSlide>
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
      }}*/
      autoplay={{
        delay: 2500,
        disableOnInteraction: false, 
      }}
      speed={1500}
      pagination={{ clickable: true }}
    >
      {images.map((image, index) => (
        <SwiperSlide key={index} className={styles.swiper__slide}>
          <Image className={styles.swiper__slide_img} src={image} alt={`слайд ${index + 1}`} />
        </SwiperSlide>
      ))}
      <div className={`swiper-button-prev ${styles.customPrev}`}></div>
      <div className={`swiper-button-next ${styles.customNext}`}></div>
    </Swiper>
  );
};

export default Slider;