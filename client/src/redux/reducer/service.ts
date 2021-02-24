/* eslint-disable no-param-reassign */
import { handlePending, handleReject } from '@redux/caseReducer';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Service } from '@src/interface';
import Api from '@src/utils/Api';

import type { RootState } from '.';

export type ServiceReducer = {
  list: Service[];
  isPending: boolean;
};
export const getService = createAsyncThunk(
  'service/getThunk',
  async (_props, { rejectWithValue }) => {
    try {
      const { data } = await Api().get<Service[]>('/api/service');
      data.sort((a, b) => (a.createdAt > b.createdAt ? -1 : 1));

      return data;
    } catch (err) {
      console.error(err);
      return rejectWithValue(err.response.data);
    }
  },
);
const initialState: ServiceReducer = {
  list: [],
  isPending: false,
};
const reducers = {
  voidAction: () => {},
};

const serviceSlice = createSlice({
  name: 'service',
  initialState,
  reducers,
  extraReducers: builder => {
    builder.addCase(getService.fulfilled, (state, { payload }) => {
      if (payload) state.list = payload;

      state.isPending = false;
    });

    builder.addCase(getService.pending, handlePending);
    builder.addCase(getService.rejected, handleReject);
  },
});

export const { voidAction } = serviceSlice.actions;

export default serviceSlice.reducer;

export const selectService = (state: RootState) => state.service;
export const selectServiceList = (state: RootState) => state.service.list;
export const selectServicePending = (state: RootState) =>
  state.service.isPending;
