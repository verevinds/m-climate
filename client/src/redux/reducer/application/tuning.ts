/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ParsedUrlQuery } from 'querystring';

import type { RootState } from '..';
import { getBanners } from '../banners';
import { getProducts } from '../product';

interface IInitialState {
  context: {
    name: string;
    pathname: string;
    query: ParsedUrlQuery;
  };
  isPending: boolean;
  admin: {
    sideBar: {
      isHide: boolean;
    };
  };
}

const initialState: IInitialState = {
  context: { name: '', pathname: '', query: {} },
  isPending: false,
  admin: {
    sideBar: {
      isHide: false,
    },
  },
};

const tuningSlice = createSlice({
  name: 'tuning',
  initialState,
  reducers: {
    setContext: (
      state,
      { payload }: PayloadAction<{ pathname: string; query: ParsedUrlQuery }>,
    ) => {
      const name = payload.pathname.split('/')[1];

      state.context = { ...payload, name };
    },
    setHide: state => {
      state.admin.sideBar.isHide = !state.admin.sideBar.isHide;
    },
    turnOnPending: state => {
      state.isPending = true;
    },
    turnOffPending: state => {
      state.isPending = false;
    },
  },
});

export const selectTuning = (state: RootState) => state.application.tuning;
export const selectTuningContext = (state: RootState) =>
  state.application.tuning.context;
export const selectTuningPending = (state: RootState) =>
  state.application.tuning.isPending;

export const {
  setContext,
  setHide,
  turnOffPending,
  turnOnPending,
} = tuningSlice.actions;

export default tuningSlice.reducer;

export const updateApplication = createAsyncThunk(
  'tuning/updateThunk',
  async (_, { dispatch }) => {
    await dispatch(turnOnPending());
    await dispatch(getProducts());
    await dispatch(getBanners());
    await dispatch(turnOffPending());
  },
);
