/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import { IncomingMessage } from 'http';

// import Api from '@src/utils/Api';
import type { RootState } from '.';

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
    toggleCity: (
      state,
      { payload }: { payload: IncomingMessage | undefined },
    ) => {
      if (state.city) return state;
      const subdomain =
        (payload && payload.headers.host?.split('.')[0]) || 'nsk';

      if (subdomain === 'nsk') {
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
      }
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
});

export const selectGeoRegion = (state: RootState) => state.geo.region;
export const selectGeoCity = (state: RootState) => state.geo.city;

export const { toggleCity } = geoSlice.actions;

export default geoSlice.reducer;
