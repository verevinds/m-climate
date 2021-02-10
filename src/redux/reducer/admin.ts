/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

import type { RootState } from '.';

export const getBrands = () => async (_dispatch: any, getState: any) => {
  console.log(getState());
  const response = fetch('http://localhost:8081/api/brand')
    .then(e => {
      console.log(e);
    })
    .catch(e => {
      console.log(e);
    });
  return response;
};

const admin = createSlice({
  name: 'admin',
  initialState: {
    sideBar: {
      isHide: false,
    },
    brand: null,
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
