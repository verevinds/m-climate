import Bar from '@components/Bar/Bar';
import { NextComponentType } from 'next';
import React, { useEffect, useMemo } from 'react';
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
  getProducts,
  getProductsPopular,
  selectProductItem,
  selectProductList,
  selectProductPopulars,
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
  const products = useSelector(selectProductList);

  const uniquePopulars = useMemo(
    () => populars.filter(popular => popular._id !== item?._id),
    [populars],
  );

  const similars = useMemo(() => {
    const similarProducts = products.filter(
      product =>
        product._id !== item?._id &&
        (product.servicedArea === item?.servicedArea ||
          product.type === item?.type ||
          product.energyEfficiency === item?.energyEfficiency ||
          product.powerConsumptionCooling === item?.powerConsumptionCooling ||
          product.powerConsumptionHeating === item?.powerConsumptionHeating ||
          product.powerCooling === item?.powerCooling ||
          product.powerHeating === item?.powerHeating ||
          product.sizeIndoor === item?.sizeIndoor ||
          product.sizeOutdoor === item?.sizeOutdoor ||
          product.weightIndoor === item?.weightIndoor ||
          product.weightOutdoor === item?.weightOutdoor ||
          product.noiseInside === item?.noiseInside ||
          product.noiseOutside === item?.noiseOutside),
    );

    const uniqueSimilarProducts = similarProducts.filter(
      product => !~uniquePopulars.findIndex(el => el._id === product._id),
    );

    return uniqueSimilarProducts;
  }, [products, item, uniquePopulars]);

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
          <Bar title='Популярные' items={uniquePopulars} />
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

  const { id } = query;
  // TODO разобраться с типами промиса
  const promise = [
    reduxStore.dispatch(getProductsPopular()) as Promise<any>,
    reduxStore.dispatch(getProducts({ zip: true })) as Promise<any>,
    typeof id === 'string' ? reduxStore.dispatch(getProduct(id)) : undefined,
  ];

  await Promise.all(promise);

  return { id };
};
export default Product;
