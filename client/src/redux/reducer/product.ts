/* eslint-disable no-param-reassign */
import { handlePending, handleReject } from '@redux/caseReducer';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Product } from '@src/interface';
import errorPush from '@src/utils/errorPush';
import Api from '@utils/Api';
import { ParsedUrlQuery } from 'querystring';

import type { RootState } from '.';
import { turnOffPending, turnOnPending } from './application/tuning';

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

export const getProducts = createAsyncThunk<ParsedUrlQuery, Product[]>(
  'product/getThunk',
  async (query, { getState, dispatch }) => {
    try {
      dispatch(turnOnPending());
      const state: any = getState();
      const { city } = state.application.geo;

      const url = `/api/product`;
      console.log({ city, ...query });
      const { data } = await Api().get<Product[]>(url, {
        params: { city, ...query },
      });
      data.sort((a, b) => (a.createdAt > b.createdAt ? -1 : 1));

      dispatch(turnOffPending());
      return data;
    } catch (e) {
      dispatch(turnOffPending());
      console.error(e);
    }
  },
);

export const getProduct = createAsyncThunk<Product | undefined, string>(
  'product/getOneThunk',
  async (id, { dispatch, getState }) => {
    try {
      dispatch(turnOnPending());
      const state: any = getState();
      const { city } = state.application.geo;

      const url = `/api/product/${id}/?city=${city}`;

      const { data } = await Api().get<Product>(url);

      dispatch(turnOffPending());
      return data;
    } catch (e) {
      dispatch(turnOffPending());
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
    });
    builder.addCase(getProduct.fulfilled, (state, { payload }) => {
      if (payload) state.item = payload;
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
