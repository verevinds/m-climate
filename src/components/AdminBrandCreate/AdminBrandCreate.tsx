import React from 'react';
import { useForm } from 'react-hook-form';

type Inputs = {
  example: string;
  exampleRequired: string;
};

const AdminCreate: React.FC = () => {
  const { register, handleSubmit, errors } = useForm<Inputs>();

  const onSubmit = async (data: any) => {
    console.log(data);
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input name='example' defaultValue='test' ref={register} />

      <input name='exampleRequired' ref={register({ required: true })} />
      {errors.exampleRequired && <span>This field is required</span>}

      <input type='submit' />
    </form>
  );
};

export default React.memo(AdminCreate);
