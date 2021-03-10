import Bar from '@components/Bar/Bar';
import { NextComponentType } from 'next';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Breadcrumbs from '../../src/components/Breadcrumbs';
import CardProduct from '../../src/components/CardProduct';
import Layout from '../../src/components/Layout/LayoutClient';
import NotFound from '../../src/components/NotFound';
import { AppInitialPropsWithRedux } from '../../src/interface';
import { getBanners } from '../../src/redux/reducer/banners';
import { selectGeoCity, toggleCity } from '../../src/redux/reducer/geo';
import {
  getProduct,
  getProductsPopular,
  selectProductItem,
  selectProductPopulars,
  selectProductSimilars,
} from '../../src/redux/reducer/product';

type InitialProps = { id: string | string[] | undefined };

const Product: NextComponentType<
  AppInitialPropsWithRedux,
  InitialProps,
  unknown & InitialProps
> = props => {
  const dispatch = useDispatch();
  const city = useSelector(selectGeoCity);
  const item = useSelector(selectProductItem);
  const populars = useSelector(selectProductPopulars);
  const similars = useSelector(selectProductSimilars);

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
          <br />
          <Bar title='Популярные' items={populars} />
          <Bar title='Похожие кондиционеры' items={similars} />
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
  req,
}: AppInitialPropsWithRedux) => {
  reduxStore.dispatch(toggleCity(req));

  const id = query.id as string;
  // TODO разобраться с типами промиса
  const promise = [
    reduxStore.dispatch(getProductsPopular(id)) as Promise<any>,
    typeof id === 'string' ? reduxStore.dispatch(getProduct(id)) : undefined,
  ];

  await Promise.all(promise);

  return { id };
};
export default Product;
