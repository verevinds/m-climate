import AdminCreateBrand from '@components/AdminCreateBrand';
import LayoutAdmin from '@components/AdminLayout';
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

Brand.getInitialProps = async ({ reduxStore }: { reduxStore: any }) => {
  await reduxStore.dispatch(getBrands());
  return {};
};
export default Brand;
