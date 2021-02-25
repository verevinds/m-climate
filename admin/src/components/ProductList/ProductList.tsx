import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { deleteProduct, selectProductList } from '@redux/reducer/product';
import { Product } from '@src/interface';
import { Button } from '@verevinds/ui-kit';
import { DateTime } from 'luxon';
import { useDispatch, useSelector } from 'react-redux';

import styles from './product.module.scss';

const ProductList = () => {
  const dispatch = useDispatch();

  const products = useSelector(selectProductList);
  const handleDelete = (id: Product['_id']) => async () => {
    dispatch(deleteProduct(id));
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
          <>
            <img
              src={product.images[0].url}
              alt={product.name}
              className={styles['img']}
            />
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
            <Button
              type='button'
              aria-label='Удалить'
              onClick={handleDelete(product._id)}
              data-tip
              data-for={product['_id']}
              icon={<FontAwesomeIcon icon={faTrash} />}
              variant='outline-danger'
            />
          </>
        ))}
      </div>
    </>
  );
};

export default ProductList;
