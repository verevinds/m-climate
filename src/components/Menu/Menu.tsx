import { faBars } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from './Menu.module.scss';

const Menu = () => {
    return (
        <button className={styles['menu__button']} type="button">
            <FontAwesomeIcon icon={faBars} />
            <span className={styles['menu__button__text']}>Каталог</span>
        </button>
    );
};

export default Menu;
