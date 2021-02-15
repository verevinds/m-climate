import BrandItems from './BrandItems';
import styles from './brandlist.module.scss';

const BrandList = () => {
  return (
    <>
      <h3>Список брендов</h3>
      <div className={styles['item']}>
        <h4>Название</h4>
        <h4>Дата создания</h4>
        <span />
        <BrandItems />
      </div>
    </>
  );
};

export default BrandList;
