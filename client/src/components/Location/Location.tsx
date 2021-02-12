import { faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import styles from './location.module.scss';

const Location = () => {
  return (
    <button className={styles.location} type='button'>
      <span className={styles.location__icon}>
        <FontAwesomeIcon icon={faMapMarkerAlt} />
      </span>
      <span className={styles.location__text}>Новосибирск</span>
    </button>
  );
};

export default Location;
