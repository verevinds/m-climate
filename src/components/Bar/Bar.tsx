import Slider from '@components/Slider/Slider';
import styles from './Bar.module.scss';
import Item from '@components/Item/Item';
import React from 'react';

interface Bar {
    title?: string;
}

const Bar: React.FC<Bar> = (props) => {
    const { title } = props;

    return (
        <div className={styles['bar-wrap']}>
            {title && <h2 className={styles['bar__title']}>{title}</h2>}
            <div className={styles['bar']}>
                <Slider
                    watchOverflow={true}
                    slidesPerView={'auto'}
                    onSlideChange={() => console.log('slide change')}
                    onSwiper={(swiper) => console.log(swiper)}
                    navigation={{
                        disabledClass: styles['disabled'],
                    }}
                >
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((el) => (
                        <div className={styles['bar__item']}>
                            <Item />
                        </div>
                    ))}
                </Slider>
            </div>
        </div>
    );
};

export default Bar;
