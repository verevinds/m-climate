import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { EffectFade } from 'swiper';

SwiperCore.use([EffectFade]);
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
