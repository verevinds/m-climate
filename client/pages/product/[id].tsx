import Breadcrumbs from '@components/Breadcrumbs';
import CardProduct from '@components/CardProduct';
import Layout from '@components/Layout/LayoutClient';
import { getProduct } from '@redux/reducer/product';
import { AppInitialPropsWithRedux } from '@src/interface';
import React from 'react';

const Product = () => {
  return (
    <Layout>
      <Breadcrumbs />
      <CardProduct />
    </Layout>
  );
};

Product.getInitialProps = async ({
  err,
  reduxStore,
  query,
}: AppInitialPropsWithRedux) => {
  const { id } = query;
  const promise = [
    typeof id === 'string' ? reduxStore.dispatch(getProduct(id)) : undefined,
  ];

  await Promise.all(promise);

  return { err, item: reduxStore.getState().product.item };
};
export default Product;
