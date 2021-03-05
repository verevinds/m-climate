import { NextComponentType } from 'next';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Breadcrumbs from '../../src/components/Breadcrumbs';
import CardProduct from '../../src/components/CardProduct';
import Layout from '../../src/components/Layout/LayoutClient';
import NotFound from '../../src/components/NotFound';
import { AppInitialPropsWithRedux } from '../../src/interface';
import { selectGeoCity } from '../../src/redux/reducer/application/geo';
import { getBanners } from '../../src/redux/reducer/banners';
import { getProduct, selectProductItem } from '../../src/redux/reducer/product';

type InitialProps = { id: string | string[] | undefined };

const Product: NextComponentType<
  AppInitialPropsWithRedux,
  InitialProps,
  unknown & InitialProps
> = props => {
  const dispatch = useDispatch();
  const city = useSelector(selectGeoCity);
  const item = useSelector(selectProductItem);

  useEffect(() => {
    dispatch(getBanners());
    if (typeof props.id === 'string') {
      dispatch(getProduct(props.id));
    }
  }, [city]);

  return (
    <Layout>
      {item ? (
        <>
          <Breadcrumbs />
          <CardProduct />
        </>
      ) : (
        <NotFound text={'Error 404. \n Товар не найден'} />
      )}
    </Layout>
  );
};

Product.getInitialProps = async ({
  reduxStore,
  query,
}: AppInitialPropsWithRedux) => {
  const { id } = query;
  const promise = [
    typeof id === 'string' ? reduxStore.dispatch(getProduct(id)) : undefined,
  ];

  await Promise.all(promise);

  return { id };
};
export default Product;
