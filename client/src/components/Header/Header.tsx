import Menu from '@components/Menu/Menu';
import Navigation from '@components/Navigation/Navigation';
import Search from '@components/Search/Search';
import Briefcase from '@public/svg/briefcase.svg';
import Heart from '@public/svg/heart.svg';
import Logo from '@public/svg/logo.svg';
import Percent from '@public/svg/percent.svg';
import ActiveLink from '@src/utils/ActiveLink';

import styles from './header.module.scss';

const Header = () => {
  return (
    <header className={styles['block']}>
      <div className={styles['logo']}>
        <Logo className={styles['logo__icon']} />
      </div>
      <div className={styles['menu']}>
        <Menu />
      </div>
      <div className={styles['search']}>
        <Search />
      </div>
      <div className={styles['toolbar']}>
        <a href='#' className={styles['link']}>
          <Percent className={styles['link__icon']} />
          Акции
        </a>
        <a href='#' className={styles['link']}>
          <Heart className={styles['link__icon']} />
          Избранное
        </a>
        <ActiveLink href='/portfolio'>
          <a className={styles['link']}>
            <Briefcase className={styles['link__icon']} />
            Наши работы
          </a>
        </ActiveLink>
      </div>
      <div className={styles['nav']}>
        <Navigation
          items={[
            { id: '1', name: 'Кондиционеры', url: '/product', favorite: true },
            {
              id: '2',
              name: 'Стандартный монтаж',
              url: '/service/installation',
            },
            {
              id: '3',
              name: 'Демонтаж кондиционера',
              url: '/service/dismantling',
            },
            {
              id: '4',
              name: 'Сервисное обслуживание',
              url: '/service/maintenance',
            },
          ]}
        />
      </div>
    </header>
  );
};

export default Header;
