import React from 'react';
import SwiperCore, {
  Autoplay,
  Controller,
  EffectFade,
  Navigation,
  Pagination,
  Scrollbar,
} from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';

SwiperCore.use([
  EffectFade,
  Pagination,
  Scrollbar,
  Navigation,
  Controller,
  Autoplay,
]);

import styles from './Slider.module.scss';

const Slider: React.FunctionComponent<Swiper> = props => {
  return (
    <div className={styles['slider']}>
      <Swiper {...props}>
        {React.Children.map(props.children, child => (
          <SwiperSlide>{child}</SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Slider;
