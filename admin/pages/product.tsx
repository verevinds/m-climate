import Layout from '@components/Layout';
import ProductCreate from '@components/ProductCreate/ProductCreate';
import ProductList from '@components/ProductList/ProductList';
import Spinner from '@components/Spinner/Spinner';
import { getBrands } from '@redux/reducer/brand';
import { getProducts, selectProductPending } from '@redux/reducer/product';
import { useSelector } from 'react-redux';

import { AppInitialPropsWithRedux } from './_app';

const Product = () => {
  const isPending = useSelector(selectProductPending);
  return (
    <Layout title='Настройка товара'>
      <ProductCreate />
      <ProductList />
      {isPending && <Spinner />}
    </Layout>
  );
};

Product.getInitialProps = async ({
  err,
  reduxStore,
}: AppInitialPropsWithRedux) => {
  const promise = [
    reduxStore.dispatch(getProducts()),
    reduxStore.dispatch(getBrands()),
  ];

  await Promise.all(promise);

  return { err };
};
export default Product;
