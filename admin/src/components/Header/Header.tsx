import { faList, faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import ActiveLink from '@utils/ActiveLink';
import { useRouter } from 'next/router';
import { memo } from 'react';

import styles from './header.module.scss';

export interface IAdminHeader {
  title: string;
}

const Header: React.FC<IAdminHeader> = ({ title }) => {
  const { pathname } = useRouter();
  const isMainPage = Boolean(pathname.split('/')[1]);

  return (
    <div className={styles.header}>
      <h1>{title}</h1>
      {isMainPage && (
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

export default memo(Header);
