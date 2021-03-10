import ActiveLink from '@src/utils/ActiveLink';
import React from 'react';

import styles from './menublock.module.scss';

type MenuBlockProps = {
  items: { [key: string]: any; _id: string; name: string }[];
  title: string;
  path: string;
};

const MenuBlock: React.FC<MenuBlockProps> = ({ items, title, path }) => {
  return (
    <>
      {title && <span className={styles['title']}>{title}</span>}
      <div className={styles['block']}>
        {items.map(el => (
          <ActiveLink
            key={el._id}
            href={`${path}${el._id}`}
            activeClassName={styles['active']}
          >
            <a className={styles['link']}>{el.name}</a>
          </ActiveLink>
        ))}
      </div>
    </>
  );
};

export default MenuBlock;
