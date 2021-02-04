import React from 'react';

import Location from '@components/Location/Location';

import { INavigation } from './interface';

import cls from 'classnames';
import styles from './Navigation.module.scss';

const Navigation: React.FC<INavigation> = ({ items, location }) => {
    return (
        <div className={styles['nav']}>
            {location && (
                <div className={styles['nav__location']}>
                    <Location />
                </div>
            )}
            <ul className={styles['nav__bar']}>
                {items.map(({ name, url, favorite }, index) => (
                    <li
                        className={cls(
                            styles['nav__element'],
                            index === 0 &&
                                favorite &&
                                styles['nav__element-favorite']
                        )}
                    >
                        <a
                            href={url}
                            className={styles['nav__link']}
                            title={name}
                        >
                            {name}
                        </a>
                    </li>
                ))}
            </ul>
        </div>
    );
};
export default Navigation;
