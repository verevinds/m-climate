import Spinner from '@components/Spinner/Spinner';
import { addProduct, Product } from '@redux/reducer/product';
import {
  Button,
  ImageUploadingAdd,
  ImageUploadingView,
  Input,
} from '@verevinds/ui-kit';
import { convertToRaw, EditorState } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import React, { useCallback, useEffect, useState } from 'react';
import { useForm, ValidationRule } from 'react-hook-form';
import { useDispatch } from 'react-redux';

import styles from './productcreate.module.scss';

const Editor = dynamic(
  async () => {
    const mod = await import('react-draft-wysiwyg');
    return mod.Editor;
  },
  { loading: () => <Spinner />, ssr: false },
);

type ProductInput = {
  name: string;
  type: string;
  servicedArea: string;
  powerCooling: string;
  powerHeating: string;
  powerConsumptionCooling: string;
  powerConsumptionHeating: string;
  energyEfficiency: string;
  noiseInside: string;
  noiseOutside: string;
  sizeIndoor: string;
  sizeOutdoor: string;
  weightIndoor: string;
  weightOutdoor: string;
  warranty: string;
  price: string;
  priceOld: string;
  inStock: boolean;
};
const ProductCreate = () => {
  const dispatch = useDispatch();
  const { query } = useRouter();
  const isPageCreate = query.type && query.type === 'create';
  if (!isPageCreate) return null;
  const [images, setImages] = useState([]);
  const [editorState, setEditorState] = useState(EditorState.createEmpty());

  const {
    handleSubmit,
    errors,
    setValue,
    register,
    reset,
  } = useForm<ProductInput>();

  const productInputs: {
    name: keyof ProductInput;
    title: string;
    required?: string | ValidationRule<boolean>;
  }[] = [
    {
      name: 'name',
      title: 'Название',
      required: 'Обязательный для заполнения',
    },
    { name: 'price', title: 'Цена' },
    { name: 'priceOld', title: 'Старая цена' },
    { name: 'inStock', title: 'В наличии' },
    { name: 'type', title: 'Тип' },
    { name: 'servicedArea', title: 'Рабочая площадь' },
    { name: 'powerCooling', title: 'Мощность охлаждения' },
    { name: 'powerHeating', title: 'Мощность обогрева' },
    {
      name: 'powerConsumptionCooling',
      title: 'Потребляемая мощность охлаждение',
    },
    {
      name: 'powerConsumptionHeating',
      title: 'Потребляемая мощность обогрева',
    },
    { name: 'energyEfficiency', title: 'Энергоэффективность' },
    { name: 'noiseInside', title: 'Шум внутри' },
    { name: 'noiseOutside', title: 'Шум снаружи' },
    { name: 'sizeIndoor', title: 'Размер внутри' },
    { name: 'sizeOutdoor', title: 'Размер снаружи' },
    { name: 'weightIndoor', title: 'Вес внутри' },
    { name: 'weightOutdoor', title: 'Вес снаружи' },
    { name: 'warranty', title: 'Гарантия' },
  ];

  useEffect(() => {
    productInputs.forEach(({ name, required }) =>
      required ? register({ name }, { required }) : register({ name }),
    );
  }, []);

  const onSubmit = useCallback(
    async (product: Product) => {
      const description = draftToHtml(
        convertToRaw(editorState.getCurrentContent()),
      );
      Object.assign(product, { description });
      await dispatch(addProduct({ product, images }));
      reset({});
    },
    [images, editorState],
  );

  const handleChange = (name: keyof ProductInput) => (
    e: React.SyntheticEvent,
  ) => {
    const { value } = e.target as HTMLInputElement;

    setValue(name, value);
  };

  return (
    <div className={styles['product']}>
      <h3 className={styles['title']}>Добавить продукт</h3>
      <h4>Характеристики</h4>
      <form onSubmit={handleSubmit(onSubmit)} className={styles['form']}>
        <div className={styles['input-block']}>
          {productInputs.map(({ name, title }) => (
            <Input
              key={name}
              title={title}
              error={errors[name]?.message}
              onChange={handleChange(name)}
              className={styles['input']}
              name={name}
            />
          ))}
        </div>
        <h4>Добавить описание</h4>
        <Editor
          editorState={editorState}
          onEditorStateChange={setEditorState}
          placeholder='Введите текст'
        />
        <h4>Добавить картинки</h4>
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

export default ProductCreate;
