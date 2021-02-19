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
import { Controller, useForm, ValidationRule } from 'react-hook-form';

import styles from './bannerscreate.module.scss';

type BannerInput = Pick<Banner, 'name' | 'dateEnd'>;
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
  const bannersInputs: {
    name: keyof BannerInput;
    title: string;
    required?: string | ValidationRule<boolean>;
    type?: HTMLInputElement['type'];
    defaultValue?: any;
  }[] = [
    { name: 'name', required: 'Обязательно к заполнению', title: 'Название' },
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
                error={errors[name]?.message}
                onChange={onChange}
                onBlur={onBlur}
              />
            )}
          />
        ))}
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
