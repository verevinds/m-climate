import CardProduct from '@components/CardProduct';
import Layout from '@components/Layout/LayoutClient';
import { getProduct, selectProductItem } from '@redux/reducer/product';
import { AppInitialPropsWithRedux } from '@src/interface';
import ActiveLink from '@src/utils/ActiveLink';
import React from 'react';
import { useSelector } from 'react-redux';

const Product = () => {
  const item = useSelector(selectProductItem);
  return (
    <Layout>
      <nav>
        <a href='/'>Главная</a>
        {` -> `}
        <ActiveLink href='/brand'>
          <a>{item?.brand?.name}</a>
        </ActiveLink>
        {` -> `}
        <span>{item?.name}</span>
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
  const promise = [
    typeof id === 'string' ? reduxStore.dispatch(getProduct(id)) : undefined,
  ];

  await Promise.all(promise);

  return { err, item: reduxStore.getState().product.item };
};
export default Product;
