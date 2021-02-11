import AdminCreateBrand from '@components/AdminCreateBrand';
import LayoutAdmin from '@components/AdminLayout';
import { AppInitialPropsWithRedux } from '@pages/_app';
import { getBrands } from '@redux/reducer/brand';
import { useRouter } from 'next/router';

const Brand = () => {
  const { query } = useRouter();
  const isPageCreate = query.type && query.type === 'create';

  return (
    <LayoutAdmin title='Настройка брендов'>
      {isPageCreate && <AdminCreateBrand />}
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
