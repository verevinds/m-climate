import AdminHeader from '@components/AdminHeader/AdminHeader';
import LayoutAdmin from '@components/Layout/LayoutAdmin';

const Admin = () => {
    return (
        <LayoutAdmin>
            <AdminHeader title={'Панель администратора'} />
        </LayoutAdmin>
    );
};

export default Admin;
