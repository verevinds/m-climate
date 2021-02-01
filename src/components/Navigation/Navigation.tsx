import Location from '@components/Location/Location';
import cls from 'classnames';
import styles from './Navigation.module.scss';

const Navigation = () => {
    return (
        <div className={styles['nav']}>
            <div className={styles['nav__location']}>
              <Location />
            </div>
            <ul className={styles['nav__bar']}>
                <li className={cls(styles['nav__element'], styles['nav__element-favorite'])}>
                    <a href="#" className={styles['nav__link']}>Кондиционеры</a>
                </li>
                <li className={styles['nav__element']}>
                    <a href="#" className={styles['nav__link']}>Монтаж / демонтаж</a>
                </li>
                <li className={styles['nav__element']}>
                    <a href="#" className={styles['nav__link']}>Сервисное обслуживание</a>
                </li>
                <li className={styles['nav__element']}>
                    <a href="#" className={styles['nav__link']}>Подключение бытовой техники</a>
                </li>
            </ul>
        </div>
    );
};
export default Navigation;
