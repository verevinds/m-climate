import styles from './Item.module.scss';

const BarItem = () => {
  return(
    <div className={styles['item']}>
      <div className={styles['item__img-wrap']}>
        <img src='//via.placeholder.com/150x166' className={styles['item__img']}/>
      </div>
      <div className={styles['item__price']}>
          <span className={styles['item__price-current']}>1800</span>
          <span className={styles['item__price-old']}>2600</span>
      </div>
      <div className={styles['item__title-wrap']}>
        <a href='#' className={styles['item__title']}>title</a>
      </div>
    </div>
  );
};

export default BarItem;