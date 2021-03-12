import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  deletePortfolio,
  Portfolio,
  selectPortfolioList,
} from '@redux/reducer/portfolio';
import { Button } from '@verevinds/ui-kit';
import { useDispatch, useSelector } from 'react-redux';

import styles from './portfoliolist.module.scss';

const ProductList = () => {
  const dispatch = useDispatch();

  const images = useSelector(selectPortfolioList);
  const handleDelete = (id: Portfolio['_id']) => async () => {
    dispatch(deletePortfolio(id));
  };
  return (
    <>
      <h3>Список изображений</h3>
      <div className={styles['block']}>
        {images.map(image => (
          <div key={image._id} className={styles['banner']}>
            <div className={styles['header']}>
              <span />
              <Button
                type='button'
                aria-label='Удалить'
                onClick={handleDelete(image._id)}
                data-tip
                data-for={image['_id']}
                icon={<FontAwesomeIcon icon={faTrash} />}
                variant='outline-danger'
              />
            </div>
            <picture>
              {/* <source
              srcSet={`${image.url.substr(0, image.url.lastIndexOf('.'))}.avif`}
              type='image/avif'
            /> */}
              <source
                srcSet={`${image.url.substr(
                  0,
                  image.url.lastIndexOf('.'),
                )}.webp`}
                type='image/webp'
              />
              <img src={image.url} alt={image._id} className={styles['img']} />
            </picture>
          </div>
        ))}
      </div>
    </>
  );
};

export default ProductList;
