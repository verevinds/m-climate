import PortfolioBar from '@components/PortfolioBar';
import { toggleCity } from '@redux/reducer/geo';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Advantage from '../src/components/Advantage/Advantage';
import Bar from '../src/components/Bar/Bar';
import Layout from '../src/components/Layout/LayoutClient';
import { AppInitialPropsWithRedux } from '../src/interface';
import {
  turnOffPending,
  turnOnPending,
} from '../src/redux/reducer/application/tuning';
import { getBanners } from '../src/redux/reducer/banners';
import { selectBrandList } from '../src/redux/reducer/brand';
import {
  getProducts,
  getProductsPopular,
  selectProductList,
  selectProductPopulars,
} from '../src/redux/reducer/product';

const IndexPage = () => {
  const dispatch = useDispatch();
  const products = useSelector(selectProductList);
  const populars = useSelector(selectProductPopulars);
  const brands = useSelector(selectBrandList);

  useEffect(() => {
    dispatch(getProducts({ zip: true }));
  }, []);

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
            image: '/service/installation.jpg',
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
            image: '/service/maintenance.jpg',
            createdAt: '',
            updatedAt: '',
            description: '',
          },
        ]}
        key='3'
      />
      <Advantage />
      <PortfolioBar />
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
  reduxStore.dispatch(turnOnPending());
  reduxStore.dispatch(toggleCity(req));

  const promise = [
    reduxStore.dispatch(getProductsPopular()),
    reduxStore.dispatch(getProducts({ zip: true })) as Promise<any>,
    reduxStore.dispatch(getBanners()),
  ];

  await Promise.all(promise);

  reduxStore.dispatch(turnOffPending());

  return { err };
};
export default IndexPage;
