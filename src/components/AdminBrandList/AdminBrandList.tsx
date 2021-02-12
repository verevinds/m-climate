import AdminBrandItems from './AdminBrandItems';
import styles from './adminbrandlist.module.scss';

const AdminBrandList = () => {
  return (
    <>
      <h3>Список брендов</h3>
      <div className={styles['item']}>
        <h4>Название</h4>
        <h4>Дата создания</h4>
        <span />
        <AdminBrandItems />
      </div>
    </>
  );
};

export default AdminBrandList;
