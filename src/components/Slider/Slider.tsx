import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { EffectFade } from 'swiper';
import { isMobile } from 'react-device-detect';

SwiperCore.use([EffectFade]);
import styles from './Slider.module.scss';

const Slider = () => {
    const big = '//via.placeholder.com/1900x300';
    const small = '//via.placeholder.com/375x300';

    if (!process.browser) return null;

    return (
        <div className={styles['slider']}>
            <Swiper
                watchOverflow={true}
                loop={true}
                slidesPerView={1}
                onSlideChange={() => console.log('slide change')}
                onSwiper={(swiper) => console.log(swiper)}
                navigation
                pagination={{ clickable: true }}
            >
                <SwiperSlide>
                    <img
                        src={isMobile ? small : big}
                        className={styles['slider__img']}
                    />
                </SwiperSlide>
                <SwiperSlide>
                    <img
                        src={isMobile ? small : big}
                        className={styles['slider__img']}
                    />
                </SwiperSlide>
                <SwiperSlide>
                    <img
                        src={isMobile ? small : big}
                        className={styles['slider__img']}
                    />
                </SwiperSlide>
                <SwiperSlide>
                    <img
                        src={isMobile ? small : big}
                        className={styles['slider__img']}
                    />
                </SwiperSlide>
            </Swiper>
        </div>
    );
};

export default Slider;
