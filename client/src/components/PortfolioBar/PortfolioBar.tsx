import Item from '@components/PortfolioBarItem';
import Slider from '@components/Slider/Slider';
import { getPortfolio, selectPortfolioList } from '@redux/reducer/portfolio';
import ActiveLink from '@src/utils/ActiveLink';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import styles from './portfoliobar.module.scss';

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
              <Item item={item} />
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default Bar;
