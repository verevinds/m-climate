import {
  faHeadset,
  faMedal,
  faTruckLoading,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import styles from './advantage.module.scss';

const Advantage = () => {
  return (
    <div className={styles['wrapper']}>
      <div className={styles['block']}>
        <div>
          <FontAwesomeIcon icon={faMedal} className={styles['icon']} />
        </div>
        <div className={styles['description']}>
          <h3>Гарантия</h3>
          <span>
            Качественные экологичные материалы. Контроль каждого изделия
          </span>
        </div>
      </div>

      <div className={styles['block']}>
        <div>
          <FontAwesomeIcon icon={faTruckLoading} className={styles['icon']} />
        </div>
        <div className={styles['description']}>
          <h3>Доставка</h3>
          <span>Быстрая доставка по России. Доставка по всему миру</span>
        </div>
      </div>

      <div className={styles['block']}>
        <div>
          <FontAwesomeIcon icon={faHeadset} className={styles['icon']} />
        </div>
        <div className={styles['description']}>
          <h3>Сервис</h3>
          <span>Лёгкий процесс оплаты, обмена и возврата</span>
        </div>
      </div>
    </div>
  );
};

export default Advantage;
