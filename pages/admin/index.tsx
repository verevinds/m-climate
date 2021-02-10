import AdminHeader from '@components/AdminHeader';
import LayoutAdmin from '@components/AdminLayout';
import { useEffect } from 'react';

const Admin = () => {
  useEffect(() => {
    fetch('http://localhost:8081/api/brand')
      .then(e => {
        console.log(e.json());
      })
      .catch(e => {
        console.log(e);
      });
  }, []);
  return (
    <LayoutAdmin>
      <AdminHeader title='Панель администратора' />
    </LayoutAdmin>
  );
};

export default Admin;
