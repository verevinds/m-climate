import Header from '@components/Header/Header';
import Slider from '@components/Slider/Slider';
import { isMobile } from 'react-device-detect';
import styles from './Layout.module.scss';

const Layout: React.FC = (props) => {
    return (
        <>
            <Header />
            <Slider
                watchOverflow={true}
                loop={true}
                slidesPerView={1}
                onSlideChange={() => console.log('slide change')}
                onSwiper={(swiper) => console.log(swiper)}
                pagination={{ clickable: true }}
            >
                {[
                    {
                        big: '//via.placeholder.com/900x300',
                        small: '//via.placeholder.com/375x300',
                    },
                    {
                        big: '//via.placeholder.com/900x200',
                        small: '//via.placeholder.com/375x300',
                    },
                    {
                        big: '//via.placeholder.com/1900x300',
                        small: '//via.placeholder.com/375x300',
                    },
                    {
                        big: '//via.placeholder.com/1900x300',
                        small: '//via.placeholder.com/375x300',
                    },
                    {
                        big: '//via.placeholder.com/1900x300',
                        small: '//via.placeholder.com/375x300',
                    },
                    {
                        big: '//via.placeholder.com/1900x300',
                        small: '//via.placeholder.com/375x300',
                    },
                ].map((el) => (
                    <img
                        src={isMobile ? el.small : el.big}
                        className={styles['full-size']}
                    />
                ))}
            </Slider>
            <main className={styles['main']}>{props.children}</main>
        </>
    );
};

export default Layout;
