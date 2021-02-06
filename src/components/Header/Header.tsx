import Menu from '@components/Menu/Menu';
import Navigation from '@components/Navigation/Navigation';
import Search from '@components/Search/Search';
import { faHeart } from '@fortawesome/free-regular-svg-icons';
import { faPercent } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import styles from './Header.module.scss';

const Header = () => {
  return (
    <header className={styles['header']}>
      <div className={styles['header__logo']}>
        <img src='//via.placeholder.com/223x45' alt='Логотип' />
      </div>
      <div className={styles['header__menu']}>
        <Menu />
      </div>
      <div className={styles['header__search']}>
        <Search />
      </div>
      <div className={styles['header__toolbar']}>
        <a href='#' className={'link-menu'}>
          <FontAwesomeIcon icon={faPercent} />
          Акции
        </a>
        <a href='#' className={'link-menu'}>
          <FontAwesomeIcon icon={faHeart} />
          Избранное
        </a>
      </div>
      <div className={styles['header__nav']}>
        <Navigation
          items={[
            { name: 'Кондиционеры', url: '#', favorite: true },
            { name: 'Монтаж / демонтаж', url: '#' },
            { name: 'Сервисное обслуживание', url: '#' },
            { name: 'Подключение бытовой техники', url: '#' },
          ]}
        />
      </div>
    </header>
  );
};

export default Header;
