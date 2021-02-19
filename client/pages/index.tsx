import Advantage from '@components/Advantage/Advantage';
import Bar from '@components/Bar/Bar';
import Layout from '@components/Layout/LayoutClient';
import { getProducts, selectProductList } from '@redux/reducer/product';
import { useSelector } from 'react-redux';

import { AppInitialPropsWithRedux } from './_app';

const IndexPage = () => {
  const products = useSelector(selectProductList);
  return (
    <Layout>
      <Bar
        title='Популярные'
        items={products.filter(
          product => product.type?.toLocaleLowerCase() === 'традиционный',
        )}
        key='1'
      />
      <Bar title='Кондиционеры' items={products} key='2' />
      <Bar title='Услуги' items={products} key='3' />
      <Advantage />
    </Layout>
  );
};

IndexPage.getInitialProps = async ({
  err,
  reduxStore,
}: AppInitialPropsWithRedux) => {
  const promise = [reduxStore.dispatch(getProducts())];

  await Promise.all(promise);

  return { err };
};
export default IndexPage;
