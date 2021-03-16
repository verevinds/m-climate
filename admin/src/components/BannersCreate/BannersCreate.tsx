import { addBanners, Banner } from '@redux/reducer/banners';
import {
  Button,
  ImageUploadingAdd,
  ImageUploadingView,
  Input,
} from '@verevinds/ui-kit';
import cogoToast from 'cogo-toast';
import { useRouter } from 'next/router';
import { useCallback, useState } from 'react';
import { Controller, useForm, ValidationRule } from 'react-hook-form';
import { useDispatch } from 'react-redux';

import styles from './bannerscreate.module.scss';

type BannerInput = Pick<Banner, 'name' | 'dateEnd' | 'href'>;
const BannersCreate = () => {
  const { query } = useRouter();
  const dispatch = useDispatch();
  const isPageCreate = query.type && query.type === 'create';
  const [images, setImages] = useState([]);
  const [imagesMobile, setImagesMobile] = useState([]);
  const { handleSubmit, errors, control } = useForm<BannerInput>();
  console.log({ images, imagesMobile });
  const onSubmit = useCallback(
    async (banner: BannerInput) => {
      if (images.length > 0 && imagesMobile.length > 0) {
        await dispatch(addBanners({ banner, images, imagesMobile }));
      } else
        cogoToast.error('Вы не добавили изображение!', {
          position: 'top-right',
        });
    },
    [images, imagesMobile],
  );
  const bannersInputs: {
    name: keyof BannerInput;
    title: string;
    required?: string | ValidationRule<boolean>;
    type?: HTMLInputElement['type'];
    defaultValue?: any;
  }[] = [
    { name: 'name', required: 'Обязательно к заполнению', title: 'Название' },
    { name: 'href', title: 'Ссылка на промо' },
    {
      name: 'dateEnd',
      title: 'Выберите дату снятия с показа',
      type: 'date',
    },
  ];
  if (!isPageCreate) return null;
  return (
    <div className={styles['banners']}>
      <h3 className={styles['title']}>Добавить баннер</h3>
      <form onSubmit={handleSubmit(onSubmit)} className={styles['form']}>
        {bannersInputs.map(({ title, name, required, defaultValue, type }) => (
          <Controller
            key={name}
            name={name}
            control={control}
            rules={{ required }}
            defaultValue={defaultValue}
            render={({ onChange, onBlur }) => (
              <Input
                id={name}
                title={title}
                type={type}
                className={styles[name]}
                error={errors[name]?.message}
                onChange={onChange}
                onBlur={onBlur}
              />
            )}
          />
        ))}
        <div className={styles['images']}>
          <p>Баннер для десктопа (1900х300, полезная площадь 900х300)</p>
          <ImageUploadingAdd
            initialImages={images}
            callback={setImages}
            className={styles['add']}
          />
          {images.length ? (
            <div className={styles['slider']}>
              <ImageUploadingView initialImages={images} callback={setImages} />
            </div>
          ) : null}
          <p>Баннер для мобилок (768х300, полезная площадь 320х300)</p>
          <ImageUploadingAdd
            initialImages={imagesMobile}
            callback={setImagesMobile}
            className={styles['add']}
          />
          {imagesMobile.length ? (
            <div className={styles['slider']}>
              <ImageUploadingView
                initialImages={imagesMobile}
                callback={setImagesMobile}
              />
            </div>
          ) : null}
        </div>

        <div className={styles['buttons-block']}>
          <Button type='submit'>Добавить</Button>
        </div>
      </form>
    </div>
  );
};

export default BannersCreate;
