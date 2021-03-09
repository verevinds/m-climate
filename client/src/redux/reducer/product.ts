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
  populars: Product[];
  item: Product | null;
  isPending: boolean;
};

const initialState: ProductReducer = {
  list: [],
  populars: [],
  item: null,
  isPending: false,
};

export const getProducts = createAsyncThunk(
  'product/getThunk',
  async (
    arg: { query?: ParsedUrlQuery; zip?: boolean },
    { getState, dispatch, rejectWithValue },
  ) => {
    try {
      dispatch(turnOnPending());
      const { query, zip } = arg;
      const state = getState() as RootState;
      const { city } = state.geo;
      const products = state.product.list;
      const isList = Boolean(products.length);

      const url = zip ? '/api/product/zip' : `/api/product`;

      const params = query ? { city, ...query } : { city };
      const { data } = await Api().get<Product[]>(url, {
        params,
      });
      data.sort((a, b) => (a.createdAt > b.createdAt ? -1 : 1));

      dispatch(turnOffPending());

      return isList ? products : data;
    } catch (e) {
      dispatch(turnOffPending());
      console.error(e);
      return rejectWithValue(e.response.data);
    }
  },
);

export const getProduct = createAsyncThunk<Product | undefined, string>(
  'product/getOneThunk',
  async (id, { dispatch, getState }) => {
    try {
      dispatch(turnOnPending());
      const state: any = getState();
      const { city } = state.geo;

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

export const getProductsPopular = createAsyncThunk(
  'product/getPopularsThunk',
  async (_, { getState, dispatch, rejectWithValue }) => {
    try {
      dispatch(turnOnPending());
      const state = getState() as RootState;
      const { populars } = state.product;
      const isPopulars = Boolean(populars.length);

      const { city } = state.geo;
      const { data } = await Api().get<Product[]>('/api/product/popular', {
        params: { city },
      });
      data.sort((a, b) => (a.createdAt > b.createdAt ? -1 : 1));

      dispatch(turnOffPending());

      return isPopulars ? populars : data;
    } catch (e) {
      dispatch(turnOffPending());
      console.error(e);
      return rejectWithValue(e.response.data);
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
    builder.addCase(getProductsPopular.fulfilled, (state, { payload }) => {
      if (payload) state.populars = payload;
    });

    builder.addCase(getProducts.pending, handlePending);
    builder.addCase(getProduct.pending, handlePending);
    builder.addCase(getProductsPopular.pending, handlePending);

    builder.addCase(getProducts.rejected, handleReject);
    builder.addCase(getProduct.rejected, handleReject);
    builder.addCase(getProductsPopular.rejected, handleReject);
  },
});

export const { voidAction } = productSlice.actions;

export default productSlice.reducer;

export const selectProduct = (state: RootState) => state.product;
export const selectProductItem = (state: RootState) => state.product.item;
export const selectProductList = (state: RootState) => state.product.list;
export const selectProductPopulars = (state: RootState) =>
  state.product.populars;
export const selectProductPending = (state: RootState) =>
  state.product.isPending;
