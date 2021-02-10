import { faList, faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { selectApplicationContext } from '@redux/reducer/application';
import ActiveLink from '@src/lib/ActiveLink';
import { memo } from 'react';
import { useSelector } from 'react-redux';

import styles from './AdminHeader.module.scss';

export interface IAdminHeader {
  title: string;
}

const AdminHeader: React.FC<IAdminHeader> = ({ title }) => {
  const { pathname, name } = useSelector(selectApplicationContext);
  const isMainPage = pathname === `/${name}`;
  return (
    <div className={styles.header}>
      <h1>{title}</h1>
      {!isMainPage && (
        <div className={styles.header__links}>
          <ActiveLink
            href={`${pathname}`}
            activeClassName={styles['-active']}
            exec
          >
            <span className={styles.header__link}>
              <FontAwesomeIcon icon={faList} />
              <span className={styles.header__link__text}>Список</span>
            </span>
          </ActiveLink>
          <ActiveLink
            href={`${pathname}?type=create`}
            activeClassName={styles['-active']}
            exec={false}
          >
            <span className={styles.header__link}>
              <FontAwesomeIcon icon={faPlusCircle} />
              <span className={styles.header__link__text}>Создать</span>
            </span>
          </ActiveLink>
        </div>
      )}
    </div>
  );
};

export default memo(AdminHeader);
