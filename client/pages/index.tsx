import { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Advantage from '../src/components/Advantage/Advantage';
import Bar from '../src/components/Bar/Bar';
import Layout from '../src/components/Layout/LayoutClient';
import { AppInitialPropsWithRedux } from '../src/interface';
import { getGeo, selectGeoCity } from '../src/redux/reducer/application/geo';
import {
  turnOffPending,
  turnOnPending,
} from '../src/redux/reducer/application/tuning';
import { getBanners } from '../src/redux/reducer/banners';
import { getBrands, selectBrandList } from '../src/redux/reducer/brand';
import { getProducts, selectProductList } from '../src/redux/reducer/product';
import { getService } from '../src/redux/reducer/service';

const IndexPage = () => {
  const dispatch = useDispatch();
  const products = useSelector(selectProductList);
  const brands = useSelector(selectBrandList);
  const city = useSelector(selectGeoCity);

  const populars = useMemo(
    () =>
      products.filter(
        product =>
          product.type?.toLocaleLowerCase() ===
          'Инвентарный'.toLocaleLowerCase(),
      ),
    [products],
  );

  useEffect(() => {
    dispatch(getProducts());
    dispatch(getBanners());
  }, [city]);

  return (
    <Layout>
      <Bar title='Популярные' items={populars} key='1' />
      <Bar title='Кондиционеры' items={products} key='2' />
      <Bar
        title='Услуги'
        items={[
          {
            _id: 'installation',
            name: 'Стандартный монтаж',
            image: '/svg/no-camera.svg',
            createdAt: '',
            updatedAt: '',
            description: '',
          },
          {
            _id: 'dismantling',
            name: 'Демонтаж кондиционера',
            image: '/svg/no-camera.svg',
            createdAt: '',
            updatedAt: '',
            description: '',
          },
          {
            _id: 'maintenance',
            name: 'Сервисное обслуживание',
            image: '/svg/no-camera.svg',
            createdAt: '',
            updatedAt: '',
            description: '',
          },
        ]}
        key='3'
      />
      <Advantage />
      {brands.map(brand => (
        <Bar
          key={brand._id}
          title={brand.name}
          items={products.filter(product => product.brand?.name === brand.name)}
        />
      ))}
    </Layout>
  );
};

IndexPage.getInitialProps = async ({
  err,
  reduxStore,
  req,
}: AppInitialPropsWithRedux) => {
  await reduxStore.dispatch(turnOnPending());

  const subdomain = (req && req.headers.host?.split('.')[0]) || 'nsk';
  await reduxStore.dispatch(getGeo({ subdomain }));

  const promise = [
    reduxStore.dispatch(getProducts()) as Promise<any>,
    reduxStore.dispatch(getBrands()),
    reduxStore.dispatch(getService()),
  ];

  await Promise.all(promise);

  await reduxStore.dispatch(turnOffPending());

  return { err };
};
export default IndexPage;
