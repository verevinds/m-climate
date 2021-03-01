import { addBrand, Brand } from '@redux/reducer/brand';
import { Button, Input } from '@verevinds/ui-kit';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
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
  const { register, handleSubmit, errors, setValue } = useForm<Inputs>();

  useEffect(() => {
    register({ name: 'name' }, { required: 'Обязательно к заполнению' });
  }, []);

  const onSubmit = async (brand: Brand) => {
    dispatch(addBrand(brand));
  };

  const handleChange = (e: React.SyntheticEvent) => {
    const { value } = e.target as HTMLInputElement;

    setValue('name', value);
  };

  return (
    <div className={styles['brand']}>
      <h3 className={styles['title']}>Добавить новый бренд</h3>
      <form onSubmit={handleSubmit(onSubmit)} className={styles['form']}>
        <Input
          placeholder='Energolux'
          error={errors.name?.message}
          onChange={handleChange}
          className={styles['input']}
          name='name'
        />
        <div className={styles['buttons-block']}>
          <Button type='submit'>Добавить</Button>
        </div>
      </form>
    </div>
  );
};

export default React.memo(BrandCreate);
