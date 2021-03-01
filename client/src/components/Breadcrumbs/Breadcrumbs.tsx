import { selectProductItem } from '@redux/reducer/product';
import ActiveLink from '@src/utils/ActiveLink';
import { useSelector } from 'react-redux';

import styles from './breadcrumbs.module.scss';

export default function Breadcrumbs() {
  const item = useSelector(selectProductItem);
  return (
    <nav className={styles['block']}>
      <a href='/'>Главная</a>
      {` / `}
      <ActiveLink href='/brand'>
        <a>{item?.brand?.name}</a>
      </ActiveLink>
      {` / `}
      <span>{item?.name}</span>
    </nav>
  );
}
