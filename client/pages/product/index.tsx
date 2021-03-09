import { toggleCity } from '@redux/reducer/geo';
import ListingProduct from '@src/components/ListingProduct';

import Breadcrumbs from '../../src/components/Breadcrumbs';
import Layout from '../../src/components/Layout/LayoutClient';
import { AppInitialPropsWithRedux } from '../../src/interface';
import { getBrands } from '../../src/redux/reducer/brand';
import { getProducts } from '../../src/redux/reducer/product';

const ProductPage = () => {
  return (
    <Layout>
      <Breadcrumbs />
      <ListingProduct />
    </Layout>
  );
};
ProductPage.getInitialProps = async ({
  reduxStore,
  query,
  req,
}: AppInitialPropsWithRedux) => {
  reduxStore.dispatch(toggleCity(req));

  const promise = [
    reduxStore.dispatch(getProducts(query)) as Promise<any>,
    reduxStore.dispatch(getBrands()),
  ];
  await Promise.all(promise);
  return { query };
};
export default ProductPage;
