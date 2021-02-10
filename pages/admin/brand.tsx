import AdminCreate from '@components/AdminCreate';
import AdminHeader from '@components/AdminHeader';
import LayoutAdmin from '@components/AdminLayout';

const Brand = () => {
  return (
    <LayoutAdmin>
      <AdminHeader title='Настройка брендов' />
      <AdminCreate />
    </LayoutAdmin>
  );
};

export default Brand;
