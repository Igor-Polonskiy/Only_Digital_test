import React, { useRef, useEffect } from 'react';
import { Navigation } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import * as styles from './EventsSlider.module.scss';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import { EventsSliderProps } from './types';

const EventsSlider: React.FC<EventsSliderProps> = ({
  title,
  events,
}) => {
  const localRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = localRef.current;
    if (!el) return;
    el.classList.remove(styles.show);
    const timer = setTimeout(() => {
      el.classList.add(styles.show);
      clearTimeout(timer);
    }, 300);
  }, [title, events]);

  return (
    <div ref={localRef} className={styles.container}>
      <p className={styles.mobileTitle}>{title}</p>
      <button className={`${styles.btn} ${styles.btnPrev}`}></button>
      {
        <Swiper
          modules={[Navigation]}
          spaceBetween={80}
          slidesPerView={4}
          breakpoints={{
            320: {
              slidesPerView: 1.5,
              spaceBetween: 25,
            },
            769: {
              slidesPerView: 3,
              spaceBetween: 80,
            },
            1025: {
              slidesPerView: 4,
              spaceBetween: 80,
            },
          }}
          navigation={{
            prevEl: `.${styles.btnPrev}`,
            nextEl: `.${styles.btnNext}`,
          }}
          pagination={{ clickable: true }}
          scrollbar={{ draggable: true }}
        >
          {events.map((item, index) => {
            const { date, description } = item;
            return (
              <SwiperSlide key={index} className={styles.slide}>
                <p className={styles.year}>{date}</p>
                <p className={styles.description}>{description}</p>
              </SwiperSlide>
            );
          })}
        </Swiper>
      }
      <button className={`${styles.btn} ${styles.btnNext}`}></button>
    </div>
  );
};

export default EventsSlider;

