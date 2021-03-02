import CardProductTabs from '@components/CardProductTabs/CardProductTabs';
import Slider from '@components/Slider/Slider';
import Headset from '@public/svg/headset.svg';
import Phone from '@public/svg/phone.svg';
import Truck from '@public/svg/truck.svg';
import { selectProductItem } from '@redux/reducer/product';
import ActiveLink from '@src/utils/ActiveLink';
import addCommas from '@src/utils/addCommas';
import useWindowDimensions from '@src/utils/hooks/useWindowDimensions';
import { Button } from '@verevinds/ui-kit';
import cn from 'classnames';
import { useSelector } from 'react-redux';

import styles from './cardproduct.module.scss';

export default function CardProduct() {
  const item = useSelector(selectProductItem);
  const Dimension = useWindowDimensions();
  const isMobile = Dimension && Dimension.windowDimensions.width <= 425;
  if (!item) return null;

  return (
    <article className={styles['block']}>
      <h1 className={styles['h1']}>{item?.name}</h1>

      <section className={styles['img']}>
        <Slider
          slidesPerView={2}
          breakpoints={{
            768: {
              slidesPerView: 2,
            },
          }}
          spaceBetween={isMobile ? 0 : 50}
          loop
          pagination
          navigation
        >
          {item?.images.map((image, idx) => (
            <img
              key={image._id}
              src={image.url}
              alt={`${item.name}-${idx}`}
              className={styles['img__item']}
            />
          ))}
        </Slider>
        <div className={styles['shadow-right']} />
      </section>
      <section className={styles['main']}>
        <div className={styles['line']}>
          <span className={styles['price']}>
            {addCommas(Number(item?.price))}
          </span>
          {item?.priceOld ? (
            <span className={styles['price-old']}>
              {addCommas(item.priceOld)}
            </span>
          ) : null}
        </div>

        <div className={styles['line']}>
          <span className={styles['value']}>{item?.brand?.name}</span>
        </div>

        <div className={styles['line']}>
          <span className={cn(styles['value'], styles['light'])}>
            {item?.type}
          </span>
        </div>

        <div className={cn(styles['line'], styles['accent'])}>
          <Truck className={styles['icon-truck']} />
          <span>Бесплатная доставка</span>
        </div>

        <div className={styles['hr']} />

        <div className={styles['line']}>
          <a href='tel:+73833108210' rel='nofollow' className={styles['phone']}>
            <Phone className={styles['phone__icon']} />

            <span>8 (383) 310-82-10</span>
          </a>
        </div>

        <div className={styles['line']}>
          <a href='tel:+73833108210' rel='nofollow'>
            <Button className={styles['call']}>
              Связаться с менеджером
              <Headset className={styles['icon-phone']} />
            </Button>
          </a>
        </div>
        <ActiveLink href='/service/installation'>
          <a>Узнайте подробнее о услуге установки</a>
        </ActiveLink>
      </section>
      <CardProductTabs />
    </article>
  );
}
