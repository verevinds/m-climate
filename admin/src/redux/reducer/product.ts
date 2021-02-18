/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RestDelete } from '@type/api';
import Api from '@utils/Api';
import { AxiosResponse } from 'axios';
import { ImageListType } from 'react-images-uploading';

import type { RootState } from '..';

export type Images = {
  filename: string;
  message: string;
  url: string;
  wasFile: boolean;
};
export type Product = {
  price: number;
  priceOld: number;
  inStock: boolean;
  _id: string;
  name: string;
  brand?: {
    name: string;
  };
  type?: string;
  servicedArea?: string;
  powerCooling?: string;
  powerHeating?: string;
  powerConsumptionCooling?: string;
  powerConsumptionHeating?: string;
  energyEfficiency?: string;
  noiseInside?: string;
  noiseOutside?: string;
  sizeIndoor?: string;
  sizeOutdoor?: string;
  weightIndoor?: string;
  weightOutdoor?: string;
  warranty?: string;
  description?: string;
  createdAt: string;
  updatedAt: string;
};

export type ProductReducer = {
  list: Product[];
  isPending: boolean;
};

const initialState: ProductReducer = {
  list: [],
  isPending: false,
};

export const getProducts = createAsyncThunk('product/getThunk', async () => {
  try {
    const { data } = await Api().get<Product[]>('/api/product');
    data.sort((a, b) => (a.createdAt > b.createdAt ? -1 : 1));

    return data;
  } catch (e) {
    console.error(e);
  }
});

export const addProduct = createAsyncThunk(
  'product/addThunk',
  async ({ product, images }: { product: Product; images: ImageListType }) => {
    try {
      const promiseImages: Promise<AxiosResponse<Images>>[] = [];

      images.forEach(image => {
        if (image.file) {
          const data = new FormData();
          data.append('file', image.file);
          const promiseImage = Api().post<Images>('/api/files', data);
          promiseImages.push(promiseImage);
        }
      });

      const responseImages = await Promise.all(promiseImages);

      const arrayImages = responseImages.map(response => ({
        url: response?.data.url,
        filename: response?.data.filename,
      }));

      Object.assign(product, { images: arrayImages });

      const { data } = await Api().post<Product>('/api/product', product);

      return data;
    } catch (e) {
      console.error(e);
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

const product = createSlice({
  name: 'product',
  initialState,
  reducers: {
    voidAction: () => {},
  },
  extraReducers: builder => {
    builder.addCase(getProducts.fulfilled, (state, { payload }) => {
      if (payload) state.list = payload;
    });
    builder.addCase(addProduct.pending, state => {
      state.isPending = true;
    });
    builder.addCase(addProduct.fulfilled, (state, { payload }) => {
      if (payload) {
        const newList = state.list
          .concat([payload])
          .sort((a, b) => (a.createdAt > b.createdAt ? -1 : 1));
        state.list = newList;
      }

      state.isPending = false;
    });
    builder.addCase(deleteProduct.fulfilled, (state, { payload }) => {
      if (payload && !payload.err)
        state.list = state.list.filter(brand => brand._id !== payload._id);
    });
  },
});

export const selectProduct = (state: RootState) => state.product;
export const selectProductList = (state: RootState) => state.product.list;
export const selectProductPending = (state: RootState) =>
  state.product.isPending;

export const { voidAction } = product.actions;

export default product.reducer;
