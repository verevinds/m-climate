import MapMarkerAlt from '@public/svg/map-marker-alt.svg';

import styles from './location.module.scss';

const Location = () => {
  return (
    <button className={styles.location} type='button'>
      <span className={styles.location__icon}>
        <MapMarkerAlt />
      </span>
      <span className={styles.location__text}>Новосибирск</span>
    </button>
  );
};

export default Location;
