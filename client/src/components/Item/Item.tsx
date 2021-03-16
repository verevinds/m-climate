import Img from '@components/Img';
import type { Product } from '@src/interface';
import addCommas from '@utils/addCommas';
import NavLink from 'next/link';

import styles from './item.module.scss';

const Item: React.FC<{ product: Product & { image?: string } }> = ({
  product,
}) => {
  const { _id, name, images, price, priceOld, brand, type, image } = product;

  return (
    <NavLink href={`/product/${_id}`}>
      <div className={styles['item']}>
        <div className={styles['label']}>
          <span className={styles['type']}>{type}</span>
        </div>
        <Img
          src={images && images.length ? images[0].url : image}
          alt={name}
          className={styles['img']}
        />
        <div className={styles['label']}>
          <span>{brand?.name}</span>
        </div>
        <span className={styles['name']}>{name}</span>
        <div className={styles['price']}>
          <span className={styles['price-current']}>
            {`${addCommas(price)} ₽`}
          </span>
          {priceOld && (
            <span className={styles['price-old']}>
              {`${addCommas(priceOld)} ₽`}
            </span>
          )}
        </div>
      </div>
    </NavLink>
  );
};
export default Item;
