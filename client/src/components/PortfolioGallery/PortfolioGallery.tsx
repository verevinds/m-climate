import Img from '@components/Img';
import Slider from '@components/Slider/Slider';
import { selectPortfolioList } from '@redux/reducer/portfolio';
import { useSelector } from 'react-redux';

import styles from './portfoliogallery.module.scss';

const PortfolioGallery = () => {
  const images = useSelector(selectPortfolioList);

  return (
    <>
      <Slider
        watchOverflow
        slidesPerView='auto'
        spaceBetween={10}
        loop
        centeredSlides
        navigation={{
          disabledClass: styles['disabled'],
        }}
        pagination={{
          clickable: true,
        }}
      >
        {images.map(image => (
          <Img src={image.url} key={image._id} className={styles['img']} />
        ))}
      </Slider>
    </>
  );
};

export default PortfolioGallery;
