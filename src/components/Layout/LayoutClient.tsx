import Footer from '@components/Footer/Footer';
import Header from '@components/Header/Header';
import Slider from '@components/Slider/Slider';
import useWindowDimensions from '@utils/hooks/useWindowDimensions';

import styles from './layoutclient.module.scss';

const Layout: React.FC = props => {
  const { isMobile } = useWindowDimensions();
  const { children } = props;
  return (
    <>
      <Header />
      <Slider
        watchOverflow
        loop
        speed={500}
        effect='fade'
        autoplay
        pagination={{ clickable: true }}
      >
        {[
          {
            id: '1',
            big: '//via.placeholder.com/900x300',
            small: '//via.placeholder.com/375x300',
            title: 'a',
          },
          {
            id: '2',
            big: '//via.placeholder.com/900x200',
            small: '//via.placeholder.com/375x300',
            title: 'a',
          },
          {
            id: '3',
            big: '//via.placeholder.com/1900x300',
            small: '//via.placeholder.com/375x300',
            title: 'a',
          },
          {
            id: '4',
            big: '//via.placeholder.com/1900x300',
            small: '//via.placeholder.com/375x300',
            title: 'a',
          },
          {
            id: '5',
            big: '//via.placeholder.com/1900x300',
            small: '//via.placeholder.com/375x300',
            title: 'a',
          },
          {
            id: '6',
            big: '//via.placeholder.com/1900x300',
            small: '//via.placeholder.com/375x300',
            title: 'a',
          },
        ].map(el => (
          <img
            key={el.id}
            src={isMobile ? el.small : el.big}
            className={styles['full-size']}
            alt={el.title}
          />
        ))}
      </Slider>
      <main className={styles.main}>{children}</main>
      <Footer />
    </>
  );
};

export default Layout;
