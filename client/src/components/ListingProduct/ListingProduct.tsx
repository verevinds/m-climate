import Item from '@components/Item';
import { selectBrandList } from '@redux/reducer/brand';
import { selectProductList } from '@redux/reducer/product';
import { useRouter } from 'next/dist/client/router';
import { useMemo } from 'react';
import { useSelector } from 'react-redux';

import styles from './listingproduct.module.scss';

const ListingProduct = () => {
  const products = useSelector(selectProductList);
  const brands = useSelector(selectBrandList);
  const { query } = useRouter();

  const text = useMemo(() => {
    let draft = '';
    if (query) {
      if (query.brand) {
        const brand = brands.find(el => el._id === query.brand);
        draft += brand?.name;
      }
    }
    return draft;
  }, [query, brands]);

  const currentProducts = useMemo(() => {
    if (query.brand)
      return products.filter(product => product.brand?._id === query.brand);
    return products;
  }, [products, query]);

  return (
    <>
      <h1 className={styles['title']}>{`Каталог кондиционеров ${text}`}</h1>
      <div className={styles['block']}>
        {currentProducts.map(product => (
          <Item key={product._id} product={product} />
        ))}
      </div>
    </>
  );
};

export default ListingProduct;
