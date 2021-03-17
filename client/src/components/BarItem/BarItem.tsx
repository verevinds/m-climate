import Modal from '@components/Modal';
import Spinner from '@components/Spinner/Spinner';
import Times from '@public/svg/times.svg';
import type { Product, ProductZip } from '@src/interface';
import { Service } from '@src/interface';
import ActiveLink from '@src/utils/ActiveLink';
import addCommas from '@src/utils/addCommas';
import cn from 'classnames';
import dynamic from 'next/dynamic';
import React, { useState } from 'react';

import styles from './baritem.module.scss';

const Img = dynamic(() => import('@components/Img'), {
  loading: () => <Spinner inContainer />,
  ssr: false,
});

type ItemWrapProps = {
  image?: string;
  name: string;
  price?: number;
  priceOld?: number;
  servicedArea?: string;
  brand?: {
    _id: string;
    name: string;
  };
  isService?: boolean;
  type?: string;
};
const ItemWrap: React.FC<ItemWrapProps> = props => {
  const {
    name,
    image,
    price,
    priceOld,
    children,
    isService,
    brand,
    servicedArea,
    type,
  } = props;
  const [show, toogleShow] = useState(false);
  const handleView = () => toogleShow(true);
  const handleHide = () => toogleShow(false);
  return (
    <>
      <div className={styles.item}>
        <span className={styles['type']}>{type}</span>
        <div className={styles['img-wrap']}>
          <Img
            src={image}
            alt={name}
            className={cn(styles['img'], !isService && styles['crsr-zoom'])}
            loading='lazy'
            onClick={handleView}
          />
        </div>

        <span className={styles['brand']}>{brand?.name}</span>
        {servicedArea ? (
          <span className={styles['area']}>
            {`Обслуживаемая площадь ${servicedArea}м`}
            <sup>2</sup>
          </span>
        ) : null}
        <div className={styles['item__title-wrap']}>{children}</div>
        {price && (
          <div className={styles.item__price}>
            <span className={styles['item__price-current']}>
              {addCommas(price)}
            </span>
            {priceOld ? (
              <span className={styles['item__price-old']}>
                {addCommas(priceOld)}
              </span>
            ) : null}
          </div>
        )}
      </div>
      {isService ? null : (
        <Modal show={show} onClose={handleHide}>
          <div className={styles['modal']}>
            <Times className={styles['exit-button']} onClick={handleHide} />
            <h2>{name}</h2>
            <Img
              src={image}
              alt={name}
              className={styles['img-modal']}
              loading='lazy'
            />
          </div>
        </Modal>
      )}
    </>
  );
};

type ItemProps = {
  item: Product | Service | ProductZip;
};

const BarItem: React.FC<ItemProps> = ({ item }) => {
  const currentItem = item as Product & ProductZip;

  if (currentItem.images) {
    const {
      images,
      name,
      price,
      priceOld,
      brand,
      servicedArea,
      type,
    } = item as Product;

    return (
      <ItemWrap
        {...{
          image: images.length ? images[0].url : undefined,
          name,
          price,
          priceOld,
          brand,
          servicedArea,
          type,
        }}
      >
        <ActiveLink
          href={`/product/${item._id}`}
          activeClassName={styles['active']}
        >
          <a className={styles.item__title}>{name}</a>
        </ActiveLink>
      </ItemWrap>
    );
  }

  if (currentItem.price) {
    const {
      images,
      name,
      price,
      priceOld,
      brand,
      servicedArea,
      type,
    } = item as ProductZip;

    return (
      <ItemWrap
        {...{ images, name, price, priceOld, brand, servicedArea, type }}
      >
        <ActiveLink
          href={`/product/${item._id}`}
          activeClassName={styles['active']}
        >
          <a className={styles.item__title}>{name}</a>
        </ActiveLink>
      </ItemWrap>
    );
  }

  const { image, name } = item as Service;

  return (
    <ItemWrap {...{ image, name, isService: true }}>
      <ActiveLink
        href={`/service/${item._id}`}
        activeClassName={styles['active']}
      >
        <a className={styles.item__title}>{name}</a>
      </ActiveLink>
    </ItemWrap>
  );
};

export default BarItem;
