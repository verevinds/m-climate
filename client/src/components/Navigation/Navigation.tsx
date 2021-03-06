import Location from '@components/Location/Location';
import ActiveLink from '@src/utils/ActiveLink';
import cls from 'classnames';
import React from 'react';

import { INavigation } from './interface';
import styles from './navigation.module.scss';

const Navigation: React.FC<INavigation> = ({ items, noLocation }) => {
  return (
    <div className={styles.nav}>
      {!noLocation && (
        <div className={styles.nav__location}>
          <Location />
        </div>
      )}
      <ul className={styles.nav__bar}>
        {items.map(({ id, name, url, favorite }, index) => (
          <li
            key={id}
            className={cls(
              styles.nav__element,
              index === 0 && favorite && styles['nav__element-favorite'],
            )}
          >
            <ActiveLink href={url} activeClassName={styles['link-active']}>
              <a className={styles.nav__link} title={name}>
                {name}
              </a>
            </ActiveLink>
          </li>
        ))}
      </ul>
    </div>
  );
};
export default Navigation;
