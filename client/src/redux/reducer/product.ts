/* eslint-disable no-param-reassign */
import { handlePending, handleReject } from '@redux/caseReducer';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Product } from '@src/interface';
import errorPush from '@src/utils/errorPush';
import Api from '@utils/Api';

import type { RootState } from '.';
import { getGeo } from './application/geo';

export type ProductReducer = {
  list: Product[];
  item: Product | null;
  isPending: boolean;
};

const initialState: ProductReducer = {
  list: [],
  item: null,
  isPending: false,
};

export const getProducts = createAsyncThunk(
  'product/getThunk',
  async (_, { getState, dispatch }) => {
    try {
      const state = getState() as RootState;
      const { city } = state.application.geo;
      const geo: any = await dispatch(getGeo());

      const url = `/api/product/?city=${city || geo.payload.city}`;

      const { data } = await Api().get<Product[]>(url);
      data.sort((a, b) => (a.createdAt > b.createdAt ? -1 : 1));

      return data;
    } catch (e) {
      console.error(e);
    }
  },
);

export const getProduct = createAsyncThunk<Product | undefined, string>(
  'product/getOneThunk',
  async id => {
    try {
      const { data } = await Api().get<Product>(`/api/product/${id}`);

      return data;
    } catch (e) {
      errorPush(e.massage);
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
    builder.addCase(getProduct.fulfilled, (state, { payload }) => {
      if (payload) state.item = payload;
      state.isPending = false;
    });

    builder.addCase(getProducts.pending, handlePending);
    builder.addCase(getProduct.pending, handlePending);

    builder.addCase(getProducts.rejected, handleReject);
    builder.addCase(getProduct.rejected, handleReject);
  },
});

export const { voidAction } = productSlice.actions;

export default productSlice.reducer;

export const selectProduct = (state: RootState) => state.product;
export const selectProductItem = (state: RootState) => state.product.item;
export const selectProductList = (state: RootState) => state.product.list;
export const selectProductPending = (state: RootState) =>
  state.product.isPending;
