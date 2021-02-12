/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import type { AxiosResponse } from 'axios';
import { RestDelete } from '@type/api';
import Api from '@utils/Api';

import type { RootState } from '..';

export type Brand = {
  _id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
};
export type BrandReducer = {
  list: Brand[];
};

const initialState: BrandReducer = {
  list: [],
};
export const getBrands = createAsyncThunk('admin/testThunk', async () => {
  try {
    const { data } = await Api().get<any, AxiosResponse<Brand[]>>('/api/brand');
    data.sort((a, b) => (a.createdAt > b.createdAt ? -1 : 1));

    return data;
  } catch (e) {
    console.error(e);
  }
});

export const addBrand = createAsyncThunk(
  'admin/addBrand',
  async (brand: Brand) => {
    try {
      const { data } = await Api().post<any, AxiosResponse<Brand>>(
        '/api/brand',
        brand,
      );

      return data;
    } catch (e) {
      console.error(e);
    }
  },
);

export const deleteBrand = createAsyncThunk(
  'admin/deleteBrand',
  async (id: Brand['_id']) => {
    try {
      const { data } = await Api().delete<any, AxiosResponse<RestDelete>>(
        `/api/brand/${id}`,
      );

      return data;
    } catch (e) {
      console.error(e);
    }
  },
);

const admin = createSlice({
  name: 'admin',
  initialState,
  reducers: {
    voidAction: () => {},
  },
  extraReducers: builder => {
    builder.addCase(getBrands.fulfilled, (state, { payload }) => {
      if (payload) state.list = payload;
    });
    builder.addCase(addBrand.fulfilled, (state, { payload }) => {
      if (payload) {
        const newList = state.list
          .concat([payload])
          .sort((a, b) => (a.createdAt > b.createdAt ? -1 : 1));
        state.list = newList;
      }
    });
    builder.addCase(deleteBrand.fulfilled, (state, { payload }) => {
      if (payload && !payload.err)
        state.list = state.list.filter(brand => brand._id !== payload._id);
    });
  },
});

export const selectBrand = (state: RootState) => state.brand;

export const { voidAction } = admin.actions;

export default admin.reducer;
