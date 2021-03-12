import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { selectGeoCity } from '@redux/reducer/application/geo';
import {
  Banner,
  deleteBanners,
  getBanners,
  selectBannersList,
} from '@redux/reducer/banners';
import { Button } from '@verevinds/ui-kit';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import styles from './bannerslist.module.scss';

const ProductList = () => {
  const dispatch = useDispatch();

  const city = useSelector(selectGeoCity);
  useEffect(() => {
    dispatch(getBanners());
  }, [city]);

  const banners = useSelector(selectBannersList);
  const handleDelete = (id: Banner['_id']) => async () => {
    dispatch(deleteBanners(id));
  };
  return (
    <>
      <h3>Список баннеров</h3>
      {banners.map(banner => (
        <div key={banner._id} className={styles['banner']}>
          <div className={styles['header']}>
            <h5 className={styles['name']}>{banner.name}</h5>
            <Button
              type='button'
              aria-label='Удалить'
              onClick={handleDelete(banner._id)}
              data-tip
              data-for={banner['_id']}
              icon={<FontAwesomeIcon icon={faTrash} />}
              variant='outline-danger'
            />
          </div>
          <picture>
            {/* <source
              srcSet={`${banner.url.substr(
                0,
                banner.url.lastIndexOf('.'),
              )}.avif`}
              type='image/avif'
            /> */}
            <source
              srcSet={`${banner.url.substr(
                0,
                banner.url.lastIndexOf('.'),
              )}.webp`}
              type='image/webp'
            />
            <img src={banner.url} alt={banner.name} className={styles['img']} />
          </picture>
        </div>
      ))}
    </>
  );
};

export default ProductList;
