import { addBrand, Brand } from '@redux/reducer/brand';
import React from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';

type Inputs = {
  name: string;
};

const AdminCreate: React.FC = () => {
  const dispatch = useDispatch();
  const { register, handleSubmit, errors } = useForm<Inputs>();

  const onSubmit = async (brand: Brand) => {
    dispatch(addBrand(brand));
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input id='name' name='name' ref={register({ required: true })} />
      {errors.name && (
        <label htmlFor='name'>Поле обезательное для заполнения</label>
      )}

      <input type='submit' />
    </form>
  );
};

export default React.memo(AdminCreate);
