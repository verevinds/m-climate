/* eslint-disable no-param-reassign */
import { handlePending, handleReject } from '@redux/caseReducer';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { ImageProduct, Images, Product } from '@src/interface';
import { RestDelete } from '@type/api';
import Api from '@utils/Api';
import { AxiosResponse } from 'axios';
import cogoToast from 'cogo-toast';
import { convertToRaw, EditorState } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import { ImageListType } from 'react-images-uploading';

import type { RootState } from '.';

export type ProductReducer = {
  list: Product[];
  isPending: boolean;
};

const initialState: ProductReducer = {
  list: [],
  isPending: false,
};

export const getProducts = createAsyncThunk(
  'product/getThunk',
  async (_, { getState }) => {
    try {
      const state = getState() as RootState;
      const { city } = state.application.geo;
      const { data } = await Api().get<Product[]>(`/api/product/?city=${city}`);
      data.sort((a, b) => (a.createdAt > b.createdAt ? -1 : 1));

      return data;
    } catch (e) {
      console.error(e);
    }
  },
);

export const addProduct = createAsyncThunk(
  'product/addThunk',
  async (
    {
      product,
      images,
      description: draftDescription,
    }: {
      product: Omit<Product, 'brand' | 'type'> & {
        brand: { value: string; label: string };
        type: { value: string; label: string };
      };
      images: ImageListType;
      description: EditorState;
    },
    { rejectWithValue, getState },
  ) => {
    try {
      if (images.length) {
        const promiseImages: Promise<AxiosResponse<Images>>[] = [];

        images.forEach(image => {
          if (image.file) {
            const data = new FormData();
            data.append('file', image.file);
            data.append('folder', 'product');
            const promiseImage = Api().post<Images>('/api/files', data);
            promiseImages.push(promiseImage);
          }
        });

        const responseImages = await Promise.all(promiseImages);

        const arrayImages = responseImages.map(response => ({
          url: response?.data.url,
          path: response?.data.path,
          filename: response?.data.filename,
        }));
        Object.assign(product, { images: arrayImages });
      }

      const state = getState() as RootState;
      const { city } = state.application.geo;

      const description = draftToHtml(
        convertToRaw(draftDescription.getCurrentContent()),
      );
      Object.assign(product, {
        brand: product.brand.value,
        type: product.type.value,
        description,
        city,
      });
      const { data } = await Api().post<{ product: Product; message: string }>(
        '/api/product',
        product,
      );

      return data;
    } catch (err) {
      console.error(err);
      return rejectWithValue(err.response.data);
    }
  },
);

export const deleteProduct = createAsyncThunk(
  'product/deleteThunk',
  async (id: Product['_id']) => {
    try {
      const { data } = await Api().delete<RestDelete>(`/api/product/${id}`);

      return data;
    } catch (e) {
      console.error(e);
    }
  },
);

export const updateProduct = createAsyncThunk(
  'product/updateThunk',
  async (
    {
      product,
      images,
      description: draftDescription,
      id,
    }: {
      product: Omit<Product, 'brand' | 'type'> & {
        brand: { value: string; label: string };
        type: { value: string; label: string };
      };
      images: ImageListType;
      description: EditorState;
      id: Product['_id'];
    },
    { rejectWithValue, getState },
  ) => {
    try {
      const state = getState() as RootState;
      const currentProduct = state.product.list.find(
        el => el._id === id,
      ) as Product;
      if (images.length) {
        const promiseImages: Promise<AxiosResponse<Images>>[] = [];

        images.forEach(image => {
          if (image.file) {
            const data = new FormData();
            data.append('file', image.file);
            data.append('folder', 'product');
            const promiseImage = Api().post<Images>('/api/files', data);
            promiseImages.push(promiseImage);
          }
        });

        const responseImages = await Promise.all(promiseImages);
        console.log({ responseImages });

        const arrayImages = responseImages.map(response => ({
          url: response?.data.url,
          path: response?.data.path,
          filename: response?.data.filename,
        }));
        Object.assign(
          product,
          currentProduct
            ? {
                images: [...currentProduct.images, ...arrayImages],
              }
            : {
                images: arrayImages,
              },
        );
      }

      const { city } = state.application.geo;

      const description = draftToHtml(
        convertToRaw(draftDescription.getCurrentContent()),
      );
      Object.assign(product, {
        brand: product.brand.value,
        type: product.type.value,
        description,
        city,
      });

      await Api().put<{ product: Product; message: string }>(
        `/api/product/${id}`,
        product,
      );
      const brands = state.brand.list;
      const brand = brands.find(
        el => product && el._id === product.brand.value,
      );

      return {
        product: {
          ...currentProduct,
          images: images.length ? product.images : currentProduct.images,
          brand,
          type: product.type.label,
        },
        message: `Товар ${product.name} успешно обновлён!`,
      };
    } catch (err) {
      console.error(err);
      return rejectWithValue(err.response.data);
    }
  },
);

