/* eslint-disable no-param-reassign */
import { handlePending, handleReject } from '@redux/caseReducer';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import Api from '@src/utils/Api';

import type { RootState } from '.';
import { getGeo } from './application/geo';
import { turnOffPending, turnOnPending } from './application/tuning';

export type Banner = {
  _id: string;
  name: string;
  url: string;
  enable: boolean;
  dateEnd: string;
  createdAt: string;
  updatedAt: string;
};
export type BannersReducer = {
  list: Banner[];
  isPending: boolean;
};

const initialState: BannersReducer = {
  list: [],
  isPending: false,
};

export const getBanners = createAsyncThunk(
  'banners/getThunk',
  async (_, { getState, dispatch }) => {
    try {
      dispatch(turnOnPending());
      const state: any = getState();
      const { city } = state.application.geo;
      const geo: any = await dispatch(getGeo());

      const url = `/api/banners/?city=${city || geo.payload.city}`;
      const { data } = await Api().get<Banner[]>(url);
      data.sort((a, b) => (a.createdAt > b.createdAt ? -1 : 1));

      dispatch(turnOffPending());
      return data;
    } catch (e) {
      dispatch(turnOffPending());
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

    builder.addCase(getBanners.pending, handlePending);

    builder.addCase(getBanners.rejected, handleReject);
  },
});

export const selectBanners = (state: RootState) => state.banners;
export const selectBannersList = (state: RootState) => state.banners.list;
export const selectBannersPending = (state: RootState) =>
  state.banners.isPending;

export const { voidAction } = bannersSlice.actions;

export default bannersSlice.reducer;
