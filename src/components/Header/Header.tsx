import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faPercent } from '@fortawesome/free-solid-svg-icons';
import { faHeart } from '@fortawesome/free-regular-svg-icons';
import styles from './Header.module.scss';
import Search from '@components/Search/Search';
import Navigation from '@components/Navigation/Navigation';

const Header = () => {
    return (
        <header className={styles['header']}>
            <div className={styles['header__logo']}>
                <img src="//via.placeholder.com/223x45" alt="Логотип" />
            </div>
            <div className={styles['header__menu']}>
                <button className={styles['header__button']} type="button">
                    <FontAwesomeIcon icon={faBars} />
                    <span className={styles['header__button__text']}>
                        Каталог
                    </span>
                </button>
            </div>
            <div className={styles['header__search']}>
                <Search />
            </div>
            <div className={styles['header__toolbar']}>
                <a href="#" className={'link-menu'}>
                    <FontAwesomeIcon icon={faPercent} />
                    Акции
                </a>
                <a href="#" className={'link-menu'}>
                    <FontAwesomeIcon icon={faHeart} />
                    Избранное
                </a>
            </div>
            <div className={styles['header__nav']}>
                <Navigation />
            </div>
        </header>
    );
};

export default Header;
