import AdminBrandCreate from '@components/BrandCreate';
import AdminBrandList from '@components/BrandItems';
import Layout from '@components/Layout';
import { AppInitialPropsWithRedux } from '@pages/_app';
import { getBrands } from '@redux/reducer/brand';

const Brand = () => {
  return (
    <Layout title='Настройка брендов'>
      <AdminBrandCreate />
      <AdminBrandList />
    </Layout>
  );
};

Brand.getInitialProps = async ({
  err,
  reduxStore,
}: AppInitialPropsWithRedux) => {
  const brands = reduxStore.getState().brand.list;

  if (!brands.length) {
    const promise = [reduxStore.dispatch(getBrands())];

    await Promise.all(promise);
  }
  return { err };
};

export default Brand;
