import type { Product } from '@redux/reducer/product';
import React from 'react';

import styles from './item.module.scss';

type ItemProps = {
  item: Product;
};
const BarItem: React.FC<ItemProps> = ({ item }) => {
  const { images, name, price, priceOld } = item;
  return (
    <div className={styles.item}>
      <div className={styles['item__img-wrap']}>
        <img
          src={images.length ? images[0].url : '//via.placeholder.com/150x166'}
          className={styles.item__img}
          alt={name}
        />
      </div>
      <div className={styles.item__price}>
        <span className={styles['item__price-current']}>{price}</span>
        <span className={styles['item__price-old']}>{priceOld}</span>
      </div>
      <div className={styles['item__title-wrap']}>
        <a href='#' className={styles.item__title}>
          {name}
        </a>
      </div>
    </div>
  );
};

export default BarItem;
