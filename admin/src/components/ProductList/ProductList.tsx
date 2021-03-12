import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { selectGeoCity } from '@redux/reducer/application/geo';
import {
  deleteProduct,
  getProducts,
  selectProductList,
} from '@redux/reducer/product';
import { Product } from '@src/interface';
import { Button } from '@verevinds/ui-kit';
import { DateTime } from 'luxon';
import { useRouter } from 'next/router';
import React, { SyntheticEvent, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import styles from './product.module.scss';

const ProductList = () => {
  const dispatch = useDispatch();

  const router = useRouter();
  const products = useSelector(selectProductList);
  const handleDelete = (id: Product['_id']) => async () => {
    dispatch(deleteProduct(id));
  };

  const city = useSelector(selectGeoCity);

  useEffect(() => {
    dispatch(getProducts());
  }, [city]);
  const handleClick = (id: Product['_id']) => (e: SyntheticEvent) => {
    e.preventDefault();
    router.push(`product/?type=update&id=${id}`);
  };
  return (
    <>
      <h3>Список товаров</h3>
      <div className={styles['list']}>
        <h4>Изображение</h4>
        <h4>Название</h4>
        <h4>Бренд</h4>
        <h4>Тип</h4>
        <h4>Дата созданию</h4>
        <h4>Дата обновления</h4>
        <h4>Инструменты</h4>
        {products.map(product => (
          <React.Fragment key={product._id}>
            <picture>
              {/* <source
                srcSet={
                  product.images.length
                    ? `${product.images[0].url.substr(
                        0,
                        product.images[0].url.lastIndexOf('.'),
                      )}.avif`
                    : '/svg/no-camera.svg'
                }
                type='image/avif'
              /> */}
              <source
                srcSet={
                  product.images.length
                    ? `${product.images[0].url.substr(
                        0,
                        product.images[0].url.lastIndexOf('.'),
                      )}.webp`
                    : '/svg/no-camera.svg'
                }
                type='image/webp'
              />
              <img
                src={
                  product.images.length
                    ? product.images[0].url
                    : '/svg/no-camera.svg'
                }
                alt={product.name}
                className={styles['img']}
              />
            </picture>
            <span>{product.name}</span>
            <span>{product.brand?.name}</span>
            <span>{product.type}</span>
            <span>
              {DateTime.fromISO(product.createdAt)
                .setLocale('ru')
                .toFormat('dd.MM.yy HH:mm')}
            </span>
            <span>
              {DateTime.fromISO(product.updatedAt)
                .setLocale('ru')
                .toFormat('dd.MM.yy HH:mm')}
            </span>
            <div>
              <Button
                type='button'
                aria-label='Удалить'
                onClick={handleDelete(product._id)}
                data-tip
                data-for={product['_id']}
                icon={<FontAwesomeIcon icon={faTrash} />}
                variant='outline-danger'
              />
              <Button
                type='button'
                aria-label='Удалить'
                onClick={handleClick(product['_id'])}
                data-tip
                data-for={product['_id']}
                icon={<FontAwesomeIcon icon={faEdit} />}
                variant='outline-info'
              />
            </div>
          </React.Fragment>
        ))}
      </div>
    </>
  );
};

export default ProductList;
