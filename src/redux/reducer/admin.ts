import { createSlice } from '@reduxjs/toolkit';

import { RootState } from '.';

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
