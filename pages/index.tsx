import Header from '@components/Header/Header';
import Slider from '@components/Slider/Slider';
import { isMobile } from 'react-device-detect';

const IndexPage = () => {
    if (!process.browser) return null;
    return (
        <>
            <Header />
            <Slider
                watchOverflow={true}
                loop={true}
                slidesPerView={1}
                onSlideChange={() => console.log('slide change')}
                onSwiper={(swiper) => console.log(swiper)}
                navigation
                pagination={{ clickable: true }}
            >
                {[
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
                        className="full-size"
                    />
                ))}
            </Slider>
        </>
    );
};

export default IndexPage;
