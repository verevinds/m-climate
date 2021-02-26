import CardProduct from '@components/CardProduct';
import Layout from '@components/Layout/LayoutClient';
import { AppInitialPropsWithRedux } from '@pages/_app';
import { getProduct } from '@redux/reducer/product';
import NavLink from 'next/link';
import React from 'react';

const Product = ({ item }: any) => {
  return (
    <Layout>
      <nav>
        <NavLink href='/'>Главная</NavLink>
        {` -> `}
        <span>{item.name}</span>
      </nav>
      <br />
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

  const promise = [reduxStore.dispatch(getProduct(id))];

  await Promise.all(promise);

  return { err, item: reduxStore.getState().product.item };
};
export default Product;
