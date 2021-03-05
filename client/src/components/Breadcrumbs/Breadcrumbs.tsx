import { selectBrandList } from '@redux/reducer/brand';
import { selectProductItem } from '@redux/reducer/product';
import ActiveLink from '@src/utils/ActiveLink';
import { useRouter } from 'next/router';
import { useMemo } from 'react';
import { useSelector } from 'react-redux';

import styles from './breadcrumbs.module.scss';

export default function Breadcrumbs() {
  const item = useSelector(selectProductItem);
  const brands = useSelector(selectBrandList);
  const router = useRouter();

  const crumbs = useMemo(() => {
    const initialLinks = [];
    const pathname = router.pathname.split('/');

    switch (pathname[1]) {
      case 'product': {
        if (router.query.brand || pathname[2]) {
          initialLinks.push({ href: '/product', name: 'Кондиционеры' });
          const brand = brands.find(el => {
            return el._id === router.query.brand;
          });
          if (router.query.brand)
            initialLinks.push({
              name: brand?.name,
            });
        } else {
          initialLinks.push({ name: 'Кондиционеры' });
        }
        if (pathname[2]) {
          initialLinks.push({
            href: `/product?brand=${item?.brand?._id}`,
            name: item?.brand?.name,
          });
          initialLinks.push({
            name: item?.name,
          });
        }
        break;
      }
      default:
        break;
    }

    return initialLinks;
  }, [router, item, brands]);

  return (
    <nav className={styles['block']}>
      <a href='/'>Главная</a>
      {crumbs.map(crumb => (
        <>
          {` / `}
          {crumb.href ? (
            <ActiveLink href={crumb.href}>
              <a>{crumb.name}</a>
            </ActiveLink>
          ) : (
            <span>{crumb.name}</span>
          )}
        </>
      ))}
    </nav>
  );
}
