import { Banner } from '@redux/reducer/banners';
import {
  Button,
  ImageUploadingAdd,
  ImageUploadingView,
  Input,
} from '@verevinds/ui-kit';
import cogoToast from 'cogo-toast';
import { useRouter } from 'next/router';
import { useCallback, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';

import styles from './bannerscreate.module.scss';

type BannerInput = Pick<Banner, 'name'>;
const BannersCreate = () => {
  const { query } = useRouter();
  const isPageCreate = query.type && query.type === 'create';
  const [images, setImages] = useState([]);
  const { handleSubmit, errors, control } = useForm<BannerInput>();

  const onSubmit = useCallback(
    async (banner: BannerInput) => {
      console.log(images);
      if (images.length) {
        console.log({ banner, images });
      } else
        cogoToast.error('Вы не добавили изображение!', {
          position: 'top-right',
        });
    },
    [images],
  );

  if (!isPageCreate) return null;
  return (
    <div className={styles['banners']}>
      <h3 className={styles['title']}>Добавить продукт</h3>
      <form onSubmit={handleSubmit(onSubmit)} className={styles['form']}>
        <Controller
          key='name'
          name='name'
          control={control}
          rules={{ required: 'Обязательно к заполнению' }}
          defaultValue=''
          render={({ onChange, onBlur }) => (
            <Input
              title='Название'
              error={errors['name']?.message}
              onChange={onChange}
              onBlur={onBlur}
            />
          )}
        />
        <div className={styles['images']}>
          <div className={styles['add']}>
            <ImageUploadingAdd
              initialImages={images}
              callback={setImages}
              className={styles['add']}
            />
          </div>
          {images.length ? (
            <div className={styles['slider']}>
              <ImageUploadingView initialImages={images} callback={setImages} />
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
