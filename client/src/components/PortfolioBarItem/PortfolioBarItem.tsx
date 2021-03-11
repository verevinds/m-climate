import { Portfolio } from '@redux/reducer/portfolio';
import React from 'react';

import styles from './portfoliobaritem.module.scss';

type ItemProps = {
  item: Portfolio;
};

const BarItem: React.FC<ItemProps> = ({ item }) => {
  const { url, _id } = item;

  return (
    <div className={styles.item}>
      <div className={styles['item__img-wrap']}>
        <picture className={styles['item__img']}>
          <source
            srcSet={
              url && url !== '/svg/no-camera.svg'
                ? `${url.substr(0, url.lastIndexOf('.'))}.avif`
                : '/svg/no-camera.svg'
            }
            type='image/avif'
          />
          <source
            srcSet={
              url && url !== '/svg/no-camera.svg'
                ? `${url.substr(0, url.lastIndexOf('.'))}.webp`
                : '/svg/no-camera.svg'
            }
            type='image/webp'
          />
          <img
            src={url || '/svg/no-camera.svg'}
            alt={_id}
            className={styles['item__img']}
            loading='lazy'
          />
        </picture>
      </div>
    </div>
  );
};

export default BarItem;
