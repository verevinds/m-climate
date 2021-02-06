import * as React from 'react';
import { useSelector } from 'react-redux';

import ActiveLink from '@src/lib/ActiveLink';
import { selectApplicationContext } from '@redux/reducer/application';

import styles from './AdminHeader.module.scss';
import { faList, faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export interface IAdminHeader {
    title: string;
}

const AdminHeader: React.FC<IAdminHeader> = ({ title }) => {
    const { pathname } = useSelector(selectApplicationContext);
    return (
        <div className={styles['header']}>
            <h1>{title}</h1>
            <div className={styles['header__links']}>
                <ActiveLink
                    href={`${pathname}`}
                    activeClassName={styles['-active']}
                    exec={true}
                >
                    <a className={styles['header__link']}>
                        <FontAwesomeIcon icon={faList} />
                        <span className={styles['header__link__text']}>
                            Список
                        </span>
                    </a>
                </ActiveLink>
                <ActiveLink
                    href={`${pathname}?type=create`}
                    activeClassName={styles['-active']}
                    exec={false}
                >
                    <a className={styles['header__link']}>
                        <FontAwesomeIcon icon={faPlusCircle} />
                        <span className={styles['header__link__text']}>
                            Создать
                        </span>
                    </a>
                </ActiveLink>
            </div>
        </div>
    );
};

export default React.memo(AdminHeader);
