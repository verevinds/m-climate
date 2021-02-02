import {
    faAngleDoubleLeft,
    faAngleDoubleRight,
    faHome,
    faTags,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useCallback, useState } from 'react';
import styles from './LayoutAdmin.module.scss';
import cls from 'classnames';
import ActiveLink from 'src/lib/ActiveLink';
import { useDispatch, useSelector } from 'react-redux';
import { selectAdmin, setHide } from '@redux/reducer/admin';

const LayoutAdmin: React.FC = ({ children }) => {
    const dispatch = useDispatch();

    const { sideBar: {  isHide  } } = useSelector(selectAdmin)

    const handleHide = () => dispatch(setHide())

    return (
        <div className={cls(styles['layout'], isHide && styles['-hide'])}>
            <div
                className={styles['layout__sidebar']}
            >
                <div className={styles['sidebar__nav-top']}>
                    <div className={styles['sidebar__title']}>
                        <p>Навигация</p>
                    </div>
                    <button
                        type="button"
                        onClick={handleHide}
                        className={styles['sidebar__button-hide']}
                    >
                        <FontAwesomeIcon
                            icon={isHide ? faAngleDoubleLeft : faAngleDoubleRight}
                        />
                    </button>
                </div>
                <div className={styles['sidebar__main']}>
                    {[
                        { name: 'Главная', url: '/admin', icon: faHome },
                        { name: 'Бренды', url: '/admin/brand', icon: faTags },
                    ].map((el) => (
                        <ActiveLink
                            href={el.url}
                            activeClassName={styles['-active']}
                        >
                            <a className={styles['sidebar__link']}><span>{el.name}</span><FontAwesomeIcon icon={el.icon}/></a>
                        </ActiveLink>
                    ))}
                </div>
            </div>
            <div className={styles['layout__main']}>{children}</div>
        </div>
    );
};

export default LayoutAdmin;
