import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { EffectFade } from 'swiper';

SwiperCore.use([EffectFade]);
import styles from './Slider.module.scss';

const Slider = () => {
    return (
        <div className={styles['slider']}>
            <Swiper
                watchOverflow={true}
                loop={true}
                slidesPerView={1}
                onSlideChange={() => console.log('slide change')}
                onSwiper={(swiper) => console.log(swiper)}
                pagination={{ clickable: true }}
            >
                <SwiperSlide>
                    <img src="//via.placeholder.com/1900x300" />
                </SwiperSlide>
                <SwiperSlide>
                    <img src="//via.placeholder.com/1900x300" />
                </SwiperSlide>
                <SwiperSlide>
                    <img src="//via.placeholder.com/1900x300" />
                </SwiperSlide>
                <SwiperSlide>
                    <img src="//via.placeholder.com/1900x300" />
                </SwiperSlide>
            </Swiper>
        </div>
    );
};

export default Slider;
