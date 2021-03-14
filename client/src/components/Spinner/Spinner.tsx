import Loading from '@public/svg/loading.svg';
import cn from 'classnames';

import styles from './spinner.module.scss';

type SpinnerProps = {
  inContainer?: boolean;
};
const Spinner: React.FC<SpinnerProps> = ({ inContainer }) => {
  return (
    <div className={cn(styles['wrapper'], inContainer && styles['container'])}>
      <Loading className={styles['spinner']} />
    </div>
  );
};

export default Spinner;
