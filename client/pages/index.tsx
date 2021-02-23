import Advantage from '@components/Advantage/Advantage';
import Bar from '@components/Bar/Bar';
import Layout from '@components/Layout/LayoutClient';
import { getBrands, selectBrandList } from '@redux/reducer/brand';
import { getProducts, selectProductList } from '@redux/reducer/product';
import { useSelector } from 'react-redux';

import { AppInitialPropsWithRedux } from './_app';

const IndexPage = () => {
  const products = useSelector(selectProductList);
  const brands = useSelector(selectBrandList);

  return (
    <Layout>
      <Bar
        title='Популярные'
        items={products.filter(
          product =>
            product.type?.toLocaleLowerCase() ===
            'инверторный'.toLocaleLowerCase(),
        )}
        key='1'
      />
      <Bar title='Кондиционеры' items={products} key='2' />
      <Bar title='Услуги' items={products} key='3' />
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
  ];

  await Promise.all(promise);

  return { err };
};
export default IndexPage;
