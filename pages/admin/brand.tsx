import AdminBrandCreate from '@components/AdminBrandCreate';
import AdminBrandList from '@components/AdminBrandList';
import LayoutAdmin from '@components/AdminLayout';
import { AppInitialPropsWithRedux } from '@pages/_app';
import { getBrands } from '@redux/reducer/brand';
import { useRouter } from 'next/router';

const Brand = () => {
  const { query } = useRouter();
  const isPageCreate = query.type && query.type === 'create';

  return (
    <LayoutAdmin title='Настройка брендов'>
      {isPageCreate && <AdminBrandCreate />}
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
