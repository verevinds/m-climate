import {
    faAngleDoubleLeft,
    faAngleDoubleRight,
    faBox,
    faHome,
    faTags,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import styles from './LayoutAdmin.module.scss';
import cls from 'classnames';
import ActiveLink from 'src/lib/ActiveLink';
import { useDispatch, useSelector } from 'react-redux';
import { selectAdmin, setHide } from '@redux/reducer/admin';

const LayoutAdmin: React.FC = ({ children }) => {
    const dispatch = useDispatch();

    const {
        sideBar: { isHide },
    } = useSelector(selectAdmin);

    const handleHide = () => dispatch(setHide());

    return (
        <div className={cls(styles['layout'], isHide && styles['-hide'])}>
            <div className={styles['layout__sidebar']}>
                <div className={styles['sidebar__nav-top']}>
                    <div className={styles['sidebar__title']}>
                        <p>Навигация</p>
                    </div>
                    <button
                        type="button"
                        onClick={handleHide}
                        className={styles['sidebar__button-hide']}
                    />
                </div>
                <div className={styles['sidebar__main']}>
                    {[
                        {
                            name: 'Главная',
                            url: '/admin',
                            icon: faHome,
                            props: { exec: true },
                        },
                        { name: 'Бренды', url: '/admin/brand', icon: faTags },
                        { name: 'Товар', url: '/admin/item', icon: faBox },
                    ].map((el) => (
                        <ActiveLink
                            href={el.url}
                            activeClassName={styles['-active']}
                            {...el.props}
                        >
                            <a className={styles['sidebar__link']}>
                                <span className={styles['sidebar__link__text']}>
                                    {el.name}
                                </span>
                                <FontAwesomeIcon icon={el.icon} />
                            </a>
                        </ActiveLink>
                    ))}
                </div>
            </div>
            <div className={styles['layout__main']}>{children}</div>
        </div>
    );
};

export default LayoutAdmin;
