import Advantage from '@components/Advantage/Advantage';
import Bar from '@components/Bar/Bar';
import Layout from '@components/Layout/LayoutClient';
import { getBrands, selectBrandList } from '@redux/reducer/brand';
import { getProducts, selectProductList } from '@redux/reducer/product';
import { getService, selectServiceList } from '@redux/reducer/service';
import { AppInitialPropsWithRedux } from '@src/interface';
import { useMemo } from 'react';
import { useSelector } from 'react-redux';

const IndexPage = () => {
  const products = useSelector(selectProductList);
  const brands = useSelector(selectBrandList);
  const services = useSelector(selectServiceList);

  const populars = useMemo(
    () =>
      products.filter(
        product =>
          product.type?.toLocaleLowerCase() ===
          'Инвентарные'.toLocaleLowerCase(),
      ),
    [products],
  );

  return (
    <Layout>
      <Bar title='Популярные' items={populars} key='1' />
      <Bar title='Кондиционеры' items={products} key='2' />
      <Bar title='Услуги' items={services} key='3' />
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
}: AppInitialPropsWithRedux) => {
  const promise = [
    reduxStore.dispatch(getProducts()),
    reduxStore.dispatch(getBrands()),
    reduxStore.dispatch(getService()),
  ];

  await Promise.all(promise);

  return { err };
};
export default IndexPage;
