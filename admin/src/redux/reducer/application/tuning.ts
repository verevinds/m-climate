/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ParsedUrlQuery } from 'querystring';

import type { RootState } from '..';

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
  },
});

export const selectTuning = (state: RootState) => state.application.tuning;
export const selectTuningContext = (state: RootState) =>
  state.application.tuning.context;

export const { setContext, setHide } = tuningSlice.actions;

export default tuningSlice.reducer;
