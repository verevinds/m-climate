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
  admin: {
    sideBar: {
      isHide: boolean;
    };
  };
}

const initialState: IInitialState = {
  context: { name: '', pathname: '', query: {} },
  admin: {
    sideBar: {
      isHide: false,
    },
  },
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
    setHide: state => {
      state.admin.sideBar.isHide = !state.admin.sideBar.isHide;
    },
  },
});

export const selectApplication = (state: RootState) =>
  state.application.application;
export const selectApplicationContext = (state: RootState) =>
  state.application.application.context;

export const { setContext, setHide } = application.actions;

export default application.reducer;
