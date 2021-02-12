import { faHeart } from '@fortawesome/free-regular-svg-icons';
import { faPercent } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Menu from '@components/Menu/Menu';
import Navigation from '@components/Navigation/Navigation';
import Search from '@components/Search/Search';

import styles from './header.module.scss';

const Header = () => {
  return (
    <header className={styles.header}>
      <div className={styles.header__logo}>
        <img src='//via.placeholder.com/223x45' alt='Логотип' />
      </div>
      <div className={styles.header__menu}>
        <Menu />
      </div>
      <div className={styles.header__search}>
        <Search />
      </div>
      <div className={styles.header__toolbar}>
        <a href='#' className='link-menu'>
          <FontAwesomeIcon icon={faPercent} />
          Акции
        </a>
        <a href='#' className='link-menu'>
          <FontAwesomeIcon icon={faHeart} />
          Избранное
        </a>
      </div>
      <div className={styles.header__nav}>
        <Navigation
          items={[
            { id: '1', name: 'Кондиционеры', url: '#', favorite: true },
            { id: '2', name: 'Монтаж / демонтаж', url: '#' },
            { id: '3', name: 'Сервисное обслуживание', url: '#' },
            { id: '4', name: 'Подключение бытовой техники', url: '#' },
          ]}
        />
      </div>
    </header>
  );
};

export default Header;
