import MapMarkerAlt from '@public/svg/map-marker-alt.svg';
import {
  selectGeoCity,
  turnKDA,
  turnNSK,
} from '@redux/reducer/application/geo';
import { Button } from '@verevinds/ui-kit';
import cn from 'classnames';
import { useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import styles from './location.module.scss';

const Location = () => {
  const dispatch = useDispatch();
  const [show, toggleShow] = useState(false);
  const handleShow = useCallback(() => toggleShow(!show), [show]);
  const city = useSelector(selectGeoCity);
  const toggleNSK = () => {
    dispatch(turnNSK());
    handleShow();
  };
  const toggleKDA = () => {
    dispatch(turnKDA());
    handleShow();
  };
  return (
    <div className={styles.location}>
      <button className={styles.button} type='button' onClick={handleShow}>
        <span className={styles.button__icon}>
          <MapMarkerAlt className={styles['icon']} />
        </span>
        <span className={styles.button_text}>
          {city === 'Novosibirsk' ? 'Новосибирск' : 'Краснодар'}
        </span>
      </button>
      <div className={cn(styles['dropdown'], show && styles['dropdown-show'])}>
        <h2 className={styles['dropdown__title']}>Выберите город</h2>
        <Button className={styles['dropdown__element']} onClick={toggleNSK}>
          Новосибирск
        </Button>
        <Button className={styles['dropdown__element']} onClick={toggleKDA}>
          Краснодар
        </Button>
      </div>
    </div>
  );
};

export default Location;
