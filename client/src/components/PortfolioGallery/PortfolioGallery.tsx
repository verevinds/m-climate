import Slider from '@components/Slider/Slider';
import Spinner from '@components/Spinner/Spinner';
import { selectPortfolioList } from '@redux/reducer/portfolio';
import dynamic from 'next/dynamic';
import { useSelector } from 'react-redux';

import styles from './portfoliogallery.module.scss';

const Img = dynamic(() => import('@components/Img'), {
  loading: () => <Spinner inContainer />,
  ssr: false,
});

const PortfolioGallery = () => {
  const images = useSelector(selectPortfolioList);
  if (!images.length) return null;

  return (
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
  );
};

export default PortfolioGallery;
