import { Product } from '@redux/reducer/product';
import { Button, Input } from '@verevinds/ui-kit';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';

import styles from './productcreate.module.scss';

type ProductInput = {
  name: string;
};
const ProductCreate = () => {
  const { query } = useRouter();
  const isPageCreate = query.type && query.type === 'create';
  if (!isPageCreate) return null;

  const { handleSubmit, errors, setValue, register } = useForm<ProductInput>();

  useEffect(() => {
    register({ name: 'name' }, { required: 'Обязательный для заполнения' });
  }, []);

  const onSubmit = async (product: Product) => {
    console.log(product);
  };

  const handleChange = (name: keyof ProductInput) => (
    e: React.SyntheticEvent,
  ) => {
    const { value } = e.target as HTMLInputElement;

    setValue(name, value);
  };

  return (
    <div className={styles['product']}>
      <h3 className={styles['title']}>Добавить продукт</h3>
      <form onSubmit={handleSubmit(onSubmit)} className={styles['form']}>
        <Input
          placeholder='DAVOS SAS07D1-A/SAU07D1-A'
          error={errors.name?.message}
          onChange={handleChange('name')}
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

export default ProductCreate;
