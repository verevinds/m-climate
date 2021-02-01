import { faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from './Location.module.scss';

const Location = () => {
    return (
        <div className={styles['location']}>
            <span className={styles['location__icon']}>
                <FontAwesomeIcon icon={faMapMarkerAlt} />
            </span>
            <span className={styles['location__text']}>Новосибирск</span>
        </div>
    );
};

export default Location;
