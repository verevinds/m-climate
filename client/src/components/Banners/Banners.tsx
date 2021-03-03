import Slider from '@components/Slider/Slider';
import { getBanners, selectBannersList } from '@redux/reducer/banners';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import styles from './banners.module.scss';

const Banners = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getBanners());
  }, []);
  const banners = useSelector(selectBannersList);

  return (
    <Slider
      watchOverflow
      loop
      speed={500}
      effect='fade'
      autoplay
      slidesPerView={1}
      pagination={{ clickable: true }}
      className={styles['slider']}
    >
      {banners.map(banner => (
        <picture key={banner._id} className={styles['full-size']}>
          <source
            srcSet={`${banner.url.substr(0, banner.url.lastIndexOf('.'))}.avif`}
            type='image/avif'
          />
          <source
            srcSet={`${banner.url.substr(0, banner.url.lastIndexOf('.'))}.webp`}
            type='image/webp'
          />
          <img
            src={banner.url}
            alt={banner.name}
            className={styles['full-size']}
            loading='lazy'
          />
        </picture>
      ))}
    </Slider>
  );
};

export default Banners;
