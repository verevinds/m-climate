import Footer from '@components/Footer/Footer';
import Header from '@components/Header/Header';
import Slider from '@components/Slider/Slider';
import useWindowDimensions from '@utils/hooks/useWindowDimensions';

import styles from './LayoutClient.module.scss';

const Layout: React.FC = props => {
  const { isMobile } = useWindowDimensions();

  return (
    <>
      <Header />
      <Slider
        watchOverflow={true}
        loop={true}
        speed={500}
        effect='fade'
        autoplay={true}
        pagination={{ clickable: true }}
      >
        {[
          {
            big: '//via.placeholder.com/900x300',
            small: '//via.placeholder.com/375x300',
            title: 'a',
          },
          {
            big: '//via.placeholder.com/900x200',
            small: '//via.placeholder.com/375x300',
            title: 'a',
          },
          {
            big: '//via.placeholder.com/1900x300',
            small: '//via.placeholder.com/375x300',
            title: 'a',
          },
          {
            big: '//via.placeholder.com/1900x300',
            small: '//via.placeholder.com/375x300',
            title: 'a',
          },
          {
            big: '//via.placeholder.com/1900x300',
            small: '//via.placeholder.com/375x300',
            title: 'a',
          },
          {
            big: '//via.placeholder.com/1900x300',
            small: '//via.placeholder.com/375x300',
            title: 'a',
          },
        ].map((el, index) => (
          <img
            key={index}
            src={isMobile ? el.small : el.big}
            className={styles['full-size']}
            alt={el.title}
          />
        ))}
      </Slider>
      <main className={styles['main']}>{props.children}</main>
      <Footer />
    </>
  );
};

export default Layout;
