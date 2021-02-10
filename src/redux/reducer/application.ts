/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ParsedUrlQuery } from 'querystring';

import type { RootState } from '.';

interface IInitialState {
  context: {
    name: string;
    pathname: string;
    query: ParsedUrlQuery;
  };
}

const initialState: IInitialState = {
  context: { name: '', pathname: '', query: {} },
};

const application = createSlice({
  name: 'application',
  initialState,
  reducers: {
    setContext: (
      state,
      { payload }: PayloadAction<{ pathname: string; query: ParsedUrlQuery }>,
    ) => {
      const name = payload.pathname.split('/')[1];

      state.context = { ...payload, name };
    },
  },
});

export const selectApplication = (state: RootState) => state.application;
export const selectApplicationContext = (state: RootState) =>
  state.application.context;

export const { setContext } = application.actions;

export default application.reducer;
