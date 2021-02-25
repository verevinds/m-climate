import Loading from '@public/svg/loading.svg';

import styles from './spinner.module.scss';

const Spinner = () => {
  return (
    <div className={styles['wrapper']}>
      <Loading className={styles['spinner']} />
    </div>
  );
};

export default Spinner;
