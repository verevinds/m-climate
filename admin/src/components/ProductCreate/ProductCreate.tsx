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
import { EditorState } from 'draft-js';
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
      required: 'Обязательно к заполнению',
    },
    { name: 'price', title: 'Цена', type: 'number' },
    { name: 'priceOld', title: 'Старая цена', type: 'number' },
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
    {
      name: 'inStock',
      title: 'В наличии',
      type: 'checkbox',
    },
  ];

  const onSubmit = useCallback(
    async (
      product: Omit<Product, 'brand'> & {
        brand: { value: string; label: string };
      },
    ) => {
      await dispatch(addProduct({ product, images, description: editorState }));
    },
    [images, editorState],
  );

  if (!isPageCreate) return null;

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
              if (option) {
                const customStyles = {
                  control: (provided: any) => ({
                    ...provided,
                    border: '2px solid var(--color-primary, #007bff)',
                  }),
                };

                return (
                  <Controller
                    key={name}
                    name={name}
                    as={as}
                    control={control}
                    rules={{ required }}
                    styles={customStyles}
                    placeholder='Выберите бренд...'
                    defaultValue={option[0]._id}
                    options={option.map(el => ({
                      value: el._id,
                      label: el.name,
                    }))}
                    {...restProps}
                  />
                );
              }
              if (restProps.type === 'checkbox')
                return (
                  <Controller
                    key={name}
                    name={name}
                    control={control}
                    rules={{ required: true }}
                    defaultValue
                    render={props => (
                      <Checkbox
                        id={name}
                        title={restProps.title}
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
                  defaultValue=''
                  render={({ onChange, onBlur }) => (
                    <Input
                      id={name}
                      title={restProps.title}
                      error={errors[name]?.message}
                      onChange={onChange}
                      onBlur={onBlur}
                    />
                  )}
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
              multiple
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
