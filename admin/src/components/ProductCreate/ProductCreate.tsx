import Spinner from '@components/Spinner/Spinner';
import { selectBrandList } from '@redux/reducer/brand';
import { addProduct, Product } from '@redux/reducer/product';
import {
  Button,
  Checkbox,
  ImageUploadingAdd,
  ImageUploadingView,
  Input,
} from '@verevinds/ui-kit';
import { convertToRaw, EditorState } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import React, { useCallback, useState } from 'react';
import { Controller, useForm, ValidationRule } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import Select from 'react-select';

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
  brand: string;
};
const ProductCreate = () => {
  const dispatch = useDispatch();
  const brands = useSelector(selectBrandList);
  const { query } = useRouter();
  const isPageCreate = query.type && query.type === 'create';
  if (!isPageCreate) return null;
  const [images, setImages] = useState([]);
  const [editorState, setEditorState] = useState(EditorState.createEmpty());

  const { handleSubmit, errors, control } = useForm<ProductInput>();

  const productInputs: {
    name: keyof ProductInput;
    title: string;
    required?: string | ValidationRule<boolean>;
    option?: {
      [key: string]: any;
      _id: string;
      name: string;
    }[];
    as?: JSX.Element | string | any;
    type?: HTMLInputElement['type'];
    defaultValue?: any;
  }[] = [
    {
      name: 'name',
      title: 'Название',
      required: 'Обязательный для заполнения',
    },
    { name: 'price', title: 'Цена', type: 'number' },
    { name: 'priceOld', title: 'Старая цена', type: 'number' },
    {
      name: 'inStock',
      title: 'В наличии',
      as: Checkbox,
      defaultValue: false,
    },
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
    { name: 'brand', title: 'Бренд', option: brands, as: Select },
  ];

  const onSubmit = useCallback(
    async (product: Product) => {
      const description = draftToHtml(
        convertToRaw(editorState.getCurrentContent()),
      );
      Object.assign(product, { description });
      await dispatch(addProduct({ product, images }));
      console.log(product);
    },
    [images, editorState],
  );

  return (
    <div className={styles['product']}>
      <h3 className={styles['title']}>Добавить продукт</h3>
      <h4>Характеристики</h4>
      <form onSubmit={handleSubmit(onSubmit)} className={styles['form']}>
        <div className={styles['input-block']}>
          {productInputs.map(
            ({
              required,
              option,
              name,
              defaultValue,
              as = Input,
              ...restProps
            }) => {
              if (option)
                return (
                  <Controller
                    key={name}
                    name={name}
                    as={as}
                    control={control}
                    rules={{ required }}
                    defaultValue={option[0]._id}
                    options={option.map(el => ({
                      value: el._id,
                      label: el.name,
                    }))}
                    {...restProps}
                  />
                );

              if (restProps.type === 'checkbox')
                return (
                  <Controller
                    name={name}
                    control={control}
                    defaultValue={defaultValue}
                    rules={{ required: true }}
                    render={props => (
                      <Input
                        type='checkbox'
                        onChange={(e: React.SyntheticEvent) => {
                          const { checked } = e.target as HTMLInputElement;
                          props.onChange(checked);
                        }}
                        checked={props.value}
                      />
                    )}
                  />
                );

              return (
                <Controller
                  key={name}
                  name={name}
                  control={control}
                  rules={{ required }}
                  error={errors[name]?.message}
                  as={as}
                  {...restProps}
                />
              );
            },
          )}
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
