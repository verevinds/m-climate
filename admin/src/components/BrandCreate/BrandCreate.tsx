import { addBrand, Brand } from '@redux/reducer/brand';
import { Button } from '@verevinds/ui-kit';
import { useRouter } from 'next/router';
import React from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';

import styles from './brandcreate.module.scss';

type Inputs = {
  name: string;
};

const BrandCreate: React.FC = () => {
  const { query } = useRouter();
  const isPageCreate = query.type && query.type === 'create';
  if (!isPageCreate) return null;

  const dispatch = useDispatch();
  const { register, handleSubmit, errors } = useForm<Inputs>();

  const onSubmit = async (brand: Brand) => {
    dispatch(addBrand(brand));
  };

  return (
    <div className={styles['brand']}>
      <h3 className={styles['title']}>Добавить новый бренд</h3>
      <form onSubmit={handleSubmit(onSubmit)} className={styles['form']}>
        <div className={styles['name']}>
          <input
            name='name'
            ref={register({ required: true })}
            className={styles['name__input']}
            placeholder='Energolux'
          />
          {errors.name && (
            <label className={styles['name__label']}>
              *Поле обезательное для заполнения
            </label>
          )}
        </div>
        <div className={styles['buttons-block']}>
          <Button type='submit' className={styles['button']}>
            Добавить
          </Button>
        </div>
      </form>
    </div>
  );
};

export default React.memo(BrandCreate);
