import { useRouter } from 'next/dist/client/router';
import { useMemo } from 'react';
import { useSelector } from 'react-redux';

import Breadcrumbs from '../../src/components/Breadcrumbs';
import Item from '../../src/components/Item';
import Layout from '../../src/components/Layout/LayoutClient';
import { AppInitialPropsWithRedux } from '../../src/interface';
import { getGeo } from '../../src/redux/reducer/application/geo';
import { getBrands, selectBrandList } from '../../src/redux/reducer/brand';
import {
  getProducts,
  selectProductList,
} from '../../src/redux/reducer/product';

const ProductPage = () => {
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

  return (
    <Layout>
      <Breadcrumbs />
      <h1>{`Каталог кондиционеров ${text}`}</h1>
      {products.map(product => (
        <Item key={product._id} product={product} />
      ))}
    </Layout>
  );
};
ProductPage.getInitialProps = async ({
  reduxStore,
  query,
  req,
}: AppInitialPropsWithRedux) => {
  const subdomain = (req && req.headers.host?.split('.')[0]) || 'nsk';
  await reduxStore.dispatch(getGeo({ subdomain }));
  console.log(query);
  const promise = [
    reduxStore.dispatch(getProducts(query)) as Promise<any>,
    reduxStore.dispatch(getBrands()),
  ];
  await Promise.all(promise);
  return { query };
};
export default ProductPage;
