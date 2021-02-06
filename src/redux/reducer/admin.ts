/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

import type { RootState } from '.';

const admin = createSlice({
  name: 'admin',
  initialState: {
    sideBar: {
      isHide: false,
    },
  },
  reducers: {
    setHide: state => {
      state.sideBar.isHide = !state.sideBar.isHide;
    },
  },
});

export const selectAdmin = (state: RootState) => state.admin;

export const { setHide } = admin.actions;

export default admin.reducer;
