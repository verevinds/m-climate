/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RestDelete } from '@src/type/api';
import Api from '@src/utils/Api';

import type { RootState } from '.';

export type Banner = {
  _id: string;
  name: string;
  url: string;
  enable: boolean;
  dateEnd?: string;
  createdAt: string;
  updatedAt: string;
};
export type BannersReducer = {
  list: Banner[];
};

const initialState: BannersReducer = {
  list: [],
};

export const getBanners = createAsyncThunk('banners/getThunk', async () => {
  try {
    const { data } = await Api().get<Banner[]>('/api/banners');
    data.sort((a, b) => (a.createdAt > b.createdAt ? -1 : 1));

    return data;
  } catch (e) {
    console.error(e);
  }
});

export const deleteBanners = createAsyncThunk(
  'banners/deleteThunk',
  async (id: Banner['_id']) => {
    try {
      const { data } = await Api().delete<RestDelete>(`/api/banners/${id}`);

      return data;
    } catch (e) {
      console.error(e);
    }
  },
);

const bannersSlice = createSlice({
  name: 'banners',
  initialState,
  reducers: {
    voidAction: () => {},
  },
  extraReducers: builder => {
    builder.addCase(getBanners.fulfilled, (state, { payload }) => {
      if (payload) state.list = payload;
    });
  },
});

export const selectBanners = (state: RootState) => state.banners;
export const selectBannersList = (state: RootState) => state.banners.list;

export const { voidAction } = bannersSlice.actions;

export default bannersSlice.reducer;
