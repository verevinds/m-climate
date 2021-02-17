import Layout from '@components/Layout';
import ProductCreate from '@components/ProductCreate/ProductCreate';
import ProductList from '@components/ProductList/ProductList';
import { getProducts } from '@redux/reducer/product';

import { AppInitialPropsWithRedux } from './_app';

const Item = () => {
  return (
    <Layout title='Настройка товара'>
      <ProductCreate />
      <ProductList />
    </Layout>
  );
};

Item.getInitialProps = async ({
  err,
  reduxStore,
}: AppInitialPropsWithRedux) => {
  const promise = [reduxStore.dispatch(getProducts())];

  await Promise.all(promise);

  return { err };
};
export default Item;