type DeleteProductImagesProps = {
  image: ImageProduct;
  id: Product['_id'];
};
type DeleteProductImagesReturn =
  | { product: Product; message: string }
  | undefined;

export const deleteProductImage = createAsyncThunk<
  DeleteProductImagesReturn,
  DeleteProductImagesProps
>(
  'product/deleteImageThunk',
  async ({ image, id }, { rejectWithValue, getState }) => {
    try {
      await Api().delete<RestDelete>(`/api/files/`, {
        data: image,
      });
      const state = getState() as RootState;
      const products = state.product.list;
      const brands = state.brand.list;
      const product = products.find(el => el._id === id) as Product;
      const brand = brands.find(
        el => product && el.name === product.brand?.name,
      );
      const images = product
        ? [...product.images.filter(el => el._id !== image._id)]
        : [];

      const newProduct: Product = {
        ...product,
        images,
      };

      await Api().put<{ product: Product; message: string }>(
        `/api/product/${id}`,
        {
          ...newProduct,
          brand: brand?._id,
        },
      );

      return {
        product: newProduct,
        message: `Товар ${newProduct?.name} обновлён!`,
      };
    } catch (err) {
      console.error(err);
      return rejectWithValue(err.response.data);
    }
  },
);

const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    voidAction: () => {},
  },
  extraReducers: builder => {
    builder.addCase(getProducts.fulfilled, (state, { payload }) => {
      if (payload) state.list = payload;
      state.isPending = false;
    });

    builder.addCase(addProduct.fulfilled, (state, { payload }) => {
      const { message, product } = payload;
      if (product && state.isPending) {
        const newList = state.list
          .concat([product])
          .sort((a, b) => (a.createdAt > b.createdAt ? -1 : 1));
        state.list = newList;
        cogoToast.success(message, {
          heading: 'Успешно добавлен',
          position: 'top-right',
        });
      }
      state.isPending = false;
    });

    builder.addCase(deleteProduct.fulfilled, (state, { payload }) => {
      if (payload && !payload.err)
        state.list = state.list.filter(brand => brand._id !== payload._id);
      cogoToast.success(`${payload?.message}`, {
        heading: 'Успешно удалён',
        position: 'top-right',
      });
      state.isPending = false;
    });
    builder.addCase(deleteProductImage.fulfilled, (state, { payload }) => {
      if (payload) {
        const { product, message } = payload;
        const newList = state.list;
        const index = newList.findIndex(el => el._id === product?._id);
        newList[index] = product;
        state.list = newList;
        cogoToast.success(message, {
          heading: 'Успешно добавлен',
          position: 'top-right',
        });
      }
      state.isPending = false;
    });
    builder.addCase(updateProduct.fulfilled, (state, { payload }) => {
      if (payload) {
        const { product, message } = payload;
        const newList = state.list;
        const index = newList.findIndex(el => el._id === product?._id);
        newList[index] = product as Product;
        state.list = newList;
        cogoToast.success(message, {
          heading: 'Успешно добавлен',
          position: 'top-right',
        });
      }
      state.isPending = false;
    });

    builder.addCase(getProducts.pending, handlePending);
    builder.addCase(addProduct.pending, handlePending);
    builder.addCase(deleteProduct.pending, handlePending);
    builder.addCase(deleteProductImage.pending, handlePending);
    builder.addCase(updateProduct.pending, handlePending);

    builder.addCase(getProducts.rejected, handleReject);
    builder.addCase(addProduct.rejected, handleReject);
    builder.addCase(deleteProduct.rejected, handleReject);
    builder.addCase(deleteProductImage.rejected, handleReject);
    builder.addCase(updateProduct.rejected, handleReject);
  },
});

export const { voidAction } = productSlice.actions;

export default productSlice.reducer;

export const selectProduct = (state: RootState) => state.product;
export const selectProductList = (state: RootState) => state.product.list;
export const selectProductPending = (state: RootState) =>
  state.product.isPending;
