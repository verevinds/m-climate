import AdminBrandCreate from '@components/AdminBrandCreate';
import AdminBrandList from '@components/AdminBrandList';
import LayoutAdmin from '@components/AdminLayout';
import { AppInitialPropsWithRedux } from '@pages/_app';
import { getBrands } from '@redux/reducer/brand';

const Brand = () => {
  return (
    <LayoutAdmin title='Настройка брендов'>
      <AdminBrandCreate />
      <AdminBrandList />
    </LayoutAdmin>
  );
};

Brand.getInitialProps = async ({
  err,
  reduxStore,
}: AppInitialPropsWithRedux) => {
  const promise = [reduxStore.dispatch(getBrands())];

  await Promise.all(promise);

  return { err };
};

export default Brand;
