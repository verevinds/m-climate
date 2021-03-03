/* eslint-disable no-param-reassign */
import { handlePending, handleReject } from '@redux/caseReducer';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

// import Api from '@src/utils/Api';
import type { RootState } from '..';

export type Geo = {
  range: number[];
  country: string;
  region: string;
  eu: string;
  timezone: string;
  city: string;
  ll: number[];
  metro: number;
  area: number;
};

type IInitialState = Geo;

export const getGeo = createAsyncThunk<Geo | undefined, { subdomain: string }>(
  'geo/getThunk',
  async ({ subdomain }) => {
    try {
      // const { data } = await Api().get<Geo>('/api/geo');
      const data =
        subdomain === 'kda'
          ? {
              range: [92970496, 92971007],
              country: 'RU',
              region: 'KDA',
              eu: '0',
              timezone: 'Europe/Moscow',
              city: 'Krasnodar',
              ll: [45.0355, 38.975],
              metro: 0,
              area: 1000,
            }
          : {
              range: [3558093824, 3558094847],
              country: 'RU',
              region: 'NVS',
              eu: '0',
              timezone: 'Asia/Novosibirsk',
              city: 'Novosibirsk',
              ll: [55.041, 82.9428],
              metro: 0,
              area: 1,
            };
      return data;
    } catch (e) {
      console.error(e);
    }
  },
);

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
  reducers: {
    turnNSK: () => {
      return {
        range: [3558093824, 3558094847],
        country: 'RU',
        region: 'NVS',
        eu: '0',
        timezone: 'Asia/Novosibirsk',
        city: 'Novosibirsk',
        ll: [55.041, 82.9428],
        metro: 0,
        area: 1,
      };
    },
    turnKDA: () => {
      return {
        range: [92970496, 92971007],
        country: 'RU',
        region: 'KDA',
        eu: '0',
        timezone: 'Europe/Moscow',
        city: 'Krasnodar',
        ll: [45.0355, 38.975],
        metro: 0,
        area: 1000,
      };
    },
  },
  extraReducers: builder => {
    builder.addCase(getGeo.fulfilled, (_state, { payload }) => payload);

    builder.addCase(getGeo.pending, handlePending);
    builder.addCase(getGeo.rejected, handleReject);
  },
});

export const selectGeo = (state: RootState) => state.application.geo;
export const selectGeoRegion = (state: RootState) =>
  state.application.geo.region;
export const selectGeoCity = (state: RootState) => state.application.geo.city;

export const { turnKDA, turnNSK } = geoSlice.actions;

export default geoSlice.reducer;
