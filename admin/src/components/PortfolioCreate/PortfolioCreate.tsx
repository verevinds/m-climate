import { addPortfolio } from '@redux/reducer/portfolio';
import {
  Button,
  ImageUploadingAdd,
  ImageUploadingView,
} from '@verevinds/ui-kit';
import cogoToast from 'cogo-toast';
import { useRouter } from 'next/router';
import { useCallback, useState } from 'react';
import { useDispatch } from 'react-redux';

import styles from './portfoliocreate.module.scss';

const BannersCreate = () => {
  const { query } = useRouter();
  const dispatch = useDispatch();
  const isPageCreate = query.type && query.type === 'create';
  const [images, setImages] = useState([]);

  const onSubmit = useCallback(async () => {
    if (images.length) {
      await dispatch(addPortfolio(images));
    } else
      cogoToast.error('Вы не добавили изображение!', {
        position: 'top-right',
      });
  }, [images]);

  if (!isPageCreate) return null;
  return (
    <div className={styles['banners']}>
      <h3 className={styles['title']}>Добавить изображение</h3>
      <div className={styles['form']}>
        <div className={styles['images']}>
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
        <div className={styles['buttons-block']}>
          <Button type='submit' onClick={onSubmit}>
            Добавить
          </Button>
        </div>
      </div>
    </div>
  );
};

export default BannersCreate;
