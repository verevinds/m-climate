import Spinner from '@components/Spinner/Spinner';
import { selectBrandList } from '@redux/reducer/brand';
import {
  addProduct,
  deleteProductImage,
  selectProductList,
  updateProduct,
} from '@redux/reducer/product';
import { ImageProduct, Product } from '@src/interface';
import {
  Button,
  Checkbox,
  ImageUploadingAdd,
  ImageUploadingView,
  Input,
} from '@verevinds/ui-kit';
import { ContentState, convertFromHTML, EditorState } from 'draft-js';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
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
  const products = useSelector(selectProductList);
  const { query } = useRouter();
  const isPageCreate =
    (query.type && query.type === 'create') || query.type === 'update';
  const isPageUpdate = query.type === 'update';
  const initUpdateProduct = useMemo(
    () => products.find(product => query.id && product._id === query.id),
    [products],
  );

  const [images, setImages] = useState([]);
  const [editorState, setEditorState] = useState(EditorState.createEmpty());

  const { handleSubmit, errors, control, setValue } = useForm<ProductInput>();

  useEffect(() => {
    if (initUpdateProduct)
      Object.keys(initUpdateProduct).forEach(key => {
        const currentKey = key as keyof (ProductInput & {
          description: string;
        });
        switch (currentKey) {
          case 'type':
            setValue(currentKey, {
              value: initUpdateProduct[currentKey],
              label: initUpdateProduct[currentKey],
            });
            break;
          case 'brand': {
            const currentBrand = brands.find(
              el => el.name === initUpdateProduct[currentKey]?.name,
            );
            setValue(currentKey, {
              value: currentBrand?._id,
              label: initUpdateProduct[currentKey]?.name,
            });
            break;
          }
          case 'description': {
            setEditorState(
              EditorState.createWithContent(
                ContentState.createFromBlockArray(
                  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                  // @ts-ignore
                  convertFromHTML(initUpdateProduct[currentKey] || ''),
                ),
              ),
            );
            break;
          }
          default:
            setValue(currentKey, initUpdateProduct[currentKey]);
            break;
        }
      });
  }, [initUpdateProduct]);

  const handleDelete = (image: ImageProduct) => () => {
    if (initUpdateProduct)
      dispatch(deleteProductImage({ image, id: initUpdateProduct._id }));
  };

  const productInputs: {
    name: keyof ProductInput;
    title: string;
    required?: string | ValidationRule<boolean>;
    options?: {
      [key: string]: any;
      _id: string;
      name: string;
    }[];
    as?: JSX.Element | string | any;
    type?: HTMLInputElement['type'];
    defaultValue?: any;
    placeholder?: string;
  }[] = useMemo(
    () => [
      {
        name: 'name',
        title: 'Название',
        required: 'Обязательно к заполнению',
      },
      { name: 'price', title: 'Цена', type: 'number' },
      { name: 'priceOld', title: 'Старая цена', type: 'number' },
      {
        name: 'type',
        title: 'Тип',
        placeholder: 'Выберите тип...',
        options: [
          { _id: 'Инвентарный', name: 'Инвентарный' },
          { _id: 'Традиционный', name: 'Традиционный' },
        ],
        as: Select,
        required: 'Обязательно к заполнению',
      },
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
      {
        name: 'brand',
        title: 'Бренд',
        placeholder: 'Выберите бренд...',
        options: brands,
        as: Select,
        required: 'Обязательно к заполнению',
      },
      {
        name: 'inStock',
        title: 'В наличии',
        type: 'checkbox',
      },
    ],
    [brands],
  );

  const onSubmit = useCallback(
    async (
      product: Omit<Product, 'brand'> & {
        brand: { value: string; label: string };
        type: { value: string; label: string };
      },
    ) => {
      if (isPageUpdate) {
        if (initUpdateProduct)
          await dispatch(
            updateProduct({
              product,
              images,
              description: editorState,
              id: initUpdateProduct._id,
            }),
          );
        setImages([]);
      } else {
        dispatch(
          addProduct({
            product,
            images,
            description: editorState,
          }),
        );
      }
    },
    [images, editorState, initUpdateProduct],
  );

  if (!isPageCreate) return null;

  return (
    <div className={styles['product']}>
      <h3 className={styles['title']}>
        {isPageUpdate ? 'Обновить продукт' : 'Добавить продукт'}
      </h3>
      <h4>Характеристики</h4>
      <form onSubmit={handleSubmit(onSubmit)} className={styles['form']}>
        <div className={styles['input-block']}>
          {productInputs.map(
            ({
              required,
              options,
              name,
              defaultValue,
              placeholder,
              as = Input,
              ...restProps
            }) => {
              if (options) {
                return (
                  <Controller
                    key={name}
                    name={name}
                    as={as}
                    control={control}
                    rules={{ required }}
                    // styles={customStyles}
                    placeholder={placeholder}
                    options={options.map(el => ({
                      value: el._id,
                      label: el.name,
                    }))}
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
                  id={name}
                  defaultValue={defaultValue}
                  title={restProps.title}
                  error={errors[name]?.message}
                  as={Input}
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
          <Button type='submit'>
            {isPageUpdate ? 'Сохранить' : 'Добавить'}
          </Button>
        </div>
        {isPageUpdate ? (
          <div>
            {initUpdateProduct?.images.map(image => {
              return (
                <div key={image._id} className={styles['img-current']}>
                  <picture>
                    <source
                      srcSet={`${image.url.substr(
                        0,
                        image.url.lastIndexOf('.'),
                      )}.avif`}
                      type='image/avif'
                    />
                    <source
                      srcSet={`${image.url.substr(
                        0,
                        image.url.lastIndexOf('.'),
                      )}.webp`}
                      type='image/webp'
                    />
                    <img
                      src={image.url}
                      alt={initUpdateProduct.name}
                      className={styles['img-current__img']}
                    />
                  </picture>
                  <Button
                    type='button'
                    variant='outline-danger'
                    className={styles['img-current__delete']}
                    onClick={handleDelete(image)}
                  >
                    Удалить
                  </Button>
                </div>
              );
            })}
          </div>
        ) : null}
      </form>
    </div>
  );
};

export default ProductCreate;
