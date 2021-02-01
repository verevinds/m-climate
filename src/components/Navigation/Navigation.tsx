import styles from './Navigation.module.scss';

const Navigation = () => {
    return (
        <div className={styles['nav']}>
            <div className={styles['nav__location']}>Новосибирск</div>
            <ul className={styles['nav__bar']}>
                <li className={styles['nav__element']}>
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
