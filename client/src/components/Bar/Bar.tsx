import Item from '@components/Item/Item';
import Slider from '@components/Slider/Slider';
import React from 'react';

import styles from './bar.module.scss';

interface IBar {
  title?: string;
  items: any[];
}

const Bar: React.FC<IBar> = props => {
  const { title, items } = props;

  return (
    <div className={styles['bar-wrap']}>
      {title && <h2 className={styles.bar__title}>{title}</h2>}
      <div className={styles.bar}>
        <Slider
          watchOverflow
          slidesPerView='auto'
          navigation={{
            disabledClass: styles.disabled,
          }}
        >
          {items.map(el => (
            <div key={el.id} className={styles.bar__item}>
              <Item />
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default Bar;
