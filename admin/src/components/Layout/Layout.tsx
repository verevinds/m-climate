import AdminHeader from '@components/Header';
import Location from '@components/Location';
import {
  faAngleDoubleLeft,
  faAngleDoubleRight,
  faBox,
  faBriefcase,
  // faCalendarAlt,
  faCameraRetro,
  faHome,
  faTags,
  // faWrench,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { selectTuning, setHide } from '@redux/reducer/application/tuning';
import ActiveLink from '@utils/ActiveLink';
import { Button } from '@verevinds/ui-kit';
import cls from 'classnames';
import React, { useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import styles from './layout.module.scss';

const Layout: React.FC<{ title: string }> = ({ children, title }) => {
  const dispatch = useDispatch();

  const {
    admin: {
      sideBar: { isHide },
    },
  } = useSelector(selectTuning);

  const handleHide = () => dispatch(setHide());
  const icon = useMemo(
    () => (isHide ? faAngleDoubleLeft : faAngleDoubleRight),
    [isHide],
  );

  return (
    <div className={cls(styles['layout'], isHide && styles['-hide'])}>
      <div className={styles['layout__sidebar']}>
        <div className={styles['sidebar__nav-top']}>
          <div className={styles['sidebar__title']}>
            <p>Навигация</p>
          </div>
          <Button
            type='button'
            onClick={handleHide}
            className={styles['button-hide']}
            variant='transparent'
            icon={<FontAwesomeIcon icon={icon} />}
          />
        </div>
        <div className={styles['sidebar__main']}>
          {[
            {
              id: '1',
              name: 'Главная',
              url: '/',
              icon: faHome,
              props: { exec: true },
            },
            {
              id: '2',
              name: 'Бренды',
              url: '/brand',
              icon: faTags,
            },
            {
              id: '3',
              name: 'Товар',
              url: '/product',
              icon: faBox,
            },
            {
              id: '4',
              name: 'Баннеры',
              url: '/banners',
              icon: faCameraRetro,
            },
            {
              id: '5',
              name: 'Портфолио',
              url: '/portfolio',
              icon: faBriefcase,
            },
            // {
            //   id: '5',
            //   name: 'Акции',
            //   url: '/promotions',
            //   icon: faCalendarAlt,
            // },
            // {
            //   id: '6',
            //   name: 'Услуги',
            //   url: '/service',
            //   icon: faWrench,
            // },
          ].map(el => (
            <ActiveLink
              key={el.id}
              href={el.url}
              activeClassName={styles['-active']}
              {...el.props}
            >
              <a className={styles['sidebar__link']}>
                <span className={styles['sidebar__link__text']}>{el.name}</span>
                <FontAwesomeIcon icon={el.icon} />
              </a>
            </ActiveLink>
          ))}
        </div>
        <div className={styles['location']}>
          <h3>Текущий город</h3>
          <Location />
        </div>
      </div>
      <div className={styles['layout__main']}>
        <AdminHeader title={title} />
        <div className={styles['layout__body']}>{children}</div>
      </div>
    </div>
  );
};

export default Layout;
