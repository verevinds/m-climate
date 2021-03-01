import Item from '@components/Item/Item';
import Slider from '@components/Slider/Slider';
import { Product, Service } from '@src/interface';
import React from 'react';

import styles from './bar.module.scss';

interface IBar {
  title?: string;
  items: (Product | Service)[];
}

const Bar: React.FC<IBar> = props => {
  const { title, items } = props;

  if (!items.length) return null;

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
          {items.map(item => (
            <div key={item._id} className={styles.bar__item}>
              <Item item={item} />
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default Bar;
