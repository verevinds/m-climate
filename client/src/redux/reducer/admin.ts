/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

import type { RootState } from '.';

const admin = createSlice({
  name: 'admin',
  initialState: {},
  reducers: {
    voidAction: () => {},
  },
});

export const selectAdmin = (state: RootState) => state.admin;

export const { voidAction } = admin.actions;

export default admin.reducer;
