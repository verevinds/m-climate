/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import Api from '@src/utils/Api';

import type { RootState } from '..';

interface IInitialState {
  range: number[];
  country: string;
  region: string;
  eu: string;
  timezone: string;
  city: string;
  ll: number[];
  metro: number;
  area: number;
}
export const getGeo = createAsyncThunk('geo/getThunk', async () => {
  try {
    const { data } = await Api().get<IInitialState>('/api/geo');

    return data;
  } catch (e) {
    console.error(e);
  }
});

const initialState: IInitialState = {
  range: [],
  country: '',
  region: '',
  eu: '',
  timezone: '',
  city: '',
  ll: [],
  metro: 0,
  area: 1,
};

const geoSlice = createSlice({
  name: 'geo',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(getGeo.fulfilled, (state, { payload }) => {
      if (payload) {
        state = payload;
      }
    });
  },
});

export const selectGeo = (state: RootState) => state.application.geo;
export const selectGeoRegion = (state: RootState) =>
  state.application.geo.region;
export const selectGeoCity = (state: RootState) => state.application.geo.city;

// export const {} = geoSlice.actions;

export default geoSlice.reducer;
