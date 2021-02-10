import AdminCreateBrand from '@components/AdminCreateBrand';
import LayoutAdmin from '@components/AdminLayout';
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

export default Brand;
