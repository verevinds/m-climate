import Menu from '@components/Menu/Menu';
import Navigation from '@components/Navigation/Navigation';
import Search from '@components/Search/Search';
import { faHeart } from '@fortawesome/free-regular-svg-icons';
import { faPercent } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import styles from './header.module.scss';

const Header = () => {
  return (
    <header className={styles['block']}>
      <div className={styles['logo']}>
        <img src='//via.placeholder.com/223x45' alt='Логотип' />
      </div>
      <div className={styles['menu']}>
        <Menu />
      </div>
      <div className={styles['search']}>
        <Search />
      </div>
      <div className={styles['toolbar']}>
        <a href='#' className={styles['link']}>
          <FontAwesomeIcon icon={faPercent} className={styles['link__icon']} />
          Акции
        </a>
        <a href='#' className={styles['link']}>
          <FontAwesomeIcon icon={faHeart} className={styles['link__icon']} />
          Избранное
        </a>
      </div>
      <div className={styles['nav']}>
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
