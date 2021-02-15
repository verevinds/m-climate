import AdminHeader from '@components/AdminHeader';
import {
  faAngleDoubleLeft,
  faAngleDoubleRight,
  faBox,
  faHome,
  faTags,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { selectApplication, setHide } from '@redux/reducer/application';
import ActiveLink from '@utils/ActiveLink';
import { Button } from '@verevinds/ui-kit';
import cls from 'classnames';
import React, { useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import styles from './adminlayout.module.scss';

const AdminLayout: React.FC<{ title: string }> = ({ children, title }) => {
  const dispatch = useDispatch();

  const {
    admin: {
      sideBar: { isHide },
    },
  } = useSelector(selectApplication);

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
            className={styles['sidebar__button-hide']}
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
              url: '/item',
              icon: faBox,
            },
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
      </div>
      <div className={styles['layout__main']}>
        <AdminHeader title={title} />
        <div className={styles['layout__body']}>{children}</div>
      </div>
    </div>
  );
};

export default AdminLayout;
