import { TItem } from '@src/type/link';
import React from 'react';

import styles from './MenuBlock.module.scss';

interface IMenuBlock {
  title?: string;
  items: TItem[];
}
const MenuBlock: React.FC<IMenuBlock> = ({ items, title }) => {
  return (
    <div className={styles['menu-block']}>
      {title && <span className={styles['menu-block__title']}>{title}</span>}
      {items.map((el: TItem) => (
        <a key={el.id} href={el.url} className={styles['menu-block__link']}>
          {el.name}
        </a>
      ))}
    </div>
  );
};

export default MenuBlock;
