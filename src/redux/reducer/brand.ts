/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import Api from '@src/utils/Api';

import type { AppThunkAction, RootState } from '..';

export type Brand = { _id: string; name: string };
export type BrandReducer = {
  list: Brand[];
};

const initialState: BrandReducer = {
  list: [],
};

export const getBrands = createAsyncThunk('admin/testThunk', async () => {
  try {
    const { data } = await Api().get('/api/brand');
    return data;
  } catch (e) {
    console.error(e);
  }
});

const admin = createSlice({
  name: 'admin',
  initialState,
  reducers: {
    voidAction: () => {},
  },
  extraReducers: builder => {
    builder.addCase(
      getBrands.fulfilled,
      (state, action: AppThunkAction<Brand[]>) => {
        state.list = action.payload;
      },
    );
  },
});

export const selectBrand = (state: RootState) => state.brand;

export const { voidAction } = admin.actions;

export default admin.reducer;
