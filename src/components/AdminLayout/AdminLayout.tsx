import { faBox, faHome, faTags } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { selectAdmin, setHide } from '@redux/reducer/admin';
import cls from 'classnames';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ActiveLink from 'src/lib/ActiveLink';

import styles from './AdminLayout.module.scss';

const AdminLayout: React.FC = ({ children }) => {
  const dispatch = useDispatch();

  const {
    sideBar: { isHide },
  } = useSelector(selectAdmin);

  const handleHide = () => dispatch(setHide());

  return (
    <div className={cls(styles.layout, isHide && styles['-hide'])}>
      <div className={styles.layout__sidebar}>
        <div className={styles['sidebar__nav-top']}>
          <div className={styles.sidebar__title}>
            <p>Навигация</p>
          </div>
          <button
            type='button'
            onClick={handleHide}
            className={styles['sidebar__button-hide']}
          />
        </div>
        <div className={styles.sidebar__main}>
          {[
            {
              id: '1',
              name: 'Главная',
              url: '/admin',
              icon: faHome,
              props: { exec: true },
            },
            {
              id: '2',
              name: 'Бренды',
              url: '/admin/brand',
              icon: faTags,
            },
            {
              id: '3',
              name: 'Товар',
              url: '/admin/item',
              icon: faBox,
            },
          ].map(el => (
            <ActiveLink
              key={el.id}
              href={el.url}
              activeClassName={styles['-active']}
              {...el.props}
            >
              <a className={styles.sidebar__link}>
                <span className={styles.sidebar__link__text}>{el.name}</span>
                <FontAwesomeIcon icon={el.icon} />
              </a>
            </ActiveLink>
          ))}
        </div>
      </div>
      <div className={styles.layout__main}>{children}</div>
    </div>
  );
};

export default AdminLayout;