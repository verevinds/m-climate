import MapMarkerAlt from '@public/svg/map-marker-alt.svg';
import { selectGeoCity } from '@redux/reducer/application/geo';
import cn from 'classnames';
import { useRouter } from 'next/router';
import { useCallback, useState } from 'react';
import { useSelector } from 'react-redux';

import styles from './location.module.scss';

const Location = () => {
  const { asPath } = useRouter();

  const [show, toggleShow] = useState(false);
  const handleShow = useCallback(() => toggleShow(!show), [show]);
  const city = useSelector(selectGeoCity);

  return (
    <div className={styles.location}>
      <button className={styles.button} type='button' onClick={handleShow}>
        <span className={styles.button__icon}>
          <MapMarkerAlt />
        </span>
        <span className={styles.button_text}>
          {city === 'Novosibirsk' ? 'Новосибирск' : 'Краснодар'}
        </span>
      </button>
      <div className={cn(styles['dropdown'], show && styles['dropdown-show'])}>
        <h2 className={styles['dropdown__title']}>Выберите город</h2>
        <a
          className={styles['dropdown__element']}
          href={`http://nsk.${process.env.url}${asPath}`}
        >
          Новосибирск
        </a>
        <a
          className={styles['dropdown__element']}
          href={`http://kda.${process.env.url}${asPath}`}
        >
          Красноярск
        </a>
      </div>
    </div>
  );
};

export default Location;
