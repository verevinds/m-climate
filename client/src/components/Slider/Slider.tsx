import React from 'react';
import SwiperCore, {
  Autoplay,
  Controller,
  EffectFade,
  Navigation,
  Pagination,
} from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';

import styles from './slider.module.scss';

SwiperCore.use([EffectFade, Pagination, Navigation, Controller, Autoplay]);

const Slider: React.FunctionComponent<Swiper> = props => {
  const { children } = props;

  return (
    <div className={styles.slider}>
      <Swiper {...props}>
        {React.Children.map(children, child => (
          <SwiperSlide>{child}</SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Slider;
