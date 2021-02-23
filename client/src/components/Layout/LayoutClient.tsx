import Banners from '@components/Banners/Banners';
import Footer from '@components/Footer/Footer';
import Header from '@components/Header/Header';

import styles from './layoutclient.module.scss';

const Layout: React.FC = props => {
  const { children } = props;
  return (
    <>
      <Header />
      <Banners />
      <main className={styles.main}>{children}</main>
      <Footer />
    </>
  );
};

export default Layout;
