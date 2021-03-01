import type { Product } from '@src/interface';
import { Service } from '@src/interface';
import ActiveLink from '@src/utils/ActiveLink';
import React from 'react';

import styles from './item.module.scss';

type ItemWrapProps = {
  image: string;
  name: string;
  price?: number;
  priceOld?: number;
};
const ItemWrap: React.FC<ItemWrapProps> = props => {
  const { name, image, price, priceOld, children } = props;
  return (
    <div className={styles.item}>
      <div className={styles['item__img-wrap']}>
        <img
          src={image || '/svg/no-camera.svg'}
          className={styles.item__img}
          alt={name}
        />
      </div>
      {price && (
        <div className={styles.item__price}>
          <span className={styles['item__price-current']}>{price}</span>
          {priceOld ? (
            <span className={styles['item__price-old']}>{priceOld}</span>
          ) : null}
        </div>
      )}
      <div className={styles['item__title-wrap']}>{children}</div>
    </div>
  );
};

type ItemProps = {
  item: Product | Service;
};

const BarItem: React.FC<ItemProps> = ({ item }) => {
  const currentItem = item as Product;

  if (currentItem.images) {
    const { images, name, price, priceOld } = item as Product;

    return (
      <ItemWrap
        {...{
          image: images.length ? images[0].url : '/svg/no-camera.svg',
          name,
          price,
          priceOld,
        }}
      >
        <ActiveLink href={`/product/${item._id}`}>
          <a className={styles.item__title}>{name}</a>
        </ActiveLink>
      </ItemWrap>
    );
  }

  const { image, name } = item as Service;

  return (
    <ItemWrap {...{ image, name }}>
      <ActiveLink href={`/service/${item._id}`}>
        <a className={styles.item__title}>{name}</a>
      </ActiveLink>
    </ItemWrap>
  );
};

export default BarItem;
