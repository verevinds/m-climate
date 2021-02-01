import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { EffectFade, Pagination, Scrollbar, Navigation } from 'swiper';

SwiperCore.use([EffectFade, Pagination, Scrollbar, Navigation]);

import styles from './Slider.module.scss';

const Slider: React.FunctionComponent<Swiper> = (props) => {
    return (
        <div className={styles['slider']}>
            <Swiper {...props}>
                {React.Children.map(props.children, (child) => (
                    <SwiperSlide>{child}</SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
};

export default Slider;
