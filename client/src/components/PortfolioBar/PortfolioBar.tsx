import Slider from '@components/Slider/Slider';
import Spinner from '@components/Spinner/Spinner';
import { getPortfolio, selectPortfolioList } from '@redux/reducer/portfolio';
import ActiveLink from '@src/utils/ActiveLink';
import dynamic from 'next/dynamic';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import styles from './portfoliobar.module.scss';

const Img = dynamic(() => import('@components/Img'), {
  loading: () => <Spinner inContainer />,
  ssr: false,
});

const Bar: React.FC = () => {
  const dispatch = useDispatch();
  const items = useSelector(selectPortfolioList);

  useEffect(() => {
    dispatch(getPortfolio());
  }, []);

  if (!items.length) return null;

  return (
    <div className={styles['bar-wrap']}>
      <ActiveLink href='/portfolio'>
        <h2 className={styles.bar__title}>Наши работы</h2>
      </ActiveLink>
      <div className={styles.bar}>
        <Slider
          watchOverflow
          slidesPerView='auto'
          loop
          navigation={{
            disabledClass: styles.disabled,
          }}
        >
          {items.map(item => (
            <div key={item._id} className={styles.bar__item}>
              <Img
                className={styles['img']}
                src={item.url}
                alt={item._id}
                loading='lazy'
              />
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default Bar;
