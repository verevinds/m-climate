import Banners from '@components/Banners/Banners';
import Footer from '@components/Footer/Footer';
import Header from '@components/Header/Header';
import Spinner from '@components/Spinner/Spinner';
import { selectTuningPending } from '@redux/reducer/application/tuning';
import { useSelector } from 'react-redux';

import styles from './layoutclient.module.scss';

const Layout: React.FC = props => {
  const { children } = props;
  const isPending = useSelector(selectTuningPending);

  return (
    <>
      {isPending && <Spinner />}
      <Header />
      <Banners />
      <main className={styles.main}>{children}</main>
      <Footer />
    </>
  );
};

export default Layout;
