import Slider from '@components/Slider/Slider';
import Spinner from '@components/Spinner/Spinner';
import { getBanners, selectBannersList } from '@redux/reducer/banners';
import ActiveLink from '@src/utils/ActiveLink';
import cn from 'classnames';
import dynamic from 'next/dynamic';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import styles from './banners.module.scss';

const Img = dynamic(() => import('@components/Img'), {
  loading: () => <Spinner inContainer />,
  ssr: false,
});

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
      {banners.map(banner =>
        banner.href ? (
          <ActiveLink key={banner._id} href={banner.href}>
            <Img
              src={banner.url}
              alt={banner.name}
              className={cn(styles['full-size'], styles['cursor'])}
              loading='lazy'
            />
          </ActiveLink>
        ) : (
          <Img
            key={`${banner._id}-no-link`}
            src={banner.url}
            alt={banner.name}
            className={styles['full-size']}
            loading='lazy'
          />
        ),
      )}
    </Slider>
  );
};

export default Banners;
