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
  console.log(banners.length);
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
        <img
          key={banner._id}
          src={banner.url}
          className={styles['full-size']}
          alt={banner.name}
        />
      ))}
    </Slider>
  );
};

export default Banners;
